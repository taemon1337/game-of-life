var height = 600  // number of rows
var width = 1000  // number of columns
var data = []     // [x,y] data grid

var is_alive = function (x, y) {
  try {
    return data[x][y] > 0
  } catch(err) {
    return false
  }
}

var iterate = function (cb) {
  for (var x = 0; x <= height; x += 1) {
    for (var y = 0; y <= width; y += 1) {
      cb(x, y)
    }
  }
}

var init = function () {
  iterate(function (x, y) {
    data[x] = data[x] || []
    data[x].push(0)
  })
}

var countLive = function(x, y) {
  var count = 0

  if (x > 0 && y > 0 && is_alive(x - 1, y -1)) { count += 1 }
  if (x > 0 && y >= 0 && is_alive(x - 1, y)) { count += 1 }
  if (x > 0 && y < width && is_alive(x - 1, y + 1)) { count += 1 }

  if (x >= 0 && y > 0 && is_alive(x, y -1)) { count += 1 }
  // do not check your own state
  if (x >= 0 && y < width && is_alive(x, y + 1)) { count += 1 }

  if (x <= height && y > 0 && is_alive(x + 1, y -1)) { count += 1 }
  if (x <= height && y >= 0 && is_alive(x + 1, y)) { count += 1 }
  if (x <= height && y < width && is_alive(x + 1, y + 1)) { count += 1 }

  return count
}

var next = function(silent) {
  try {
    var tmp = []
    var stalled = true

    iterate(function (x, y) {
      var count = countLive(x, y)
      var livecell = is_alive(x, y)

      if(livecell && [2,3].indexOf(count) >= 0) {
        tmp.push([x, y].join(':'))
      } else if(!livecell && count === 3) {
        tmp.push([x, y].join(':'))
      }
    })

    iterate(function (x, y) {
      if (tmp.indexOf([x, y].join(':')) >= 0) {
        if (!is_alive(x, y)) {
          stalled = false
        }
        data[x][y] = 1
        if (!silent) {
          self.postMessage({ on: true, x: x, y: y })
        }
      } else if(is_alive(x, y)) {
        stalled = false
        data[x][y] = 0
        if (!silent) {
          self.postMessage({ off: true, x: x, y: y })
        }
      }
    })

    self.postMessage({ 'next': true })

    if (stalled) {
      self.postMessage({ stall: true })
    }
  } catch(err) {
    console.log('ERROR: ', err)
  }
}

self.addEventListener('message', function(e) {
  if(e.data.init) {
    data = []
    height = e.data.height || height
    width = e.data.width || width
    init()
  }
  if(e.data.data) {
    iterate(function (x, y) {
      if(e.data.data.indexOf([x, y].join(',')) >= 0) {
        data[x] = data[x] || []
        data[x][y] = 1
        self.postMessage({ on: true, x: x, y: y })
      }
    })
  }
  if(e.data.change) {
    if (is_alive(e.data.x, e.data.y)) {
      data[e.data.x][e.data.y] = 0
      self.postMessage({ off: true, x: e.data.x, y: e.data.y })
    } else {
      data[e.data.x][e.data.y] = 1
      self.postMessage({ on: true, x: e.data.x, y: e.data.y })
    }
  }
  if(e.data.next) {
    next()
  }
  if(e.data.jump) {
    var c = parseInt(e.data.jump)
    for (var i = 0; i < c - 1; i += 1) {
      next(true)
    }
    next()
  }
}, false)


