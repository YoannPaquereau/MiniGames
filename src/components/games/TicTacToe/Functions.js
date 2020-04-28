export const startGame = () => {
  myGameArea.start();
};

var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 500;
    this.canvas.height = 500;
    this.context = this.canvas.getContext("2d");
    this.player = "O";
    this.checkbox = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    document.getElementById("game").appendChild(this.canvas);

    drawGame();
  },
};

export const drawGame = () => {
  var x = 25;
  var y = 25;

  for (var i = 1; i <= 2; i++) {
    myGameArea.context.beginPath();
    myGameArea.context.moveTo(x, y + 150 * i);
    myGameArea.context.lineTo(myGameArea.canvas.width - 25, y + 150 * i);
    myGameArea.context.stroke();
  }

  for (var j = 1; j <= 2; j++) {
    myGameArea.context.beginPath();
    myGameArea.context.moveTo(x + 150 * j, y);
    myGameArea.context.lineTo(x + 150 * j, myGameArea.canvas.height - 25);
    myGameArea.context.stroke();
  }
};

export const onClick = (event) => {
  var rect = myGameArea.canvas.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;

  var line = -1;
  var column = -1;

  if (y > 25 && y < 150 + 25) line = 0;
  else if (y > 150 + 25 && y < 150 * 2 + 25) line = 1;
  else if (y > 150 * 2 + 25 && y < myGameArea.canvas.height - 25) line = 2;

  if (line !== -1) {
    if (x > 25 && x < 150 + 25) column = 0;
    else if (x > 150 + 25 && x < 150 * 2 + 25) column = 1;
    else if (x > 150 * 2 + 25 && x < myGameArea.canvas.width - 25) column = 2;
  }

  if (column !== -1) {
    return { line: line, column: column };
  } else {
    return false;
  }
};

export const drawCase = (data) => {
  myGameArea.checkbox = data.checkbox;
  var x = 0, y = 0;

  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (myGameArea.checkbox[i][j].id === data.player.id) {
        x = 40 + 150 * j;
        y = 40 + 150 * i;

        myGameArea.context.beginPath();
        myGameArea.context.moveTo(x, y);
        myGameArea.context.lineTo(x + 120, y + 120);
        myGameArea.context.stroke();

        myGameArea.context.beginPath();
        myGameArea.context.moveTo(x + 120, y);
        myGameArea.context.lineTo(x, y + 120);
        myGameArea.context.stroke();
      } else if (myGameArea.checkbox[i][j].id === data.player2.id) {
        x = 25 + 150 * j + 75;
        y = 25 + 150 * i + 75;

        myGameArea.context.beginPath();
        myGameArea.context.arc(x, y, 60, 0, 2 * Math.PI, false);
        myGameArea.context.stroke();
      }
    }
  }
};