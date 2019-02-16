// === SETUP ===
function setup() {
  // Initialize layermap
  layers = new LayerMap();
  layers.addLayer(new Item("Canvas", 0, 0, 500, 500, "rgb(243, 243, 245)", 0, "rgb(0, 0, 0)", "rect"));
  updateScaling();

  // TEst new object
  let newRect = new Item("Rect1", 50, 50, 200, 200, "rgb(23, 32, 254)", 0, "rgb(0, 0, 0)", "rect");
  layers.addLayer(newRect);

  // TEst new o  // Initialize the React components 
  let propEl = <PropertyControls />;
  let layerEl = <Layers />;
  let canvEl = <VectorCanvas />;

  // Start Rendering
  ReactDOM.render(propEl, document.getElementById("vector-properties"));
  ReactDOM.render(layerEl, document.getElementById("vector-layers"));
  ReactDOM.render(canvEl, document.getElementById("vector-canvas"));
}


// === START PROGRAM ===
setup();
