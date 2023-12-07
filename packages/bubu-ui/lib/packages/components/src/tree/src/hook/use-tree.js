'use strict';
const u = require('vue'),
  l = require('../utils.js'),
  p = require('./use-core.js'),
  q = require('./use-toggle.js'),
  L = require('./use-check.js'),
  h = require('./use-dragdrop.js'),
  C = require('./use-lazy-load.js');
function D(n, o, s) {
  const t = u.unref(n),
    e = u.ref(l.generateInnerTree(t)),
    r = p.useCore(e),
    c = [q.useToggle, L.useCheck],
    a = C.useLazyLoad(e, r, s),
    i = h.useDragdrop(o.dragdrop, e, r);
  return {
    ...c.reduce((d, g) => ({ ...d, ...g(e, r, s, a) }), {}),
    ...r,
    ...i,
    treeData: e
  };
}
module.exports = D;
