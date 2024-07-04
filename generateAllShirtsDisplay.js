#target photoshop

/*
* ------- PART B -------*
* After generating all the shirt mockup, this script will render all the images into a single canvas.
* Export the result into a single image.
*
* IMPORTANT: This are the requirements in order for the script to work.
* 1.) Ensure that all the original shirt mockups are all center-aligned to the canvas, both horizontally and vertically.
* 2.) Create 2 layer groups and name them MOCKUPS and RESIZED.
* 3.) Under MOCKUPS, place all the generated images that you acquired from PART A.
* 4.) The cropped images will be saved inside the RESIZED group.
*
*/

var doc = app.activeDocument;

// Path where this script is located
var scriptFilePath = $.fileName;
var scriptFile = new File(scriptFilePath);
var BASEPATH = scriptFile.parent;
var EXPORTPATH = BASEPATH + "/exports";
var MOCKUPS = "MOCKUPS";
var RESIZED = "RESIZED";
var PCT = 0.6;  // Resize percentage

var canvasWidth = doc.width;
var canvasHeight = doc.height;
var allMockupsGroup = doc.layerSets.getByName(MOCKUPS);
var resizedGroup = doc.layerSets.getByName(RESIZED);
// alert("inside resied group: " + resizedGroup.layers[0].name )

var singleMockup = allMockupsGroup.layers[0];
var singleMockupWidth = singleMockup.bounds[2] - singleMockup.bounds[0];
var singleMockupHeight = singleMockup.bounds[3] - singleMockup.bounds[1];

try {
  var left = (canvasWidth/2 - singleMockupWidth/2) + 250;
  var top = -singleMockup.bounds[1];
  var right = canvasWidth/2 + singleMockupWidth/2 - 250;
  var bottom = singleMockup.bounds[3];
  var cropBounds = [left, top, right, bottom];

  // Varibales for cropping and translating mocks initialised
  var newCroppedLayerWidth = 0;
  var newCroppedLayerHeight = 0;
  var translateX = 0;
  var translateY = 0;
  var newCroppedLayer = null;
  var newCroppedLayerBounds = null;
  var activeResizedLayer = 0;
  var resizedLayerWidth = 0;
  var resizedLayerHeight = 0;
  var offsetX = 0;
  var offsetY = 0;
  var generatedRowIndex = 0;
  var newCanvasHeight = 0;

  // --------------------------------------------------------------
  // Crop all mockups and translate to upperleft corner of canvas....
  // --------------------------------------------------------------
  for (var mockCount = 0; mockCount < allMockupsGroup.layers.length; mockCount++) {
    var activeMockLayer = allMockupsGroup.layers[mockCount];
    doc.activeLayer = activeMockLayer;
    activeMockLayer.visible = true;
    doc.selection.select([
      [cropBounds[0], cropBounds[1]],
      [cropBounds[2], cropBounds[1]],
      [cropBounds[2], cropBounds[3]],
      [cropBounds[0], cropBounds[3]],
    ])

    doc.selection.copy();
    newCroppedLayer = resizedGroup.artLayers.add();
    newCroppedLayer.name = activeMockLayer.name + "- cropped";
    doc.paste();
    doc.selection.deselect();
    newCroppedLayerBounds = newCroppedLayer.bounds;
    activeMockLayer.visible = false;

    newCroppedLayer.resize(PCT * 100, PCT * 100, AnchorPosition.MIDDLECENTER);
    newCroppedLayerWidth = newCroppedLayer.bounds[2] - newCroppedLayer.bounds[0];
    newCroppedLayerHeight = newCroppedLayer.bounds[3] - newCroppedLayer.bounds[1];
    newCroppedLayer.translate(-newCroppedLayer.bounds[0], -newCroppedLayer.bounds[1]);
  }

  // -----------------------------------------
  // ...and then lay them all out into a grid
  // ------------------------------------------
  for (var mockCount = 0; mockCount < 12; mockCount++) {
    activeResizedLayer = resizedGroup.layers[mockCount];
    resizedLayerWidth = activeResizedLayer.bounds[2] - activeResizedLayer.bounds[0]
    resizedLayerHeight = activeResizedLayer.bounds[2] - activeResizedLayer.bounds[0]
    offsetX = resizedLayerWidth * mockCount;
    generatedRowIndex = Math.floor(mockCount/4);
    offsetY = resizedLayerHeight * generatedRowIndex;

    if (mockCount < 4) {
      offsetY = -activeResizedLayer.bounds[1];

    } else if (mockCount >= 4 && mockCount < 8) {
      offsetX = resizedLayerWidth * (mockCount - 4);
    } else if (mockCount >= 8 && mockCount < 12) {
      offsetX = resizedLayerWidth * (mockCount - 8);
    } else if (mockCount >= 12 && mockCount < 16) {
      offsetX = resizedLayerWidth * (mockCount - 12);
    }

    activeResizedLayer.translate(offsetX, offsetY);
  }

  var totalGridRows = Math.ceil(resizedGroup.layers.length/4);
  newCanvasHeight = totalGridRows * resizedLayerHeight;
  doc.resizeCanvas(canvasWidth, newCanvasHeight, AnchorPosition.TOPCENTER);

  var designName = allMockupsGroup.layers[0].name.slice(0, 12);
  var fileName = new File(EXPORTPATH + "/" + designName + ".jpg");
  doc.exportDocument(fileName, ExportType.SAVEFORWEB);

  // Mock image crop and resize successful!
  alert("Generation of all mock shirt images successful")

} catch(err) {
  alert("error in testing crop process: " + err)
}
