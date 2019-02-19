// === SETUP ===
function setup() {
  // Initialize layermap
  layers = new LayerMap();
  layers.addLayer(new Item("Canvas", 0, 0, 500, 500, "rgb(243, 243, 245)", 0, "rgb(0, 0, 0)", "rect", 0));
  updateScaling();

  // TEst new object
  let newRect = new Item("Rect1", 50, 50, 200, 200, "rgb(23, 32, 254)", 0, "rgb(0, 0, 0)", "rect", 1);
  layers.addLayer(newRect);

  // TEst new object
  let newRect2 = new Item("Rect2", 150, 220, 300, 20, "rgb(229, 22, 254)", 0, "rgb(0, 0, 0)", "rect", 2);
  layers.addLayer(newRect2);

  // TEst new object
  let newRect3 = new Item("Rect3", 20, 200, 150, 190, "rgb(229, 22, 24)", 0, "rgb(0, 0, 0)", "rect", 3);
  layers.addLayer(newRect3);

  // TEst new object
  let newRect4 = new Item("Rect4", 0, 260, 200, 90, "rgb(129, 202, 24)", 0, "rgb(0, 0, 0)", "rect", 4);
  layers.addLayer(newRect4);

  // Initialize the React components 
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
