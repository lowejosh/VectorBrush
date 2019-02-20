// Declare global objects
let layers;
let options;

// UPDATE THE CANVAS SCALING
function updateScaling() {
    // vars
    let totalWidth = document.getElementById('vector-canvas').offsetWidth;
    let totalHeight = document.getElementById('vector-canvas').offsetHeight;
    let c = layers.getCanvas();
    let cWidth = c.width;
    let cHeight = c.height;
    let defWidth = c.defWidth;
    let defHeight = c.defHeight;
    let scale = layers.getScale();

    // Removes a bootstrap bug
    if (!totalWidth) {
        cWidth = 500;
        totalWidth = 549;
    }

    // === AUTOMATIC SCALING ===
    if ((totalWidth - cWidth) < 50) {                               // If the difference between the screen width and the canvas width passes the threshold for reducing scale
        scale = (totalWidth - 75) / defWidth;                           // Scale is set to the required for a 75px padding between the sides
        cHeight = defHeight * scale;                                    // Update the current height so that the following height comparisons are accurate
    } else if ((totalWidth - cWidth) > 100) {                           // Else if the difference between the screen width and the canvas width passes the threshold for increasing scale
        scale = (totalWidth - 75) / defWidth;                           // Scale is set to the required for a 75px padding between the sides
        cHeight = defHeight * scale;                                    // Update the current height os that the following height comparisons are accurate
    }
    if ((totalHeight - cHeight) < 50) {                             // If the difference between the screen height and the canvas height passes the threshold for  scale
        let tempScale = (totalHeight - 75) / defHeight;                 // Scale is set to the required scale for a 75px padding between the top and bottom
        if (tempScale < scale) {                                        // If the scale buffer is smaller than the current width scale
            scale = tempScale;                                          // Set the new scale so that only the lowest necessary scale is the active one (to stop overriding a smaller, more necessary scale)
        }
    } else if ((totalHeight - cHeight) > 100) {                         // Else if the difference between the screen height and the canvas height passes the threshold for increasing
        let tempScale = (totalHeight - 75) / defHeight;                 //  Scale is set to the required scale for a 75px padding between the top and bottom
        if (tempScale < scale) {                                        // If the scale buffer is smaller than the current width scale
            scale = tempScale;                                          // Set the new scale so that only the lowest necessary scale is the active one 
        }
    }

    // Update vars
    cWidth = defWidth * scale;
    cHeight = defHeight * scale;
    c.width = cWidth;
    c.height = cHeight;
    c.x = totalWidth/2 - cWidth/2;
    c.y = totalHeight/2 - cHeight/2;
    c.strokeWidth = c.defStrokeWidth * scale;
    layers.scale = scale;
}

// CHECK FOR VALID COLOUR
function checkValidColour(colour) {
    // If valid hex or rgb/a 
    var rgbRegex = /(rgb\(((([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s*){2}([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\)))|(rgba\(((([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s*){3}(1|1.0*|0?.\d)\)))/
    var hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
    if (colour.match(rgbRegex) || colour.match(hexRegex)) {
        return true;
    } else {
        return false;
    }
}


// OTHER FUNCTIONS 
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

// sortable list
$( function() {
    $( "#sortable" ).sortable();
    $( "#sortable" ).disableSelection();
} );






// Rearranges layers to match layer UI
function handleLayerChange() {
    // Retrieve HTML as a string from the parent element
    let data = document.getElementById("sortable").innerHTML;
    let titleArray = new Array();
    // Add canvas (its kind of for easier manipulation of both the arrays so they have equal length - dont worry)
    titleArray.push("Canvas");

    // Create a wrapping element and append the data so that a query can be made on each list element to get the innerHTML
    let div = document.createElement("div");
    div.innerHTML = data;
    let nodes = div.getElementsByClassName("layer-list-object");
    for (let i = 0; i < nodes.length; i++) { 
        titleArray.push(nodes[i].innerHTML);
    }

    // Find out the new array order based on the innerHTML matching with the layer titles (exlude canvas or big oof);
    for (let i = 0; i < titleArray.length; i++) {
        if (layers.getLayer(i).title != titleArray[i]) {
            for (let j = 0; j < layers.getAmount(); j++) {
                if (layers.getLayer(j).title == titleArray[i]) {
                    layers.getArray().splice(i, 0, layers.getArray().splice(j, 1)[0]);
                }
            }
        }
    }

    // Layers are reversed except for canvas due to goofy formatting from HTML inversing the order
    // This is the whacky solution:
    let tmpCnv = layers.layers.splice(0, 1);
    layers.layers.reverse();
    layers.layers = tmpCnv.concat(layers.layers);
}





// TODO - MOVE TO CANVAS COMPONENT
// Grab Select SVG according to type
 function getSelectOverLayerJSX(item) { 
    let selectOverlayJSX = new Array();

    // Constants
    const pointSize = 8;
    const pointColour = "#72bcd4";
   
    switch (item.type) {
        case "rect":
            // Grab the necessary vars from the item
            let x = layers.getCanvas().x + item.x - pointSize/2;
            let y = layers.getCanvas().y + item.y - pointSize/2;
            let w = item.width;
            let h = item.height;

            // cheeky way of iteratively generating rectangles without conditional logic
            let xs = [x, x + w, x, x + w];
            let ys = [y, y, y + h, y + h];

            // Append all select overlay rects to the output array;
            for (let i = 0; i < 4; i++) {
                selectOverlayJSX.push(<rect key={"s" + i} x={xs[i]} y={ys[i]} width={pointSize} height={pointSize} fill={pointColour}></rect>)
            }
            break;
    }

    return selectOverlayJSX;
}





// Global mouse and touch end listener -- removes a bug because react synthetic event worked locally for the element
document.addEventListener("mouseup", function () {
    //TODO add more?
    handleLayerChange();
});
document.addEventListener("ontouchend", function() {
    //TODO add more?
    handleLayerChange();
})

