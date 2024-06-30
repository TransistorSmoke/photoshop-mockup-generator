#target photoshop

/*
* PURPOSE OF THIS SCRIPT
* Loop each design through each shirt mock item
* Save each created mock to the EXPORT folder where the script resides.
*/

var doc = app.activeDocument;
var DESIGNS = "DESIGNS";
var MOCKS = "MOCKS";
var DSNLIGHTBG = "LIGHTBG";
var DSNDARKBG = "DARKBG"

// Path where this script is located
var scriptFilePath = $.fileName;
var scriptFile = new File(scriptFilePath);
var BASEPATH = scriptFile.parent;
var EXPORTPATH = BASEPATH + "/exports";

var designGroup = doc.layerSets.getByName(DESIGNS);
var designLightVersion = designGroup.layers[0].name;
var designDarkVersion = designGroup.layers[1].name;
var mockGroup = doc.layerSets.getByName(MOCKS);

/*
* The order of the groups inside the MOCK groups are 1-Light, 2-Dark.
* For now, do not change this order.
* The code is tightly-coupled to the ordering of group in the PSD file.
* Let's set that as is for now.
*/
var lightMockGroup = mockGroup.layers[0];
var darkMockGroup = mockGroup.layers[1];
var mockColorGroup = "";


// Generate the mockups for both light and dark-colored shirts
for (var dsnGroupCount = 0; dsnGroupCount < designGroup.layers.length; dsnGroupCount++) {
  var currentDesign = designGroup.layers[dsnGroupCount];
  var designName = currentDesign.layers[0].name;

  currentDesign.visible = true;

  if (designGroup.layers[dsnGroupCount].name === DSNLIGHTBG) {
    mockColorGroup = lightMockGroup;
  } else {
    mockColorGroup = darkMockGroup;
  }
  mockColorGroup.visible = true;

  if (mockColorGroup.layers.length > 0) {
    for (var colorGroupMockCount = 0; colorGroupMockCount < mockColorGroup.layers.length; colorGroupMockCount++) {
      try {
        var colorGroupLayer = mockColorGroup.layers[colorGroupMockCount];
        var color = colorGroupLayer.name;
        var fileName = new File(EXPORTPATH + "/" + designName + "-" + color + ".jpg");

        // Unhide mock shirt color, export design, save then hide the mock shirt, then proceed to another shirt color.
        colorGroupLayer.visible = true;
        doc.exportDocument(fileName, ExportType.SAVEFORWEB);
        colorGroupLayer.visible = false;
      } catch (err) {
        alert("Error in generating shirt mockups: " + err);
      }
    }
  }

  currentDesign.visible = false;
  mockColorGroup.visible = false;
}