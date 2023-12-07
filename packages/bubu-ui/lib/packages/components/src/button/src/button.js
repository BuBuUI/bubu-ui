'use strict';
const e = require('vue'),
  C = require('./button-type.js'),
  g = require('../../icon/index.js'),
  B = e.defineComponent({
    name: 'BuButton',
    props: C.buttonProps,
    emits: { click: (t) => t instanceof MouseEvent },
    setup(t, { slots: o, attrs: u, emit: c }) {
      const {
          type: s,
          size: l,
          block: i,
          disabled: d,
          shape: a,
          loading: r
        } = e.toRefs(t),
        n = 'bu-btn',
        v = a.value ? `${n}--${a.value}` : '',
        b = l.value ? `${n}--${l.value}` : '',
        p = e.computed(() => [
          n,
          `${n}--${s.value}`,
          `${b}`,
          `${v}`,
          { [`${n}--block`]: i.value }
        ]),
        f = o.default ? o.default() : '按钮',
        $ = s.value === 'link' ? 'a' : 'button',
        k = (m) => {
          t.loading || t.disabled || c('click', m);
        };
      return () =>
        e.createVNode(
          $,
          e.mergeProps({ class: p.value, disabled: d.value, onClick: k }, u),
          {
            default: () => [
              r.value &&
                e.createVNode(
                  g.BuIcon,
                  { class: 'bu-load-loop', name: 'loading', size: '18' },
                  null
                ),
              f
            ]
          }
        );
    }
  });
module.exports = B;
