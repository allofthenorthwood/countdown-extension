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

    exports.Confetti(canvas, ctx, canvasWidth, canvasHeight);

})(globalModules);