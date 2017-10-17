"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getImageSize(src) {
  var image = new Image();
  image.src = src;
  return {
    height: image.height,
    width: image.width
  };
}

var Magnifier = function (_React$Component) {
  _inherits(Magnifier, _React$Component);

  function Magnifier() {
    _classCallCheck(this, Magnifier);

    return _possibleConstructorReturn(this, (Magnifier.__proto__ || Object.getPrototypeOf(Magnifier)).apply(this, arguments));
  }

  _createClass(Magnifier, [{
    key: "render",
    value: function render() {
      var props = this.props;
      var halfSize = props.size / 2;
      var imageSize = props.zoomImage ? props.zoomImage : getImageSize(props.src);
      var magX = imageSize.width / props.smallImage.width;
      var magY = imageSize.height / props.smallImage.height;
      var bgX = -(props.offsetX * magX - halfSize);
      var bgY = -(props.offsetY * magY - halfSize);
      var isVisible = props.offsetY < props.smallImage.height && props.offsetX < props.smallImage.width && props.offsetY > 0 && props.offsetX > 0;
      return _react2.default.createElement(
        "div",
        {
          style: {
            position: "absolute",
            display: isVisible ? "block" : "none",
            top: props.y,
            left: props.x,
            width: props.size,
            height: props.size,
            marginLeft: -halfSize + props.cursorOffset.x,
            marginTop: -halfSize + props.cursorOffset.y,
            backgroundColor: "white",
            borderRadius: props.size,
            boxShadow: "1px 1px 6px rgba(0,0,0,0.3)"
          }
        },
        _react2.default.createElement("div", {
          style: {
            width: props.size,
            height: props.size,
            backgroundImage: "url(" + props.src + ")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: bgX + "px " + bgY + "px",
            borderRadius: props.size
          }
        })
      );
    }
  }]);

  return Magnifier;
}(_react2.default.Component);

Magnifier.propTypes = {
  size: _propTypes2.default.number.isRequired, // size of the magnifier window
  x: _propTypes2.default.number.isRequired, // x position on screen
  y: _propTypes2.default.number.isRequired, // y position on screen
  offsetX: _propTypes2.default.number.isRequired, // x position relative to the image
  offsetY: _propTypes2.default.number.isRequired, // y position relative to the image
  cursorOffset: _propTypes2.default.shape({
    x: _propTypes2.default.number.isRequired,
    y: _propTypes2.default.number.isRequired
  }).isRequired, // offset of the zoom bubble from the cursor
  src: _propTypes2.default.string.isRequired, // URL of the image
  smallImage: _propTypes2.default.shape({
    height: _propTypes2.default.number.isRequired,
    width: _propTypes2.default.number.isRequired
  }).isRequired, // size of the non-zoomed-in image
  zoomImage: _propTypes2.default.shape({
    height: _propTypes2.default.number.isRequired,
    width: _propTypes2.default.number.isRequired
  }) // size of the zoomed-in image
};

exports.default = Magnifier;
module.exports = exports["default"];