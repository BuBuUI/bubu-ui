'use strict';
const l = require('vue'),
  h = require('./notification.vue.js'),
  a = 16;
let v = 1;
const m = {
    'top-left': [],
    'top-right': [],
    'bottom-left': [],
    'bottom-right': []
  },
  y = function (t = {}) {
    const d = document.body,
      n = document.createElement('div');
    (typeof t == 'string' || l.isVNode(t)) && (t = { message: t });
    const e = t.position || 'top-right';
    let o = t.offset || 0;
    m[e].forEach(({ vm: i }) => {
      var c;
      o += (((c = i.el) == null ? void 0 : c.offsetHeight) || 0) + a;
    }),
      (o += a);
    const r = `notification_${v++}`,
      p = t.onClose,
      f = {
        ...t,
        zIndex: 9999,
        offset: o,
        id: r,
        onClose: () => {
          x(r, e, p);
        }
      },
      s = l.createVNode(
        h,
        f,
        l.isVNode(f.message) ? { default: () => f.message } : null
      );
    return (
      (s.props.onDestroy = () => {
        l.render(null, n);
      }),
      l.render(s, n),
      m[e].push({ vm: s }),
      d.appendChild(n.firstElementChild),
      { close: () => (s.component.proxy.visible = !1) }
    );
  };
function x(t, d, n) {
  const e = m[d],
    o = e.findIndex(({ vm: i }) => {
      var c;
      return ((c = i.component) == null ? void 0 : c.props.id) === t;
    });
  if (o === -1) return;
  const { vm: r } = e[o];
  if (!r) return;
  n == null || n(r);
  const p = r.el.offsetHeight,
    f = d.split('-')[0];
  e.splice(o, 1);
  const s = e.length;
  if (!(s < 1))
    for (let i = o; i < s; i++) {
      const { el: c, component: u } = e[i].vm,
        g = parseInt(c.style[f], 10) - p - a;
      u.props.offset = g;
    }
}
module.exports = y;
