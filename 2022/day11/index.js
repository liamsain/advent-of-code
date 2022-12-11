const fs = require('fs');
let input;
try {
  input = fs.readFileSync('./testInput.txt', 'utf8');
} catch(err) {
  console.error(err);
}

let monkeys = [];
const makeMonkey = stringData => {
  const splitData = stringData.split('\n');
  return {
    index : Number(splitData[0].trim()[0]),
    items : splitData[1].trim().split(':')[1].split(',').map(x => Number(x)),
    operator : splitData[2].trim().split(' ')[4],
    operationSubject : splitData[2].trim().split(' ')[5],
    divisibleBy : Number(splitData[3].trim().split(' ')[3]),
    trueThrowTo : Number(splitData[4].trim().split(' ')[5]),
    falseThrowTo : Number(splitData[5].trim().split(' ')[5]),
    inspections: 0
  }
};

input.split('Monkey').slice(1).forEach(paragraph => {
  let m = makeMonkey(paragraph);
  monkeys.push(m);
});

const rounds = 20;
for (let i = 0; i < rounds;i++) {
  monkeys.forEach((monkey) => {
    if (monkey.items.length) {
      monkey.items.forEach((item, itemIndex) => {
        monkey.inspections += 1;
        let newVal = item;
        // operation
        if (monkey.operator == '*') {
          if (monkey.operationSubject == 'old') {
            newVal *= newVal;
          } else {
            newVal *= Number(monkey.operationSubject);
          }
        } else if (monkey.operator == '+') {
          if (monkey.operationSubject == 'old') {
            newVal += newVal;
          } else {
            newVal += Number(monkey.operationSubject);
          }
        }
        // relief
          newVal = Math.floor(newVal / (i / 0.3));
        //
         // newVal = Math.ceil(newVal / 3);
        //test
        if (newVal % monkey.divisibleBy === 0) {
            monkeys[monkey.trueThrowTo].items.push(newVal);
        } else {
           monkeys[monkey.falseThrowTo].items.push(newVal);
        }
      });
      monkey.items = []
    }
  });
}
// monkeys.sort((a, b) => b.inspections - a.inspections);
console.log('rounds', rounds);
console.log(monkeys);
monkeys.forEach((m, i) => console.log(`${i}: ${m.inspections}`));
// console.log(monkeys[0].inspections * monkeys[1].inspections);
// test input with relief 20 rounds = 10605
