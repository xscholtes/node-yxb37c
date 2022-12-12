import { rf } from './utils/rf.js';

function calculate(data) {
  //PARSING
  var input = data.toString().split('\n');

  return [input[0], input.length];
}
rf('day13/sample.txt', calculate,['sample input',1]);
rf('day13/input.txt', calculate);
