'use strict';
Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const e = require('../tree-type.js'),
  r = {
    ...e.treeProps,
    treeNode: { type: Object, required: !0 },
    onClick: { type: [Function, Array] }
  };
exports.treeNodeProps = r;
