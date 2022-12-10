const testInput = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

const fs = require('fs');
let input;
try {
  input = fs.readFileSync('./input.txt', 'utf8');
} catch (err) {
  console.error(err);
}
const splitInput = input.split('\n');

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
for (let commandIndex = 0; commandIndex < splitInput.length; commandIndex++) {
	const row = splitInput[commandIndex]
	const direction = row[0];
	const amount = Number(row.split(' ')[1]);
	for (let i =0; i < amount; i++) {
		moveCoord(hPos, direction);
    const hx = hPos[0];
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

      tPositions.push([...tPos]);
    }
	}
}

console.log(tPositions[0]);
function getUniqueCoordsCount(coords) {
  let result = 0;
  for (let i = 0; i < coords.length; i++) {
    let current = coords[i];
    let arr = coords.filter((val, ci) => ci !== i);
    const duplicate = arr.find(x => x[0] == current[0] && x[1] == current[1]);
    if (!duplicate) {
      result += 1;
    }
  }
  return result;
}
// 4336 too low
console.time('hi');
console.log('unique tail positions count:', getUniqueCoordsCount(tPositions));
console.timeEnd('hi');


