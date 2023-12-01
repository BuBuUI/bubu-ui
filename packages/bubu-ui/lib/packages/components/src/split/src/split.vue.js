'use strict';
Object.defineProperties(exports, {
  __esModule: { value: !0 },
  [Symbol.toStringTag]: { value: 'Module' }
});
const e = require('vue'),
  a = require('../../../../../node_modules/.pnpm/@vue_shared@3.3.9/node_modules/@vue/shared/dist/shared.esm-bundler.js'),
  u = require('@bubu-ui/utils'),
  N = { key: 0, class: 'bu-split--horizontal' },
  O = { key: 1, class: 'bu-split--vertical' },
  C = e.defineComponent({
    name: 'BuSplit',
    __name: 'split',
    props: {
      modelValue: { default: 0.5 },
      mode: { default: 'horizontal' },
      min: { default: '40px' },
      max: { default: '40px' }
    },
    emits: ['update:model-value', 'mousemove'],
    setup(E, { emit: _ }) {
      const l = E,
        h = _,
        r = e.ref(),
        s = e.ref(0),
        S = e.ref(0),
        c = e.ref(0),
        f = e.ref(0),
        p = e.ref(!1),
        i = e.ref(),
        m = e.computed(() =>
          l.mode === 'horizontal' ? 'offsetWidth' : 'offsetHeight'
        ),
        z = e.computed(() => 100 - s.value),
        d = e.computed(() => ({ 'bu-split-pane-moving': p.value }));
      e.watch(
        () => l.modelValue,
        () => {
          g();
        },
        { immediate: !0 }
      ),
        e.onMounted(() => {
          u.on(window, 'resize', g);
        }),
        e.onBeforeUnmount(() => {
          u.off(window, 'resize', g);
        });
      const v = (t, o) => parseFloat(String(t)) / o;
      function b(t) {
        (S.value = l.mode === 'horizontal' ? t.pageX : t.pageY),
          (i.value = l.modelValue),
          (p.value = !0),
          u.on(document, 'mousemove', M),
          u.on(document, 'mouseup', $);
      }
      function g() {
        e.nextTick(() => {
          (c.value = V('min')),
            (f.value = V('max')),
            (s.value =
              (a.isString(l.modelValue)
                ? v(l.modelValue, r.value[m.value])
                : l.modelValue) * 100);
        });
      }
      function V(t) {
        let o = r.value[m.value];
        return a.isString(l.modelValue)
          ? a.isString(l[t])
            ? l[t]
            : o * Number(l[t])
          : a.isString(l[t])
            ? v(l[t], o)
            : l[t];
      }
      function M(t) {
        const o = t;
        let w = (l.mode === 'horizontal' ? o.pageX : o.pageY) - S.value,
          x = r.value[m.value],
          n = a.isString(i.value)
            ? `${parseFloat(i.value) + w}px`
            : v((x * i.value + w).toString(), x),
          B = y(n);
        parseFloat(n) <= c.value && (n = k(n, c.value)),
          parseFloat(B) <= f.value && (n = y(k(B, f.value))),
          h('update:model-value', n),
          h('mousemove', t);
      }
      function $() {
        (p.value = !1),
          u.off(document, 'mousemove', M),
          u.off(document, 'mouseup', $);
      }
      function y(t) {
        let o = 0;
        return (
          a.isString(t)
            ? (o = `${r.value[m.value] - parseFloat(t)}px`)
            : (o = 1 - Number(t)),
          o
        );
      }
      function k(t, o) {
        return a.isString(t)
          ? `${Math.max(parseFloat(t), o)}px`
          : Math.max(t, o);
      }
      return (t, o) => (
        e.openBlock(),
        e.createElementBlock(
          'div',
          { class: 'bu-split', ref_key: 'outerWrapper', ref: r },
          [
            t.mode === 'horizontal'
              ? (e.openBlock(),
                e.createElementBlock('div', N, [
                  e.createElementVNode(
                    'div',
                    {
                      class: e.normalizeClass(['bu-split-left-pane', d.value]),
                      style: e.normalizeStyle({ right: `${z.value}%` })
                    },
                    [e.renderSlot(t.$slots, 'left')],
                    6
                  ),
                  e.createElementVNode(
                    'div',
                    {
                      class: 'bu-split-trigger',
                      onMousedown: b,
                      style: e.normalizeStyle({ left: `${s.value}%` })
                    },
                    null,
                    36
                  ),
                  e.createElementVNode(
                    'div',
                    {
                      class: e.normalizeClass(['bu-split-right-pane', d.value]),
                      style: e.normalizeStyle({ left: `${s.value}%` })
                    },
                    [e.renderSlot(t.$slots, 'right')],
                    6
                  )
                ]))
              : (e.openBlock(),
                e.createElementBlock('div', O, [
                  e.createElementVNode(
                    'div',
                    {
                      class: e.normalizeClass(['bu-split-top-pane', d.value]),
                      style: e.normalizeStyle({ bottom: `${z.value}%` })
                    },
                    [e.renderSlot(t.$slots, 'top')],
                    6
                  ),
                  e.createElementVNode(
                    'div',
                    {
                      class: 'bu-split-trigger bu-split-trigger--vertical',
                      onMousedown: b,
                      style: e.normalizeStyle({ top: `${s.value}%` })
                    },
                    null,
                    36
                  ),
                  e.createElementVNode(
                    'div',
                    {
                      class: e.normalizeClass([
                        'bu-split-bottom-pane',
                        d.value
                      ]),
                      style: e.normalizeStyle({ top: `${s.value}%` })
                    },
                    [e.renderSlot(t.$slots, 'bottom')],
                    6
                  )
                ]))
          ],
          512
        )
      );
    }
  });
exports.default = C;
