import { rf } from './../utils/rf.js';
import { findIndex, last, findLastIndex, first } from 'underscore';
//https://adventofcode.com/2022/day/8

function calculate(data) {
  //PARSING
  var input = data
    .toString()
    .split('\n')
    .map((l) => l.split('').map((e) => parseInt(e)));
  
  //INIT SOLUTION A
  let w = input[0].length - 1,
    h = input.length - 1,
    ga = Array(h + 1).fill(0).map(a => Array(w + 1).fill(0)),
    bm = Array(w + 1).fill(0),
    tp = Array(w + 1).fill(0);
  //INIT SOLUTION A
  let gb = Array(h + 1).fill(0).map(a => Array(w + 1).fill(1))

  for (let i = 0; i <= h; ++i) {
    let lt = 0,
      rt = 0;
    for (let j = 0; j <= w; ++j) {
      //SOLUTION A
      let val = input[i][j];
      //LEFT
      if (j == 0 || val >= lt + 1) { ga[i][j] += 1; lt = val; }
      //RIGHT
      if(j == 0 || input[i][w - j] >= rt + 1) {ga[i][w - j] += 1; rt = input[i][w - j]; }
      //TOP
      if(i == 0 || val >= tp[j] + 1) { ga[i][j] += 1; tp[j] = val; }
      //BOTTOM
      if(i == 0 || input[h - i][j] >= bm[j] + 1) {ga[h - i][j] += 1; bm[j] = input[h - i][j]}

      //SOLUTION B
      let column = input.map((line) => line[j]);
      //UP
      let idx = findIndex(first(column, i).reverse(), (a) => a >= val);
      let up = idx == -1 ? i : idx + 1;
      //LEFT
      idx = findIndex(first(input[i], j).reverse(), (a) => a >= val);
      let left = idx == -1 ? j : idx + 1;
      //DOWN
      idx = findIndex(last(column, h - i), (a) => a >= val);
      let down = idx == -1 ? h - i : idx + 1;
      //RIGHT
      idx = findIndex(last(input[i], w - j), (a) => a >= val);
      let right = idx == -1 ? w - j : idx + 1;
      
      gb[i][j] = (up || 1) * (left || 1) * (down || 1) * (right || 1);


    }
  }

  let result1 = ga
    .map((a, b) => a.reduce((x, y) => (x += y >= 1 ? 1 : 0), 0))
    .reduce((a, b) => a + b, 0);
  let result2 = gb
    .map((a, x) =>
      a.map((b, y) => (x == 0 || y == 0 || x == h || y == w ? 0 : b))
    )
    .map((x) => x.reduce((a, b) => (a >= b ? a : b), 0))
    .reduce((a, b) => (a >= b ? a : b), 0);

  return [result1, result2];
}
rf('2022/day8/sample.txt', calculate, [21, 8]);
rf('2022/day8/input.txt', calculate, [1827, 335580]);
