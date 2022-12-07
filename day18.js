import { rf } from './utils/rf.js';

function calculate(data) {
  //PARSING
  var input = data.toString().split('\r\n');

  return [input, input.length];
}
rf('day18/sample.txt', calculate);
rf('day18/input.txt', calculate);
