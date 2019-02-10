// === GLOBAL VARS ===
let vCanv = document.getElementById('vector-canvas');
let scale = 1;





// === CANVAS RENDERING ===
function VectorCanvas(props) {
    let w = props.width * scale;
    let h = props.height * scale;
    let midX = vCanv.offsetWidth/2 - w/2;
    let midY = vCanv.offsetHeight/2 - h/2;

    return (
        // Working area
        <svg width="100%" height="100%">
            {/* Actual canvas */}
            <rect x={midX} y={midY} width={w} height={h} fill={props.colour} />
        </svg>
    );
}


// TESTING
setInterval(renderAll, 100);
const element = <VectorCanvas width="500" height="500" colour="#FCFCFC" />;
function renderAll() {
    ReactDOM.render(element, vCanv);
}