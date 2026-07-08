# Audit Watcher Documentation

## Overview

The **Audit Watcher** is an independent Node.js-based code audit script that runs without AI context window dependency. It performs comprehensive validation of the Festival Atlas codebase, checking file integrity, references, metadata, and code quality.

The audit runs automatically as part of `npm run validate:all` and is available as a standalone command.

## Quick Start

```bash
# Standard formatted report
npm run audit

# With detailed console logging
npm run audit:verbose

# JSON output (for CI/CD)
npm run audit:json

# Run all validations including audit
npm run validate:all
```

## What It Checks

### 1. File Structure Integrity
- ✅ All required HTML files exist
- ✅ Core asset files present (CSS, JS, icons, SVGs)
- ✅ Brand and web assets in place
- ✅ Social media preview images
- ✅ Icon files for PWA support

### 2. HTML Meta Tags
- ✅ Open Graph tags (og:title, og:description, og:image, etc.)
- ✅ Meta descriptions for SEO
- ✅ Proper charset and viewport declarations
- ✅ Favicon and manifest references

### 3. Asset Reference Validation
- ✅ Script references point to existing files
- ✅ CSS file references are valid
- ✅ Image/SVG paths are correct
- ✅ No broken asset links

### 4. JSON File Validation
- ✅ manifest.json syntax
- ✅ package.json validity
- ✅ .eslintrc.json configuration

### 5. Cache Version Consistency
- ✅ Script query string versions aligned
- ✅ CSS cache buster consistency
- ✅ Identifies cache busting conflicts

### 6. Data File Integrity
- ✅ All data package files present
- ✅ No empty or corrupted files
- ✅ File size sanity checks

### 7. Collaboration Log Metadata
- ✅ Status field present
- ✅ Created date documented
- ✅ Validation status recorded
- ✅ Review after date set
- ✅ Next action documented

### 8. JavaScript Code Quality
- ✅ Detects console.error statements
- ✅ Finds TODO/FIXME/XXX comments
- ✅ Checks for unfinished code markers

### 9. Line Ending Consistency
- ✅ Detects CRLF vs LF mixing
- ✅ Warns about platform-specific issues

### 10. Git Status
- ✅ Uncommitted changes detection
- ✅ Branch tracking verification
- ✅ Working tree cleanliness

## Output Formats

### Default Report (Human-Readable)

```
============================================================
🔍 FESTIVAL ATLAS CODE AUDIT REPORT
============================================================

⏱️  Duration: 0.03s
📅 Generated: 2026-07-08T16:34:01.194Z

📊 SUMMARY:
  Errors:   ✅ 0
  Warnings: ⚠️  236
  Info:     6

❌ ERRORS:
  [list of critical issues]

⚠️  WARNINGS:
  [list of non-critical issues]

============================================================
✅ AUDIT PASSED
============================================================
```

### Verbose Mode

Includes real-time console output as each check runs:

```bash
npm run audit:verbose

🚀 Starting Festival Atlas Code Audit Watcher...

📁 Auditing file structure...
📜 Auditing script references...
🎨 Auditing CSS references...
...
```

### JSON Output (CI/CD Integration)

```bash
npm run audit:json

{
  "timestamp": "2026-07-08T16:34:01.194Z",
  "duration": "0.03s",
  "summary": {
    "errors": 0,
    "warnings": 236,
    "info": 6
  },
  "errors": [...],
  "warnings": [...],
  "info": [...],
  "status": "PASSED"
}
```

## Exit Codes

- **0** - Audit passed (no errors)
- **1** - Audit failed (errors found)

## Integration with CI/CD

### GitHub Actions Example

```yaml
- name: Run Code Audit
  run: npm run audit:json > audit-report.json
  continue-on-error: true

- name: Check Audit Results
  run: |
    if [ -f audit-report.json ]; then
      cat audit-report.json | jq '.status'
    fi
```

### Local Pre-commit Hook

```bash
#!/bin/bash
npm run audit:json > /tmp/audit.json
STATUS=$(cat /tmp/audit.json | jq -r '.status')
if [ "$STATUS" != "PASSED" ]; then
  echo "❌ Audit failed. Fix issues before committing."
  exit 1
fi
```

## Configuration

The audit watcher is configured in `tools/audit-watcher.js`:

### Required Files

Edit the `requiredFiles` array to customize:

```javascript
const requiredFiles = [
  'index.html',
  'manifest.json',
  'package.json',
  '.gitignore',
  'favicon.svg',
  // Add more as needed
];
```

### Meta Tag Requirements

Modify `auditHtmlMetaTags()` to check different pages:

```javascript
const requiredTags = {
  'index.html': ['description', 'og:title', 'og:description'],
  'opportunities.html': ['description'],
  // Add more pages
};
```

### Collaboration Log Requirements

The audit checks for these fields in collaboration logs:
- `Status:` - completion status
- `Created:` - date created
- `Validation status:` - validation outcome
- `Review after:` - scheduled review date
- `Next action:` - documented next steps

## Common Issues & Fixes

### "Missing file" Errors

**Error**: `Missing file: assets/brand/production-atlas-mark.svg`

**Fix**: Verify the file exists at the correct path:
```bash
ls -la assets/brand/production-atlas-mark.svg
```

### Cache Version Conflicts

**Warning**: `Multiple footer.js versions found: ?v=footer14, ?v=footer19`

**Fix**: Standardize all HTML files to use the same version:
```bash
grep -r "site-footer.js" *.html
# Update all to use the same version number
```

### Missing Collaboration Log Metadata

**Warning**: `Missing Validation status [filename.md]`

**Fix**: Add the required field to the log file:
```markdown
## Validation status

passed

## Review after

2026-07-15

## Next action

Monitor live deployment and verify image rendering.
```

### Line Ending Issues

**Warning**: `Mixed line endings (CRLF detected, should be LF)`

**Fix**: Convert to LF:
```bash
dos2unix filename.txt
# Or in Git:
git config core.autocrlf input
```

## Extending the Audit

To add a new audit check, edit `tools/audit-watcher.js`:

```javascript
auditNewFeature() {
  if (verbose) console.log('\n🚀 Auditing new feature...');
  
  // Your check logic here
  if (problemFound) {
    this.error('Error message', 'file.js');
  } else {
    this.logInfo('Check passed', 'feature');
  }
}

// Then add to run() method:
run() {
  // ... existing checks ...
  this.auditNewFeature();
  return this.report();
}
```

## Limitations

- Only checks **static files** - does not run JavaScript tests
- Does not validate **functionality** - only structure and references
- Does not check **content accuracy** - only metadata presence
- Cannot detect **logic errors** - requires unit tests
- Focuses on **common issues** - not exhaustive coverage

## Performance

- Typical audit duration: **0.02 - 0.05 seconds**
- No external dependencies
- No network requests
- Minimal memory footprint

## Troubleshooting

### Script won't run

```bash
# Ensure Node.js is installed
node --version  # Should be v18+

# Make script executable
chmod +x tools/audit-watcher.js

# Run directly
node tools/audit-watcher.js
```

### JSON output parsing fails

```bash
# Test JSON validity
npm run audit:json | jq '.' 

# Pretty-print with formatting
npm run audit:json | jq . | less
```

### Too many warnings

Filter by type:

```bash
npm run audit:json | jq '.warnings[] | select(.message | contains("meta tag"))'
```

## References

- **Script**: `tools/audit-watcher.js`
- **Configuration**: `package.json` scripts section
- **Validation Specs**: Various `validate-*.js` scripts in `tools/`
