(function(exports) {

var hexToRgb = exports.colorHelpers.hexToRgb;
var printHexToRgba = exports.colorHelpers.printHexToRgba;
var rgbToHsl = exports.colorHelpers.rgbToHsl;
var findDarkestColorIdx = exports.colorHelpers.findDarkestColorIdx;

exports.Birds = function(canvas, colorPalettes) {
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  var colors = colorPalettes[randomInt(0, colorPalettes.length - 1)];
  var backgroundColorIdx = findDarkestColorIdx(colors);
  backgroundColor = colors[backgroundColorIdx];
  colors.splice(backgroundColorIdx, 1);

  var ctx = canvas.getContext("2d");
  var pixelRatio = 2.0;
  var canvasWidth = canvas.getAttribute("width") / pixelRatio;
  var canvasHeight = canvas.getAttribute("height") / pixelRatio;

  var birds = [];
  var lines = [];

  var drawBird = function(x, y, size, color) {
    ctx.save();
    ctx.translate(x,y);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(0, 5, size / 1.5, size, 0, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };

  var getRandomColor = function() {
    var color = colors[randomInt(0, colors.length - 1)];
    return color;
  };

  function tick() {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];

      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = line.color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(
        line.leftPoint.x,
        line.leftPoint.y
      );
      ctx.quadraticCurveTo(
        line.controlPoint.x,
        line.controlPoint.y,
        line.rightPoint.x,
        line.rightPoint.y
      );
      ctx.stroke();
      ctx.restore();
    }

    for (var i = 0; i < birds.length; i++) {
      var bird = birds[i];

      drawBird(
        bird.position.x - bird.size / 2,
        bird.position.y - bird.size,
        bird.size,
        bird.color
      );

    }
  }

  canvas.addEventListener("mousedown", function(e) {
    e.preventDefault();
  });

  canvas.addEventListener("click", function(e) {
    var rect = canvas.getBoundingClientRect();
    var clickPoint = {
      x: e.pageX - rect.left,
      y: e.pageY - rect.top,
    };

    // Pick a point on the left side of the screen, and a point on the right
    // side of the screen for the edges of the line:
    var leftPoint = {
      x: -300,
      y: randomInt(clickPoint.y - 400, clickPoint.y - 50),
    };
    var rightPoint = {
      x: canvasWidth + 300,
      y: randomInt(clickPoint.y - 400, clickPoint.y - 50),
    };

    var controlPoint = {
      x: clickPoint.x * 2 - (leftPoint.x + rightPoint.x) / 2,
      y: clickPoint.y * 2 - (leftPoint.y + rightPoint.y) / 2,
    };

    var getRandomBirdSpot = function(start, end) {
      start = start || 0;
      end = end || 1;
      // A number 0 <= t <= 1 that's between start & end and then shifted over
      // to chop off the last 5% on either side
      var t = randomInt(start * 1000, end * 1000) / 1000 * 0.9 + 0.05;
      var x = (1 - t) * ((1 - t) * leftPoint.x + (t * controlPoint.x)) +
        t * ((1 - t) * controlPoint.x + (t * rightPoint.x));
      var y = (1 - t) * ((1 - t) * leftPoint.y + (t * controlPoint.y)) +
        t * ((1 - t) * controlPoint.y + (t * rightPoint.y));
      return {
        x: x,
        y: y,
      };
    };

    lines.push({
      leftPoint: leftPoint,
      controlPoint: controlPoint,
      rightPoint: rightPoint,
      color: getRandomColor(),
    });

    for (var i = 0; i < 4; i++) {
      var position = getRandomBirdSpot(i * 0.25, (i + 1) * 0.25);
      var size = randomInt(50, 100);
      birds.push({
        line: lines.length - 1,
        position: position,
        color: getRandomColor(),
        size: size,
        glowSize: (size * randomInt(150, 200) / 100) / 2,
      });
    }

  }, false);

  window.setInterval(function() {
    requestAnimationFrame(tick);
  }, 300);
}

}(globalModules));