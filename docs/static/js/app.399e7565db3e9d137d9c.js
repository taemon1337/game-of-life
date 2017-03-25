webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Home__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Home___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_Home__);




__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
  routes: [{
    path: '/',
    name: 'Home',
    component: __WEBPACK_IMPORTED_MODULE_2__components_Home___default.a
  }]
}));

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(9)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(6),
  /* template */
  __webpack_require__(14),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__App__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_material__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_material___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_vue_material__);






__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_3_vue_material___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].config.productionTip = false;

new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]({
  el: '#app',
  router: __WEBPACK_IMPORTED_MODULE_2__router__["a" /* default */],
  template: '<App/>',
  components: { App: __WEBPACK_IMPORTED_MODULE_1__App___default.a }
});

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'app'
});

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_game_of_life__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_game_of_life___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_game_of_life__);




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'Home',
  data: function data() {
    return {};
  },

  components: {
    GameOfLife: __WEBPACK_IMPORTED_MODULE_0__components_game_of_life___default.a
  }
});

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_raphael__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_raphael___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_raphael__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__static_game_of_life_seeds__ = __webpack_require__(20);





/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      alert: ' ',
      running: false,
      count: 0,
      height: 100,
      width: 100,
      blockSize: 7,
      onColor: '#2ecc71',
      offColor: '#fff',
      strokeColor: '#f1c40f',
      step: 200,
      jumpcount: 30,
      initDivisor: 5,
      status: ''
    };
  },

  props: [],
  methods: {
    iterate: function iterate(cb) {
      var self = this;
      for (var x = 0; x <= self.height; x += 1) {
        for (var y = 0; y <= self.width; y += 1) {
          cb(x, y);
        }
      }
    },
    clear: function clear() {
      var self = this;
      self.iterate(function (x, y) {
        self.data[x][y].attr('fill', self.offColor);
      });
    },
    init: function init() {
      var self = this;
      self.iterate(function (x, y) {
        var circle = self.paper.circle(x * self.blockSize, y * self.blockSize, self.blockSize / 2).attr('stroke', self.strokeColor);
        self.data[x] = self.data[x] || [];
        self.data[x][y] = circle;
      });
    },
    startstop: function startstop() {
      var self = this;
      if (self.running) {
        self.running = false;
      } else {
        self.running = true;
        self.next();
      }
    },
    advance: function advance() {
      this.running = true;
      this.next();
      this.running = false;
    },
    next: function next() {
      if (this.worker && this.running) {
        this.worker.postMessage({ next: true });
      }
    },
    jump: function jump() {
      if (this.worker) {
        this.clear();
        this.worker.postMessage({ jump: this.jumpcount });
      }
    },
    toggleRightSideNav: function toggleRightSideNav() {
      console.log('Toggleing');
      this.$refs.rightSideNav.toggle();
    },
    closeRightSideNav: function closeRightSideNav() {
      this.$refs.rightSideNav.close();
    },
    loadseed: function loadseed(name) {
      var self = this;
      var seed = __WEBPACK_IMPORTED_MODULE_1__static_game_of_life_seeds__["a" /* default */][name](self).map(function (xy) {
        return xy.join(',');
      });
      self.reset(seed);
    },
    reset: function reset(indata) {
      var self = this;
      self.closeRightSideNav();
      self.running = false;
      self.count = 0;
      self.clear();
      self.initdata = indata && indata.length ? indata : self.getrandom();

      if (self.worker) {
        self.worker.postMessage({ init: true, height: self.height, width: self.width });
        setTimeout(function () {
          self.worker.postMessage({ data: self.initdata });
        }, 1000);
      }
    }
  },
  mounted: function mounted() {
    var self = this;
    self.worker = new Worker('./static/game-of-life-worker.js');
    self.paper = __WEBPACK_IMPORTED_MODULE_0_raphael___default()('game-of-life-container', self.width * self.blockSize, self.height * self.blockSize);
    self.paper.rect(0, 0, self.width * self.blockSize, self.height * self.blockSize);

    self.paper.canvas.onclick = function (e) {
      console.log('CLICKED');
      window.ee = e;
    };

    self.data = [];
    self.init();

    self.worker.addEventListener('message', function (e) {
      if (e.data.stall) {
        console.log('STALLED');
        self.running = false;
        self.alert = 'The Game of Life has stalled!';
        self.$refs['dialog1'].open();
      }
      if (e.data.on || e.data.off) {
        var x = parseInt(e.data.x);
        var y = parseInt(e.data.y);
        if (e.data.on) {
          self.data[x][y].attr('fill', self.onColor);
        } else {
          self.data[x][y].attr('fill', self.offColor);
        }
      }
      if (e.data.next) {
        self.count += 1;
        self.next();
      }
    });
  },

  computed: {
    gridstyle: function gridstyle() {
      return { height: this.height * this.blockSize, width: this.width * this.blockSize, margin: this.blockSize + 'px' };
    }
  }
});

