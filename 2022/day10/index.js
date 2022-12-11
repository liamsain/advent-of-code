const fs = require('fs');

let input;
try {
  input = fs.readFileSync('./testInput.txt', 'utf8');
} catch(err) {
  console.error(err);
}

let regVal = 1;
let cycleNumber = 1;
let signalStrengthsSum = 0;
const importantCycleNumbers = [20, 60, 100, 140, 180, 220];
function cycleNumberCheck() {
  if (importantCycleNumbers.includes(cycleNumber)) {
    signalStrengthsSum += cycleNumber * regVal;
  }
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
    cycleNumberCheck();
  }  else {
    cycleNumber += 1;
  }
}
console.timeEnd('fun');
// test answer is 13140
console.log('signal strength sum: ', signalStrengthsSum);
