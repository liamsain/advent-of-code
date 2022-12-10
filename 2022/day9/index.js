const testInput = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;
const prompt = require('prompt-sync')({sigint: true});
const fs = require('fs');
let input;
try {
  input = fs.readFileSync('./input.txt', 'utf8');
} catch (err) {
  console.error(err);
}
const splitInput = input.split('\n');

const gridBoundaries = [0, 0];
let gridXLeft = 0;
let gridXRight = 0;
let gridYTop = 0;
let gridYBottom = 0;

const origin = [0, 0];
const hPos = [0, 0];
const tPos = [0, 0]
const tPositions = [[0, 0]]; 

const moveCoord = (coord, direction) => {
	if (direction == 'R') {
		coord[0] += 1;
	} else if (direction == 'L') {
		coord[0] -= 1;
	} else if (direction == 'D') {
		coord[1] -= 1
	} else {
		coord[1] += 1;
	}
};

// for debugging
function updateDrawnGrid() {
  if (hPos[0] > gridXRight) {
    gridXRight = hPos[0];
  } else if (hPos[0] < gridXLeft) {
    gridXLeft = hPos[0];
  }
  if (hPos[1] > gridYTop) {
    gridYTop = hPos[1];
  } else if (hPos[1] < gridYBottom) {
    gridYBottom = hPos[1];
  }
  const grid = [];
  for (let row = gridYTop; row >= gridYBottom; row--) {
    let line = [];
    for (let col = gridXLeft; col <= gridXRight; col++) {
      const hAndTMatch = hPos[0] == tPos[0] && hPos[1] == tPos[1];
      if (hPos[0] == col && hPos[1] == row) {
        line.push('H ');
        continue;
      }
      if (tPos[0] == col && tPos[1] == row) {
        if (!hAndTMatch) {
          line.push('T ');
          continue;
        }
      }
      line.push('. ');
    }
    grid.push([...line]);
    line = [];
  }
  // draw it
  grid.forEach(x => {
    console.log(x.join(''))
  })
  // prompt('>');
}

console.time('fun');
for (let commandIndex = 0; commandIndex < splitInput.length; commandIndex++) {
	const row = splitInput[commandIndex]
	const direction = row[0];
	const amount = Number(row.split(' ')[1]);
	for (let i =0; i < amount; i++) {
    /*
    console.clear();
    console.info(`Executing: ${row}`); 
    console.info(`Next: ${splitInput[commandIndex + 1]}`); 
    */

		moveCoord(hPos, direction);
    const hx = hPos[0]
    const hy = hPos[1];
    const tx = tPos[0];
    const ty = tPos[1];
    const xDiff = hx - tx;
    const yDiff = hy - ty;
    const tMustMove = xDiff > 1 || xDiff < -1 || yDiff > 1 || yDiff < -1;

    if (tMustMove) {
      const hIsSameLineRight = hx > tx && hy == ty;
      const hIsSameLineLeft = hx < tx && hy == ty;
      const hIsDiagUpRight = hx > tx && hy > ty;
      const hIsDiagUpLeft = hx < tx && hy > ty;
      const hIsDiagDownRight = hx > tx && hy < ty;
      const hIsDiagDownLeft = hx < tx && hy < ty;
      const hIsSameColDown = hy < ty && hx == tx;
      const hIsSameColUp = hy > ty && hx == tx;

      if (hIsSameLineRight) {
        tPos[0] += 1;
      } else if (hIsSameLineLeft) {
        tPos[0] -= 1;
      } else if (hIsDiagUpRight) {
        tPos[0] += 1;
        tPos[1] += 1;
      } else if (hIsDiagUpLeft) {
        tPos[0] -= 1;
        tPos[1] += 1;
      } else if (hIsDiagDownRight) {
        tPos[0] += 1;
        tPos[1] -= 1;
      } else if (hIsDiagDownLeft) {
        tPos[0] -= 1;
        tPos[1] -= 1;
      } else if (hIsSameColDown) {
        tPos[1] -= 1;
      } else if (hIsSameColUp) {
        tPos[1] += 1;
      } else {
        console.error("you didn't account for this case you silly billy");
      }

      addCoordToTPos([...tPos]);
    }
    // updateDrawnGrid();
	}
}
function addCoordToTPos(coord) {
  const existing = tPositions.find(x => x[0] == coord[0] && x[1] == coord[1]);
  if (!existing) {
    tPositions.push([...coord]);
  }
}

console.log('unique tail positions count:', tPositions.length);

console.timeEnd('fun');

