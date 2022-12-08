import { rf } from './utils/rf.js';
import  pkg  from 'dijkstrajs';

const { dijkstra } = pkg;
//https://adventofcode.com/2022/day/8

function calculate(data) {
  //PARSING
  var input = data.toString().split('\n').map(l => l.split(''));
  
  console.log(input);

  return [0,0];
}

rf('test/sample.txt', calculate,[40,0]);
//rf('test/input.txt', calculate);