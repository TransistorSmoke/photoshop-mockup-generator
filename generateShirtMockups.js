#target photoshop

/*
* PURPOSE OF THIS SCRIPT
* Loop each design through each shirt mock item
* Save each created mock to a folder.
* Make this folder name be the design name.
*/

var doc = app.activeDocument;
var DESIGNS = "DESIGNS";
var MOCKS = "MOCKS";

// Path where this script is located
var scriptFilePath = $.fileName;
var scriptFile = new File(scriptFilePath);
var BASEPATH = scriptFile.parent;
var EXPORTPATH = BASEPATH + "/exports";


var designGroup = doc.layerSets.getByName(DESIGNS);
var mockGroup = doc.layerSets.getByName(MOCKS);
var designLayers = designGroup.layers;
var mockLayers = mockGroup.layers;
var numOfDesigns = designLayers.length;
var numOfMocks = mockLayers.length;

var design = designLayers[0];
var designName = design.name;
design.visible = true;

try {
  for (var mockCount = 0; mockCount < numOfMocks; mockCount++) {
    var color = mockLayers[mockCount].name;
    var fileName = new File(EXPORTPATH + "/" + designName + "-" + color + ".jpg");

    // Unhide mock shirt color, export design, save then hide the mock shirt, then proceed to another shirt color.
    mockColorLayer.visible = true;
    doc.exportDocument(fileName, ExportType.SAVEFORWEB);
    mockColorLayer.visible = false;
  }
} catch (error) {
  alert("Error in generating mockups: " + error);
}
