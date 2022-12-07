import { rf } from './utils/rf.js';

function calculate(data) {
  //PARSING
  var input = data.toString().split('\r\n');

  return [input, input.length];
}
rf('day20/sample.txt', calculate);
rf('day20/input.txt', calculate);
