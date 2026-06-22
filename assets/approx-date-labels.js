(function(){
  function markApproximateDates(root){
    var scope = root || document;
    Array.prototype.slice.call(scope.querySelectorAll('p')).forEach(function(node){
      if(node.innerHTML.indexOf('<b>Date:</b>') !== -1){
        node.innerHTML = node.innerHTML.replace('<b>Date:</b>', '<b>Approx. date window:</b>');
        if(node.innerHTML.indexOf('verify before planning') === -1){
          node.innerHTML += ' <span class="sub">(verify before planning)</span>';
        }
      }
    });
    var modalContent = document.getElementById('modalContent');
    if(modalContent){
      Array.prototype.slice.call(modalContent.querySelectorAll('.sub')).forEach(function(node){
        var text = node.textContent || '';
        if(text.indexOf('Approx. planning window:') === -1 && /\d{4}-\d{2}-\d{2}/.test(text)){
          node.textContent = text.replace(/ • (\d{4}-\d{2}-\d{2}(?: to \d{4}-\d{2}-\d{2})?)/, ' • Approx. planning window: $1');
        }
      });
    }
  }

  function scheduleApproximatePass(){
    setTimeout(function(){ markApproximateDates(document); }, 0);
    setTimeout(function(){ markApproximateDates(document); }, 150);
  }

  document.addEventListener('DOMContentLoaded', scheduleApproximatePass);
  document.addEventListener('input', scheduleApproximatePass, true);
  document.addEventListener('change', scheduleApproximatePass, true);
  document.addEventListener('click', function(){
    setTimeout(function(){ markApproximateDates(document); }, 0);
  }, true);

  var originalOpenOpportunity = window.openOpportunity;
  Object.defineProperty(window, 'openOpportunity', {
    configurable: true,
    get: function(){ return originalOpenOpportunity; },
    set: function(fn){
      originalOpenOpportunity = function(){
        var result = fn.apply(this, arguments);
        setTimeout(function(){ markApproximateDates(document); }, 0);
        return result;
      };
    }
  });

  if(typeof originalOpenOpportunity === 'function'){
    window.openOpportunity = originalOpenOpportunity;
  }
})();
