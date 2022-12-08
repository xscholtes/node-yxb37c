import { rf } from './utils/rf.js';

//https://adventofcode.com/2022/day/8

function calculate(data) {
  //PARSING
  var input = data
    .toString()
    .split('\n')
    .map((l) => l.split('').map((e) => parseInt(e)));
  let width = input[0].length - 1;
  let height = input.length - 1;
  let grid = [];
  let bm = [],
    tp = [];
  for (let i = 0; i <= height; ++i) {
    grid[i] = [];
    for (let j = 0; j <= width; ++j) {
      grid[i][j] = 0;
      bm[j] = 0;
      tp[j] = 0;
    }
  }
  for (let i = 0; i <= height; ++i) {
    let lt = 0,
      rt = 0;

    for (let j = 0; j <= width; ++j) {
      //LEFT
      grid[i][j] =
        j == 0 || input[i][j] >= lt + 1 ? grid[i][j] + 1 : grid[i][j];
      lt = j == 0 || input[i][j] >= lt + 1 ? input[i][j] : lt;
      //RIGHT
      grid[i][width - j] =
        j == 0 || input[i][width - j] >= rt + 1
          ? grid[i][width - j] + 1
          : grid[i][width - j];
      rt = j == 0 || input[i][width - j] >= rt + 1 ? input[i][width - j] : rt;
      //TOP
      grid[i][j] =
        i == 0 || input[i][j] >= tp[j] + 1 ? grid[i][j] + 1 : grid[i][j];
      tp[j] = i == 0 || input[i][j] >= tp[j] + 1 ? input[i][j] : tp[j];
      //BOTTOM
      grid[height - i][j] =
        i == 0 || input[height - i][j] >= bm[j] + 1
          ? grid[height - i][j] + 1
          : grid[height - i][j];
      bm[j] =
        i == 0 || input[height - i][j] >= bm[j] + 1
          ? input[height - i][j]
          : bm[j];
    }
  }
  console.log(grid);
  let result1 = grid
    .map((a, b) => a.reduce((x, y) => (x += y >= 1 ? 1 : 0), 0))
    .reduce((a, b) => a + b, 0);
  return [result1, 'No'];
}
rf('day8/sample.txt', calculate, [21, 0]);
//rf('day8/input.txt', calculate);
