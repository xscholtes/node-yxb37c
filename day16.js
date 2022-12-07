import { rf } from './utils/rf.js';

function calculate(data) {
  //PARSING
  var input = data.toString().split('\r\n');

  return [input[0], input.length];
}
rf('day16/sample.txt', calculate,['sample input',1]);
rf('day16/input.txt', calculate);
