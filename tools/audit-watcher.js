#!/usr/bin/env node

/**
 * Festival Atlas Code Audit Watcher
 *
 * Comprehensive automated audit that runs independently without AI context.
 * Checks: file integrity, broken references, data consistency, code quality.
 *
 * Usage: node tools/audit-watcher.js [--verbose] [--json]
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const verbose = process.argv.includes('--verbose');
const jsonOutput = process.argv.includes('--json');

class AuditWatcher {
  constructor() {
    this.errorList = [];
    this.warningList = [];
    this.infoList = [];
    this.startTime = Date.now();
  }

  error(message, file = null) {
    this.errorList.push({ type: 'error', message, file });
    if (verbose) console.error(`❌ ERROR: ${message}${file ? ` (${file})` : ''}`);
  }

  warn(message, file = null) {
    this.warningList.push({ type: 'warning', message, file });
    if (verbose) console.warn(`⚠️  WARNING: ${message}${file ? ` (${file})` : ''}`);
  }

  logInfo(message, file = null) {
    this.infoList.push({ type: 'info', message, file });
    if (verbose) console.log(`ℹ️  INFO: ${message}${file ? ` (${file})` : ''}`);
  }

  fileExists(filePath, description = null) {
    if (!fs.existsSync(filePath)) {
      this.error(`Missing file: ${description || filePath}`, filePath);
      return false;
    }
    return true;
  }

  readFile(filePath) {
    try {
      return fs.readFileSync(filePath, 'utf8');
    } catch (e) {
      this.error(`Cannot read file: ${e.message}`, filePath);
      return null;
    }
  }

  isValidJson(content, filePath) {
    try {
      JSON.parse(content);
      return true;
    } catch (e) {
      this.error(`Invalid JSON: ${e.message}`, filePath);
      return false;
    }
  }

  // ============ AUDIT CHECKS ============

  auditFileStructure() {
    if (verbose) console.log('\n📁 Auditing file structure...');

    const requiredFiles = [
      'index.html',
      'manifest.json',
      'package.json',
      '.gitignore',
      'favicon.svg',
      'assets/atlas.css',
      'assets/atlas-core-v2.js',
      'assets/theme-toggle.js',
      'assets/site-footer.js',
      'assets/brand/production-atlas-mark.svg',
      'assets/brand/production-atlas-logo-lockup.svg',
      'assets/web/production-atlas-hero-banner.svg',
      'assets/social/production-atlas-og-400x400.jpg',
    ];

    requiredFiles.forEach(file => {
      const filePath = path.join(root, file);
      this.fileExists(filePath, file);
    });

    // Check icon files
    const iconFiles = ['icon-192.png', 'icon-512.png'];
    iconFiles.forEach(icon => {
      const filePath = path.join(root, 'assets/icons', icon);
      this.fileExists(filePath, `assets/icons/${icon}`);
    });
  }

  auditHtmlMetaTags() {
    if (verbose) console.log('\n🏷️  Auditing HTML meta tags...');

    const htmlFiles = this.getHtmlFiles();
    const requiredTags = {
      'index.html': ['description', 'og:title', 'og:description', 'og:url', 'og:type'],
      'opportunities.html': ['description', 'og:title', 'og:description'],
      '404.html': ['description']
    };

    Object.entries(requiredTags).forEach(([file, tags]) => {
      const filePath = path.join(root, file);
      const content = this.readFile(filePath);
      if (!content) return;

      tags.forEach(tag => {
        const pattern = tag.includes('og:')
          ? `property="${tag}"`
          : `name="${tag}"`;
        if (!content.includes(pattern)) {
          this.warn(`Missing meta tag: ${tag}`, file);
        }
      });
    });
  }

  auditScriptReferences() {
    if (verbose) console.log('\n📜 Auditing script references...');

    const htmlFiles = this.getHtmlFiles();
    const scriptRegex = /<script\s+src=["']([^"']+)["']/g;

    htmlFiles.forEach(file => {
      const filePath = path.join(root, file);
      const content = this.readFile(filePath);
      if (!content) return;

      let match;
      while ((match = scriptRegex.exec(content)) !== null) {
        const scriptPath = match[1].split('?')[0]; // Remove query params
        const fullPath = path.join(root, scriptPath);
        if (!fs.existsSync(fullPath)) {
          this.error(`Missing script: ${scriptPath}`, file);
        }
      }
    });
  }

  auditCssReferences() {
    if (verbose) console.log('\n🎨 Auditing CSS references...');

    const htmlFiles = this.getHtmlFiles();
    const linkRegex = /<link\s+rel="stylesheet"\s+href=["']([^"']+)["']/g;

    htmlFiles.forEach(file => {
      const filePath = path.join(root, file);
      const content = this.readFile(filePath);
      if (!content) return;

      let match;
      while ((match = linkRegex.exec(content)) !== null) {
        const cssPath = match[1].split('?')[0];
        const fullPath = path.join(root, cssPath);
        if (!fs.existsSync(fullPath)) {
          this.error(`Missing CSS file: ${cssPath}`, file);
        }
      }
    });
  }

  auditAssetReferences() {
    if (verbose) console.log('\n🖼️  Auditing image/asset references...');

    const htmlFiles = this.getHtmlFiles();
    const imgRegex = /src=["']([^"']+)["']/g;

    htmlFiles.forEach(file => {
      const filePath = path.join(root, file);
      const content = this.readFile(filePath);
      if (!content) return;

      let match;
      while ((match = imgRegex.exec(content)) !== null) {
        const assetPath = match[1].split('?')[0];

        // Skip external URLs and hash references
        if (assetPath.startsWith('http') || assetPath.startsWith('#')) continue;

        const fullPath = path.join(root, assetPath);
        if (!fs.existsSync(fullPath)) {
          this.error(`Missing asset: ${assetPath}`, file);
        }
      }
    });
  }

  auditJsonFiles() {
    if (verbose) console.log('\n📋 Auditing JSON files...');

    const jsonFiles = [
      'manifest.json',
      'package.json',
      '.eslintrc.json'
    ];

    jsonFiles.forEach(file => {
      const filePath = path.join(root, file);
      if (!fs.existsSync(filePath)) {
        this.warn(`JSON file not found: ${file}`, file);
        return;
      }

      const content = this.readFile(filePath);
      if (content && !this.isValidJson(content, file)) {
        return; // Error already logged
      }

      this.logInfo(`Valid JSON: ${file}`);
    });
  }

  auditCacheVersions() {
    if (verbose) console.log('\n⚡ Auditing cache versions consistency...');

    const htmlFiles = this.getHtmlFiles();
    const versionRegex = /\?v=([a-z0-9]+)/gi;
    const versions = {};

    htmlFiles.forEach(file => {
      const filePath = path.join(root, file);
      const content = this.readFile(filePath);
      if (!content) return;

      let match;
      while ((match = versionRegex.exec(content)) !== null) {
        const versionPart = match[0];
        if (!versions[versionPart]) versions[versionPart] = [];
        versions[versionPart].push(file);
      }
    });

    // Check for version inconsistencies
    const footerVersions = Object.keys(versions).filter(v => v.includes('footer'));
    if (footerVersions.length > 1) {
      this.warn(`Multiple footer.js versions found: ${footerVersions.join(', ')}`);
    }
  }

  auditDataFiles() {
    if (verbose) console.log('\n📊 Auditing data files...');

    const dataDir = path.join(root, 'data');
    if (!fs.existsSync(dataDir)) {
      this.error('Data directory not found', 'data/');
      return;
    }

    const dataFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('.js'));
    if (dataFiles.length === 0) {
      this.warn('No data files found in data/ directory');
      return;
    }

    this.logInfo(`Found ${dataFiles.length} data files`);

    // Check for empty data files
    dataFiles.forEach(file => {
      const filePath = path.join(dataDir, file);
      const stats = fs.statSync(filePath);
      if (stats.size === 0) {
        this.error(`Empty data file: ${file}`, `data/${file}`);
      }
    });
  }

  auditCollaborationLogs() {
    if (verbose) console.log('\n📝 Auditing collaboration logs...');

    const logDir = path.join(root, 'ai-communication', 'collaboration-log');
    if (!fs.existsSync(logDir)) {
      this.warn('Collaboration log directory not found');
      return;
    }

    const logFiles = fs.readdirSync(logDir)
      .filter(f => f.endsWith('.md') && !f.startsWith('.'));

    logFiles.forEach(file => {
      const filePath = path.join(logDir, file);
      const content = this.readFile(filePath);
      if (!content) return;

      const hasStatus = content.includes('Status:');
      const hasCreated = content.includes('Created:');
      const hasValidation = content.includes('Validation status:') || content.includes('validation status');
      const hasReviewAfter = content.includes('Review after:') || content.includes('review after');
      const hasNextAction = content.includes('Next action:') || content.includes('next action');

      if (!hasStatus) this.warn(`Missing Status field`, file);
      if (!hasCreated) this.warn(`Missing Created date`, file);
      if (!hasValidation) this.warn(`Missing Validation status`, file);
      if (!hasReviewAfter) this.warn(`Missing Review after date`, file);
      if (!hasNextAction) this.warn(`Missing Next action`, file);
    });
  }

  auditJavaScriptSyntax() {
    if (verbose) console.log('\n✅ Auditing JavaScript syntax...');

    const jsFiles = this.getJsFiles(['assets', 'tools']);

    jsFiles.forEach(file => {
      const content = this.readFile(file);
      if (!content) return;

      // Check for common issues
      if (content.includes('console.error') && !file.includes('test')) {
        this.warn(`Contains console.error statement`, file);
      }

      // Check for TODO/FIXME
      if (content.match(/\/\/\s*(TODO|FIXME|XXX|HACK)/i)) {
        this.warn(`Contains TODO/FIXME comment`, file);
      }
    });

    this.logInfo(`Checked ${jsFiles.length} JavaScript files`);
  }

  auditGitStatus() {
    if (verbose) console.log('\n📦 Auditing git status...');

    try {
      const status = execSync('git status --short', { cwd: root, encoding: 'utf8' });
      if (status.trim()) {
        this.warn(`Uncommitted changes detected:\n${status}`);
      } else {
        this.logInfo('Working tree is clean');
      }

      const branch = execSync('git rev-parse --abbrev-ref HEAD', { cwd: root, encoding: 'utf8' }).trim();
      this.logInfo(`Current branch: ${branch}`);
    } catch (e) {
      this.warn('Could not check git status');
    }
  }

  auditLineEndings() {
    if (verbose) console.log('\n↩️  Auditing line endings...');

    const files = [
      'index.html',
      'assets/atlas.css',
      'assets/atlas-core-v2.js',
      'package.json'
    ];

    files.forEach(file => {
      const filePath = path.join(root, file);
      const content = this.readFile(filePath);
      if (!content) return;

      const hasCRLF = content.includes('\r\n');
      if (hasCRLF) {
        this.warn(`Mixed line endings (CRLF detected, should be LF)`, file);
      }
    });
  }

  // ============ UTILITY METHODS ============

  getHtmlFiles() {
    return fs.readdirSync(root)
      .filter(f => f.endsWith('.html'));
  }

  getJsFiles(dirs = ['assets']) {
    const files = [];
    dirs.forEach(dir => {
      const dirPath = path.join(root, dir);
      if (fs.existsSync(dirPath)) {
        fs.readdirSync(dirPath)
          .filter(f => f.endsWith('.js'))
          .forEach(f => files.push(path.join(dirPath, f)));
      }
    });
    return files;
  }

  // ============ REPORTING ============

  report() {
    const duration = ((Date.now() - this.startTime) / 1000).toFixed(2);

    if (jsonOutput) {
      const report = {
        timestamp: new Date().toISOString(),
        duration: `${duration}s`,
        summary: {
          errors: this.errorList.length,
          warnings: this.warningList.length,
          info: this.infoList.length
        },
        errors: this.errorList,
        warnings: this.warningList,
        info: this.info,
        status: this.errorList.length > 0 ? 'FAILED' : 'PASSED'
      };
      console.log(JSON.stringify(report, null, 2));
      return this.errorList.length === 0 ? 0 : 1;
    }

    console.log('\n' + '='.repeat(60));
    console.log('🔍 FESTIVAL ATLAS CODE AUDIT REPORT');
    console.log('='.repeat(60));

    console.log(`\n⏱️  Duration: ${duration}s`);
    console.log(`📅 Generated: ${new Date().toISOString()}`);

    console.log('\n📊 SUMMARY:');
    console.log(`  Errors:   ${this.errorList.length > 0 ? `❌ ${this.errorList.length}` : '✅ 0'}`);
    console.log(`  Warnings: ${this.warningList.length > 0 ? `⚠️  ${this.warningList.length}` : '✅ 0'}`);
    console.log(`  Info:     ${this.infoList.length}`);

    if (this.errorList.length > 0) {
      console.log('\n❌ ERRORS:');
      this.errorList.forEach(e => {
        console.log(`  - ${e.message}${e.file ? ` [${e.file}]` : ''}`);
      });
    }

    if (this.warningList.length > 0) {
      console.log('\n⚠️  WARNINGS:');
      this.warningList.forEach(w => {
        console.log(`  - ${w.message}${w.file ? ` [${w.file}]` : ''}`);
      });
    }

    console.log('\n' + '='.repeat(60));

    if (this.errorList.length === 0) {
      console.log('✅ AUDIT PASSED');
    } else {
      console.log('❌ AUDIT FAILED');
    }

    console.log('='.repeat(60) + '\n');

    return this.errorList.length === 0 ? 0 : 1;
  }

  // ============ MAIN EXECUTION ============

  run() {
    console.log('🚀 Starting Festival Atlas Code Audit Watcher...\n');

    this.auditFileStructure();
    this.auditHtmlMetaTags();
    this.auditScriptReferences();
    this.auditCssReferences();
    this.auditAssetReferences();
    this.auditJsonFiles();
    this.auditCacheVersions();
    this.auditDataFiles();
    this.auditCollaborationLogs();
    this.auditJavaScriptSyntax();
    this.auditLineEndings();
    this.auditGitStatus();

    return this.report();
  }
}

// Run audit
const auditor = new AuditWatcher();
const exitCode = auditor.run();
process.exit(exitCode);
