(function(exports) {

// From http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function hexToRgb(hex) {
  // Expand shorthand form (e.g. '03F') to full form (e.g. '0033FF')
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16),
  ] : null;
};

function printHexToRgba(hex, a) {
  var rgb = hexToRgb(hex);
  return 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + a + ')';
};

/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * http://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSL representation
 */
var rgbToHsl = function(rgb) {
  var r = rgb[0] / 255;
  var g = rgb[1] / 255;
  var b = rgb[2] / 255;

  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h /= 6;
  }

  return [h, s, l];
};

var findDarkestColorIdx = function(colors) {
  var darkest = {
    idx: 0,
    lightness: 255,
  };
  for (var i = 0; i < colors.length; i++) {
    var color = colors[i];
    var lightness = rgbToHsl(hexToRgb(color))[2];
    if (lightness < darkest.lightness) {
      darkest = {
        idx: i,
        lightness: lightness,
      };
    }
  }
  return darkest.idx;
}

exports.Lanterns = function(canvas, colorPalettes) {
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

  var lanterns = [];
  var lines = [];

  var drawStarLantern = function(x, y, size, color) {
    var shadeColor = "rgba(30, 30, 40, 0.15)";
    ctx.save();
    ctx.translate(x,y);
    ctx.scale(size / 100,size / 100);
    ctx.strokeStyle = 'rgba(0,0,0,0)';
    ctx.lineCap = 'butt';
    ctx.lineJoin = 'miter';
    ctx.miterLimit = 4;
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(100.2,36.4);
    ctx.lineTo(63.7,35.1);
    ctx.lineTo(50.1,0);
    ctx.lineTo(36.5,35.1);
    ctx.lineTo(0,36.4);
    ctx.lineTo(28.8,60.8);
    ctx.lineTo(19.1,95.3);
    ctx.lineTo(19.6,94.9);
    ctx.lineTo(50.1,75.3);
    ctx.lineTo(81,95.3);
    ctx.lineTo(71.4,60.8);
    ctx.lineTo(100.2,36.4);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    ctx.save();
    ctx.fillStyle = shadeColor;
    ctx.beginPath();
    ctx.moveTo(63.7,35.1);
    ctx.lineTo(50.1,0);
    ctx.lineTo(50.1,53.2);
    ctx.lineTo(63.7,35.1);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    ctx.save();
    ctx.fillStyle = shadeColor;
    ctx.beginPath();
    ctx.moveTo(71.4,60.8);
    ctx.lineTo(100.2,36.4);
    ctx.lineTo(50.1,53.2);
    ctx.lineTo(71.4,60.8);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    ctx.save();
    ctx.fillStyle = shadeColor;
    ctx.beginPath();
    ctx.moveTo(50.1,53.2);
    ctx.lineTo(81,95.3);
    ctx.lineTo(71.4,60.8);
    ctx.lineTo(50.1,53.2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    ctx.save();
    ctx.fillStyle = shadeColor;
    ctx.beginPath();
    ctx.moveTo(19.6,94.9);
    ctx.lineTo(50.1,75.3);
    ctx.lineTo(50.1,53.2);
    ctx.lineTo(19.6,94.9);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    ctx.save();
    ctx.fillStyle = shadeColor;
    ctx.beginPath();
    ctx.moveTo(0,36.4);
    ctx.lineTo(28.8,60.8);
    ctx.lineTo(50.1,53.2);
    ctx.lineTo(0,36.4);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
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

    for (var i = 0; i < lanterns.length; i++) {
      var lantern = lanterns[i];
      // This changes every tick
      var glowSize = lantern.glowSize * randomInt(90, 110) / 100;
      var stringLength = 10;

      // Soft glow:
      /*var glow = ctx.createRadialGradient(
        lantern.position.x + lantern.size / 2,
        lantern.position.y + lantern.size / 2,
        glowSize / 2,
        lantern.position.x + lantern.size / 2,
        lantern.position.y + lantern.size / 2,
        0
      );
      glow.addColorStop(0, printHexToRgba(lantern.color, 0));
      glow.addColorStop(1, lantern.color);
      ctx.fillStyle = glow;
      ctx.globalAlpha = 0.8;

      ctx.fillRect(
        lantern.position.x + lantern.size / 2 - glowSize / 2,
        lantern.position.y + lantern.size / 2 - glowSize / 2,
        glowSize,
        glowSize
      );
      ctx.save();
      ctx.globalAlpha = 1;
      */

      // Hard glow:
      var numGlowCircle = 5;
      for (var circleIdx = 0; circleIdx < numGlowCircle; circleIdx++) {
        var glowAdjustment = randomInt(98, 102) / 100;
        ctx.strokeStyle = printHexToRgba(
          lantern.color,
          circleIdx === numGlowCircle - 1 ? 0.2 : 0.05
        );
        ctx.fillStyle = printHexToRgba(lantern.color, 0.1);
        ctx.moveTo(lantern.position.x, lantern.position.y);
        ctx.beginPath();
        ctx.arc(
          lantern.position.x,
          lantern.position.y + lantern.size / 2 + stringLength,
          glowSize * ( circleIdx + 1 ) / numGlowCircle * glowAdjustment,
          0,
          Math.PI * 2
        );
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }

      ctx.strokeStyle = lantern.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(lantern.position.x, lantern.position.y);
      ctx.lineTo(lantern.position.x, lantern.position.y + stringLength * 2);
      ctx.closePath();
      ctx.stroke();
      ctx.restore();

      drawStarLantern(
        lantern.position.x - lantern.size / 2,
        lantern.position.y + stringLength,
        lantern.size,
        lantern.color
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
    // side of the screen for the edges of the power line:
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

    var getRandomLanternSpot = function(start, end) {
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
      var position = getRandomLanternSpot(i * 0.25, (i + 1) * 0.25);
      var size = randomInt(50, 100);
      lanterns.push({
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