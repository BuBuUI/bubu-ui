'use strict';
Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const v = require('vue'),
  h = require('../utils.js');
function y(l, { getNode: o, getIndex: a, getChildren: s }, { emit: r }) {
  const d = (n) => {
      const e = o(n);
      e &&
        e.isLeaf === !1 &&
        !e.childNodeCount &&
        ((e.loading = !0), r('lazy-load', n, i));
    },
    i = (n) => {
      const e = o(n.node);
      if (e) {
        e.loading = !1;
        const t = v.ref(h.generateInnerTree(n.treeItems, e.level));
        c(e, t), u(e, t);
        const f = s(e);
        e.childNodeCount = f.length;
      }
    },
    c = (n, e) => {
      e.value.forEach((t) => {
        t.level - 1 === n.level && !t.parentId && (t.parentId = n.id);
      });
    },
    u = (n, e) => {
      const t = a(n);
      t && l.value.splice(t + 1, 0, ...e.value);
    };
  return { lazyLoadNodes: d };
}
exports.useLazyLoad = y;
