(function(){
  var branchBatchCounts = {
    'staging': 6,
    'rigging': 6,
    'lighting': 6,
    'audio': 6,
    'video-led': 6,
    'power': 5,
    'site-ops': 5,
    'logistics': 5,
    'scenic': 5
  };

  var files = [];
  Object.keys(branchBatchCounts).forEach(function(branchId){
    for(var batchNumber = 1; batchNumber <= branchBatchCounts[branchId]; batchNumber += 1){
      files.push('branch-research-batch-' + String(batchNumber).padStart(3,'0') + '-' + branchId + '.js');
    }
  });

  window.BRANCH_RESEARCH_MANIFEST = files;
})();
