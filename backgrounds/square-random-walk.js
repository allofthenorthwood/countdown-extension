(function(exports) {

exports.SquareRandomWalk = function(canvas, colorPalettes) {
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  var colors = colorPalettes[randomInt(0, colorPalettes.length - 1)];

  var ctx = canvas.getContext("2d");
  var canvasWidth = canvas.getAttribute("width");
  var canvasHeight = canvas.getAttribute("height");

  var particles = [];
  var grid = [];

  var PARTICLE_SIZE = 10;

  function tick() {
    for (var i = 0; i < particles.length; i++) {
      var particle = particles[i];

      possibleMoves = [];
      for (var xD = -1; xD <= 1; xD++) {
        for (var yD = -1; yD <= 1; yD++) {
          var x = particle.x + xD * PARTICLE_SIZE;
          var y = particle.y + yD * PARTICLE_SIZE;
          if (!(grid[x] && grid[x][y])) {
            possibleMoves.push({x: x, y: y});
          }
        }
      }

      var move = possibleMoves[randomInt(0, possibleMoves.length - 1)];

      if (!move || (move.x + PARTICLE_SIZE < 0 ||
          move.x - PARTICLE_SIZE > canvasWidth ||
          move.y - PARTICLE_SIZE > canvasHeight)) {
        if (i === particles.length - 1) {
          particles.pop();
        } else {
          particles[i] = particles.pop();
          i--;
        }
        continue;
      }

      var x = move.x;
      var y = move.y;

      if (!grid[x]) {
        grid[x] = [];
      }
      grid[x][y] = 1;

      ctx.save();
      ctx.fillStyle = particle.color;
      ctx.translate(x, y);
      ctx.fillRect(
        -5,
        -5,
        PARTICLE_SIZE,
        PARTICLE_SIZE
      );
      ctx.restore();

      particle.x = x;
      particle.y = y;
    }

    if (particles.length) {
      requestAnimationFrame(tick);
    }
  }

  canvas.addEventListener("mousedown", function(e) {
    e.preventDefault();
  });

  canvas.addEventListener("click", function(e) {
    var rect = canvas.getBoundingClientRect();
    var cx = Math.round((e.pageX - rect.left) / PARTICLE_SIZE) * PARTICLE_SIZE;
    var cy = Math.round((e.pageY - rect.top) / PARTICLE_SIZE) * PARTICLE_SIZE;

    if (!particles.length) {
      requestAnimationFrame(tick);
    }

    for (var i = 0; i < 10; i++) {
      particles.push({
        color: colors[randomInt(0, colors.length)],
        x: cx,
        y: cy,
      });
    }
  }, false);
}

}(globalModules));