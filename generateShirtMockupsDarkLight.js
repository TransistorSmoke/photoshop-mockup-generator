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

for (var dsnGroupCount = 0; dsnGroupCount < designGroup.layers.length; dsnGroupCount++) {
  // The design is for light background.
  // // Generate all the mockups for light-colored shirts.


  var currentDesign = designGroup.layers[dsnGroupCount];
  var designName = currentDesign.layers[0].name;
  currentDesign.visible = true;

  // Generate the light-colored mockups
  if (designGroup.layers[dsnGroupCount].name === DSNLIGHTBG) {
    lightMockGroup.visible = true;

    for (var lightMockCount = 0; lightMockCount < lightMockGroup.layers.length; lightMockCount++) {
      try {
        var lightMockLayer = lightMockGroup.layers[lightMockCount];
        var color = lightMockLayer.name;
        var fileName = new File(EXPORTPATH + "/" + designName + "-" + color + ".jpg");

        // Unhide mock shirt color, export design, save then hide the mock shirt, then proceed to another shirt color.
        lightMockLayer.visible = true;
        doc.exportDocument(fileName, ExportType.SAVEFORWEB);
        lightMockLayer.visible = false;
      } catch (err) {
        alert("Error in generating light-colored shirt mockups: " + err);
      }
    }

    currentDesign.visible = false;
    lightMockGroup.visible = false;

  }

  // generate the dark-colored mockups
  else {
    darkMockGroup.visible = true;

    for (var darkMockCount = 0; darkMockCount < darkMockGroup.layers.length; darkMockCount++) {
      try {
        var darkMockLayer = darkMockGroup.layers[darkMockCount];
        var color = darkMockLayer.name;
        var fileName = new File(EXPORTPATH + "/" + designName + "-" + color + ".jpg");

        darkMockLayer.visible = true;
        doc.exportDocument(fileName, ExportType.SAVEFORWEB);
        darkMockLayer.visible = false;
      } catch (err) {
        alert("Error in generating dark-colored shirt mockups: " + err);
      }
    }

    currentDesign.visible = false;
    darkMockGroup.visible = false;
  }
}

// var mockGroup = doc.layerSets.getByName(MOCKS);
// var designLayers = designGroup.layers;
// var mockLayers = mockGroup.layers;
// var numOfDesigns = designLayers.length;
// var numOfMocks = mockLayers.length;

// var design = designLayers[0];
// var designName = design.name;
// design.visible = true;


// if (designGroup.typename === "LayerSet") {
//   var numDesignSubGroups = designGroup.layers.length;

//   alert("number of design subgroups: " + numDesignSubGroups)


// }




// try {
//   for (var mockCount = 0; mockCount < numOfMocks; mockCount++) {
//     var color = mockLayers[mockCount].name;
//     var fileName = new File(EXPORTPATH + "/" + designName + "-" + color + ".jpg");

//     // Unhide mock shirt color, export design, save then hide the mock shirt, then proceed to another shirt color.
//     mockColorLayer.visible = true;
//     doc.exportDocument(fileName, ExportType.SAVEFORWEB);
//     mockColorLayer.visible = false;
//   }
// } catch (error) {
//   alert("Error in generating mockups: " + error);
// }
