// === SETUP ===
function setup() {
  let canvas = currentlySelected = new Item("Canvas", -1, -1, defWidth, defHeight, "#f2f3f5"); 

  // Start rendering the canvas
  // Render the canvas
  updateScaling();
  canvEl = <VectorCanvas item={canvas} />;
  ReactDOM.render(canvEl, vCanv);

  // Render the currently selected object properties
  propEl = <PropertyControls item={currentlySelected}/>;
  ReactDOM.render(propEl, vProp);
}


// === RENDERING THE CANVAS ===
function renderCanvas() {
}


// === OTHER FUNCTIONS ===
// Color picker 
$(function () {
  $('#cp').colorpicker({
    horizontal: true,
    autoInputFallback: false
  });
});


// === START PROGRAM ===
setup();