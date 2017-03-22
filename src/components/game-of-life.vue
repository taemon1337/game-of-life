<template>
  <div class="layout-view">
    <div class="layout-padding">
      <div id="view-flexbox">
        <div class="row gutter wrap justify-stretch content-center text-center">
          <div class="auto">
            <div id="game-of-life-container" v-bind:style="gridstyle"></div>
          </div>
          <div class="auto content-right">
            <h3 class="bg-primary round-borders shadow-5">Controls</h3>
            <dl>
              <dt>Step One</dt>
              <dd>
                <button class="" v-on:click="start">Start</button>
                <button class="" v-on:click="stop">Stop</button>
                <button class="" v-on:click="next">Next</button>
                <button class="" v-on:click="reset">Reset</button>
              </dd>
              <dt>Status</dt>
              <dd>{{ status }}</dd>
              <dt>Step Count</dt>
              <dd>{{ count }}</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Raphael from 'raphael'

export default {
  data () {
    return {
      running: false,
      count: 0,
      height: 50,
      width: 50,
      blockSize: 25,
      onColor: '#2ecc71',
      offColor: '#fff',
      strokeColor: '#f1c40f',
      step: 500,
      status: ''
    }
  },
  props: [],
  methods: {
    loop () {
      var self = this
      if (self.running) {
        setTimeout(function () {
          self.count += 1
          self.next()
          self.loop()
        }, self.step)
      } else {
        console.log('STOPPED')
      }
    },
    iterate (cb) {
      var self = this
      for (var x = 0; x <= self.height; x += 1) {
        for (var y = 0; y <= self.width; y += 1) {
          cb(x, y)
        }
      }
    },
    init () {
      var self = this
      self.iterate(function (x, y) {
        var circle = self.paper.circle(x * self.blockSize, y * self.blockSize, self.blockSize / 2).attr('stroke', self.strokeColor)
        self.data[x] = self.data[x] || []
        self.data[x][y] = circle
      })
    },
    start () {
      this.running = true
      this.loop()
    },
    stop () {
      this.running = false
    },
    next () {
      if (this.worker) {
        this.worker.postMessage({ next: true })
      }
    },
    reset () {
      var self = this
      self.running = false
      if (self.worker) {
        self.worker.postMessage({ init: true, height: self.height, width: self.width })
        setTimeout(function () {
          self.worker.postMessage({ data: self.initdata })
          self.worker.postMessage({ next: true })
        }, 1000)
      }
    },
    getrandom () {
      return ['3:4', '3:5', '3:6', '3:7', '9:9', '9:10', '10:11', '10:12']
    }
  },
  mounted () {
    var self = this
    self.initdata = self.getrandom()
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
      if (e.data.on || e.data.off) {
        var x = parseInt(e.data.x)
        var y = parseInt(e.data.y)
        if (e.data.on) {
          self.data[x][y].attr('fill', self.onColor)
        } else {
          self.data[x][y].attr('fill', self.offColor)
        }
      }
    })

    self.reset()
  },
  computed: {
    gridstyle () {
      return { height: this.height * this.blockSize, width: this.width * this.blockSize }
    }
  }
}
</script>

<style>
</style>
