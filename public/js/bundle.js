(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function splitter(canvas, options) {
  options = options || {}

  var segments = []
    , width = options.width
    , height = options.height
    , cols = options.cols || Math.floor(canvas.width / options.width)
    , rows = options.rows || Math.floor(canvas.height / options.height)
    , x
    , y

  for (y = 0; y < rows; y += 1) {
    for (x = 0; x < cols; x += 1) { // left-to-right, top-to-bottom
      segments.push(segment(canvas, x * width, y * height, width, height))
    }
  }

  return segments
};

function segment(canvas, x, y, width, height) {
  var ctx = canvas.getContext('2d')
    , imageData = ctx.getImageData(x, y, width, height)
    , segment = document.createElement('canvas')

  segment.width = width
  segment.height = height
  ctx = segment.getContext('2d')
  ctx.putImageData(imageData, 0, 0)

  return segment
};

splitter.splitter = splitter
splitter.segment = segment

module.exports = splitter

},{}],2:[function(require,module,exports){
function lut(red, green, blue, canvas) {
  var red = red || 32, green = green || 32, blue = blue || 32

  if (!canvas) {
    canvas = document.createElement('canvas')
    canvas.width = red * blue
    canvas.height = green
  }

  var r, g, b, x, y
  var ctx = canvas.getContext('2d')
    , width = red * blue
    , height = green
    , data = ctx.getImageData(0, 0, width, height)

  for (r = 0; r < red; r += 1) {
    for (g = 0; g < green; g += 1) {
      for (b = 0; b < blue; b += 1) {
        x = r + b * red
        y = green - g - 1
        data.data[(x + y * width)*4    ] = 255 * (r+0.5) / red
        data.data[(x + y * width)*4 + 1] = 255 * (g+0.5) / green
        data.data[(x + y * width)*4 + 2] = 255 * (b+0.5) / blue
        data.data[(x + y * width)*4 + 3] = 255 // Alpha Channel
      }
    }
  }

  ctx.putImageData(data, 0, 0)

  return canvas
};

module.exports = lut

},{}],3:[function(require,module,exports){
var splitter = require('canvas-splitter')
var rgbLookUpTable = require('lut')

// returns a <canvas> filled with RGB pixel data
var big = rgbLookUpTable(32, 32, 64)

// uses canvas-splitter to slice up the canvas
var little = splitter(big, {
  width: 32, height: 32, cols: 64, rows: 1
})

// add each slice to the page
little.forEach(function(canvas) {
  canvas.setAttribute('style', 'padding:10px; margin:0;')
  console.log(canvas)
  document.body.appendChild(canvas)
})
},{"canvas-splitter":1,"lut":2}]},{},[3]);
