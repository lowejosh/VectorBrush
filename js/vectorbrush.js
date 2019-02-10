// === GLOBAL VARS ===
let vCanv = document.getElementById('vector-canvas');





// === CANVAS RENDERING ===
function VectorCanvas(props) {
        return (
            // Working area
            <svg className="vector-canvas" width="100%" height="100%">
                {/* Actual canvas */}
                <rect x={vCanv.offsetWidth/2 - props.width/2} y={vCanv.offsetHeight/2 - props.height/2} width={props.width} height={props.height} fill={props.colour} />
            </svg>
        );
}

const element = <VectorCanvas width="500" height="500" colour="#FCFCFC" />;
ReactDOM.render(element, vCanv);