/***/ }),
/* 9 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 10 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(7),
  /* template */
  __webpack_require__(16),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(10)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(8),
  /* template */
  __webpack_require__(15),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('router-view')], 1)
},staticRenderFns: []}

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('md-toolbar', [_c('div', {
    staticClass: "md-toolbar-container"
  }, [_c('md-button', {
    staticClass: "md-icon-button"
  }, [_c('md-icon', [_vm._v("menu")])], 1), _vm._v(" "), _c('h2', {
    staticClass: "md-title",
    staticStyle: {
      "flex": "1"
    }
  }, [_vm._v("Conway's Game Of Life")]), _vm._v(" "), _c('md-button', {
    nativeOn: {
      "click": function($event) {
        _vm.toggleRightSideNav($event)
      }
    }
  }, [_vm._v("\n        Patterns\n        "), _c('md-icon', [_vm._v("filter_list")])], 1)], 1)]), _vm._v(" "), _c('md-dialog-alert', {
    ref: "dialog1",
    attrs: {
      "md-content": _vm.alert
    }
  }), _vm._v(" "), _c('md-sidenav', {
    ref: "rightSideNav",
    staticClass: "md-right",
    attrs: {
      "md-swipe-distance": "300"
    }
  }, [_c('md-toolbar', [_c('div', {
    staticClass: "md-toolbar-container"
  }, [_c('h3', {
    staticClass: "md-title"
  }, [_vm._v("Patterns")])]), _vm._v(" "), _c('md-list', [_c('md-list-item', [_c('md-button', {
    staticClass: "md-raised",
    nativeOn: {
      "click": function($event) {
        _vm.loadseed('stillsandoscillators')
      }
    }
  }, [_vm._v("Basic Patterns")])], 1), _vm._v(" "), _c('md-list-item', [_c('md-button', {
    staticClass: "md-raised",
    nativeOn: {
      "click": function($event) {
        _vm.loadseed('glidergun')
      }
    }
  }, [_vm._v("Glider Gun")])], 1), _vm._v(" "), _c('md-list-item', [_c('md-button', {
    staticClass: "md-raised",
    nativeOn: {
      "click": function($event) {
        _vm.loadseed('acorn')
      }
    }
  }, [_vm._v("Acorn")])], 1), _vm._v(" "), _c('md-list-item', [_c('md-button', {
    staticClass: "md-raised",
    nativeOn: {
      "click": function($event) {
        _vm.loadseed('xline')
      }
    }
  }, [_vm._v("Horizontal Line")])], 1), _vm._v(" "), _c('md-list-item', [_c('md-button', {
    staticClass: "md-raised",
    nativeOn: {
      "click": function($event) {
        _vm.loadseed('xyline')
      }
    }
  }, [_vm._v("Crossing Lines")])], 1), _vm._v(" "), _c('md-list-item', [_c('md-button', {
    staticClass: "md-raised",
    nativeOn: {
      "click": function($event) {
        _vm.loadseed('spaceship')
      }
    }
  }, [_vm._v("Spaceship")])], 1), _vm._v(" "), _c('md-list-item', [_c('md-button', {
    staticClass: "md-raised",
    nativeOn: {
      "click": function($event) {
        _vm.loadseed('inifinit')
      }
    }
  }, [_vm._v("Infinit")])], 1), _vm._v(" "), _c('md-list-item', [_c('md-button', {
    staticClass: "md-raised",
    nativeOn: {
      "click": function($event) {
        _vm.loadseed('random')
      }
    }
  }, [_vm._v("Totes Random")])], 1)], 1)], 1), _vm._v(" "), _c('md-button', {
    staticClass: "md-raised md-accent",
    nativeOn: {
      "click": function($event) {
        _vm.closeRightSideNav($event)
      }
    }
  }, [_vm._v("Close")])], 1), _vm._v(" "), _c('md-layout', {
    attrs: {
      "md-gutter": ""
    }
  }, [_c('md-layout', {
    attrs: {
      "md-column": "",
      "md-gutter": ""
    }
  }, [_c('div', {
    style: (_vm.gridstyle),
    attrs: {
      "id": "game-of-life-container"
    }
  })])], 1), _vm._v(" "), _c('md-bottom-bar', [_c('md-bottom-bar-item', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.running),
      expression: "!running"
    }],
    attrs: {
      "md-icon": "play_arrow"
    },
    nativeOn: {
      "click": function($event) {
        _vm.startstop($event)
      }
    }
  }, [_vm._v("Play")]), _vm._v(" "), _c('md-bottom-bar-item', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.running),
      expression: "!running"
    }],
    attrs: {
      "md-icon": "skip_next"
    },
    nativeOn: {
      "click": function($event) {
        _vm.advance($event)
      }
    }
  }, [_vm._v("Next")]), _vm._v(" "), _c('md-bottom-bar-item', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.running),
      expression: "!running"
    }],
    attrs: {
      "md-icon": "forward_30"
    },
    nativeOn: {
      "click": function($event) {
        _vm.jump($event)
      }
    }
  }, [_vm._v("Jump " + _vm._s(_vm.jumpcount))]), _vm._v(" "), _c('md-bottom-bar-item', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.running),
      expression: "running"
    }],
    attrs: {
      "md-icon": "pause"
    },
    nativeOn: {
      "click": function($event) {
        _vm.startstop($event)
      }
    }
  }, [_vm._v("Pause")]), _vm._v(" "), _c('md-bottom-bar-item', {
    attrs: {
      "md-icon": "fiber_manual_record"
    }
  }, [_vm._v(_vm._s(_vm.count))])], 1)], 1)
},staticRenderFns: []}

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('game-of-life')
},staticRenderFns: []}

