const fs = require('fs');
let input;
try {
  input = fs.readFileSync('./input.txt', 'utf8');
} catch(err) {
  console.log(err);
}

let feet = 0;
const lines = input.split('\r\n');

lines.forEach(x => {
  // 2 * l * w + 2 * w * h + 2 * h * l
  const s = x.split('x');
  if (s.length == 3) {
    const l = Number(s[0]);
    const w = Number(s[1]);
    const h = Number(s[2]);
    const sorted = [l, w, h].sort((a, b) => a - b);

    feet += (sorted[0] + sorted[0]) + (sorted[1] + sorted[1]) + (l*w*h);
  }
});
console.log(feet);
// 4425700 too high
//
