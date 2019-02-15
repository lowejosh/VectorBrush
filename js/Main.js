// === SETUP ===
function setup() {
  // Initialize the layers
  let canvas = new Item("Canvas", -1, -1, defWidth, defHeight, "rgb(243, 243, 245)", "rect", 0); 
  currentlySelectedLayer = 0;
  layers.push(canvas);

  // Render the currently selected object properties
  propEl = <PropertyControls item={layers[currentlySelectedLayer]}/>;
  ReactDOM.render(propEl, vProp);

  // TEst new object
  let newRect = new Item("Rect1", 20, 20, 30, 50, "#FCF223", "rect", 1);
  layers.push(newRect);

  // TEst new object
  newRect = new Item("Rect1", 40, 70, 60, 20, "#FDDD23", "rect", 1);
  layers.push(newRect);


  // Render the canvas
  updateScaling();
  canvEl = <VectorCanvas item={canvas} />;
  ReactDOM.render(canvEl, vCanv);

}


// === RENDERING THE CANVAS ===
function renderCanvas() {
}


// === OTHER FUNCTIONS ===
// BG Color picker 
$(function () {
  $('#cp').colorpicker({
    horizontal: true,
    autoInputFallback: false
  });
});

// StrokeColor picker 
$(function () {
  $('#cp2').colorpicker({
    horizontal: true,
    autoInputFallback: false
  });
});

// === START PROGRAM ===
setup();
