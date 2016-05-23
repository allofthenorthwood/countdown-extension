(function(exports) {

exports.Confetti = function(canvas, ctx, canvasWidth, canvasHeight) {
  var particles = [];

  var PARTICLE_WIDTH = 12;
  var PARTICLE_HEIGHT = 6;
  var PARTICLE_DIAMETER = Math.sqrt(PARTICLE_WIDTH * PARTICLE_WIDTH + PARTICLE_HEIGHT * PARTICLE_HEIGHT);

  function tick() {
    var now = Date.now();
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    for (var i = 0; i < particles.length; i++) {
      var particle = particles[i];
      var age = (now - particle.birth) / 1000;

      var angle = particle.angle + particle.spin * age;
      var x = particle.x + particle.vx * age;
      var y = particle.y + particle.vy * age + 1600 * age * age / 2;

      if (x + PARTICLE_DIAMETER < 0 ||
          x - PARTICLE_DIAMETER > canvasWidth ||
          y - PARTICLE_DIAMETER > canvasHeight) {
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
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillRect(
        -5,
        -5,
        6 * particle.scale,
        12 * particle.scale
      );
      ctx.restore();
    }

    if (particles.length) {
      requestAnimationFrame(tick);
    }
  }

  function random(low, high) {
    return Math.random() * (high - low) + low;
  }

  var colors = [
    "#f6ec09",
    "#ff4500",
    "#85da45",
    "#4ea6f1",
  ];

  function getColor() {
    return colors[Math.floor(random(0, colors.length))];
  }
  canvas.addEventListener("mousedown", function(e) {
    e.preventDefault();
  });

  canvas.addEventListener("click", function(e) {
    var rect = canvas.getBoundingClientRect();
    var cx = e.pageX - rect.left;
    var cy = e.pageY - rect.top;

    if (!particles.length) {
      requestAnimationFrame(tick);
    }

    for (var i = 0; i < 80; i++) {
      var speed = random(225, 675);
      var angle = -Math.PI / 2 + 0.7 * random(-0.5, 0.5);
      particles.push({
        birth: Date.now(),
        color: getColor(),
        x: cx,
        y: cy,
        spin: 20 * random(-0.5, 0.5),
        angle: random(0, 2 * Math.PI),
        scale: random(0.4, 1.0),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed
      });
    }
  }, false);
}

}(globalModules));