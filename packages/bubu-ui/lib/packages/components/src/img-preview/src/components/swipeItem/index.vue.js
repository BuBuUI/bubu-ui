'use strict';
const t = require('./index.vue2.js'),
  e = require('vue');
require('./index.vue3.js');
const s = require('../../../../../../../_virtual/_plugin-vue_export-helper.js');
function o(r, i, p, u, c, _) {
  return (
    e.openBlock(),
    e.createElementBlock(
      'div',
      e.mergeProps({ class: 'ysj-swipe-item' }, r.$attrs),
      [e.renderSlot(r.$slots, 'default', {}, void 0, !0)],
      16
    )
  );
}
const n = s(t, [
  ['render', o],
  ['__scopeId', 'data-v-1f1e0609']
]);
module.exports = n;
