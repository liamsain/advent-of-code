const fs = require('fs');
let input;
try {
  input = fs.readFileSync('./input.txt', 'utf8');
} catch(err) {
  console.log(err);
}

let currentCoords = [0, 0];
let totalUniqueCoords = [];
const moveCoordByDir = (coord, dir) => {
  if (dir == '>') {
    coord[0] += 1; 
  } else if (dir == '^') {
    coord[1] += 1;
  } else if (dir == '<') {
    coord[0] -= 1;
  } else {
    coord[1] -= 1;
  }
}
for (let ch of input) {
  moveCoordByDir(currentCoords, ch);
  const existing = totalUniqueCoords.find(x => x[0] == currentCoords[0] && x[1] == currentCoords[1]);
  if (!existing) {
    totalUniqueCoords.push([...currentCoords]);
  }
}
console.log(totalUniqueCoords.length);
// part 2
const santaCoord = [0, 0];
const robotCoord = [0, 0];
const newUniqueCoords = [];
for (let i = 0; i < input.length; i += 2) {
  moveCoordByDir(santaCoord, input[i]);
  moveCoordByDir(robotCoord, input[i + 1]);
  let existing = newUniqueCoords.find(x => x[0] == santaCoord[0] && x[1] == santaCoord[1]);
  if (!existing) {
    newUniqueCoords.push([...santaCoord]);
  }
  existing = newUniqueCoords.find(x => x[0] == robotCoord[0] && x[1] == robotCoord[1]);
  if (!existing) {
    newUniqueCoords.push([...robotCoord]);
  }
}
console.log(newUniqueCoords.length);