/***/ }),
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// still lifes
var block = function (x, y) {
  return [
    [x, y],
    [x + 1, y],
    [x, y + 1],
    [x + 1, y + 1]
  ]
}

var beehive = function (x, y) {
  return [
    [x + 1, y],
    [x + 2, y],
    [x, y + 1],
    [x + 3, y + 1],
    [x + 1, y + 2],
    [x + 2, y + 2]
  ]
}

var loaf = function (x, y) {
  return [
    [x + 1, y],
    [x + 2, y],
    [x, y + 1],
    [x + 3, y + 1],
    [x + 1, y + 2],
    [x + 3, y + 2],
    [x + 2, y + 3]
  ]
}

var boat = function (x, y) {
  return [
    [x, y],
    [x + 1, y],
    [x, y + 1],
    [x + 2, y + 1],
    [x + 1, y + 2]
  ]
}

var tub = function (x, y) {
  return [
    [x + 1, y],
    [x, y + 1],
    [x + 2, y + 1],
    [x + 1, y + 2]
  ]
}

// oscillators
var blinker = function (x, y) {
  return [
    [x, y],
    [x + 1, y],
    [x + 2, y]
  ]
}

var toad = function (x, y) {
  return [
    [x, y],
    [x + 1, y],
    [x + 2, y],
    [x - 1, y + 1],
    [x, y + 1],
    [x + 1, y + 1]
  ]
}

var beacon = function (x, y) {
  return block(x, y).concat(block(x + 2, y + 2))
}

var pentadecathlon = function (x, y) {
  return [
    [x, y],
    [x + 1, y],
    [x + 2, y],
    [x, y + 1],
    [x + 2, y + 1],
    [x, y + 2],
    [x + 1, y + 2],
    [x + 2, y + 2],
    [x, y + 3],
    [x + 1, y + 3],
    [x + 2, y + 3],
    [x, y + 4],
    [x + 1, y + 4],
    [x + 2, y + 4],
    [x, y + 5],
    [x + 1, y + 5],
    [x + 2, y + 5],
    [x, y + 6],
    [x + 2, y + 6],
    [x, y + 7],
    [x + 1, y + 7],
    [x + 2, y + 7]
  ]
}

