'use strict';
Object.defineProperties(exports, {
  __esModule: { value: !0 },
  [Symbol.toStringTag]: { value: 'Module' }
});
const u = require('./src/grid.js'),
  e = require('./src/grid-item.vue.js'),
  t = require('@bubu-ui/utils'),
  r = t.withInstall(u, { GridItem: e }),
  i = t.withNoopInstall(e);
exports.BuGrid = r;
exports.BuGridItem = i;
exports.default = r;
