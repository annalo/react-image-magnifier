"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Magnifier = require("./Magnifier");

var _Magnifier2 = _interopRequireDefault(_Magnifier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getOffset(el) {
  var x = 0;
  var y = 0;
  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    x += el.offsetLeft - el.scrollLeft;
    y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }
  return { x: x, y: y };
}

var ImageMagnifier = function (_React$Component) {
  _inherits(ImageMagnifier, _React$Component);

  function ImageMagnifier() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ImageMagnifier);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ImageMagnifier.__proto__ || Object.getPrototypeOf(ImageMagnifier)).call.apply(_ref, [this].concat(args))), _this), _this.onMouseMove = function (e) {
      var offset = getOffset(_this.img);
      _this.setState({
        x: e.x + window.scrollX,
        y: e.y + window.scrollY,
        offsetX: e.x - offset.x,
        offsetY: e.y - offset.y
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ImageMagnifier, [{
    key: "getDefaultProps",
    value: function getDefaultProps() {
      return {
        size: 200,
        cursorOffset: { x: 0, y: 0 },
        height: "auto",
        width: "100%"
      };
    }
  }, {
    key: "getInitialState",
    value: function getInitialState() {
      return {
        x: 0,
        y: 0,
        offsetX: -1,
        offsetY: -1
      };
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener("mousemove", this.onMouseMove);
      if (!this.portalElement) {
        this.portalElement = document.createElement("div");
        document.body.appendChild(this.portalElement);
      }
      this.componentDidUpdate();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener("mousemove", this.onMouseMove);
      document.body.removeChild(this.portalElement);
      this.portalElement = null;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      _reactDom2.default.render(_react2.default.createElement(_Magnifier2.default, {
        cursorOffset: this.props.cursorOffset,
        offsetX: this.state.offsetX,
        offsetY: this.state.offsetY,
        size: this.props.size,
        smallImage: {
          height: this.img.clientHeight,
          width: this.img.clientWidth
        },
        src: this.props.src,
        x: this.state.x,
        y: this.state.y,
        zoomImage: this.props.zoomImage
      }), this.portalElement);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement("img", {
        ref: function ref(node) {
          return _this2.img = node;
        },
        src: this.props.src,
        style: Object.assign({
          height: this.props.height,
          width: this.props.width
        }, this.props.style)
      });
    }
  }]);

  return ImageMagnifier;
}(_react2.default.Component);

ImageMagnifier.propTypes = {
  size: _propTypes2.default.number, // size of the magnifier window
  cursorOffset: _propTypes2.default.shape({
    x: _propTypes2.default.number.isRequired,
    y: _propTypes2.default.number.isRequired
  }), // offset of the zoom bubble from the cursor
  src: _propTypes2.default.string.isRequired, // URL of the image
  height: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]), // size of the non-zoomed-in image
  width: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]), // size of the non-zoomed-in image
  zoomImage: _propTypes2.default.shape({
    height: _propTypes2.default.number.isRequired,
    width: _propTypes2.default.number.isRequired
  }), // size of the zoomed-in image
  style: _propTypes2.default.object
};

exports.default = ImageMagnifier;
module.exports = exports["default"];