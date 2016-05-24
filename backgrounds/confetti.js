(function(exports) {

exports.Confetti = function(canvas, colorPalettes) {
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function random(low, high) {
    return Math.random() * (high - low) + low;
  }
  var colors = colorPalettes[randomInt(0, colorPalettes.length - 1)];
  // really nice colors
  // colors = ["#F04155", "#FF823A", "#F2F26F", "#FFF7BD", "#95CFB7"];

  var ctx = canvas.getContext("2d");
  var canvasWidth = canvas.getAttribute("width");
  var canvasHeight = canvas.getAttribute("height");

  var particles = [];

  var PARTICLE_WIDTH = 24;
  var PARTICLE_HEIGHT = 12;
  var PARTICLE_DIAMETER = Math.sqrt(PARTICLE_WIDTH * PARTICLE_WIDTH +
    PARTICLE_HEIGHT * PARTICLE_HEIGHT);
  var GRAVITY = 2000;

  function tick() {
    var now = Date.now();
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    for (var i = 0; i < particles.length; i++) {
      var particle = particles[i];
      var age = (now - particle.birth) / 1000;

      var angle = particle.angle + particle.spin * age;
      var x = particle.x + particle.vx * age;
      var y = particle.y + particle.vy * age + GRAVITY * age * age / 2;

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
        PARTICLE_HEIGHT * particle.scale,
        PARTICLE_WIDTH * particle.scale
      );
      ctx.restore();
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
    var cx = e.pageX - rect.left;
    var cy = e.pageY - rect.top;

    if (!particles.length) {
      requestAnimationFrame(tick);
    }

    for (var i = 0; i < 80; i++) {
      var speed = random(450, 1350);
      var angle = -Math.PI / 2 + 0.7 * random(-0.5, 0.5);
      particles.push({
        birth: Date.now(),
        color: colors[Math.floor(random(0, colors.length))],
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