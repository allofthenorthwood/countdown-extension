(function(exports) {

exports.ShowColorPalettes = function(canvas, colorPalettes) {
  var ctx = canvas.getContext("2d");
  var canvasWidth = canvas.getAttribute("width");
  var canvasHeight = canvas.getAttribute("height");

  var colorWidth = 30;
  var colorHeight = 50;

  var widthOffset = 0;

  for (var i = 0, height = 0; i < colorPalettes.length; i++, height++) {
    var colors = colorPalettes[i];

    for (var j = 0; j < colors.length; j++) {
      var color = colors[j];
      var x = j * colorWidth + widthOffset;
      var y = height * colorHeight;
      ctx.save();
      ctx.fillStyle = color;
      ctx.translate(x, y);
      ctx.fillRect(
        -5,
        -5,
        colorWidth,
        colorHeight
      );
      ctx.fillText(i.toString(), 0, -10);
      ctx.restore();
    }

    console.log(height, colorHeight, (height + 1) * colorHeight, +canvasHeight)
    if ((height + 2) * colorHeight >= +canvasHeight / 2) {
      widthOffset += colorWidth * colors.length + 10;
      height = -1;
    }
  }
}

}(globalModules));