import { rf } from './utils/rf.js';

function calculate(data) {
  //PARSING
  var input = data.toString().split('\r\n');

  return [input[0], input.length];
}
rf('day10/sample.txt', calculate,['sample input',2]);
rf('day10/input.txt', calculate);
