import { rf } from './utils/rf.js';
import { findIndex, last, findLastIndex, first } from 'underscore';
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
  let grid2 = [];
  let bm = [],
    tp = [];
  for (let i = 0; i <= height; ++i) {
    grid[i] = [];
    grid2[i] = [];
    for (let j = 0; j <= width; ++j) {
      grid[i][j] = 0;
      grid2[i][j] = 1;
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

      //SOLUTION B
      let column = input.map((line) => line[j]);
      //UP
      let idx = findIndex(first(column, i).reverse(), (a) => a >= input[i][j]);
      let visible = idx == -1 ? i : idx + 1;
      
      grid2[i][j] = visible != 0 ? grid2[i][j] * visible : grid2[i][j];
      //LEFT
      idx = findIndex(first(input[i], j).reverse(), (a) => a >= input[i][j]);
      visible = idx == -1 ? j : idx + 1;
      
      grid2[i][j] = visible != 0 ? grid2[i][j] * visible : grid2[i][j];
      //DOWN
      idx = findIndex(last(column, height - i), (a) => a >= input[i][j]);
      visible = idx == -1 ? height - i : idx + 1;
      
      grid2[i][j] = visible != 0 ? grid2[i][j] * visible : grid2[i][j];

      //RIGHT
      idx = findIndex(last(input[i], width - j), (a) => a >= input[i][j]);
      visible = idx == -1 ? width - j : idx + 1;
      
      grid2[i][j] = visible != 0 ? grid2[i][j] * visible : grid2[i][j];


    }
  }
  
  let result1 = grid
    .map((a, b) => a.reduce((x, y) => (x += y >= 1 ? 1 : 0), 0))
    .reduce((a, b) => a + b, 0);
  let result2 = grid2
    .map((a, x) =>
      a.map((b, y) => (x == 0 || y == 0 || x == height || y == width ? 0 : b))
    )
    .map((x) => x.reduce((a, b) => (a >= b ? a : b), 0))
    .reduce((a, b) => (a >= b ? a : b), 0);

  return [result1, result2];
}
rf('day8/sample.txt', calculate, [21, 8]);
rf('day8/input.txt', calculate);
