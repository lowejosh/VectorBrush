// === SETUP ===
function setup() {
  let canvas = currentlySelected = new Item("Canvas", -1, -1, defWidth, defHeight, "rgb(243, 243, 245)"); 

  // Start rendering the canvas

  // Render the currently selected object properties
  propEl = <PropertyControls item={currentlySelected}/>;
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