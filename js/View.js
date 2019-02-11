// === SETUP ===



// === RENDERING THE CANVAS ===
function render() {
    // Render the canvas
    updateScaling();
    let canvEl = <VectorCanvas width={cWidth} height={cHeight} colour="#f2f3f5" />;
    ReactDOM.render(canvEl, vCanv);

    // Render the currently selected object properties
    let propEl = <PropertyControls item={currentlySelected} />;
    ReactDOM.render(propEl, vProp);
}

// === OTHER FUNCTIONS ===
// Color picker 
$(function () {
  $('#cp').colorpicker({
    horizontal: true
  });
});


// === DEPLOY === 
render();                    // Initial rendering
setInterval(render, 50);     // Rendering updates