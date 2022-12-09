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
      dj = m[0] == 'R' ? 1 : m[0] == 'L' ? -1 : 0;
      di = m[0] == 'D' ? 1 : m[0] == 'U' ? -1 : 0;
      for (let s = 1; s <= m[1]; ++s) {
        h[0] += di;
        h[1] += dj;
        let tensor = tensors[h[0] - t[0] + 2][h[1] - t[1] + 2];
        if (tensor[0] !== 0) {
          tmoves.push(tensor[0] == 1 ? ['D', 1] : ['U', 1]);
        }
        if (tensor[1] !== 0) {
          tmoves.push(tensor[1] == 1 ? ['R', 1] : ['L', 1]);
        }
        t = [t[0] + tensor[0], t[1] + tensor[1]];
        if (pos.filter((p) => p[0] == t[0] && p[1] == t[1]) == 0) {
          pos.push(t);
        }
      }
    });
    let r = [];
    tmoves.forEach((a) =>
      r.length != 0 && r[r.length - 1][0] == a[0]
        ? (r[r.length - 1][1] += a[1])
        : r.push(a)
    );
    return [pos, r];
  }
  let result1 = calculateMovesPositions(moves);
  console.log(render(result1[0], '#', 16));
  let result2 = result1;
  for (let m = 2; m <= 9; ++m) {
    result2 = calculateMovesPositions(result2[1]);
  }
  console.log(render(result2[0], '#', parseInt(25)));
  function render(positions, symbol, size) {
    let map = Array(size * 2)
      .fill('')
      .map((a) => Array(size * 2).fill('.'));
    let temp = positions.map((a) => [a[0] + size, a[1] + size]);
    temp.forEach((p) => (map[p[0]][p[1]] = symbol));
    var tx = '';
    map.forEach((a) => {
      a.forEach((x) => (tx += x));
      tx += '\n';
    });
    return tx;
  }
  return [result1[0].length, result2[0].length];
}
rf('day9/sample.txt', calculate, [13, 1]);
rf('day9/sample2.txt', calculate, [88, 36]);
//rf('day9/input.txt', calculate);
