(function(exports) {


// From http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function hexToRgba(hex, a) {
  // Expand shorthand form (e.g. '03F') to full form (e.g. '0033FF')
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    return null;
  }
  var rgb = [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16),
  ];
  return 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + a + ')';
};

exports.Lanterns = function(canvas, colorPalettes) {
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  var colors = colorPalettes[randomInt(0, colorPalettes.length - 1)];

  var ctx = canvas.getContext("2d");
  var pixelRatio = 2.0;
  var canvasWidth = canvas.getAttribute("width") / pixelRatio;
  var canvasHeight = canvas.getAttribute("height") / pixelRatio;

  var lanterns = [];
  var lines = [];

  var drawStarLantern = function(x, y, size, color) {
    var shadeColor = "rgba(50, 50, 100, 0.15)";
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
    var color = colors[randomInt(1, colors.length - 1)];
    return color;
  };

  function tick() {
    ctx.fillStyle = colors[0];
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

      var glow = ctx.createRadialGradient(
        lantern.roost.x + lantern.size / 2,
        lantern.roost.y + lantern.size / 2,
        glowSize / 2,
        lantern.roost.x + lantern.size / 2,
        lantern.roost.y + lantern.size / 2,
        0
      );
      glow.addColorStop(0, hexToRgba(lantern.color, 0));
      glow.addColorStop(1, lantern.color);
      ctx.fillStyle = glow;
      ctx.globalAlpha = 0.8;
      ctx.fillRect(
        lantern.roost.x + lantern.size / 2 - glowSize / 2,
        lantern.roost.y + lantern.size / 2 - glowSize / 2,
        glowSize,
        glowSize
      );
      ctx.globalAlpha = 1;
      drawStarLantern(
        lantern.roost.x,
        lantern.roost.y,
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
      x: -100,
      y: randomInt(clickPoint.y - 100, clickPoint.y - 50),
    };
    var rightPoint = {
      x: canvasWidth + 100,
      y: randomInt(clickPoint.y - 100, clickPoint.y - 50),
    };

    var controlPoint = {
      x: clickPoint.x * 2 - (leftPoint.x + rightPoint.x) / 2,
      y: clickPoint.y * 2 - (leftPoint.y + rightPoint.y) / 2,
    };

    var getRandomRoost = function() {
      var t = Math.random(0, 1);
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
      getRandomRoost: getRandomRoost,
    });

    for (var i = 0; i < 4; i++) {
      var roost = getRandomRoost();
      // TODO: space out the lanterns
      var size = randomInt(50, 100);
      lanterns.push({
        line: lines.length - 1,
        roost: roost,
        color: getRandomColor(),
        size: size,
        glowSize: (size * randomInt(200, 300) / 100) / 2,
      });
    }

  }, false);

  window.setInterval(function() {
    requestAnimationFrame(tick);
  }, 300);
}

}(globalModules));