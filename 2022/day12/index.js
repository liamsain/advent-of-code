const fs = require('fs');
const prompt = require('prompt-sync')({ sigint: true });
let input;
try {
  input = fs.readFileSync('./input.txt', 'utf8')
} catch (err) {
  throw (err);
}
const endCharCode = "E".charCodeAt();
const splitInput = input.split('\n');
const grid = [];
let gridWidth = 0;
let gridLength = 0;
let startCoord = [0, 0];
let endCoord = [];
const stepsToEnd = [];

input.split('\r\n').forEach((line, lineIndex) => {
  const row = [];
  line.split('').forEach((ch, chIndex) => {
    const node = {
      ch,
      charCode: ch.charCodeAt(),
      x: chIndex,
      y: lineIndex,
      visited: false,
      isEnd: ch == 'E',
      isStart: ch == 'S',
    };
    row.push(node);
  });
  grid.push(row);
});
gridLength = grid.length;
gridWidth = grid[0].length;

function drawGridWithYouAreHere(currentNode, steps) {
  console.clear();
  let xStart = 0;
  let xEnd = 0;
  let yStart = 0;
  let yEnd = 0;
  if (currentNode.x > 20) {
    xStart = currentNode.x - 20;
  }
  if (currentNode.x + 30 < grid[0].length) {
    xEnd = currentNode.x + 30;
  } else {
    xEnd = grid[0].length
  }
  if (currentNode.y > 20) {
    yStart = currentNode.y - 20;
  }
  if (currentNode.y + 20 < grid.length) {
    yEnd = currentNode.y + 20;
  } else {
    yEnd = grid.length;
  }

  grid.forEach((row, rowIndex) => {
    if (rowIndex >= yStart && rowIndex <= yEnd) {
      const rowLine = row.map(n => ({ ...n })).slice(xStart, xEnd);
      if (rowIndex == currentNode.y) {
        const currentPos = rowLine.find(n => n.x == currentNode.x);
        if (currentPos) {
          currentPos.ch = '\u2588';
        }
      }
      console.log(rowLine.map(n => {
        if (n.x == currentNode.x && n.y == currentNode.y) {
          return 'H'
        } 
        if (n.charCode > currentNode.charCode + 1) {
          return '\u2588'
        }
        if (n.charCode == currentNode.charCode + 1) {
          return '\u259F'
        }
        if (n.charCode == currentNode.charCode) {
          // return '\u2591';
          return ' '
        }
        return '\u2593';
      }).join(' '));
    }
  });
  console.log('steps', steps);
  prompt('>');
}

function pathFind(currentNode, currentSteps, cameFrom) {
  drawGridWithYouAreHere(currentNode, currentSteps);

  // if cameFrom right, don't go left
  if (currentNode.visited) {
    return;
  }
  if (currentNode.isEnd) {
    stepsToEnd.push(currentSteps + 1);
    return;
  }
  currentNode.visited = true;
  // priority: if currently z, look for end
  // else, try and step up
  // else, try and go lower
  const stepUps = [];
  const sameLevelSteps = [];
  const lowerSteps = [];
  let end;
  let rightNode;
  let downNode;
  let leftNode;
  let upNode;

  const processNode = node => {
    if (currentNode.ch == 'z') {
      if (node.isEnd) {
        end = node;
      }
    }
    if (node.charCode == currentNode.charCode + 1 || currentNode.isStart) {
      stepUps.push(node);
    } else if (node.charCode == currentNode.charCode) {
      sameLevelSteps.push(node);
    } else if (node.charNode < currentNode.charCode) {
      lowerSteps.push(node);
    }
  };
  const canGoRight = currentNode.x + 1 <= gridWidth - 1;
  if (canGoRight) {
    rightNode = grid[currentNode.y][currentNode.x + 1];
    processNode(rightNode);
  }
  const canGoDown = currentNode.y + 1 <= gridLength - 1;
  if (canGoDown) {
    downNode = grid[currentNode.y + 1][currentNode.x];
    processNode(downNode);
  }
  const canGoLeft = currentNode.x - 1 >= 0;
  if (canGoLeft) {
    leftNode = grid[currentNode.y][currentNode.x - 1];
    processNode(leftNode);
  }
  const canGoUp = currentNode.y - 1 >= 0;
  if (canGoUp) {
    upNode = grid[currentNode.y - 1][currentNode.x];
    processNode(upNode);
  }

  if (end) {
    pathFind(end, currentSteps + 1);
  }
  if (stepUps.length) {
    stepUps.forEach(n => pathFind(n, currentSteps + 1));
  }
  if (lowerSteps.length) {
    lowerSteps.forEach(n => pathFind(n, currentSteps + 1));
  }

  if (sameLevelSteps.length) {
    sameLevelSteps.forEach(n => pathFind(n, currentSteps + 1));
  }

  // // lookRight
  // if (canGoRight && cameFrom !== 'left') {
  //   if (rightNode.charCode - 1 <= currentNode.charCode || currentNode.isStart) {
  //     pathFind(rightNode, currentSteps + 1, 'right');
  //   }
  // }

  // // look down
  // if (canGoDown && cameFrom !== 'up') {
  //   if (downNode.charCode - 1 <= currentNode.charCode || currentNode.isStart) {
  //     pathFind(downNode, currentSteps + 1, 'down');
  //   }
  // }

  // // look left
  // if (canGoLeft && cameFrom !== 'right') {
  //   if (leftNode.charCode - 1 <= currentNode.charCode || currentNode.isStart) {
  //     pathFind(leftNode, currentSteps + 1, 'left');
  //   }
  // }

  // // up
  // if (canGoUp && cameFrom !== 'down') {
  //   if (upNode.charCode - 1 <= currentNode.charCode || currentNode.isStart) {
  //     pathFind(upNode, currentSteps + 1, 'up');
  //   }
  // }

}
pathFind(grid[0][0], 0);
console.log(stepsToEnd);
