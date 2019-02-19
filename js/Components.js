// ========== REACT COMPONENTS ==========
// CANVAS MODEL 
class VectorCanvas extends React.Component {
    constructor(props) {
        super(props);
        let canv = layers.getCanvas();
        let canvDom = document.getElementById("vector-canvas");

        
        this.state = {
            colour: canv.colour,
            strokeColour: canv.strokeColour,
            w: canv.width,
            h: canv.height,
            x: canv.x,
            y: canv.y,
            stroke: canv.strokeWidth,
            scale: layers.getScale(),
        };
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            updateScaling();
            let c = layers.getCanvas();

            let clrBuffer = this.state.colour;
            let strokeClrBuffer = this.state.strokeColour;
            if (layers.getCurrentLayerIndex() == 0) {
                clrBuffer = document.getElementById("cpValue").value;
                strokeClrBuffer = document.getElementById("cp2Value").value;
            } 
            this.setState({
                colour: clrBuffer,
                strokeColour: strokeClrBuffer,
                w: c.width,
                h: c.height,
                x: c.x,
                y: c.y,
                stroke: c.strokeWidth,
                scale: layers.getScale(),
            });

            // === OTHER LAYER STUFF ===
            

            // TODO


        }, 100);
    }
  
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        // Get JSX of all layers except canvas
        let JSX = new Array();
        if (layers.getAmount() > 1) {
            for (let i = 1; i < layers.getAmount(); i++) {
                JSX.push(layers.getLayer(i).getJSX());
            }
        }

        // Prep the canvas style tag
        let cStyle = {
            fill: this.state.colour,
            stroke: this.state.strokeColour,
            strokeWidth: this.state.stroke
        }

        return (
        // Working area
        <svg width="100%" height="100%">

            {/* CANVAS */}
            <rect x={this.state.x} y={this.state.y} width={this.state.w} height={this.state.h} style={cStyle}/>

            {/* LAYERS */}
            {JSX}
        </svg>);
    }
}

// PROPERTY MODEL 
class PropertyControls extends React.Component {
    constructor(props) {
        super(props);
        let item = layers.getCurrentLayer();
        this.state = {
            title: item.title,
            colour: item.colour,
            width: item.defWidth,
            height: item.defHeight,
            strokeColour: "rgb(0, 0, 0)",
            strokeT: 0,
        };
        this.handleWidthChange = this.handleWidthChange.bind(this);
        this.handleHeightChange = this.handleHeightChange.bind(this);
        this.handleBGColourChange = this.handleBGColourChange.bind(this);
        this.handleStrokeColourChange = this.handleStrokeColourChange.bind(this);
        this.handleStrokeTChange = this.handleStrokeTChange.bind(this);
    }

    handleWidthChange(e) {
        // Get colour from DOM because the state isnt updated when using the colour picker
        let clrBuffer = document.getElementById("cpValue").value;
        let strokeClrBuffer = document.getElementById("cp2Value").value;

        // Validate numeric value
        let re = /^([1-9][0-9]{0,4})$/
        let newWidth = e.target.value;
        // If the regex matches or the length is 0
        if (newWidth.match(re) || newWidth.length == 0) {
            // Set the new state
            this.setState({
                width: newWidth,
                colour: clrBuffer,
                strokeColour: strokeClrBuffer,
            });
            // If the canvas layer
            if (layers.getCurrentLayerIndex() == 0) {
                layers.getCanvas().defWidth = newWidth;
                layers.getCanvas().colour = clrBuffer;
                updateScaling();
            } else {
                // TODO notifications
            }
        }
    }

    handleHeightChange(e) {
        // Get colour from DOM because the state isnt updated when using the colour picker
        let clrBuffer = document.getElementById("cpValue").value;
        let strokeClrBuffer = document.getElementById("cp2Value").value;

        // Validate numeric value
        let re = /^([1-9][0-9]{0,4})$/                              
        let newHeight = e.target.value;
        // If the regex matches or the length is 0
        if (newHeight.match(re) || newHeight.length == 0) {
            // Set the state
            this.setState({
                height: newHeight,
                colour: clrBuffer,
                strokeColour: strokeClrBuffer,
            });
            // If the canvas layer
            if (layers.getCurrentLayerIndex() == 0) {
                layers.getCanvas().defHeight = newHeight;
                layers.getCanvas().colour = clrBuffer;
                updateScaling();
            }
        } else {
            //TODO notifications
        }
    }

    // Handle colour picker changes
    handleBGColourChange(e) {
        let clrBuffer = document.getElementById("cpValue").value;
        this.setState({
            colour: clrBuffer
        });
        layers.getCanvas().colour = clrBuffer;
    }

    // Handle stroke thickness changes
    handleStrokeTChange(e) {
        // Get colour from DOM because the state isnt updated when using the colour picker
        let clrBuffer = document.getElementById("cpValue").value;
        let strokeClrBuffer = document.getElementById("cp2Value").value;

        // Validate numeric value
        let re = /^([1-9][0-9]{0,4})$/                              
        let newStroke = e.target.value;
        // If the regex matches or the length is 0
        if (newStroke.match(re) || newStroke.length == 0 || newStroke == "0") {
            // Set the state
            this.setState({
                strokeT: newStroke,
                colour: clrBuffer,
                strokeColour: strokeClrBuffer,
            });
            // If the canvas layer
            if (layers.getCurrentLayerIndex() == 0) {
                layers.getCanvas().defStrokeWidth = newStroke;
            }
        } else {
            //TODO notifications
        }
    }

