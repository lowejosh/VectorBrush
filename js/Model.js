// ========== REACT MODELS ==========
// CANVAS MODEL 
function VectorCanvas(props) {
    let w = props.width;            // Width of the canvas 
    let h = props.height;           // Height of the canvas
    let midX = vCanv.offsetWidth/2 - w/2;          // X value that will place the canvas horizontally centered
    let midY = vCanv.offsetHeight/2 - h/2;          // Y value that will place the canvas vertically centered

    return (
        // Working area
        <svg width="100%" height="100%">
            {/* Actual canvas */}
            <rect x={midX} y={midY} width={w} height={h} fill={props.colour} />
        </svg>
    );
}

// PROPERTY MODEL 
function PropertyControls(props) {
    let title = props.item.title;

    return (
        <h1>{title}</h1>


    );
}

// ========== JAVASCRIPT CLASSES ==========
class Item {
    constructor(title, x, y, width, height, colour) {
        this.title = title;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.colour = colour;
    }
}


// ========== INITIAL OBJECTS ==========
let canvas = new Item("Canvas", -1, -1, defWidth, defHeight, "#f2f3f5"); 
let currentlySelected = canvas;

