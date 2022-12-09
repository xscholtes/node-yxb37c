import { rf } from './utils/rf.js';
import { uniq } from 'underscore';
function calculate(data) {
  //PARSING
  var moves = data
    .toString()
    .split('\r\n')
    .map((a) => [a.split(' ')[0], parseInt(a.split(' ')[1])]);
  function calculateMovesPositions(moves) {
    const tensors = [
      [
        [0, 0],
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, 0],
      ],
      [
        [-1, -1],
        [0, 0],
        [0, 0],
        [0, 0],
        [-1, 1],
      ],
      [
        [0, -1],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 1],
      ],
      [
        [1, -1],
        [0, 0],
        [0, 0],
        [0, 0],
        [1, 1],
      ],
      [
        [0, 0],
        [1, -1],
        [1, 0],
        [1, 1],
        [0, 0],
      ],
    ];
    let t = [0, 0];
    let h = [0, 0];
    let di = 0;
    let dj = 0;
    let pos = [];
    let tmoves = [];
    pos.push(t);
    moves.forEach((m) => {
      di = m[0] == 'R' ? 1 : m[0] == 'L' ? -1 : 0;
      dj = m[0] == 'D' ? 1 : m[0] == 'U' ? -1 : 0;
      for (let s = 1; s <= m[1]; ++s) {
        h[0] += di;
        h[1] += dj;
        let tensor = tensors[h[0] - t[0] + 2][h[1] - t[1] + 2];
        if (tensor[0] !== 0) {
          tmoves.push(tensor[0] == 1 ? ['R', 1] : ['L', 1]);
        }
        if (tensor[1] !== 0) {
          tmoves.push(tensor[1] == 1 ? ['D', 1] : ['U', 1]);
        }
        t = [t[0] + tensor[0], t[1] + tensor[1]];
        if (pos.filter((p) => p[0] == t[0] && p[1] == t[1]) == 0) {
          pos.push(t);
        }
      }
    });
    return [tmoves, pos];
  }
  var result1 = calculateMovesPositions(moves);
  var result2 = calculateMovesPositions(result1[0]);
  var result3 = calculateMovesPositions(result2[0]);
  var result4 = calculateMovesPositions(result3[0]);
  var result5 = calculateMovesPositions(result4[0]);
  var result6 = calculateMovesPositions(result5[0]);
  var result7 = calculateMovesPositions(result6[0]);
  var result8 = calculateMovesPositions(result7[0]);
  var result9 = calculateMovesPositions(result8[0]);
  return [result1[1].length, result9[1].length];
}
rf('day9/sample.txt', calculate, [13, 1]);
rf('day9/sample2.txt', calculate, [88, 36]);
//rf('day9/input.txt', calculate);
