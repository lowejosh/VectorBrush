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
            // Update the scaling values
            updateScaling();
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
                midX: vCanv.offsetWidth/2 - cWidth/2,
                midY: vCanv.offsetHeight/2 - cHeight/2
            });

            // === OTHER LAYER STUFF ===
            

            // TODO


        }, 50);
    }
  
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
        // Working area
        <svg width="100%" height="100%">

            <rect x={this.state.midX} y={this.state.midY} width={this.state.w} height={this.state.h} fill={this.state.colour} />
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
            height: props.item.height
        };
        this.handleWidthChange = this.handleWidthChange.bind(this);
        this.handleHeightChange = this.handleHeightChange.bind(this);
        this.handleColourChange = this.handleColourChange.bind(this);
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
    handleColourChange(e) {
        console.log("here");
        validColour = checkValidColour(e.target.value);
        // Update the state
        this.setState({
            colour: document.getElementById("cpValue").value
        });
    }

    render() {
        return (<div>
        <h5 className="properties-title">{this.state.title}</h5>
        <div id="cp" className="input-group">
            <input type="text" id="cpValue" className="form-control input-lg color-picker" onChange={this.handleColourChange} onInput={this.handleColourChange} value={this.state.colour} spellCheck="false" />
            <span className="input-group-append">
                <span className="input-group-text colorpicker-input-addon color-picker"><i></i></span>
            </span>
        </div>
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
    </div>);
    }
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
