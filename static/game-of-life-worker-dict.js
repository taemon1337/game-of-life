var canvas = null 
var height = 600 // number of rows
var width = 1000 // number of columns
var data = []

// The number of live neighbors above or below current cell
var getAdjacentLiveCount = function (row, y) {
  var count = 0
  if(row) {
    if (row.indexOf(y) >= 0) {
      count += 1 // directly above or below
    }
    if (row.indexOf(y - 1) >= 0) {
      count += 1 // top/bottom left
    }
    if (row.indexOf(y + 1) >= 0) {
      count += 1 // top/bottom right
    }
  }

  return count
}

// determine if given cell coord will be alive or dead next time
var getLiveCount = function (rows, x, y) {
  var live = 0

  // get live count from above row
  if (rows[x - 1]) {
    live += getAdjacentLiveCount(rows[x - 1], y)
  }

  // get live count from below row
  if (rows[x + 1]) {
    live += getAdjacentLiveCount(rows[x + 1], y)
  }

  // get live count from neighbors to left and right
  if (rows[x]) {
    if (rows[x].indexOf(y - 1) >= 0) {
      live += 1
    }
    if (rows[x].indexOf(y + 1) >= 0) {
      live += 1
    }
  }

  return live
}

var check = function (rows, x, y, next) {
  var livecount = getLiveCount(rows, x, y)
  var is_valid = x > 0 && y > 0
  var is_dead_cell = rows[x] && rows[x].indexOf(y) >= 0

  if(x > 0 && y > 0 && x <= maxRows && y <= maxCols) {
    if (livecount === 3 && is_dead_cell) {
      // any dead cell with exactly 3 live neighbors becomes alive
      next[x] = next[x] || []
      if (next[x].indexOf(y) === -1) { next[x].push(y) }
    } else if (livecount === 3) {
      // any live cell with 3 live neighbors lives on to next generation
      next[x] = next[x] || []
      if (next[x].indexOf(y) === -1) { next[x].push(y) }
    }
  }
}

var calculate = function (rows) {
  var next = {};

  for (var x in rows) {
    for (var yi = 0; yi < rows[x].length; yi += 1) {
      x = parseInt(x)
      var y = rows[x][yi]

      check(rows, x - 1, y - 1, next)
      check(rows, x, y - 1, next)
      check(rows, x + 1, y - 1, next)

      check(rows, x - 1, y, next)
      check(rows, x, y, next)
      check(rows, x + 1, y, next)

      check(rows, x - 1, y + 1, next)
      check(rows, x, y + 1, next)
      check(rows, x + 1, y + 1, next)
    }
  }

  return next;
}

self.addEventListener('message', function(e) {
  if(e.data && e.data.init) {
    canvas = document.getElementById(e.data.id)
    draw(canvas)
  }
  if(e.data && e.data.next) {
    console.log("NEXT")
    current_rows = calculate(current_rows)
    self.postMessage({ rows: current_rows })
  }
}, false)


