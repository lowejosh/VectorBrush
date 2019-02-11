// === SETUP ===
function setup() {
  currentlySelected = new Item("Canvas", -1, -1, defWidth, defHeight, "#f2f3f5"); 

  // Start rendering the canvas
  render();                    // Initial rendering
  setInterval(render, 50);     // Rendering updates

  // Render the currently selected object properties
  propEl = <PropertyControls item={currentlySelected}/>;
  ReactDOM.render(propEl, vProp);
}


// === RENDERING THE CANVAS ===
function render() {
    // Render the canvas
    updateScaling();
    canvEl = <VectorCanvas width={cWidth} height={cHeight} colour="#f2f3f5" />;
    ReactDOM.render(canvEl, vCanv);
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