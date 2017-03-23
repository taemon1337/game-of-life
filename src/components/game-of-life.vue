<template>
  <div>
    <md-dialog-alert :md-content="alert" ref="dialog1"></md-dialog-alert>

    <md-layout md-gutter>
      <md-layout md-column md-gutter>
        <div id="game-of-life-container" v-bind:style="gridstyle"></div>
      </md-layout>

      <md-layout md-column md-gutter>
        <h3>Conway's Game Of Life</h3>

        <md-toolbar class="md-transparent">
          <md-button class="md-raised" v-on:click.native="startstop">
            <md-icon class="md-size-2x md-accent">{{ running ? 'pause' : 'play_arrow' }}</md-icon>
            <md-tooltip>{{ running ? 'Stop' : 'Start' }}</md-tooltip>
          </md-button>
          <md-button class="md-raised" v-on:click.native="next">
            <md-icon class="md-size-2x md-primary">skip_next</md-icon>
            <md-tooltip>Advance 1 cycle</md-tooltip>
          </md-button>
          <md-button class="md-raised" v-on:click.native="jump">
            <md-icon class="md-size-2x md-primary">forward_30</md-icon>
            <md-tooltip>Advance {{ jumpcount }} cycles</md-tooltip>
          </md-button>

          <md-button class="md-raised">
              <span>{{ count }}</span>
            <md-tooltip>Cycle Count</md-tooltip>
          </md-button>
        </md-toolbar>

        <md-toolbar class="md-transparent">
          <md-button class="md-raised" v-on:click.native="reset">
            <md-icon class="md-size-2x md-primary">shuffle</md-icon>
            <md-tooltip>Random seed</md-tooltip>
          </md-button>
          <md-button class="md-raised" v-on:click.native="acorn">
            <md-icon class="md-size-2x md-primary">pregnant_woman</md-icon>
            <md-tooltip>Acorn pattern</md-tooltip>
          </md-button>
          <md-button class="md-raised" v-on:click.native="liner">
            <md-icon class="md-size-2x md-primary">new_releases</md-icon>
            <md-tooltip>Line pattern</md-tooltip>
          </md-button>
          <md-button class="md-raised" v-on:click.native="liners">
            <md-icon class="md-size-2x md-primary">call_split</md-icon>
            <md-tooltip>Veritcal and Horizontal pattern</md-tooltip>
          </md-button>
          <md-button class="md-raised" v-on:click.native="spaceship">
            <md-icon class="md-size-2x md-primary">local_shipping</md-icon>
            <md-tooltip>Spaceship pattern</md-tooltip>
          </md-button>
          <md-button class="md-raised" v-on:click.native="infinit">
            <md-icon class="md-size-2x md-primary">highlight</md-icon>
            <md-tooltip>Ininit pattern</md-tooltip>
          </md-button>
          <md-button class="md-raised" v-on:click.native="staller">
            <md-icon class="md-size-2x md-primary">pause</md-icon>
            <md-tooltip>Stalled pattern</md-tooltip>
          </md-button>
        </md-toolbar>
      </md-layout>
    </md-layout>
  </div>
</template>

<script>
import Raphael from 'raphael'

export default {
  data () {
    return {
      alert: ' ',
      running: false,
      count: 0,
      height: 100,
      width: 100,
      blockSize: 5,
      onColor: '#2ecc71',
      offColor: '#fff',
      strokeColor: '#f1c40f',
      step: 200,
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
      if (this.running) {
        this.running = false
      } else {
        this.running = true
        this.next()
      }
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
    infinit () {
      var self = this
      var x = Math.floor(self.height / 2)
      var y = Math.floor(self.width / 2)
      var seed = [
        [x, y].join(','),
        [x + 1, y].join(','),
        [x + 2, y].join(','),
        [x + 4, y].join(','),
        [x, y + 1].join(','),
        [x + 3, y + 2].join(','),
        [x + 4, y + 2].join(','),
        [x + 1, y + 3].join(','),
        [x + 2, y + 3].join(','),
        [x + 4, y + 3].join(','),
        [x, y + 4].join(','),
        [x + 2, y + 4].join(','),
        [x + 4, y + 4].join(',')
      ]

      self.reset(seed)
    },
    liner () {
      var self = this
      var y = Math.floor(self.width / 2)
      var seed = []

      for (var x = 0; x < self.height; x += 1) {
        seed.push([x, y].join(','))
      }

      self.reset(seed)
    },
    liners () {
      var self = this
      var y = Math.floor(self.width / 2)
      var seed = []

      for (var x = 0; x < self.height; x += 1) {
        seed.push([x, y].join(','))
      }

      x = Math.floor(self.height / 2)

      for (y = 0; y < self.width; y += 1) {
        seed.push([x, y].join(','))
      }

      self.reset(seed)
    },
    acorn () {
      var self = this
      var startx = Math.floor(self.height / 2)
      var starty = Math.floor(self.width / 2)
      var seed = [
        [startx, starty].join(','),
        [startx + 1, starty].join(','),
        [startx + 1, starty - 2].join(','),
        [startx + 3, starty - 1].join(','),
        [startx + 4, starty].join(','),
        [startx + 5, starty].join(','),
        [startx + 6, starty].join(',')
      ]
      self.reset(seed)
    },
    spaceship () {
      var self = this
      var x = 0
      var y = Math.floor(self.width / 2)
      var seed = [
        [x, y].join(','),
        [x + 3, y].join(','),
        [x + 4, y + 1].join(','),
        [x, y + 2].join(','),
        [x + 4, y + 2].join(','),
        [x + 1, y + 3].join(','),
        [x + 2, y + 3].join(','),
        [x + 3, y + 3].join(','),
        [x + 4, y + 3].join(',')
      ]
      self.reset(seed)
    },
    staller () {
      this.reset(['5,5', '5,6', '6,5', '6,6'])
    },
    reset (indata) {
      var self = this
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
    },
    getrandom () {
      var self = this
      var count = Math.floor(self.height * self.width / self.initDivisor)
      var rand = []

      for (var i = 0; i < count; i += 1) {
        rand.push([Math.floor(Math.random() * self.height), Math.floor(Math.random() * self.width)].join(','))
      }
      return rand
    }
  },
  mounted () {
    var self = this
    self.worker = new Worker('/static/game-of-life-worker.js')
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
        self.next()
      }
    })
  },
  computed: {
    gridstyle () {
      return { height: this.height * this.blockSize, width: this.width * this.blockSize, margin: this.blockSize + 'px' }
    }
  }
}
</script>

<style>
</style>
