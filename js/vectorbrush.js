// === GLOBAL VARS ===
// Default canvas vars
let vCanv = document.getElementById('vector-canvas');
let scale = 1;
let defWidth = 500;
let defHeight = 500;
let element = <VectorCanvas width={defWidth} height={defHeight} colour="#FCFCFC" />;
let cWidth = defWidth * scale;
let cHeight = defHeight * scale;

// === CANVAS RENDERING ===
function VectorCanvas(props) {
    let tW = props.totalWidth;
    let tH = props.totalHeight;
    let w = props.width;
    let h = props.height;
    let midX = tW/2 - w/2;
    let midY = tH/2 - h/2;

    return (
        // Working area
        <svg width="100%" height="100%">
            {/* Actual canvas */}
            <rect x={midX} y={midY} width={w} height={h} fill={props.colour} />
        </svg>
    );
}

// TESTING
setInterval(renderAll, 50);

function renderAll() {
    // Vars
    let totalWidth = vCanv.offsetWidth;
    let totalHeight = vCanv.offsetHeight;

    if (!totalWidth) {
        cWidth = 500;
        totalWidth = 549;
    }

    // === AUTOMATIC SCALING ===
    if ((totalWidth - cWidth) < 50) {
        scale = (totalWidth - 75) / defWidth;
        cHeight = defHeight * scale;
    } else if (((totalWidth - cWidth) > 100) && scale < 1) {
        scale = (totalWidth - 75) / defWidth;
        cHeight = defHeight * scale;
    }
    if ((totalHeight - cHeight) < 50) {
        let tempScale = (totalHeight - 75) / defHeight;
        if (tempScale < scale) {
            scale = tempScale;
        }
    } else if (((totalHeight - cHeight) > 100) && scale < 1) {
        let tempScale = (totalHeight - 75) / defHeight;
        if (tempScale < scale) {
            scale = tempScale;
        }
    }

    // Update vars
    cWidth = defWidth * scale;
    cHeight = defHeight * scale;
    console.log(scale);

    element = <VectorCanvas width={cWidth} height={cHeight} totalWidth={totalWidth} totalHeight={totalHeight} colour="#FCFCFC" />;
    ReactDOM.render(element, vCanv);
}