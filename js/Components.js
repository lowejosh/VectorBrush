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
        if (layers.length > 1) {
            for (let i = 1; i < layers.length; i++) {
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
        console.log("REACHED");
        let clrBuffer = document.getElementById("cp2Value").value;
        this.setState({
            strokeColour: clrBuffer
        });
        layers.getCanvas().strokeColour = clrBuffer;
    }

    render() {

        // Create the layer list output
        let layerJSX = new Array();
        for (let i = layers.length - 1; i >= 0; i--) {
            // TODO add a nice little svg icon showing the shape
            layerJSX.push(
                <div className="layer-list-object" key={i}>{this.state.layers[i].title}</div>
            );

        }

        return (<div className="prop-wrap">
        <div className="info">
            <h5 className="properties-title">Editing <i>{this.state.title}</i></h5>
            <h6 className="properties-title">Size/Background</h6>
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

            <h6 className="properties-title">Stroke</h6>
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

    render() {
        return (
            <div className="layers">
                <h5 className="properties-title">Layers</h5>
                <div className="layer-list">

                </div>
            </div>

        );
    }

}

// ========== JAVASCRIPT DATA STRUCTURE OBJECTS ==========
class Item {
    constructor(title, x, y, width, height, colour, strokeWidth, strokeColour, type) {
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
    }

    getJSX() {
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
}