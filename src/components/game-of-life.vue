<template>
  <div>
    <md-toolbar>
      <div class="md-toolbar-container">
        <md-button class="md-icon-button" v-on:click.native="toggleLeftSideNav">
          <md-icon>menu</md-icon>
        </md-button>

        <h2 class="md-title" style="flex: 1;">Conway's Game Of Life</h2>

        <md-button v-on:click.native="toggleRightSideNav">
          Patterns
          <md-icon>filter_list</md-icon>
        </md-button>
      </div>
    </md-toolbar>

    <md-dialog-alert :md-content="alert" ref="dialog1"></md-dialog-alert>

    <md-sidenav md-swipe-distance="300" class="md-left" ref="leftSideNav">
      <div style="padding:15px;">
        <h3 class="md-title">Game Settings</h3>

        <form @submit.stop.prevent="saveSettings" ref="settingsForm">
          <md-input-container>
            <label>Game Height</label>
            <md-input name="height" :value="height"></md-input>
          </md-input-container>
          <md-input-container>
            <label>Game Width</label>
            <md-input name="width" :value="width"></md-input>
          </md-input-container>
          <md-input-container>
            <label>Block Size</label>
            <md-input name="blockSize" :value="blockSize"></md-input>
          </md-input-container>
          <md-input-container>
            <label>Delay Time</label>
            <md-input name="step" v-model="step"></md-input>
          </md-input-container>

          <vue-range-slider></vue-range-slider>

          <md-button class="md-raised md-primary" type="submit">Save</md-button>
          <md-button class="md-raised md-warn" type="button" @click.native="resetSettings">Cancel</md-button>
        </form>
      </div>
    </md-sidenav>

    <md-sidenav md-swipe-distance="300" class="md-right" ref="rightSideNav">
      <md-toolbar>
        <div class="md-toolbar-container">
          <h3 class="md-title">Patterns</h3>
        </div>
        <md-list>
          <md-list-item>
            <md-button class="md-raised" v-on:click.native="loadseed('stillsandoscillators')">Basic Patterns</md-button>
          </md-list-item>
          <md-list-item>
            <md-button class="md-raised" v-on:click.native="loadseed('glidergun')">Glider Gun</md-button>
          </md-list-item>
          <md-list-item>
            <md-button class="md-raised" v-on:click.native="loadseed('acorn')">Acorn</md-button>
          </md-list-item>
          <md-list-item>
            <md-button class="md-raised" v-on:click.native="loadseed('xline')">Horizontal Line</md-button>
          </md-list-item>
          <md-list-item>
            <md-button class="md-raised" v-on:click.native="loadseed('xyline')">Crossing Lines</md-button>
          </md-list-item>
          <md-list-item>
            <md-button class="md-raised" v-on:click.native="loadseed('spaceship')">Spaceship</md-button>
          </md-list-item>
          <md-list-item>
            <md-button class="md-raised" v-on:click.native="loadseed('inifinit')">Infinit</md-button>
          </md-list-item>
          <md-list-item>
            <md-button class="md-raised" v-on:click.native="loadseed('random')">Totes Random</md-button>
          </md-list-item>
        </md-list>
      </md-toolbar>

      <md-button class="md-raised md-warn" @click.native="closeRightSideNav">Close</md-button>
    </md-sidenav>

    <md-layout md-gutter>
      <md-layout md-column md-gutter>
        <div id="game-of-life-container" v-bind:style="gridstyle"></div>
      </md-layout>
    </md-layout>

    <md-bottom-bar>
      <md-bottom-bar-item v-show="!running" md-icon="play_arrow" v-on:click.native="startstop">Play</md-bottom-bar-item>
      <md-bottom-bar-item v-show="!running" md-icon="skip_next" v-on:click.native="advance">Next</md-bottom-bar-item>
      <md-bottom-bar-item v-show="!running" md-icon="forward_30" v-on:click.native="jump">Jump {{ jumpcount }}</md-bottom-bar-item>

      <md-bottom-bar-item v-show="running" md-icon="pause" v-on:click.native="startstop">Pause</md-bottom-bar-item>

      <md-bottom-bar-item md-icon="fiber_manual_record">{{ count }}</md-bottom-bar-item>
    </md-bottom-bar>
  </div>
