import { rf } from './utils/rf.js';

function calculate(data) {
  //PARSING
  var input = data.toString().split('\r\n');

  return [input[0], input.length];
}
rf('day23/sample.txt', calculate,['sample input',1]);
rf('day23/input.txt', calculate);
