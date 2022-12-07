import { rf } from './utils/rf.js';

function calculate(data) {
  //PARSING
  var input = data.toString().split('\r\n');

  return [input, input.length];
}
rf('day9/sample.txt', calculate);
rf('day9/input.txt', calculate);
