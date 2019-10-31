'use strict'
var _resizeObserverPolyfill = require('resize-observer-polyfill');
var _resizeObserverPolyfill2 = _interopRequireDefault(_resizeObserverPolyfill);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var isServer = typeof window === 'undefined';

var resizeHandler = function resizeHandler(entries) {
  var _iterator = entries, _isArray = Array.isArray(_iterator);
  _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();
  for(var _i = 0; _i < entries.length;) {
    var _ref;
    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var entry = _ref;

    var listeners = entry.target.__resizeListeners__ || [];
    if (listeners.length) {
      listeners.forEach(function (fn) {
        fn();
      });
    }
  }
};
var resize = {
  __esModule : true,
  removeEventListener: function removeResizeListener(element, fn) {
    if (!element || !element.__resizeListeners__) return;
    element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
    if (!element.__resizeListeners__.length) {
      element.__ro__.disconnect();
    }
  },
  addResizeListener: function(element, fn) {
    if (isServer) return;
    if (!element.__resizeListeners__) {
      element.__resizeListeners__ = [];
      element.__ro__ = new _resizeObserverPolyfill2.default(resizeHandler);
      element.__ro__.observe(element);
    }
    element.__resizeListeners__.push(fn);
  },
};


// exports.removeEventListener = resize.removeEventListener;
// exports.addResizeListener = resize.addResizeListener
export function removeResizeListener(element, fn) {
  return resize.removeEventListener(element, fn)
}
export function addResizeListener(element, fn) {
  return resize.addResizeListener(element, fn)
}

