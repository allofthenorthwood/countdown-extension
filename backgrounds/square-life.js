(function(exports) {

exports.SquareLife = function(canvas, colorPalettes) {
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  var colors = colorPalettes[randomInt(0, colorPalettes.length - 1)];

  var ctx = canvas.getContext("2d");
  var pixelRatio = 2.0;
  var canvasWidth = canvas.getAttribute("width") / pixelRatio;
  var canvasHeight = canvas.getAttribute("height") / pixelRatio;

  var particles = [];

  var PARTICLE_SIZE = 10;

  function tick() {
    //ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    for (var i = 0; i < particles.length; i++) {
      var particle = particles[i];

      var yDirection = randomInt(-1, 1);
      var xDirection = randomInt(-1, 1);

      var x = particle.x + yDirection * PARTICLE_SIZE;
      var y = particle.y + xDirection * PARTICLE_SIZE;

      if (x + PARTICLE_SIZE < 0 ||
          x - PARTICLE_SIZE > canvasWidth ||
          y - PARTICLE_SIZE > canvasHeight) {
        // swap!
        if (i === particles.length - 1) {
          particles.pop();
        } else {
          particles[i] = particles.pop();
          i--;
        }
        continue;
      }

      ctx.save();
      ctx.fillStyle = particle.color;
      // This is pretty cool too:
      //ctx.globalAlpha = 0.3;
      ctx.translate(x, y);
      ctx.fillRect(
        -5,
        -5,
        PARTICLE_SIZE,
        PARTICLE_SIZE
      );
      ctx.restore();

      particle.time++;
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

    for (var i = 0; i < 80; i++) {
      particles.push({
        time: 0,
        color: colors[randomInt(0, colors.length - 1)],
        x: cx,
        y: cy,
      });
    }
  }, false);
}

}(globalModules));