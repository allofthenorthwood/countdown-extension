(function(exports) {

exports.PaintSplatters = function(canvas, colorPalettes) {
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  var colors = colorPalettes[randomInt(0, colorPalettes.length - 1)];

  var ctx = canvas.getContext("2d");
  var pixelRatio = 2.0;
  var canvasWidth = canvas.getAttribute("width") / pixelRatio;
  var canvasHeight = canvas.getAttribute("height") / pixelRatio;

  var particles = [];
  var MAX_PARTICLE_SIZE = 10;

  var time = 0;

  function tick() {
    for (var i = 0; i < particles.length; i++) {
      var particle = particles[i];

      var yDirection = randomInt(-10, 10);
      var xDirection = randomInt(-10, 10);
      var particleSizeX = randomInt(0, MAX_PARTICLE_SIZE);
      var particleSizeY = randomInt(0, MAX_PARTICLE_SIZE);

      var x = particle.x + yDirection * particleSizeX;
      var y = particle.y + xDirection * particleSizeY;

      if (x + particleSizeX < 0 ||
          x - particleSizeX > canvasWidth ||
          y - particleSizeX > canvasHeight ||
          particle.time > 10) {
        if (i === particles.length - 1) {
          particles.pop();
        } else {
          particles[i] = particles.pop();
          i--;
        }
        continue;
      }

      ctx.save();
      ctx.translate(x, y);
      ctx.beginPath();
      ctx.fillStyle = particle.color;

      if (ctx.ellipse) {
        ctx.ellipse(
          -5,
          -5,
          particleSizeX,
          particleSizeY,
          Math.random(0, 2 * Math.PI),
          0,
          2 * Math.PI
        );
      } else {
        ctx.arc(
          -5,
          -5,
          particleSize,
          0,
          2 * Math.PI
        );
      }
      ctx.fill();
      ctx.restore();

      particle.x = x;
      particle.y = y;
      particle.time++;
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
    var cx = Math.round((e.pageX - rect.left) / MAX_PARTICLE_SIZE) *
      MAX_PARTICLE_SIZE;
    var cy = Math.round((e.pageY - rect.top) / MAX_PARTICLE_SIZE) *
      MAX_PARTICLE_SIZE;

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