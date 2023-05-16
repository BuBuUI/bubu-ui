'use strict';
Object.defineProperties(exports, {
  __esModule: { value: !0 },
  [Symbol.toStringTag]: { value: 'Module' }
});
const D = require('vue'),
  I = {
    dropPrev: 'bu-tree--node--drop-prev',
    dropNext: 'bu-tree--node--drop-next',
    dropInner: 'bu-tree--node--drop-inner'
  };
function P(u, d, { getChildren: f, getParent: h }) {
  const t = D.reactive({
      dropType: void 0,
      draggingNode: null,
      draggingTreeNode: null
    }),
    O = D.computed(() => d.value.reduce((e, r) => ({ ...e, [r.id]: r }), {})),
    g = (e) => {
      e == null || e.classList.remove(...Object.values(I));
    },
    T = () => {
      (t.dropType = void 0),
        (t.draggingNode = null),
        (t.draggingTreeNode = null);
    },
    x = (e, r) => {
      var n;
      const o = (n = O.value[e]) == null ? void 0 : n.parentId;
      return o === r ? !0 : o !== void 0 ? x(o, r) : !1;
    };
  function y(e, r) {
    const o = d.value.find((n) => n.id === e);
    if (o) {
      let n;
      const i = f(o),
        s = h(o);
      if (t.dropType === 'dropInner') {
        n = { ...o, parentId: r.id, level: r.level + 1 };
        const a = d.value.indexOf(r);
        d.value.splice(a + 1, 0, n), (r.isLeaf = void 0);
        const c = d.value.indexOf(o);
        d.value.splice(c, 1);
      } else if (t.dropType === 'dropNext') {
        n = { ...o, parentId: r.parentId, level: r.level };
        const a = d.value.indexOf(r),
          c = f(r, !0).length;
        d.value.splice(a + c + 1, 0, n);
        const l = d.value.indexOf(o);
        d.value.splice(l, 1);
      } else if (t.dropType === 'dropPrev') {
        n = { ...o, parentId: r.parentId, level: r.level };
        const a = d.value.indexOf(r);
        d.value.splice(a, 0, n);
        const c = d.value.indexOf(o);
        d.value.splice(c, 1);
      }
      (t.dropType = 'dropInner'),
        i.forEach((a) => y(a.id, n)),
        s && f(s).length === 0 && (s.isLeaf = !0);
    }
  }
  return {
    onDragstart: (e, r) => {
      var o;
      e.stopPropagation(),
        (t.draggingNode = e.target),
        (t.draggingTreeNode = r),
        (o = e.dataTransfer) == null || o.setData('dragNodeId', r.id);
    },
    onDrop: (e, r) => {
      var n;
      if (
        (e.preventDefault(),
        e.stopPropagation(),
        g(e.currentTarget),
        !t.draggingNode || !u)
      )
        return;
      const o = (n = e.dataTransfer) == null ? void 0 : n.getData('dragNodeId');
      if (o) {
        const i = x(r.id, o);
        if (o === r.id || i) return;
        t.dropType && y(o, r);
      }
      T();
    },
    onDragover: (e) => {
      if ((e.preventDefault(), e.stopPropagation(), !!t.draggingNode && u)) {
        if ((e.dataTransfer && (e.dataTransfer.dropEffect = 'move'), !d))
          return;
        let r = {};
        typeof u == 'object' ? (r = u) : u === !0 && (r = { dropInner: !0 });
        const { dropPrev: o, dropNext: n, dropInner: i } = r;
        let s;
        const a = o ? (i ? 0.25 : n ? 0.45 : 1) : -1,
          c = n ? (i ? 0.75 : o ? 0.55 : 0) : 1,
          l = e.currentTarget,
          p = l == null ? void 0 : l.getBoundingClientRect(),
          N = e.clientY - ((p == null ? void 0 : p.top) || 0);
        if (
          (N < ((p == null ? void 0 : p.height) || 0) * a
            ? (s = 'dropPrev')
            : N > ((p == null ? void 0 : p.height) || 0) * c
            ? (s = 'dropNext')
            : i
            ? (s = 'dropInner')
            : (s = void 0),
          s)
        ) {
          const v = l == null ? void 0 : l.classList;
          v && (v.contains(I[s]) || (g(l), v.add(I[s])));
        } else g(l);
        t.dropType = s;
      }
    },
    onDragleave: (e) => {
      e.stopPropagation(), t.draggingNode && g(e.currentTarget);
    },
    onDragend: (e) => {
      e.preventDefault(), e.stopPropagation(), T();
    }
  };
}
exports.useDragdrop = P;
