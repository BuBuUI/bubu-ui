'use strict';
const s = require('./index.vue2.js'),
  t = require('vue');
require('./index.vue3.js');
const u = require('../../../../../../../_virtual/_plugin-vue_export-helper.js');
function n(e, r, i, d, a, l) {
  return (
    t.openBlock(),
    t.createElementBlock(
      'div',
      t.mergeProps({ class: 'ysj-swipe-wrapper' }, e.$attrs),
      [
        t.createElementVNode(
          'div',
          {
            class: 'ysj-swipe__track',
            ref: 'trackDom',
            onTouchstart:
              r[0] || (r[0] = (...o) => e.touchstart && e.touchstart(...o)),
            onTouchmove:
              r[1] || (r[1] = (...o) => e.touchmove && e.touchmove(...o)),
            onTouchend:
              r[2] || (r[2] = (...o) => e.touchend && e.touchend(...o))
          },
          [t.renderSlot(e.$slots, 'default', {}, void 0, !0)],
          544
        )
      ],
      16
    )
  );
}
const p = u(s, [
  ['render', n],
  ['__scopeId', 'data-v-e0926ff4']
]);
module.exports = p;
