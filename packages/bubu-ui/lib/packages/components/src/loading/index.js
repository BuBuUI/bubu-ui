'use strict';
Object.defineProperties(exports, {
  __esModule: { value: !0 },
  [Symbol.toStringTag]: { value: 'Module' }
});
const r = require('./src/directive.js'),
  i = require('./src/service.js');
require('./style/loading.css');
const o = {
  install(e) {
    e.directive('loading', r.vLoading),
      (e.config.globalProperties.$loading = i.Loading);
  },
  service: i.Loading
};
exports.BuLoading = o;
exports.default = o;
