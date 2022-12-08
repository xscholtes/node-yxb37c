import { rf } from './utils/rf.js';

//https://adventofcode.com/2022/day/8

function calculate(data) {
  //PARSING
  var input = data.toString().split('\n').map( l => l.split(''));
  
  return [input[0], input.length];
}
rf('day8/sample.txt', calculate,[0,0]);
//rf('day8/input.txt', calculate);