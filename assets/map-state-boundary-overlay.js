(function(){
  if (!document.body || document.body.dataset.page !== 'map') return;

  var ns = 'http://www.w3.org/2000/svg';
  var landPath = 'M5.1 38.2 L16.9 90.6 L10.2 155.0 L20.3 193.2 L15.3 226.5 L22.0 262.3 L35.6 286.2 L44.1 295.7 L42.4 310.0 L54.2 321.9 L52.5 341.0 L66.1 367.2 L88.1 372.0 L105.1 381.5 L133.9 414.9 L174.6 412.5 L237.3 445.9 L284.7 445.9 L313.6 434.0 L340.7 462.6 L372.9 481.7 L406.8 481.7 L430.5 536.5 L471.2 574.7 L491.5 529.4 L516.9 498.4 L571.2 500.8 L603.4 472.2 L652.5 467.4 L694.9 460.2 L745.8 488.8 L759.3 560.4 L761.0 591.4 L745.8 593.8 L725.4 560.4 L718.6 524.6 L716.9 484.1 L740.7 460.2 L747.5 431.6 L762.7 417.3 L779.7 400.6 L788.1 362.5 L813.6 352.9 L830.5 321.9 L839.0 286.2 L847.5 267.1 L861.0 233.7 L869.5 219.4 L898.3 207.5 L920.3 202.7 L932.2 171.7 L949.2 143.1 L983.1 119.2 L979.7 71.5 L949.2 59.6 L915.3 112.1 L864.4 119.2 L816.9 124.0 L779.7 152.6 L728.8 195.5 L703.4 197.9 L681.4 107.3 L644.1 119.2 L593.2 69.2 L505.1 23.8 L355.9 23.8 L237.3 23.8 L135.6 23.8 L5.1 38.2 Z';
  var statePath = 'M16.9 106.1 L50.8 106.1 L67.8 101.3 L101.7 97.8 L135.6 96.8 M135.6 23.8 L135.6 96.8 M135.6 96.8 L139.0 124.0 L144.9 138.3 L135.6 150.2 L137.3 190.8 M13.6 190.8 L84.7 190.8 M84.7 190.8 L108.5 262.3 L135.6 310.0 L176.3 357.7 M176.3 357.7 L176.3 412.5 M84.7 190.8 L135.6 190.8 L186.4 190.8 M186.4 190.8 L186.4 310.0 M186.4 310.0 L270.3 310.0 M270.3 310.0 L270.3 445.2 M270.3 214.6 L270.3 310.0 M236.4 214.6 L270.3 214.6 M186.4 190.8 L236.4 190.8 L236.4 214.6 M236.4 126.4 L236.4 190.8 M151.7 23.8 L169.5 52.5 L183.1 76.3 L188.1 104.9 L236.4 126.4 M236.4 119.2 L355.1 119.2 M355.1 23.8 L355.1 96.8 M355.1 96.8 L355.1 166.9 L355.1 214.6 M236.4 214.6 L355.1 214.6 M270.3 310.0 L372.9 310.0 M389.0 214.6 L389.0 310.0 M372.9 321.9 L372.9 434.0 M372.9 321.9 L423.7 321.9 L423.7 369.6 M423.7 369.6 L461.0 376.8 L491.5 383.9 L518.6 391.1 M355.1 96.8 L482.0 96.8 M355.1 166.9 L482.0 155.0 M389.0 238.5 L503.2 238.5 M389.0 310.0 L514.9 310.0 M481.4 23.8 L482.0 96.8 M482.0 96.8 L483.9 155.0 L508.5 155.0 L572.9 155.0 M494.9 224.2 L576.3 224.2 M515.3 321.9 L591.5 321.9 M525.4 405.4 L576.3 405.4 M544.1 71.5 L552.5 107.3 L572.9 131.2 L574.6 155.0 M572.9 178.8 L644.1 178.8 M576.3 224.2 L601.7 262.3 L608.5 290.9 L601.7 321.9 M635.6 195.5 L635.6 290.9 M681.4 195.5 L681.4 276.6 M754.2 193.2 L754.2 245.6 M754.2 190.8 L852.5 190.8 M711.9 271.8 L730.5 264.7 L754.2 245.6 M601.7 321.9 L727.1 321.9 M700.0 321.9 L833.9 321.9 M689.8 357.7 L788.1 357.7 L813.6 352.9 M728.8 357.7 L745.8 393.5 L749.2 429.2 M678.0 357.7 L678.0 453.1 M618.6 357.7 L618.6 472.2 M576.3 405.4 L572.9 500.8 M678.0 460.2 L745.8 460.2 M591.5 321.9 L591.5 357.7 L601.7 374.4 L618.6 360.1 M503.4 238.5 L515.3 259.9 L515.3 310.0 M716.9 197.9 L722.0 157.4 L711.9 112.1 M816.9 245.6 L839.0 245.6 L847.5 267.1 M839.0 245.6 L852.5 233.7 M872.9 190.8 L878.0 119.2 M888.1 174.1 L918.6 174.1 M888.1 190.8 L888.1 174.1 M901.7 207.5 L901.7 190.8 M915.3 143.1 L932.2 171.7';
  var lakePath = 'M559.3 76.3 L620.3 54.8 L679.7 81.1 L681.4 107.3 M640.7 119.2 L661.0 143.1 L657.6 171.7 L644.1 193.2 M716.9 197.9 L733.9 186.0 L754.2 183.6 M776.3 162.2 L810.2 159.8 L830.5 143.1';

  function makePath(className, pathData) {
    var path = document.createElementNS(ns, 'path');
    if (className) path.setAttribute('class', className);
    if (pathData) path.setAttribute('d', pathData);
    return path;
  }

  function installStyle() {
    if (document.getElementById('map-state-boundary-style')) return;
    var style = document.createElement('style');
    style.id = 'map-state-boundary-style';
    style.textContent =
      '.map-legend{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin:12px 0;color:#c6d0dc;font-size:.86rem}' +
      '.map-legend span{display:inline-flex;align-items:center;gap:7px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.035);border-radius:999px;padding:7px 10px}' +
      '.map-legend i{display:inline-block;flex-shrink:0}' +
      '.map-legend .dot{width:13px;height:13px;border-radius:50%;background:var(--gold2);box-shadow:0 0 0 3px rgba(242,183,5,.18)}' +
      '.map-legend .line{width:32px;height:0;border-top:1px solid rgba(224,234,245,.34)}' +
      '.us-map-outline{inset:0!important;width:100%!important;height:100%!important}' +
      '.us-land{fill:rgba(127,183,255,.10)!important}' +
      '.us-border{stroke:rgba(224,234,245,.62)!important;stroke-width:2.2!important}' +
      '.state-lines{stroke:rgba(224,234,245,.30)!important;stroke-width:1.05!important;stroke-linecap:round!important;stroke-linejoin:round!important}' +
      '.lake-lines{stroke:rgba(127,183,255,.18)!important;stroke-width:1.35!important}';
    document.head.appendChild(style);
  }

  function installLegend() {
    var shell = document.querySelector('.static-map-shell');
    if (!shell || document.querySelector('.map-legend')) return;
    var legend = document.createElement('div');
    legend.className = 'map-legend';
    legend.innerHTML = '<span><i class=dot></i>Gold marker = mapped festival opportunity</span><span><i class=line></i>Thin lines = state boundaries</span><span>Click a marker or card to open details</span>';
    shell.parentNode.insertBefore(legend, shell);
  }

  function replaceMapSvg() {
    installStyle();
    installLegend();

    var svg = document.querySelector('.us-map-outline');
    if (!svg || svg.dataset.stateBoundaryMap === 'true') return;

    svg.dataset.stateBoundaryMap = 'true';
    svg.setAttribute('viewBox', '0 0 1000 620');
    svg.setAttribute('preserveAspectRatio', 'none');

    while (svg.firstChild) svg.removeChild(svg.firstChild);

    var defs = document.createElementNS(ns, 'defs');
    var clip = document.createElementNS(ns, 'clipPath');
    clip.id = 'usa-land-clip';

    clip.appendChild(makePath('', landPath));
    defs.appendChild(clip);
    svg.appendChild(defs);

    svg.appendChild(makePath('us-land', landPath));

    var lakeLines = makePath('state-lines lake-lines', lakePath);
    lakeLines.setAttribute('clip-path', 'url(#usa-land-clip)');
    svg.appendChild(lakeLines);

    var stateLines = makePath('state-lines', statePath);
    stateLines.setAttribute('clip-path', 'url(#usa-land-clip)');
    svg.appendChild(stateLines);

    svg.appendChild(makePath('us-border', landPath));
  }

  function start() {
    replaceMapSvg();
    var app = document.getElementById('app');
    if (app && window.MutationObserver) {
      new MutationObserver(replaceMapSvg).observe(app, { childList: true, subtree: true });
    }
    setTimeout(replaceMapSvg, 150);
    setTimeout(replaceMapSvg, 700);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
