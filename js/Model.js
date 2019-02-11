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
        <div>
            <h5 class="properties-title">{title}</h5>
            <div id="cp" class="input-group">
                <input type="text" class="form-control input-lg color-picker" value="#6D2781" spellcheck="false"/>
                <span class="input-group-append">
                <span class="input-group-text colorpicker-input-addon color-picker"><i></i></span>
                </span>
            </div>
            <div class="input-group mb-3 dark-input">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">Width</span>
                </div>
                <input type="text" className="form-control smaller-input" />
            </div>
        </div>
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
