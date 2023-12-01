'use strict';
Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const c = require('vue');
function i(u) {
  const s = c.computed(() => {
      let e = [];
      const t = [];
      for (const d of u.value)
        e.map((r) => r.id).includes(d.id) ||
          (d.expanded !== !0 && (e = n(d)), t.push(d));
      return t;
    }),
    n = (e, t = !0) => {
      const d = [],
        r = u.value.findIndex((l) => l.id === e.id);
      for (let l = r + 1; l < u.value.length && e.level < u.value[l].level; l++)
        (t || e.level === u.value[l].level - 1) && d.push(u.value[l]);
      return d;
    },
    o = (e, t = []) => {
      const d = n(e, !1);
      return (
        t.push(...d),
        d.forEach((r) => {
          r.expanded && o(r, t);
        }),
        t
      );
    };
  return {
    expendedTree: s,
    getChildren: n,
    getParent: (e) => u.value.find((t) => t.id === e.parentId),
    getChildrenExpanded: o,
    getIndex: (e) => (e ? u.value.findIndex((t) => t.id === e.id) : -1),
    getNode: (e) => u.value.find((t) => t.id === e.id)
  };
}
exports.useCore = i;