    // handle stroke colour changes 
    handleStrokeColourChange(e) {
        let clrBuffer = document.getElementById("cp2Value").value;
        this.setState({
            strokeColour: clrBuffer
        });
        layers.getCanvas().strokeColour = clrBuffer;
    }

    render() {

        return (<div className="prop-wrap">
        <div className="info">
            <h5 className="properties-title big-title">Editing <i>{this.state.title}</i></h5>
            <h6 className="properties-title sub-title">Size/Background</h6>
            <div className="margin-wrap">
                <div className="input-group mb-3">
                    <input type="text" className="form-control smaller-input" onChange={this.handleWidthChange} value={this.state.width} />
                    <div className="input-group-append">
                        <span className="input-group-text" id="prop-width">Width</span>
                    </div>
                </div>
                <div className="input-group mb-3">
                    <input type="text" className="form-control smaller-input" onChange={this.handleHeightChange} value={this.state.height} />
                    <div className="input-group-append">
                        <span className="input-group-text" id="prop-height">Height</span>
                    </div>
                </div>
                <div id="cp" className="input-group">
                    <input type="text" id="cpValue" className="form-control input-lg color-picker" onChange={this.handleBGColourChange} onInput={this.handleBGColourChange} value={this.state.colour} spellCheck="false" />
                    <span className="input-group-append">
                        <span className="input-group-text colorpicker-input-addon color-picker"><i></i></span>
                    </span>
                </div>
            </div>
            <h6 className="properties-title sub-title">Stroke</h6>
            <div className="margin-wrap">
                <div className="input-group mb-3">
                    <input type="text" className="form-control smaller-input" onChange={this.handleStrokeTChange} value={this.state.strokeT} />
                    <div className="input-group-append">
                        <span className="input-group-text" id="prop-width">Thickness</span>
                    </div>
                </div>
                <div id="cp2" className="input-group">
                    <input type="text" id="cp2Value" className="form-control input-lg color-picker" onChange={this.handleStrokeColourChange} onInput={this.handleStrokeColourChange} value={this.state.strokeColour} spellCheck="false" />
                    <span className="input-group-append">
                        <span className="input-group-text colorpicker-input-addon color-picker"><i></i></span>
                    </span>
                </div>
            </div>
        </div>
    </div>);
    }
}

// LAYERS MODEL 
class Layers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            layers: this.props.layers
        };
    }

    dragging() {
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

    render() {

        // Create the layer list output
        let layerJSX = new Array();
        for (let i = layers.getAmount() - 1; i > 0; i--) {
            // TODO add a nice little svg icon showing the shape
            console.log("REacHED");
            layerJSX.push(
                <li draggable="true" onTouchEnd={this.dragging} onMouseUp={this.dragging} className="layer-list-object" key={i}>{layers.getLayer(i).title}</li>
            );

        }
        console.log(layerJSX);

        return (
            <div className="layers">
                <h5 className="properties-title">Layers</h5>
                <div className="layer-list">
                    <ul id="sortable">
                        {layerJSX}
                    </ul>
                </div>
            </div>

        );
    }
}

// ========== JAVASCRIPT DATA STRUCTURE OBJECTS ==========
class Item {
    constructor(title, x, y, width, height, colour, strokeWidth, strokeColour, type, layerNo) {
        this.title = title;
        this.x = x;
        this.y = y;
        this.defWidth = width;
        this.defHeight = height;
        this.width = width * layers.getScale();
        this.height = height * layers.getScale();
        this.colour = colour;
        this.defStrokeWidth = strokeWidth;
        this.strokeWidth = strokeWidth * layers.getScale();
        this.strokeColour = strokeColour;
        this.type = type;
        this.layerNo = layerNo;
    }

    getJSX() {
        let cx = layers.getCanvas().x;
        let cy = layers.getCanvas().y;
        let scale = layers.getScale();
        switch(this.type) {
            case "rect":
                return <rect key={this.layerNo} x={cx + (this.x * scale)} y={cy + (this.y * scale)} width={this.width * scale} height={this.height * scale} fill={this.colour} />
                break;
        }
    }
}

class LayerMap {
    constructor() {
        // Initialise canvas layer
        this.currentlySelectedLayer = 0;
        this.layers = new Array();
        this.scale = 1;
    }
    
    addLayer(item) {
        this.layers.push(item);
    }

    getArray() {
        return this.layers;
    }

    removeLayerIndex(index) {
        this.layers.splice(index, 1);
    }

    getLayer(index) {
        return this.layers[index];
    }

    getCurrentLayer() {
        return this.layers[this.currentlySelectedLayer];
    }

    getCurrentLayerIndex() {
        return this.currentlySelectedLayer;
    }

    getScale() {
        return this.scale;
    }

    getCanvas() {
        return this.getLayer(0);
    }

    getAmount() { 
        return this.layers.length;
    }
}