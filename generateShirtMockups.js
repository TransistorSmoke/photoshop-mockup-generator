#target photoshop

/*
* ------- PART A -------
* This script overlays the design to each of the shirts and saves each mockup.
* I use this script for Photoshop version 2023. I am not sure if it works for other versions.
*
* IMPORTANT: These are the requirements in order for the script to work.
*
* 1.) Create 2 layer groups and name them DESIGNS and MOCKS.
* 2.) Under DESIGNS group, create 2 subgroups named LIGHTBG and DARKBG.
*       - Place your designs for light-colored shirt inside LIGHTBG, and for dark-colored shirt inside DARKBG.
* 3.) Under MOCKS group, create 2 subgroupes names LIGHT and DARK.
        - Place your light shirt mockups inside LIGHT, and dark inside DARK.
* 4.) Run the script and acquire the generated mockups.
*
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
    var mockColorLayer = mockLayers[mockCount];
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
