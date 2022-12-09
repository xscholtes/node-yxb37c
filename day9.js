import { rf } from './utils/rf.js';
import { uniq } from 'underscore';
function calculate(data) {
  //PARSING
  var moves = data
    .toString()
    .split('\n')
    .map((a) => [a.split(' ')[0], parseInt(a.split(' ')[1])]);
  function calculateMovesPositions(moves) {
    const tensors = [
      [[-1, -1], [-1, -1], [-1, 0], [-1, 1], [-1, 1],],
      [[-1, -1], [0, 0], [0, 0], [0, 0], [-1, 1],],
      [[0, -1], [0, 0], [0, 0], [0, 0], [0, 1],],
      [[1, -1], [0, 0], [0, 0], [0, 0], [1, 1],],
      [[1, -1], [1, -1], [1, 0], [1, 1], [1, 1],],
    ];
    let t = [0, 0];
    let t2 = [0, 0];
    let t3 = [0, 0];
    let t4 = [0, 0];
    let t5 = [0, 0];
    let t6 = [0, 0];
    let t7 = [0, 0];
    let t8 = [0, 0];
    let t9 = [0, 0];
    let h = [0, 0];
    let di = 0;
    let dj = 0;
    let pos = [];
    let pos9 = [];
    let tmoves = [];
    pos.push(t);
    pos9.push(t9);
    moves.forEach((m) => {
      dj = m[0] == 'R' ? 1 : m[0] == 'L' ? -1 : 0;
      di = m[0] == 'D' ? 1 : m[0] == 'U' ? -1 : 0;
      for (let s = 1; s <= m[1]; ++s) {
        h[0] += di;
        h[1] += dj;
        let tensor = tensors[h[0] - t[0] + 2][h[1] - t[1] + 2];
        t = [t[0] + tensor[0], t[1] + tensor[1]];

        let tensor2 = tensors[t[0] - t2[0] + 2][t[1] - t2[1] + 2];
        t2 = [t2[0] + tensor2[0], t2[1] + tensor2[1]];

        let tensor3 = tensors[t2[0] - t3[0] + 2][t2[1] - t3[1] + 2];
        t3 = [t3[0] + tensor3[0], t3[1] + tensor3[1]];

        let tensor4 = tensors[t3[0] - t4[0] + 2][t3[1] - t4[1] + 2];
        t4= [t4[0] + tensor4[0], t4[1] + tensor4[1]];
        
        let tensor5 = tensors[t4[0] - t5[0] + 2][t4[1] - t5[1] + 2];
        t5 = [t5[0] + tensor5[0], t5[1] + tensor5[1]];
        
        let tensor6 = tensors[t5[0] - t6[0] + 2][t5[1] - t6[1] + 2];
        t6 = [t6[0] + tensor6[0], t6[1] + tensor6[1]];
        
        let tensor7 = tensors[t6[0] - t7[0] + 2][t6[1] - t7[1] + 2];
        t7 = [t7[0] + tensor7[0], t7[1] + tensor7[1]];
        
        let tensor8 = tensors[t7[0] - t8[0] + 2][t7[1] - t8[1] + 2];
        t8 = [t8[0] + tensor8[0], t8[1] + tensor8[1]];
        
        let tensor9 = tensors[t8[0] - t9[0] + 2][t8[1] - t9[1] + 2];
        t9 = [t9[0] + tensor9[0], t9[1] + tensor9[1]];
        
        if (pos.filter((p) => p[0] == t[0] && p[1] == t[1]) == 0) {
          pos.push(t);
        }
        if (pos9.filter((p) => p[0] == t9[0] && p[1] == t9[1]) == 0) {
          pos9.push(t9);
        }
      }
    });
    let r = [];
    
    return [pos, pos9];
  }
  let result1 = calculateMovesPositions(moves);
  return [result1[0].length, result1[1].length];
}

rf('day9/sample.txt', calculate, [13, 1]);
rf('day9/sample2.txt', calculate, [88, 36]);
rf('day9/input.txt', calculate,[6269,2557]);
