const fs = require('fs');
let input;
try {
  input = fs.readFileSync('./testInput.txt', 'utf8')
} catch(err) {
  throw(err);
}
const endCharCode = "E".charCodeAt();
const splitInput = input.split('\n');
const grid = [];
let startCoord = [0, 0];
let endCoord = [];

input.split('\r\n').forEach(l => grid.push(l.split('')))

grid.forEach((row, rowI) => {
  const startIndex = row.findIndex(x => x == 'S');
  if (startIndex > -1) {
    startCoord = [rowI, startIndex]
  }
  const endIndex = row.findIndex(x => x =='E');
  if (endIndex > -1) {
    endCoord = [rowI, endIndex]
  }
});

const steps = [];
function doIt(currentCoord, currentSteps, prevDir) {
  // return when you cannot go left, up, right, down || you are at S
  /*
  const fallenOutsideGrid = currentCoord[0] < 0 || currentCoord[0] > grid[0].length - 1 ||  currentCoord[1] < 0 || currentCoord[1] > grid.length - 1;
  if (fallenOutsideGrid) {
    return;
  }
  */


  // grid[row(y)][col(x)]
  // coord[x(col), y(row)]
  const column = currentCoord[0];
  const row = currentCoord[1];

  const currentChar = grid[row][column];
  const currentCharCode = currentChar.charCodeAt();

  // if moved left to get here, don't go right
  // if moved right to get here, don't get left
  // if moved down to get here, don't go up
  // if moved up to get here, don't go down
  
  //  left
  if (prevDir !== 'right' && column - 1 > -1) {
    let left = [currentCoord[0] - 1, currentCoord[1]];
    let leftChar = grid[row][column - 1];
    if (leftChar == 'E') {
      steps.push(currentSteps + 1);
      return;
    }
    if (leftChar && (leftChar.charCodeAt() - 1 == currentCharCode || leftChar.charCodeAt() <= currentCharCode || currentChar == 'S')) {
      doIt(left, currentSteps + 1, 'left')
    }
  }

  // up
  if (prevDir !== 'down' && row - 1 > -1) {
    let up = [currentCoord[0], currentCoord[1] - 1];
    let upChar = grid[row - 1][column];
    if (upChar == 'E') {
      steps.push(currentSteps + 1);
      return;
    }
    if (upChar && (upChar.charCodeAt() -1 == currentCharCode || upChar.charCodeAt() <= currentCharCode || currentChar == 'S')) {
      doIt(up, currentSteps + 1, 'up');
    }
  }

  // right
  if (prevDir !== 'left' && column + 1 <= grid[0].length - 1) {
    let right = [currentCoord[0] + 1, currentCoord[1]];
    let rightChar = grid[row][column + 1];
    if (rightChar == 'E') {
      steps.push(currentSteps + 1);
      return;
    }
    if (rightChar && (rightChar.charCodeAt() - 1 == currentCharCode || rightChar.charCodeAt() <= currentCharCode || currentChar == 'S')) {
      doIt(right, currentSteps + 1, 'right');
    }
  }

  // down
  if (prevDir !== 'up' && row + 1 <= grid.length) {
    let down = [currentCoord[0], currentCoord[1] + 1];
    let downChar = grid[row + 1][column];
    if (downChar == 'E') {
      steps.push(currentSteps + 1);
      return;
    }
    if (downChar && (downChar.charCodeAt() - 1 == currentCharCode || downChar.charCodeAt() <= currentCharCode || currentChar == 'S')) {
      doIt(down, currentSteps + 1, 'down');
    }
  }
}

doIt(startCoord, 0, null)
console.log(steps);

