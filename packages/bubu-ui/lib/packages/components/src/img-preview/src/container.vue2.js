'use strict';
const n = require('vue'),
  v = require('./icon.js'),
  x = require('./components/swipe/index.vue.js'),
  X = require('./components/swipeItem/index.vue.js'),
  u = require('./utils.js'),
  Y = require('@bubu-ui/hook'),
  l = Y.useTouch();
let w, d, p, f, g, c;
const y = n.defineComponent({
  name: 'img-preview',
  components: { swipe: x, swipeItem: X },
  props: {
    config: {
      type: Object,
      default() {
        return { maxZoom: 3 };
      }
    }
  },
  setup() {
    const t = n.ref(),
      i = n.ref({ maxZoom: 3, current: 0, urls: [] }),
      s = n.ref(!1),
      e = n.ref(!1),
      o = n.reactive({ w: 0, h: 0 }),
      a = n.ref(1),
      h = n.reactive({
        scale: 1,
        moveX: 0,
        moveY: 0,
        moving: !1,
        zooming: !1,
        imageRatio: 0,
        displayWidth: 0,
        displayHeight: 0
      }),
      r = n.ref(!1),
      m = n.reactive({
        startX: 0,
        startY: 0,
        offsetX: 0,
        offsetY: 0,
        originX: 0,
        originY: 0,
        isdown: !1
      });
    return {
      imgDom: t,
      dataConfig: i,
      loading: s,
      imgInfo: o,
      loadIcon: v.loadIcon,
      error: e,
      state: h,
      zoomRate: a,
      isHidden: r,
      imgPosition: m
    };
  },
  computed: {
    browserRedirect() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
        ? 'Mobile'
        : 'Desktop';
    },
    imgStyle() {
      const {
          scale: t,
          moveX: i,
          moveY: s,
          moving: e,
          zooming: o
        } = this.state,
        a = { transitionDuration: o || e ? '0s' : '.3s' };
      if (t !== 1) {
        const h = i / t,
          r = s / t;
        a.transform = `scale(${t}, ${t}) translate(${h}px, ${r}px)`;
      }
      return a;
    },
    imgTransform() {
      const { offsetX: t, offsetY: i, isdown: s } = this.imgPosition;
      return {
        transitionDuration: s ? '0s' : '.3s',
        transform: `translate(${t}px, ${i}px)`
      };
    }
  },
  methods: {
    loadImage() {
      const t = window.innerWidth,
        i = window.innerHeight,
        s = t / i,
        e = this.$refs.imgDom;
      this.$nextTick(() => {
        (this.loading = !0),
          e.removeAttribute('width'),
          e.removeAttribute('height'),
          this.dataConfig &&
            (e.src = this.dataConfig.urls[this.dataConfig.current - 1]),
          (this.error = !1),
          (e.onload = () => {
            this.config.success && this.config.success('success');
            const o = e.width / e.height;
            (this.imgInfo.w = e.width),
              (this.imgInfo.h = e.height),
              o > s
                ? e.width > t * 0.7
                  ? ((e.style.width = t * 0.7 + 'px'),
                    (e.style.height = e.height / (e.width / (t * 0.7)) + 'px'),
                    (this.imgInfo.w = t * 0.7),
                    (this.imgInfo.h = e.height / (e.width / (t * 0.7))))
                  : ((e.style.width = e.width + 'px'),
                    (e.style.height = e.height + 'px'))
                : e.height > i * 0.7
                  ? ((e.style.height = i * 0.7 + 'px'),
                    (e.style.width = e.width / (e.height / (i * 0.7)) + 'px'),
                    (this.imgInfo.w = e.width / (e.height / (i * 0.7))),
                    (this.imgInfo.h = i * 0.7))
                  : ((e.style.width = e.width + 'px'),
                    (e.style.height = e.height + 'px')),
              (this.loading = !1);
          }),
          (e.onerror = (o) => {
            (this.loading = !1),
              (this.error = !0),
              this.config.fail && this.config.fail('fail');
          });
      });
    },
    arrawRight() {
      (this.dataConfig.current == this.dataConfig.urls.length &&
        !this.dataConfig.loop) ||
        (this.resetImgPositon(),
        (this.zoomRate = 1),
        this.dataConfig.current === this.dataConfig.urls.length &&
        this.dataConfig.loop
          ? (this.dataConfig.current = 1)
          : (this.dataConfig.current += 1),
        this.loadImage());
    },
    arrawLeft() {
      (this.dataConfig.current == 1 && !this.dataConfig.loop) ||
        (this.resetImgPositon(),
        (this.zoomRate = 1),
        this.dataConfig.loop && this.dataConfig.current == 1
          ? (this.dataConfig.current = this.dataConfig.urls.length)
          : (this.dataConfig.current -= 1),
        this.loadImage());
    },
    getFull() {
      if (this.isFull()) {
        const i = document.exitFullscreen;
        if (i) i.call(document);
        else if (window.ActiveXObject) {
          const s = new window.ActiveXObject('WScript.Shell');
          s && s.SendKeys('F11');
        }
      }
      const t = document.documentElement;
      t.requestFullscreen
        ? t.requestFullscreen()
        : t.mozRequestFullScreen
          ? t.mozRequestFullScreen()
          : t.webkitRequestFullscreen
            ? t.webkitRequestFullscreen()
            : t.msRequestFullscreen && t.msRequestFullscreen();
    },
    isFull() {
      return document.fullscreenElement || !1;
    },
    close() {
      if (this.isFull()) {
        const i = document.exitFullscreen;
        if (i) i.call(document);
        else if (window.ActiveXObject) {
          const s = new window.ActiveXObject('WScript.Shell');
          s && s.SendKeys('F11');
        }
      }
      const t = document.getElementsByClassName('ysj-imgage-wrapper');
      t[0].style.display = 'none';
    },
    touchstart(t) {
      if (this.browserRedirect === 'Desktop') return;
      const { touches: i } = t;
      l.start(t),
        (this.state.moving = i.length === 1 && this.state.scale !== 1),
        (this.state.zooming = i.length === 2),
        (f = this.state.moveX),
        (g = this.state.moveY),
        (w = Date.now()),
        this.state.zooming &&
          ((d = this.state.scale), (p = this.getDistance(t.touches)));
    },
    touchmove(t) {
      const { touches: i } = t;
      l.move(t),
        (this.state.moving || this.state.zooming) && u.preventDefault(t, !0);
      const s = this.config.maxZoom || 3;
      if (this.state.moving) {
        const { deltaX: e, deltaY: o } = l,
          a = e.value + f,
          h = o.value + g,
          r = Number((s / 2) * window.innerWidth),
          m = Number((s / 2) * window.innerHeight);
        (this.state.moveX = this.clamp(a, -r, r)),
          (this.state.moveY = this.clamp(h, -m, m));
      }
      if (this.state.zooming && i.length === 2) {
        const e = this.getDistance(i),
          o = (d * e) / p;
        o < 1
          ? (this.state.scale = o)
          : o > s
            ? (this.state.scale = s)
            : (this.state.scale = o);
      }
    },
    touchend(t) {
      let i = !1;
      if (this.state.moving || this.state.zooming) {
        (i = !0),
          this.state.moving &&
            f === this.state.moveX &&
            g === this.state.moveY &&
            (i = !1);
        const s = this.config.maxZoom || 3;
        if (!t.touches.length) {
          if (this.state.zooming) {
            const e = Number((s / 2) * window.innerWidth),
              o = Number((s / 2) * window.innerHeight);
            (this.state.moveX = this.clamp(this.state.moveX, -e, e)),
              (this.state.moveY = this.clamp(this.state.moveY, -o, o)),
              (this.state.zooming = !1);
          }
          (this.state.moving = !1),
            (f = 0),
            (g = 0),
            (d = 1),
            this.state.scale < 1 && this.resetScale();
        }
      } else this.checkTap();
      u.preventDefault(t, i), l.reset();
    },
    getDistance(t) {
      return Math.sqrt(
        (t[0].clientX - t[1].clientX) ** 2 + (t[0].clientY - t[1].clientY) ** 2
      );
    },
    changeSwipe(t) {
      (this.dataConfig.current = t + 1), this.resetScale();
    },
    clamp(t, i, s) {
      return Math.min(Math.max(t, i), s);
    },
    resetScale() {
      (this.state.scale = 1), (this.state.moveX = 0), (this.state.moveY = 0);
    },
    checkTap() {
      const { offsetX: t, offsetY: i } = l,
        s = Date.now() - w,
        e = 250,
        o = 5;
      t.value < o &&
        i.value < o &&
        s < e &&
        (c
          ? (clearTimeout(c), (c = null))
          : (c = setTimeout(() => {
              this.close(), (c = null);
            }, e)));
    },
    zoom(t) {
      this.resetImgPositon();
      const i = this.config.maxZoom || 3;
      if (this.zoomRate >= i && t === 'big') return;
      if (t === 'big') this.zoomRate = Number((this.zoomRate + 0.2).toFixed(1));
      else {
        if (this.zoomRate <= 0.2) return;
        this.zoomRate = Number((this.zoomRate - 0.2).toFixed(1));
      }
      const s = this.$refs.imgDom,
        e = this.imgInfo.w * this.zoomRate,
        o = this.imgInfo.h * this.zoomRate;
      s && ((s.style.width = e + 'px'), (s.style.height = o + 'px')),
        e > window.innerWidth || o > window.innerHeight
          ? (this.isHidden = !0)
          : (this.isHidden = !1);
    },
    mousedown(t) {
      t.preventDefault(),
        this.isHidden &&
          ((this.imgPosition.startX = t.clientX),
          (this.imgPosition.startY = t.clientY),
          (this.imgPosition.isdown = !0),
          (this.$refs.imgDom.style.cursor = 'move'));
    },
    mousemove(t) {
      if (this.isHidden && this.imgPosition.isdown) {
        const {
          originX: i,
          originY: s,
          startX: e,
          startY: o
        } = this.imgPosition;
        let a = i + t.clientX - e,
          h = s + t.clientY - o;
        (this.imgPosition.offsetX = a), (this.imgPosition.offsetY = h);
      }
    },
    mouseup(t) {
      t.preventDefault(),
        (this.$refs.imgDom.style.cursor = 'default'),
        (this.imgPosition.isdown = !1),
        (this.imgPosition.originX = this.imgPosition.offsetX),
        (this.imgPosition.originY = this.imgPosition.offsetY);
    },
    resetImgPositon() {
      (this.imgPosition.offsetX = 0),
        (this.imgPosition.offsetY = 0),
        (this.imgPosition.originX = 0),
        (this.imgPosition.originY = 0);
    },
    init() {
      window.addEventListener('mousewheel', (t) => {
        document.getElementsByClassName('ysj-imgage-wrapper')[0].style
          .display !== 'none' &&
          (t.wheelDelta > 0 ? this.zoom('big') : this.zoom('small'));
      });
    },
    dwonload() {
      let t = this.dataConfig.urls[this.dataConfig.current - 1];
      window.open(t, '_blank');
    }
  },
  mounted() {
    this.loadIcon(),
      this.config &&
        (this.init(),
        (this.dataConfig = Object.assign({}, this.config)),
        this.browserRedirect === 'Desktop' && this.loadImage());
  }
});
module.exports = y;
