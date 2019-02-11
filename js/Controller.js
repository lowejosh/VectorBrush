// === GLOBAL VARS ===
// Default canvas vars
let vCanv = document.getElementById('vector-canvas');   // Canvas workspace
let vProp = document.getElementById('vector-properties');   // Canvas workspace
let scale = 1;                                          // Scale for size of canvas
let defWidth = 500;                                     // Initial default canvas width
let defHeight = 500;                                    // Initial default canvas height
let cWidth = defWidth * scale;                          // *actual* canvas width after scale is applied
let cHeight;                                             // *actual* canvas height after scale is applied
// Element vars
let currentlySelected;
let canvEl;
let propEl;
// Other tracking vars
let validColour = false;

function updateScaling() {
    // Temp vars
    let totalWidth = vCanv.offsetWidth;
    let totalHeight = vCanv.offsetHeight;

    // Removes a bootstrap bug
    if (!totalWidth) {
        cWidth = 500;
        totalWidth = 549;
    }

    // === AUTOMATIC SCALING ===
    if ((totalWidth - cWidth) < 50) {                               // If the difference between the screen width and the canvas width passes the threshold for increasing scale
        scale = (totalWidth - 75) / defWidth;                           // Scale is set to the required for a 75px padding between the sides
        cHeight = defHeight * scale;                                    // Update the current height so that the following height comparisons are accurate
    } else if (((totalWidth - cWidth) > 100) && scale < 1) {        // Else if the difference between the screen width and the canvas width passes the threshold for reducing scale
        scale = (totalWidth - 75) / defWidth;                           // Scale is set to the required for a 75px padding between the sides
        cHeight = defHeight * scale;                                    // Update the current height os that the following height comparisons are accurate
    }
    if ((totalHeight - cHeight) < 50) {                             // If the difference between the screen height and the canvas height passes the threshold for reducing scale
        let tempScale = (totalHeight - 75) / defHeight;                 // Scale is set to the required scale for a 75px padding between the top and bottom
        if (tempScale < scale) {                                        // If the scale buffer is smaller than the current width scale
            scale = tempScale;                                          // Set the new scale so that only the lowest necessary scale is the active one (to stop overriding a smaller, more necessary scale)
        }
    } else if (((totalHeight - cHeight) > 100) && scale < 1) {      // Else if the difference between the screen height and the canvas height passes the threshold for increasing
        let tempScale = (totalHeight - 75) / defHeight;                 //  Scale is set to the required scale for a 75px padding between the top and bottom
        if (tempScale < scale) {                                        // If the scale buffer is smaller than the current width scale
            scale = tempScale;                                          // Set the new scale so that only the lowest necessary scale is the active one 
        }
    }

    // Update vars
    cWidth = defWidth * scale;
    cHeight = defHeight * scale;
}