// === SETUP ===
function setup() {
  // Initialize the layers
  let canvas = new Item("Canvas", -1, -1, defWidth, defHeight, "rgb(243, 243, 245)", "rect", 0); 
  currentlySelectedLayer = 0;
  layers.push(canvas);

  // TEst new object
  let newRect = new Item("Rect1", 20, 20, 30, 50, "#FCF223", "rect", 1);
  layers.push(newRect);

  // TEst new object
  newRect = new Item("Rect2", 40, 70, 60, 20, "#FDDD23", "rect", 2);
  layers.push(newRect);


  // Render 
  updateScaling();
  let propEl = <PropertyControls item={layers[currentlySelectedLayer]}/>;
  let layerEl = <Layers item={layers} />;
  let canvEl = <VectorCanvas item={canvas} />;
  ReactDOM.render(propEl, document.getElementById("vector-properties"));
  ReactDOM.render(layerEl, document.getElementById("vector-layers"));
  ReactDOM.render(canvEl, document.getElementById("vector-canvas"));

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
