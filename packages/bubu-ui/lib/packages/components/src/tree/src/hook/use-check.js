'use strict';
Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
function h(d, { getChildren: t }) {
  const i = (c) => {
      (c.checked = !c.checked),
        t(c).forEach((e) => {
          e.checked = c.checked;
        }),
        s(c);
    },
    s = (c) => {
      const e = d.value.find((n) => n.id === c.parentId);
      if (!e) return;
      const l = t(e, !1),
        o = l.filter((n) => n.checked);
      o.length === l.length
        ? ((e.checked = !0), (e.indeterminate = !1))
        : ((e.checked = !1), (e.indeterminate = o.length !== 0)),
        console.log('treeNode', e),
        s(e);
    };
  return { toggleCheckNode: i };
}
exports.useCheck = h;
