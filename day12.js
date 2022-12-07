import { rf } from './utils/rf.js';

function calculate(data) {
  //PARSING
  var input = data.toString().split('\r\n');

  return [input[0], input.length];
}
rf('day12/sample.txt', calculate,['sample input',1]);
rf('day12/input.txt', calculate);
