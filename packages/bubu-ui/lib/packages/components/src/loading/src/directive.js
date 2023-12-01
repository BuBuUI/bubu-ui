'use strict';
Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const f = require('vue'),
  a = require('../../../../../node_modules/.pnpm/@vue_shared@3.3.9/node_modules/@vue/shared/dist/shared.esm-bundler.js'),
  v = require('./service.js'),
  d = (o, e) => {
    const t = e.instance,
      r = (s) => (a.isObject(e.value) ? e.value[s] : void 0),
      i = (s) => {
        const u = (a.isString(s) && (t == null ? void 0 : t[s])) || s;
        return u && f.ref(u);
      },
      c = (s) => i(o.getAttribute(`bu-loading-${a.hyphenate(s)}`)),
      n = r('fullscreen') ?? e.modifiers.fullscreen,
      l = {
        text: c('text'),
        spinner: c('spinner'),
        background: c('background'),
        customClass: c('customClass'),
        fullscreen: n,
        target: r('target') ?? (n ? void 0 : o),
        body: r('body') ?? e.modifiers.body,
        lock: r('lock') ?? e.modifiers.lock
      };
    o.BuLoading = { options: l, instance: v.Loading(l) };
  },
  g = {
    mounted(o, e) {
      console.log('binding', e), e.value && d(o, e);
    },
    updated(o, e) {
      const t = o.BuLoading;
      e.oldValue !== e.value &&
        (e.value && !e.oldValue ? d(o, e) : t == null || t.instance.close());
    },
    unmounted(o) {
      var e;
      (e = o.BuLoading) == null || e.instance.close();
    }
  };
exports.vLoading = g;
