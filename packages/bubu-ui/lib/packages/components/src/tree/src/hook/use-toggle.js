'use strict';
Object.defineProperties(exports, {
  __esModule: { value: !0 },
  [Symbol.toStringTag]: { value: 'Module' }
});
function l(o, g, i, d) {
  const { lazyLoadNodes: t } = d;
  return {
    toggleNode: (n) => {
      const e = o.value.find((u) => u.id === n.id);
      e && ((e.expanded = !e.expanded), e.expanded && t(e));
    }
  };
}
exports.useToggle = l;
