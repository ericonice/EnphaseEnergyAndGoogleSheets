function doGet(request) {
  console.log('Updating solar output:' + JSON.stringify(request, null, 2));      
  let helper = new EnphaseEnergyAPIHelper();
  var results = helper.updateSpreadsheet();
  console.log(`Successfully updated solar output: ${JSON.stringify(results, null, 2)}`);
  return ContentService.createTextOutput(JSON.stringify(results, null, 2) ).setMimeType(ContentService.MimeType.JSON);
}

function update() {
  let helper = new EnphaseEnergyAPIHelper();
  var results = helper.updateSpreadsheet();
  console.log(`Successfully updated solar output: ${JSON.stringify(results, null, 2)}`);
}