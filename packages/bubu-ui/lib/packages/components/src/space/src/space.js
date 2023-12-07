'use strict';
const e = require('vue'),
  d = require('../../../../../node_modules/.pnpm/@vue_shared@3.3.9/node_modules/@vue/shared/dist/shared.esm-bundler.js'),
  v = require('./space.type.js'),
  m = e.defineComponent({
    name: 'BuSpace',
    props: v.sapceProps,
    setup(u, { slots: o }) {
      const { direction: t, wrap: c, alignment: i, size: r } = e.toRefs(u),
        s = 'bu-space',
        p = e.computed(() => [s, `${s}--${t.value}`]),
        l = e.computed(() =>
          r.value
            ? typeof r.value == 'string'
              ? r.value
              : r.value + 'px'
            : '8px'
        );
      return () => {
        const a = e.renderSlot(o, 'default', { key: 0 }, () => []);
        return (a.children ?? []).length === 0
          ? null
          : e.createVNode(
              'div',
              {
                class: p.value,
                style: {
                  'flex-wrap': c.value ? 'wrap' : 'nowrap',
                  'align-items': i.value
                }
              },
              [
                d.isArray(a.children) &&
                  a.children.map((n) =>
                    n.type === e.Comment
                      ? e.h(n)
                      : e.h(
                          'div',
                          {
                            class: 'bu-space--item',
                            style: {
                              'margin-bottom':
                                t.value === 'horizontal' ? 0 : l.value,
                              'margin-right':
                                t.value === 'horizontal' ? l.value : 0
                            }
                          },
                          n
                        )
                  )
              ]
            );
      };
    }
  });
module.exports = m;
