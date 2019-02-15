// === SETUP ===
function setup() {
  // Initialize the layers
  let canvas = new Item("Canvas", -1, -1, defWidth, defHeight, "rgb(243, 243, 245)", 0); 
  currentlySelectedLayer = 0;
  layers[0] = canvas; 

  // Render the currently selected object properties
  propEl = <PropertyControls item={layers[currentlySelectedLayer]}/>;
  ReactDOM.render(propEl, vProp);

  // Render the canvas
  updateScaling();
  canvEl = <VectorCanvas item={canvas} />;
  ReactDOM.render(canvEl, vCanv);

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
