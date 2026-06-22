(function(){
  var completedFiveBatchBranches = [
    'staging',
    'rigging',
    'lighting',
    'audio',
    'video-led',
    'power',
    'site-ops',
    'logistics'
  ];

  var files = [];
  completedFiveBatchBranches.forEach(function(branchId){
    for(var batchNumber = 1; batchNumber <= 5; batchNumber += 1){
      files.push('branch-research-batch-00' + batchNumber + '-' + branchId + '.js');
    }
  });

  files.push('branch-research-batch-001-scenic.js');

  window.BRANCH_RESEARCH_MANIFEST = files;
})();
