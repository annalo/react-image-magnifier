import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Magnifier from './Magnifier';

function getOffset(el) {
  let x = 0;
  let y = 0;
  while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
    x += el.offsetLeft - el.scrollLeft;
    y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }
  return { x, y };
}

const ImageMagnifier = React.createClass({
  propTypes: {
    size: PropTypes.number, // size of the magnifier window
    cursorOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }), // offset of the zoom bubble from the cursor
    src: PropTypes.string.isRequired, // URL of the image
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // size of the non-zoomed-in image
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // size of the non-zoomed-in image
    zoomImage: PropTypes.shape({
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
    }), // size of the zoomed-in image
    style: PropTypes.object,
  },

  portalElement: null,

  getDefaultProps() {
    return {
      size: 200,
      cursorOffset: { x: 0, y: 0 },
      height: "auto",
      width: "100%",
    };
  },

  getInitialState() {
    return {
      x: 0,
      y: 0,
      offsetX: -1,
      offsetY: -1
    };
  },

  componentDidMount() {
    document.addEventListener('mousemove', this.onMouseMove);
    if (!this.portalElement) {
      this.portalElement = document.createElement('div');
      document.body.appendChild(this.portalElement);
    }
    this.componentDidUpdate();
  },

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.body.removeChild(this.portalElement);
    this.portalElement = null;
  },

  onMouseMove(e) {
    const offset = getOffset(this.img);
    this.setState({
      x: e.clientX + (window.scrollX || window.pageXOffset),
      y: e.clientY + (window.scrollY || window.pageYOffset),
      offsetX: e.clientX - offset.x,
      offsetY: e.clientY - offset.y
    });
  },

  componentDidUpdate() {
    ReactDOM.render(
      <Magnifier
        cursorOffset={this.props.cursorOffset}
        offsetX={this.state.offsetX}
        offsetY={this.state.offsetY}
        size={this.props.size}
        smallImage={{
          height: this.img.clientHeight,
          width: this.img.clientWidth,
        }}
        src={this.props.src}
        x={this.state.x}
        y={this.state.y}
        zoomImage={this.props.zoomImage}
      />,
    this.portalElement);
  },

  render() {
    return (
      <img
        ref={(node) => this.img = node}
        src={this.props.src}
        style={
          Object.assign({
            height: this.props.height,
            width: this.props.width,
          }, this.props.style)
        }
      />
    );
  }
});

export default ImageMagnifier;
