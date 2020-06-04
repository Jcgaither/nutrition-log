"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports["default"] = void 0;var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _semanticUiReact = require("semantic-ui-react");
var _withTransition = _interopRequireDefault(require("./with-transition"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };}function _extends() {_extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};return _extends.apply(this, arguments);}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _objectWithoutProperties(source, excluded) {if (source == null) return {};var target = _objectWithoutPropertiesLoose(source, excluded);var key, i;if (Object.getOwnPropertySymbols) {var sourceSymbolKeys = Object.getOwnPropertySymbols(source);for (i = 0; i < sourceSymbolKeys.length; i++) {key = sourceSymbolKeys[i];if (excluded.indexOf(key) >= 0) continue;if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;target[key] = source[key];}}return target;}function _objectWithoutPropertiesLoose(source, excluded) {if (source == null) return {};var target = {};var sourceKeys = Object.keys(source);var key, i;for (i = 0; i < sourceKeys.length; i++) {key = sourceKeys[i];if (excluded.indexOf(key) >= 0) continue;target[key] = source[key];}return target;}

var icons = {
  info: 'announcement',
  success: 'checkmark',
  error: 'remove',
  warning: 'warning circle' };


function SemanticToast(_ref) {var type = _ref.type,title = _ref.title,description = _ref.description,onClose = _ref.onClose,onDismiss = _ref.onDismiss,icon = _ref.icon,props = _objectWithoutProperties(_ref, ["type", "title", "description", "onClose", "onDismiss", "icon"]);
  var computedIcon = icon || icons[type];

  var onDispel = function onDispel(e) {
    e.stopPropagation();
    onDismiss();
    onClose();
  };

  return (
    _react["default"].createElement(_semanticUiReact.Message, _extends({}, _defineProperty({},
    type, true), {
      onDismiss: onDispel,
      header: title,
      content: description,
      icon: computedIcon,
      floating: true },
    props)));


}

SemanticToast.propTypes = {
  type: _propTypes["default"].oneOf(['info', 'success', 'error', 'warning']).isRequired,
  title: _propTypes["default"].string.isRequired,
  description: _propTypes["default"].oneOfType([
  _propTypes["default"].arrayOf(_propTypes["default"].string),
  _propTypes["default"].string,
  _propTypes["default"].node]).
  isRequired,
  icon: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].string]),
  onDismiss: _propTypes["default"].func,
  onClose: _propTypes["default"].func };


SemanticToast.defaultProps = {
  onDismiss: function onDismiss() {return undefined;},
  onClose: function onClose() {return undefined;},
  icon: undefined };var _default =


(0, _withTransition["default"])(SemanticToast);exports["default"] = _default;