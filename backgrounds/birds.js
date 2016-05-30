(function(exports) {

exports.Birds = function(canvas, colorPalettes) {
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  var colors = colorPalettes[randomInt(0, colorPalettes.length - 1)];

  var ctx = canvas.getContext("2d");
  var pixelRatio = 2.0;
  var canvasWidth = canvas.getAttribute("width") / pixelRatio;
  var canvasHeight = canvas.getAttribute("height") / pixelRatio;

  var birds = [];
  var lines = [];

  var getRandomColor = function() {
    return colors[randomInt(0, colors.length)];
  }

  function tick() {

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];

      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = line.color;
      ctx.lineWidth = 2;
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
      console.log(bird)

      ctx.save();
      ctx.fillStyle = bird.color;
      ctx.fillRect(bird.roost.x, bird.roost.y, 20, 20);
      ctx.restore();
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
      x: 0,
      y: randomInt(clickPoint.y - 100, clickPoint.y - 50),
    };
    var rightPoint = {
      x: canvasWidth,
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

    requestAnimationFrame(tick);

    lines.push({
      leftPoint: leftPoint,
      controlPoint: controlPoint,
      rightPoint: rightPoint,
      color: getRandomColor(),
      getRandomRoost: getRandomRoost,
    });

    for (var i = 0; i < 4; i++) {
      var roost = getRandomRoost();
      birds.push({
        line: lines.length - 1,
        roost: roost,
        color: getRandomColor(),
      });
    }

  }, false);
}

}(globalModules));