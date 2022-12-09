import { rf } from './utils/rf.js';
import { uniq } from 'underscore';
function calculate(data) {
  //PARSING
  var moves = data
    .toString()
    .split('\n')
    .map((a) => [a.split(' ')[0], parseInt(a.split(' ')[1])]);
  function calculateMovesPositions(moves,iterations) {
    const tensors = [
      [[-1, -1], [-1, -1], [-1, 0], [-1, 1], [-1, 1],],
      [[-1, -1], [0, 0], [0, 0], [0, 0], [-1, 1],],
      [[0, -1], [0, 0], [0, 0], [0, 0], [0, 1],],
      [[1, -1], [0, 0], [0, 0], [0, 0], [1, 1],],
      [[1, -1], [1, -1], [1, 0], [1, 1], [1, 1],],
    ];
    let to = Array(iterations).fill([0,0]);
    let po = Array(iterations).fill(0).map(a => [[0,0]]);
    moves.forEach((m) => {
      let dj = m[0] == 'R' ? 1 : m[0] == 'L' ? -1 : 0;
      let di = m[0] == 'D' ? 1 : m[0] == 'U' ? -1 : 0;
      for (let s = 1; s <= m[1]; ++s) {
        to[0] =  [to[0][0] + di, to[0][1] + dj];
        for(let i = 1; i <= iterations -1; i++){
          let te = tensors[to[i-1][0] - to[i][0] + 2][to[i-1][1] - to[i][1] + 2];
          to[i] = [to[i][0] + te[0], to[i][1] + te[1]];  
          if(po[i].filter((p) => p[0] == to[i][0] && p[1] == to[i][1]) == 0) {
            po[i].push(to[i]);
          }
        }
      }
    });
    return po;
  }
  let result1 = calculateMovesPositions(moves,10);
  return [result1[1].length, result1[9].length];
}

rf('day9/sample.txt', calculate, [13, 1]);
rf('day9/sample2.txt', calculate, [88, 36]);
rf('day9/input.txt', calculate,[6269,2557]);
