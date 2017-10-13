'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _propTypes = require('prop-types');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getImageSize(src) {
  var image = new Image();
  image.src = src;
  return {
    height: image.height,
    width: image.width
  };
}

var Magnifier = _react2.default.createClass({
  displayName: 'Magnifier',

  propTypes: {
    size: _propTypes.number.isRequired, // size of the magnifier window
    x: _propTypes.number.isRequired, // x position on screen
    y: _propTypes.number.isRequired, // y position on screen
    offsetX: _propTypes.number.isRequired, // x position relative to the image
    offsetY: _propTypes.number.isRequired, // y position relative to the image
    cursorOffset: _propTypes.shape({
      x: _propTypes.number.isRequired,
      y: _propTypes.number.isRequired
    }).isRequired, // offset of the zoom bubble from the cursor
    src: _propTypes.string.isRequired, // URL of the image
    smallImage: _propTypes.shape({
      height: _propTypes.number.isRequired,
      width: _propTypes.number.isRequired
    }).isRequired, // size of the non-zoomed-in image
    zoomImage: _propTypes.shape({
      height: _propTypes.number.isRequired,
      width: _propTypes.number.isRequired
    }) },

  render: function render() {
    var props = this.props;
    var halfSize = props.size / 2;
    var imageSize = props.zoomImage ? props.zoomImage : getImageSize(props.src);
    var magX = imageSize.width / props.smallImage.width;
    var magY = imageSize.height / props.smallImage.height;
    var bgX = -(props.offsetX * magX - halfSize);
    var bgY = -(props.offsetY * magY - halfSize);
    var isVisible = props.offsetY < props.smallImage.height && props.offsetX < props.smallImage.width && props.offsetY > 0 && props.offsetX > 0;
    return _react2.default.createElement(
      'div',
      { style: {
          position: 'absolute',
          display: isVisible ? 'block' : 'none',
          top: props.y,
          left: props.x,
          width: props.size,
          height: props.size,
          marginLeft: -halfSize + props.cursorOffset.x,
          marginTop: -halfSize + props.cursorOffset.y,
          backgroundColor: 'white',
          borderRadius: props.size,
          boxShadow: '1px 1px 6px rgba(0,0,0,0.3)'
        } },
      _react2.default.createElement('div', { style: {
          width: props.size,
          height: props.size,
          backgroundImage: 'url(' + props.src + ')',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: bgX + 'px ' + bgY + 'px',
          borderRadius: props.size
        } })
    );
  }
});

exports.default = Magnifier;
module.exports = exports['default'];
