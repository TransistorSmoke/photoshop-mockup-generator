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
var PCT = 0.4;  // Resize percentage

var canvasWidth = doc.width;
var canvasHeight = doc.height;
var allMockupsGroups = doc.layerSets.getByName(MOCKUPS);

var singleMockup = allMockupsGroups.layers[0];
var singleMockupWidth = singleMockup.bounds[2] - singleMockup.bounds[0];
var singleMockupHeight = singleMockup.bounds[3] - singleMockup.bounds[1];

// singleMockup.resize(PCT * 100, PCT * 100, AnchorPosition.MIDDLECENTER);
// singleMockupWidth = singleMockup.bounds[2] - singleMockup.bounds[0];

// // Get new width and height after resize
// singleMockupWidth = singleMockup.bounds[2] - singleMockup.bounds[0];
// singleMockupHeight = singleMockup.bounds[3] - singleMockup.bounds[1];

// Set the placement of the layer in the canvas
var mockupCurrentBounds = singleMockup.bounds;
singleMockup.translate(-mockupCurrentBounds[0], -mockupCurrentBounds[1]);


try {
  // Testing to crop the layer
  var left = 250;
  var top = 0;
  var right = singleMockupWidth - left;
  var bottom = singleMockupHeight
  var cropBounds = [left, top, right, bottom];
  // var activeMockLayer = doc.activeLayer;


  var activeMockLayer = singleMockup;
  // var duplicateActiveMockLayer = activeMockLayer.duplicate();
  // duplicateActiveMockLayer.name = activeMockLayer.name + " (cropped)";


  // Select the layer
  doc.selection.select([
    [cropBounds[0], cropBounds[1]],
    [cropBounds[2], cropBounds[1]],
    [cropBounds[2], cropBounds[3]],
    [cropBounds[0], cropBounds[3]],
  ])

  // var idCrop = charIDToTypeID("Crop");
  // var descriptor = new ActionDescriptor();
  // var idT = charIDToTypeID("#Pxl");

  // descriptor.putUnitDouble(charIDToTypeID("Left", idT, cropBounds[0]));
  // descriptor.putUnitDouble(charIDToTypeID("Top ", idT, cropBounds[1]));
  // descriptor.putUnitDouble(charIDToTypeID("Rght", idT, cropBounds[2]));
  // descriptor.putUnitDouble(charIDToTypeID("Btom", idT, cropBounds[3]));
  // executeAction(idCrop, descriptor, DialogModes.NO)

  // doc.selection.deselect();

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



// alert("Width of a single mockup: " + singleMockup.width);
// alert("Height of a single mockup: " + singleMockup.height);


// Unused function
// function createSelectionBounds(cropBounds) {
//   var selectionBounds = new ActionDescriptor();
//   selectionBounds.putUnitDouble(charIDToTypeID("Left"), charIDToTypeID("#Pxl"), cropBounds[0]);
//   selectionBounds.putUnitDouble(charIDToTypeID("Top "), charIDToTypeID("#Pxl"), cropBounds[1]);
//   selectionBounds.putUnitDouble(charIDToTypeID("Rght"), charIDToTypeID("#Pxl"), cropBounds[2]);
//   selectionBounds.putUnitDouble(charIDToTypeID("Btom"), charIDToTypeID("#Pxl"), cropBounds[3]);
// }