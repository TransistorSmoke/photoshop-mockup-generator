#target photoshop

/*
* PURPOSE OF THIS SCRIPT
* After generating all the shirt mockup, this script will render all the images into a single canvas.
* Export the result into a single image.
*/

var doc = app.activeDocument;

// Path where this script is located
var scriptFilePath = $.fileName;
var scriptFile = new File(scriptFilePath);
var BASEPATH = scriptFile.parent;
var EXPORTPATH = BASEPATH + "/exports";

var MOCKUPS = "MOCKUPS";
var PCT = 0.6;  // Resize percentage

var canvasWidth = doc.width;
var canvasHeight = doc.height;
var allMockupsGroups = doc.layerSets.getByName(MOCKUPS);

var singleMockup = allMockupsGroups.layers[0];
var singleMockupWidth = singleMockup.bounds[2] - singleMockup.bounds[0];
var singleMockupHeight = singleMockup.bounds[3] - singleMockup.bounds[1];

// ------------------------------------
// PROCESS: CROP FIRST, THEN TRANSLATE
// ------------------------------------


// RESIZING Procedure
// singleMockup.resize(PCT * 100, PCT * 100, AnchorPosition.MIDDLECENTER);
// singleMockupWidth = singleMockup.bounds[2] - singleMockup.bounds[0];

// // Get new width and height after resize
// singleMockupWidth = singleMockup.bounds[2] - singleMockup.bounds[0];
// singleMockupHeight = singleMockup.bounds[3] - singleMockup.bounds[1];

// Set the placement of the layer in the canvas
// var mockupCurrentBounds = singleMockup.bounds;
// singleMockup.translate(-mockupCurrentBounds[0], -mockupCurrentBounds[1]);



// CROPPING Procedure
try {

  // Test - crop first then translate
  var left = canvasWidth/2 - singleMockupWidth/2 + 250;
  var top = canvasHeight/2 - singleMockupHeight/2;
  var right = canvasWidth/2 + singleMockupWidth/2 - 250;
  var bottom = canvasHeight - singleMockupHeight/2;
  var cropBounds = [left, top, right, bottom];


  var activeMockLayer = singleMockup;
  // var duplicateActiveMockLayer = activeMockLayer.duplicate();
  // duplicateActiveMockLayer.name = activeMockLayer.name + " (cropped)";
  // activeMockLayer.name = activeMockLayer.name + " (cropped)";


  // Select the layer
  doc.selection.select([
    [cropBounds[0], cropBounds[1]],
    [cropBounds[2], cropBounds[1]],
    [cropBounds[2], cropBounds[3]],
    [cropBounds[0], cropBounds[3]],
  ])

  doc.selection.copy();
  var newCroppedLayer = allMockupsGroups.artLayers.add();
  newCroppedLayer.name = activeMockLayer.name + "- cropped";
  doc.paste();
  doc.selection.deselect();
  var newCroppedLayerBounds = newCroppedLayer.bounds;
  activeMockLayer.visible = false;

  // Resize here
  // ----------------
  newCroppedLayer.resize(PCT * 100, PCT * 100, AnchorPosition.MIDDLECENTER);
  newCroppedLayerWidth = newCroppedLayer.bounds[2] - newCroppedLayer.bounds[0];

  // Get new width and height after resize
  newCroppedLayerWidth = newCroppedLayer.bounds[2] - newCroppedLayer.bounds[0];
  newCroppedLayerHeight = newCroppedLayer.bounds[3] - newCroppedLayer.bounds[1];
  newCroppedLayer.translate(-newCroppedLayer.bounds[0], -newCroppedLayer.bounds[1]);
  // -----------------

  /*
  * Loop through all the shirt colors here.
  *
  */


  // Mock image crop and resize successful!
  alert("Generation of all mock shirt images successful")

} catch(err) {
  alert("error in testing crop process: " + err)
}






// for (var mockCounter = 0; mockCounter < allMockupsGroups.layers.length; mockCounter++) {
// for (var mockCounter = 0; mockCounter <5; mockCounter++) {

//   // FIRST ROW
//   if (mockCounter <= 4) {

//   }

//   if (mockCounter === 0) {
//     singleMockup.translate(-mockupCurrentBounds[0], -mockupCurrentBounds[1]);
//   }
// }


function cropMockShirtLayer() {

}

function resizeMockShirtLayer() {

}