var glidergun = function (x, y) {
  return [
    [x, y],
    [x + 1, y],
    [x, y + 1],
    [x + 1, y + 1],
    [x + 10, y],
    [x + 10, y + 1],
    [x + 10, y + 2],
    [x + 11, y - 1],
    [x + 11, y + 3],
    [x + 12, y - 2],
    [x + 12, y + 4],
    [x + 13, y - 2],
    [x + 13, y + 4],
    [x + 14, y + 1],
    [x + 15, y - 1],
    [x + 15, y + 3],
    [x + 16, y],
    [x + 16, y + 1],
    [x + 16, y + 2],
    [x + 17, y + 1],
    [x + 20, y],
    [x + 20, y - 1],
    [x + 20, y - 2],
    [x + 21, y],
    [x + 21, y - 1],
    [x + 21, y - 2],
    [x + 22, y + 1],
    [x + 22, y - 3],
    [x + 24, y + 1],
    [x + 24, y + 2],
    [x + 24, y - 3],
    [x + 24, y - 4],
    [x + 34, y - 1],
    [x + 34, y - 2],
    [x + 35, y - 1],
    [x + 35, y - 2]
  ]
}

var glidergun_inverse = function (x, y) {
  return glidergun(x, y).map(function (arr) { return [arr[1], arr[0]] })
}


/* harmony default export */ __webpack_exports__["a"] = ({
  stills (self, x, y) {
    var x = x || 5
    var y = y || 5

    return block(x, y).concat(beehive(x, y + 10)).concat(loaf(x, y + 20)).concat(boat(x, y + 30)).concat(tub(x, y + 40))
  },
  oscillators (self, x, y) {
    var x = x || 5
    var y = y || 5
    return blinker(x, y).concat(toad(x, y + 10)).concat(beacon(x, y + 20)).concat(pentadecathlon(x + 10, y + 40))
  },
  stillsandoscillators (self, x, y) {
    var x = x || 5
    var y = y || 5

    return this.stills(self, x, y).concat(this.oscillators(self, x + 10, y))
  },
  glidergun (self, x, y) {
    var x = x || 10
    var y = y || 10

    return glidergun(x, y)
  },
  glidergun_inverse (self, x, y) {
    var x = x || 10
    var y = y || 10

    return glidergun_inverse(x, y)
  },
  infinit (self) {
    var x = Math.floor(self.height / 2)
    var y = Math.floor(self.width / 2)
    return [
      [x, y],
      [x + 1, y],
      [x + 2, y],
      [x + 4, y],
      [x, y + 1],
      [x + 3, y + 2],
      [x + 4, y + 2],
      [x + 1, y + 3],
      [x + 2, y + 3],
      [x + 4, y + 3],
      [x, y + 4],
      [x + 2, y + 4],
      [x + 4, y + 4]
    ]
  },
  xline (self) {
    var y = Math.floor(self.width / 2)
    var seed = []

    for (var x = 0; x < self.height; x += 1) {
      seed.push([x, y])
    }

    return seed
  },
  xyline (self) {
    var y = Math.floor(self.width / 2)
    var seed = []

    for (var x = 0; x < self.height; x += 1) {
      seed.push([x, y])
    }

    x = Math.floor(self.height / 2)

    for (y = 0; y < self.width; y += 1) {
      seed.push([x, y])
    }

    return seed
  },
  acorn (self) {
    var x = Math.floor(self.height / 2)
    var y = Math.floor(self.width / 2)
    return [
      [x, y],
      [x + 1, y],
      [x + 1, y - 2],
      [x + 3, y - 1],
      [x + 4, y],
      [x + 5, y],
      [x + 6, y]
    ]
  },
  spaceship (self) {
    var x = 0
    var y = Math.floor(self.width / 2)
    return [
      [x, y],
      [x + 3, y],
      [x + 4, y + 1],
      [x, y + 2],
      [x + 4, y + 2],
      [x + 1, y + 3],
      [x + 2, y + 3],
      [x + 3, y + 3],
      [x + 4, y + 3]
    ]
  },
  staller (self) {
    return ['5,5', '5,6', '6,5', '6,6']
  },
  random (self) {
    var count = Math.floor(self.height * self.width / self.initDivisor)
    var rand = []

    for (var i = 0; i < count; i += 1) {
      rand.push([Math.floor(Math.random() * self.height), Math.floor(Math.random() * self.width)])
    }
    return rand
  }
});


/***/ })
],[5]);
//# sourceMappingURL=app.399e7565db3e9d137d9c.js.map