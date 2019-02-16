// ========== REACT MODELS ==========
// CANVAS MODEL 
class VectorCanvas extends React.Component {
    constructor(props) {
        updateScaling();
        super(props);
        this.state = {
            colour: props.colour,
            w: cWidth,
            h: cHeight,
            midX: vCanv.offsetWidth/2 - cWidth/2,
            midY: vCanv.offsetHeight/2 - cHeight/2,
            layerNo: 0
        };
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            // === CANVAS STUFF === 
            // See if valid colour
            validColour = checkValidColour(document.getElementById("cpValue").value);
            let clrBuffer = this.state.colour;
            if (validColour && (currentlySelectedLayer == this.state.layerNo)) {
                clrBuffer = document.getElementById("cpValue").value;
            } 
            this.setState({
                colour: clrBuffer,
                w: cWidth,
                h: cHeight,
                midX: cx,
                midY: cy,
                stroke: st,
                strokeColour: stColour
            });

            // === OTHER LAYER STUFF ===
            

            // TODO


        }, 100);
    }
  
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        // Update the scaling values
        updateScaling();

        // Get JSX of all layers except canvas
        let JSX = new Array();
        if (layers.length > 1) {
            for (let i = 1; i < layers.length; i++) {
                JSX.push(layers[i].getJSX());
            }
        }

        // Prep the canvas style tag
        let cStyle = "stroke: " + this.state.strokeColour + "; stroke-width: " + this.state.stroke;

        return (
        // Working area
        <svg width="100%" height="100%">

            {/* CANVAS */}
            <rect x={this.state.midX} y={this.state.midY} width={this.state.w} height={this.state.h} fill={this.state.colour} style={{cStyle}}/>

            {/* LAYERS */}
            {JSX}
        </svg>);
    }
}

// PROPERTY MODEL 
class PropertyControls extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.item.title,
            colour: props.item.colour,
            width: props.item.width,
            height: props.item.height,
            strokeColour: "rgb(0, 0, 0)",
            strokeT: 0
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

        // Validate numeric value
        let re = /^([1-9][0-9]{0,4})$/
        let newWidth = e.target.value;
        // If the regex matches or the length is 0
        if (newWidth.match(re) || newWidth.length == 0) {
            // Set the new state
            this.setState({
                width: newWidth,
                colour: clrBuffer
            });
            // If the canvas layer
            if (currentlySelectedLayer == 0) {
                defWidth = newWidth;
            } else {
                // TODO notifications
            }
        }
    }

    handleHeightChange(e) {
        // Get colour from DOM because the state isnt updated when using the colour picker
        let clrBuffer = document.getElementById("cpValue").value;

        // Validate numeric value
        let re = /^([1-9][0-9]{0,4})$/                              
        let newHeight = e.target.value;
        // If the regex matches or the length is 0
        if (newHeight.match(re) || newHeight.length == 0) {
            // Set the state
            this.setState({
                height: newHeight,
                colour: clrBuffer
            });
            // If the canvas layer
            if (currentlySelectedLayer == 0) {
                defHeight = newHeight;
            }
        } else {
            //TODO notifications
        }
    }

    // Handle colour picker changes
    handleBGColourChange(e) {
        validColour = checkValidColour(e.target.value);
        // Update the state
        this.setState({
            colour: document.getElementById("cpValue").value
        });
    }

    // Handle stroke thickness changes
    handleStrokeTChange(e) {
        // Get colour from DOM because the state isnt updated when using the colour picker
        let clrBuffer = document.getElementById("cpValue").value;

        // Validate numeric value
        let re = /^([1-9][0-9]{0,4})$/                              
        let newStroke = e.target.value;
        // If the regex matches or the length is 0
        if (newStroke.match(re) || newStroke.length == 0 || newStroke == "0") {
            // Set the state
            this.setState({
                strokeT: newStroke,
                colour: clrBuffer
            });
            // If the canvas layer
            if (currentlySelectedLayer == 0) {
                st = newStroke;
            }
        } else {
            //TODO notifications
        }
    }

    // handle stroke colour changes 
    handleStrokeColourChange(e) {

    }

    render() {

        // Create the layer list output
        let layerJSX = new Array();
        for (let i = layers.length - 1; i >= 0; i--) {
            // TODO add a nice little svg icon showing the shape
            console.log(i);
            layerJSX.push(
                <div className="layer-list-object" key={i}>{layers[i].title}</div>
            );
            console.log("i: " + i + "; li: " + layers[i].title);

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

// ========== JAVASCRIPT CLASSES ==========
class Item {
    constructor(title, x, y, width, height, colour, type, layerNo) {
        this.title = title;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.colour = colour;
        this.type = type;
        this.layerNo = layerNo;
    }

    getJSX() {
        switch(this.type) {
            case "rect":
                return <rect key={this.layerNo} x={cx + (this.x * scale)} y={cy + (this.y * scale)} width={this.width * scale} height={this.height * scale} fill={this.colour} />
                break;
        }
    }
}
