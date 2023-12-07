'use strict';
const l = require('vue'),
  E = ['disabled', 'placeholder', 'onKeyup'],
  M = l.defineComponent({
    name: 'BuRichTextArea',
    __name: 'richTextArea',
    props: {
      disabled: { type: Boolean, default: !1 },
      placeholder: { default: '' },
      copy: { type: Boolean, default: !1 },
      modelValue: {},
      maxImgWidth: { default: '240px' },
      maxImgHeight: { default: '240px' },
      maxImgSize: { default: 4 },
      imgPrevie: { type: Boolean, default: !1 }
    },
    emits: ['change', 'update:modelValue', 'imgUpload', 'keyup'],
    setup(v, { expose: g, emit: f }) {
      const r = f,
        o = v,
        i = l.ref(),
        t = l.ref(),
        d = l.ref(!1);
      l.onMounted(() => {
        l.watchEffect(() => {
          t.value &&
            (o.disabled
              ? t.value.setAttribute('contenteditable', 'false')
              : (t.value.setAttribute('contenteditable', 'true'),
                t.value.focus()));
        }),
          l.nextTick(() => {
            t.value &&
              ((t.value.innerHTML = o.modelValue),
              x(),
              y(),
              o.copy && o.imgPrevie && b(),
              t.value.addEventListener('compositionstart', () => {
                d.value = !0;
              }),
              t.value.addEventListener('compositionend', () => {
                d.value = !1;
              }));
          });
      });
      function h(e) {
        const a = () => {
          console.log('1211'),
            setTimeout(() => {
              var n;
              r(
                'update:modelValue',
                (n = t.value) == null ? void 0 : n.innerHTML
              ),
                r('change'),
                r('keyup', e);
            }, 10);
        };
        d.value ? e.code === 'Space' && a() : a();
      }
      function x() {
        var e = window.getSelection(),
          a = document.createRange();
        a.selectNodeContents(t.value),
          a.collapse(!1),
          e && e.removeAllRanges(),
          e && e.addRange(a);
      }
      function y() {
        var e;
        (e = t.value) == null ||
          e.addEventListener('paste', async (a) => {
            var c, p;
            console.log('props.copy', o.copy),
              a.preventDefault(),
              a.stopPropagation();
            let n = ((c = a.clipboardData) == null ? void 0 : c.items) || [];
            for (let m = 0; m < (n == null ? void 0 : n.length); m++) {
              const s = n[m];
              if (s.kind === 'string' && s.type === 'text/plain')
                s.getAsString(function (u) {
                  document.execCommand('insertHTML', !0, u);
                });
              else if (
                s.kind === 'file' &&
                s.type.indexOf('image') !== -1 &&
                o.copy
              ) {
                const u = s.getAsFile();
                if (u && u.size < o.maxImgSize * 1024 * 1024) {
                  const w = window.URL.createObjectURL(u);
                  document.execCommand(
                    'insertHTML',
                    !0,
                    `<img src=${w} style="max-width: ${o.maxImgWidth}; max-height: ${o.maxImgHeight};vertical-align: bottom"></img>`
                  ),
                    r(
                      'update:modelValue',
                      (p = t.value) == null ? void 0 : p.innerHTML
                    ),
                    r('imgUpload', u),
                    r('change');
                }
              }
            }
          });
      }
      function b() {
        var e;
        (e = t.value) == null ||
          e.addEventListener('dblclick', (a) => {
            const n = a.target;
            if ((console.log('target', n), n && n.tagName === 'IMG')) {
              if (i.value)
                (i.value.style.display = 'block'),
                  i.value.classList.add('bu-rich-img-wrapper-active'),
                  (i.value.children[0].src = n.currentSrc);
              else {
                (i.value = document.createElement('div')),
                  i.value.classList.add('bu-rich-img-wrapper-active');
                const c = document.createElement('img');
                (c.src = n.currentSrc),
                  c.classList.add('bu-rich-enlarged'),
                  i.value.appendChild(c),
                  document.body.appendChild(i.value);
              }
              i.value.addEventListener('click', (c) => {
                c.target &&
                  c.target.tagName !== 'IMG' &&
                  (i.value.classList.remove('bu-rich-img-wrapper-active'),
                  (i.value.style.display = 'none'));
              });
            }
          });
      }
      function L(e) {
        t.value && (t.value.innerText = e);
      }
      function T() {
        return t.value && t.value.innerText;
      }
      function k(e) {
        document.execCommand('insertHTML', !0, e);
      }
      return (
        g({ setText: L, getText: T, insertHtml: k }),
        (e, a) => (
          l.openBlock(),
          l.createElementBlock(
            'div',
            l.mergeProps({ class: 'bu-rich-textarea-content' }, e.$attrs, {
              ref_key: 'textDom',
              ref: t,
              contenteditable: '',
              disabled: e.disabled,
              placeholder: e.placeholder,
              onKeyup: l.withModifiers(h, ['stop'])
            }),
            null,
            16,
            E
          )
        )
      );
    }
  });
module.exports = M;
