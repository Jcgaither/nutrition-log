"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports["default"] = void 0;function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var Store = /*#__PURE__*/function () {function Store() {_classCallCheck(this, Store);_defineProperty(this, "subscribers",
    []);_defineProperty(this, "items",

    []);}_createClass(Store, [{ key: "subscribe", value: function subscribe(

    cb) {
      this.subscribers.push(cb);
    } }, { key: "unsubscribe", value: function unsubscribe(

    cb) {
      this.subscribers = this.subscribers.filter(function (subscriber) {return (
          subscriber !== cb ? subscriber : undefined);});

    } }, { key: "notify", value: function notify()

    {
      this.subscribers.forEach(function (subscriber) {return subscriber();});
    } }, { key: "add", value: function add(

    item) {
      this.items.push(item);
      this.notify();
    } }, { key: "remove", value: function remove(

    item) {
      this.items = this.items.filter(function (storeItem) {return storeItem !== item ? storeItem : undefined;});
      this.notify();
    } }, { key: "data", get: function get()

    {
      return this.items;
    } }]);return Store;}();var _default =


Store;exports["default"] = _default;