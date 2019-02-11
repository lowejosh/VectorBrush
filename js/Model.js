// ========== REACT MODELS ==========
// CANVAS MODEL 
class VectorCanvas extends React.Component {
    constructor(props) {
        updateScaling();
        super(props);
        this.state = {
            colour: document.getElementById("cpValue").value,
            w: cWidth,
            h: cHeight,
            midX: vCanv.offsetWidth/2 - cWidth/2,
            midY: vCanv.offsetHeight/2 - cHeight/2
        };
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            updateScaling();
            this.setState({
                colour: document.getElementById("cpValue").value,
                w: cWidth,
                h: cHeight,
                midX: vCanv.offsetWidth/2 - cWidth/2,
                midY: vCanv.offsetHeight/2 - cHeight/2
            });
        }, 50);
    }
  
    componentWillUnmount() {
        clearInterval(this.interval);
    }


    render() {
        console.log("working");
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
        this.setState({
            width: e.target.value
        });
    }

    handleHeightChange(e) {
        this.setState({
            height: e.target.value
        });
    }

    // Handle colour picker changes
    handleColourChange(e) {
        // If valid hex or rgb/a 
        var rgbRegex = /(rgb\(((([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s*){2}([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\)))|(rgba\(((([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s*){3}(1|1.0*|0?.\d)\)))/
        var hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
        if (e.target.value.match(rgbRegex) || e.target.value.match(hexRegex)) {
            // Set as valid colour
            validColour = true;
        } else {
            // Set as invalid colour
            validColour = false;
        }
        // Update the state
        this.setState({
            colour: e.target.value
        });
    }

    render() {
        return (<div>
        <h5 className="properties-title">{this.state.title}</h5>
        <div id="cp" className="input-group">
            <input type="text" id="cpValue" className="form-control input-lg color-picker" onChange={this.handleColourChange} value={this.state.colour} spellCheck="false" />
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
