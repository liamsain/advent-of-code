const fs = require('fs');

let input;
try {
  input = fs.readFileSync('./input.txt', 'utf8');
} catch(err) {
  console.log(err);
}
console.log(input);
let total = 0;
for (let i = 0; i < input.length; i++) {
  total += input[i] == '(' ? 1 : -1;
  if (total == -1) {
    console.log(i + 1);
    break;
  }
}
// 1782 too low