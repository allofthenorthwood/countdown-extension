(function(exports) {

  var canvas = document.getElementById("main-background-canvas");
  var ctx = canvas.getContext("2d");
  var pixelRatio = 2.0;
  var canvasWidth = window.innerWidth;
  var canvasHeight = window.innerHeight;
  canvas.setAttribute("width", canvasWidth * pixelRatio);
  canvas.setAttribute("height", canvasHeight * pixelRatio);
  canvas.style.width = canvasWidth + "px";
  canvas.style.height = canvasHeight + "px";
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  var fancyBackgrounds = [
    exports.Confetti,
    exports.SquareLife,
    exports.SquareRandomWalk,
    exports.PaintSplatters,
    exports.Lanterns,
  ];
  var idx = randomInt(0, fancyBackgrounds.length - 1);

  var fancyBackground = fancyBackgrounds[idx];

  //exports.ShowColorPalettes(canvas, exports.colorPalettes);
  fancyBackground(canvas, exports.colorPalettes);

})(globalModules);