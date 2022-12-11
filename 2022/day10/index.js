const fs = require('fs');

let input;
try {
  input = fs.readFileSync('./input.txt', 'utf8');
} catch(err) {
  console.error(err);
}

let regVal = 1;
let cycleNumber = 1;
let signalStrengthsSum = 0;
let currentDrawIndex = 0;

const importantCycleNumbers = [20, 60, 100, 140, 180, 220];
const crt = new Array(6).fill(new Array(40).fill('.')).map(line => [...line]);

function cycleNumberCheck() {
  if (importantCycleNumbers.includes(cycleNumber)) {
    signalStrengthsSum += cycleNumber * regVal;
  }
  let pixel = '.'
  const row = Math.floor(currentDrawIndex / 40);
  const col = currentDrawIndex % 40;
  const currentRegVal = regVal + (row * 40);
  const overlap = currentDrawIndex == currentRegVal - 1 || currentDrawIndex == currentRegVal || currentDrawIndex == currentRegVal + 1;
  if (overlap) {
    pixel = '#';
  }
  crt[row][col] = pixel;
  currentDrawIndex += 1;

}
const splitInput = input.split('\n');
console.time('fun');

for (let i = 0; i < splitInput.length;i++) {

  cycleNumberCheck();
  const instruction = splitInput[i].split(' ')[0];
  const operand = splitInput[i].split(' ')[1];
  if (instruction == 'addx') {
    cycleNumber += 1;
    cycleNumberCheck();
    cycleNumber += 1;
    regVal = regVal + Number(operand);
  }  else {
    cycleNumber += 1;
  }

}
console.timeEnd('fun');
console.log('signal strength sum: ', signalStrengthsSum);

console.log(crt.forEach(row => {
  console.log(row.join(''));
}));
