'use strict';
Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const t = (o) => o.stopPropagation();
function e(o, a) {
  (typeof o.cancelable != 'boolean' || o.cancelable) && o.preventDefault(),
    a && t(o);
}
exports.preventDefault = e;
exports.stopPropagation = t;
