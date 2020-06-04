"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports["default"] = withTransitions;var _react = _interopRequireDefault(require("react"));
var _semanticUiReact = require("semantic-ui-react");
var _propTypes = _interopRequireDefault(require("prop-types"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };}function _typeof(obj) {if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {_typeof = function _typeof(obj) {return typeof obj;};} else {_typeof = function _typeof(obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};}return _typeof(obj);}function _extends() {_extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};return _extends.apply(this, arguments);}function _objectWithoutProperties(source, excluded) {if (source == null) return {};var target = _objectWithoutPropertiesLoose(source, excluded);var key, i;if (Object.getOwnPropertySymbols) {var sourceSymbolKeys = Object.getOwnPropertySymbols(source);for (i = 0; i < sourceSymbolKeys.length; i++) {key = sourceSymbolKeys[i];if (excluded.indexOf(key) >= 0) continue;if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;target[key] = source[key];}}return target;}function _objectWithoutPropertiesLoose(source, excluded) {if (source == null) return {};var target = {};var sourceKeys = Object.keys(source);var key, i;for (i = 0; i < sourceKeys.length; i++) {key = sourceKeys[i];if (excluded.indexOf(key) >= 0) continue;target[key] = source[key];}return target;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _possibleConstructorReturn(self, call) {if (call && (_typeof(call) === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

var OPEN_TIME = 500;
var CLOSE_TIME = 1000;

function withTransitions(Component) {var
  SemanticTransition = /*#__PURE__*/function (_React$Component) {_inherits(SemanticTransition, _React$Component);function SemanticTransition() {var _getPrototypeOf2;var _this;_classCallCheck(this, SemanticTransition);for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}_this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SemanticTransition)).call.apply(_getPrototypeOf2, [this].concat(args)));_defineProperty(_assertThisInitialized(_this), "state",












      {
        visible: false,
        time: OPEN_TIME,
        animation: _this.props.openAnimation });_defineProperty(_assertThisInitialized(_this), "onClose",












      function () {
        // trigger new animation when toast is dismissed
        _this.setState(
        function (prevState) {return {
            visible: !prevState.visible,
            animation: _this.props.closeAnimation,
            time: CLOSE_TIME };},

        function () {
          setTimeout(function () {
            if (_this.timerId) {
              clearTimeout(_this.timerId);
            }

            _this.props.onClose(_this.props.toastId);
          }, CLOSE_TIME);
        });

      });return _this;}_createClass(SemanticTransition, [{ key: "componentDidMount", value: function componentDidMount() {// schedule auto closing of toast
        if (this.props.time) {this.timerId = setTimeout(this.onClose, this.props.time);} // start animation as soon as toast is mounted in the dom
        this.setState({ visible: true });} }, { key: "render", value: function render() {var _this$props =
        this.props,toastId = _this$props.toastId,openAnimation = _this$props.openAnimation,closeAnimation = _this$props.closeAnimation,timeProp = _this$props.time,onClose = _this$props.onClose,props = _objectWithoutProperties(_this$props, ["toastId", "openAnimation", "closeAnimation", "time", "onClose"]);var _this$state =
        this.state,time = _this$state.time,visible = _this$state.visible,animation = _this$state.animation;
        var styles = {
          marginBottom: '1em' };


        return (
          _react["default"].createElement(_semanticUiReact.Transition, { animation: animation, duration: time, visible: visible },
          _react["default"].createElement("div", { style: styles, role: "presentation" },
          _react["default"].createElement(Component, _extends({}, props, { onClose: this.onClose })))));



      } }]);return SemanticTransition;}(_react["default"].Component);_defineProperty(SemanticTransition, "propTypes", { toastId: _propTypes["default"].number.isRequired, onClose: _propTypes["default"].func.isRequired, openAnimation: _propTypes["default"].string.isRequired, closeAnimation: _propTypes["default"].string.isRequired, time: _propTypes["default"].number });_defineProperty(SemanticTransition, "defaultProps", { time: 2000 });


  return SemanticTransition;
}