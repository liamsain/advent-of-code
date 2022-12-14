const prompt = require('prompt-sync')({sigint: true});
const fs = require('fs');
let input;
try {
  input = fs.readFileSync('./input.txt', 'utf8');
} catch (err) {
  console.error(err);
}

const splitInput = input.split('\n');

let gridXLeft = 0;
let gridXRight = 0;
let gridYTop = 0;
let gridYBottom = 0;

const tPositions = [[0, 0]]; 
const rope = new Array(10).fill(0).map((x, i) => ({
  ch: i == 0 ? 'H' : i.toString(),
  coord: [0, 0]
}))

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

  // expand the grid if pos of head exceeds it
  const head = rope[0].coord
  if (head[0] > gridXRight) {
    gridXRight = head[0];
  } else if (head[0] < gridXLeft) {
    gridXLeft = head[0];
  }
  if (head[1] > gridYTop) {
    gridYTop = head[1];
  } else if (head[1] < gridYBottom) {
    gridYBottom = head[1];
  }

  const grid = [];
  for (let row = gridYTop; row >= gridYBottom; row--) {
    let line = [];
    for (let col = gridXLeft; col <= gridXRight; col++) {
      let toPush = '. ';
      for (let i = rope.length - 1; i >= 0;i--) {
        if (rope[i].coord[0] == col && rope[i].coord[1] == row) {
          toPush = `${rope[i].ch} `;
        }
      }
      line.push(toPush);
    }
    grid.push([...line]);
    line = [];
  }
  grid.forEach(x => {
    console.log(x.join(''))
  })
    prompt('>');
}

console.time('execution');
function moveFollower(follower, leader) {
    let moved = false;
    const hx = leader[0]
    const hy = leader[1];
    const tx = follower[0];
    const ty = follower[1];
    const xDiff = hx - tx;
    const yDiff = hy - ty;
    const tMustMove = xDiff > 1 || xDiff < -1 || yDiff > 1 || yDiff < -1;

    if (tMustMove) {
      moved = true;
      const hIsSameLineRight = hx > tx && hy == ty;
      const hIsSameLineLeft = hx < tx && hy == ty;
      const hIsDiagUpRight = hx > tx && hy > ty;
      const hIsDiagUpLeft = hx < tx && hy > ty;
      const hIsDiagDownRight = hx > tx && hy < ty;
      const hIsDiagDownLeft = hx < tx && hy < ty;
      const hIsSameColDown = hy < ty && hx == tx;
      const hIsSameColUp = hy > ty && hx == tx;

      if (hIsSameLineRight) {
        follower[0] += 1;
      } else if (hIsSameLineLeft) {
        follower[0] -= 1;
      } else if (hIsDiagUpRight) {
        follower[0] += 1;
        follower[1] += 1;
      } else if (hIsDiagUpLeft) {
        follower[0] -= 1;
        follower[1] += 1;
      } else if (hIsDiagDownRight) {
        follower[0] += 1;
        follower[1] -= 1;
      } else if (hIsDiagDownLeft) {
        follower[0] -= 1;
        follower[1] -= 1;
      } else if (hIsSameColDown) {
        follower[1] -= 1;
      } else if (hIsSameColUp) {
        follower[1] += 1;
      } else {
        console.error("you didn't account for this case you silly billy");
      }

    }
  return moved;

}
for (let commandIndex = 0; commandIndex < splitInput.length; commandIndex++) {
	const row = splitInput[commandIndex]
	const direction = row[0];
	const amount = Number(row.split(' ')[1]);
	for (let i =0; i < amount; i++) {
    for (let ropeI = 0; ropeI < rope.length; ropeI++) {
      debugger;
      if (ropeI == 0) {
        moveCoord(rope[0].coord, direction);
      } else {
        const tailMoved = moveFollower(rope[ropeI].coord, rope[ropeI - 1].coord);
        if (tailMoved && ropeI == rope.length - 1) {
          addCoordToTPos([...rope[ropeI].coord]);
        }
      }
    }
    /*
    console.clear();
    console.info(`Executing: ${row}`); 
    console.info(`Next: ${splitInput[commandIndex + 1]}`); 
    updateDrawnGrid();
    */
	}
}
function addCoordToTPos(coord) {
  const existing = tPositions.find(x => x[0] == coord[0] && x[1] == coord[1]);
  if (!existing) {
    tPositions.push([...coord]);
  }
}

console.log('unique tail positions count:', tPositions.length);

console.timeEnd('execution');