</template>

<script>
import Raphael from 'raphael'
import Seeds from '../../static/game-of-life-seeds'
import RangeSlider from '@/components/vue-range-slider'

export default {
  data () {
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
      step: 0,
      jumpcount: 30,
      initDivisor: 5,
      status: ''
    }
  },
  props: [],
  methods: {
    iterate (cb) {
      var self = this
      for (var x = 0; x <= self.height; x += 1) {
        for (var y = 0; y <= self.width; y += 1) {
          cb(x, y)
        }
      }
    },
    clear () {
      var self = this
      self.iterate(function (x, y) {
        self.data[x][y].attr('fill', self.offColor)
      })
    },
    init () {
      var self = this
      self.iterate(function (x, y) {
        var circle = self.paper.circle(x * self.blockSize, y * self.blockSize, self.blockSize / 2).attr('stroke', self.strokeColor)
        self.data[x] = self.data[x] || []
        self.data[x][y] = circle
      })
    },
    startstop () {
      var self = this
      if (self.running) {
        self.running = false
      } else {
        self.running = true
        self.next()
      }
    },
    advance () {
      this.running = true
      this.next()
      this.running = false
    },
    next () {
      if (this.worker && this.running) {
        this.worker.postMessage({ next: true })
      }
    },
    jump () {
      if (this.worker) {
        this.clear()
        this.worker.postMessage({ jump: this.jumpcount })
      }
    },
    toggleRightSideNav () {
      this.$refs.rightSideNav.toggle()
    },
    closeRightSideNav () {
      this.$refs.rightSideNav.close()
    },
    toggleLeftSideNav () {
      this.$refs.leftSideNav.toggle()
    },
    closeLeftSideNav () {
      this.$refs.leftSideNav.close()
    },
    resetSettings () {
      this.$refs.leftSideNav.close()
    },
    saveSettings () {
    },
    loadseed (name) {
      var self = this
      var seed = Seeds[name](self).map(function (xy) { return xy.join(',') })
      self.reset(seed)
    },
    reset (indata) {
      var self = this
      self.closeRightSideNav()
      self.running = false
      self.count = 0
      self.clear()
      self.initdata = indata && indata.length ? indata : self.getrandom()

      if (self.worker) {
        self.worker.postMessage({ init: true, height: self.height, width: self.width })
        setTimeout(function () {
          self.worker.postMessage({ data: self.initdata })
        }, 1000)
      }
    }
  },
  mounted () {
    var self = this
    self.worker = new Worker('./static/game-of-life-worker.js')
    self.paper = Raphael('game-of-life-container', self.width * self.blockSize, self.height * self.blockSize)
    self.paper.rect(0, 0, self.width * self.blockSize, self.height * self.blockSize)

    self.paper.canvas.onclick = function (e) {
      console.log('CLICKED')
      window.ee = e
    }

    self.data = []
    self.init()

    self.worker.addEventListener('message', function (e) {
      if (e.data.stall) {
        console.log('STALLED')
        self.running = false
        self.alert = 'The Game of Life has stalled!'
        self.$refs['dialog1'].open()
      }
      if (e.data.on || e.data.off) {
        var x = parseInt(e.data.x)
        var y = parseInt(e.data.y)
        if (e.data.on) {
          self.data[x][y].attr('fill', self.onColor)
        } else {
          self.data[x][y].attr('fill', self.offColor)
        }
      }
      if (e.data.next) {
        self.count += 1
        if (self.step) {
          setTimeout(function () { self.next() }, self.step)
        } else {
          self.next()
        }
      }
    })
  },
  computed: {
    gridstyle () {
      return { height: this.height * this.blockSize, width: this.width * this.blockSize, margin: this.blockSize + 'px' }
    }
  },
  components: {
    RangeSlider
  }
}
</script>

<style>
</style>
