(function(exports) {

exports.Life = function(canvas, colorPalettes) {
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  var colors = colorPalettes[randomInt(0, colorPalettes.length - 1)];

  var ctx = canvas.getContext("2d");
  var pixelRatio = 2.0;
  var canvasWidth = canvas.getAttribute("width") / pixelRatio;
  var canvasHeight = canvas.getAttribute("height") / pixelRatio;

  var PARTICLE_SIZE = 20;
  var BOARD_WIDTH = Math.floor(canvasWidth / PARTICLE_SIZE);
  var BOARD_HEIGHT = Math.floor(canvasHeight / PARTICLE_SIZE);

  console.log(BOARD_HEIGHT, BOARD_WIDTH)

  var newBoard = function() {
    var board = [];
    for (var i = 0; i < BOARD_HEIGHT; i++) {
      board[i] = [];
      for (var j = 0; j < BOARD_WIDTH; j++) {
        board[i][j] = Math.random() > 0.9 ? 1: 0;
      }
    }
    return board;
  };

  var currentBoard = newBoard();
  var nextBoard = newBoard();

  var countNeighbours = function(board, row, col) {
    var aboveRow = (row === 0) ? BOARD_HEIGHT - 1 : row - 1;
    var belowRow = (row === BOARD_HEIGHT - 1) ? 0 : row + 1;
    var prevCol = (col === 0) ? BOARD_WIDTH - 1 : col - 1;
    var nextCol = (col === BOARD_HEIGHT - 1) ? 0 : col + 1;

    return (
      board[aboveRow][prevCol] +
      board[aboveRow][col] +
      board[aboveRow][nextCol] +
      board[row][prevCol] +
      board[row][nextCol] +
      board[belowRow][prevCol] +
      board[belowRow][col] +
      board[belowRow][nextCol]
    );
  };

  function tick() {
    //ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    var color = colors[0];

    for (var i = 0; i < BOARD_HEIGHT; i++) {
      for (var j = 0; j < BOARD_WIDTH; j++) {
        var neighbours = countNeighbours(currentBoard, i, j);
        var state = currentBoard[i][j];
        if (neighbours < 2) {
          // Any live cell with fewer than two live neighbours dies, as if
          // caused by under-population.
          state = 0;
        } else if (neighbours > 3) {
          // Any live cell with two or three live neighbours lives on to the
          // next generation.
          state = 0;
        } else if (state === 1 && (neighbours === 2 || neighbours === 3)) {
          // Any live cell with more than three live neighbours dies, as if
          // by over-population.

        } else if (state === 0 && neighbours === 3) {
          // Any dead cell with exactly three live neighbours becomes a live
          // cell, as if by reproduction.
          state = 1;
        }
        nextBoard[i][j] = state;
      }
    }

    for (var i = 0; i < BOARD_HEIGHT; i++) {
      for (var j = 0; j < BOARD_WIDTH; j++) {

        ctx.save();
        ctx.fillStyle = nextBoard[i][j] ? color : "#fff";
        ctx.translate(j * PARTICLE_SIZE, i * PARTICLE_SIZE);
        ctx.fillRect(
          0,
          0,
          PARTICLE_SIZE,
          PARTICLE_SIZE
        );
        ctx.fillStyle = !nextBoard[i][j] ? color : "#fff";
        ctx.fillText(
          countNeighbours(nextBoard, i, j).toString(),
          PARTICLE_SIZE / 2,
          PARTICLE_SIZE / 1.5);
        ctx.restore();
      }
    }

    currentBoard = nextBoard;
  }

  canvas.addEventListener("mousedown", function(e) {
    e.preventDefault();
  });

  canvas.addEventListener("click", function(e) {
    var rect = canvas.getBoundingClientRect();
    var cx = Math.round((e.pageX - rect.left) / PARTICLE_SIZE) * PARTICLE_SIZE;
    var cy = Math.round((e.pageY - rect.top) / PARTICLE_SIZE) * PARTICLE_SIZE;

    // TODO: use clicks for something

  }, false);

  window.setInterval(function() {
    requestAnimationFrame(tick);
  }, 300);
}

}(globalModules));