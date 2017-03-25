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


export default {
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
}
