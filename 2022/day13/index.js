const fs = require('fs');
let input;
try {
	input = fs.readFileSync('./testInput.txt', 'utf8');
} catch(err) {
  console.log(err);
}

const correctlyPairedIndices = []; // e.g. if first pair is correctly ordered, push 1 to this

input.split('\n\n').forEach(x => {
  const split = x.split('\n');
  const left = JSON.parse(split[0]);
  const right = JSON.parse(split[1]);
  console.log('left', left);
  console.log('right', right);

})
