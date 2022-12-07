import { rf } from './utils/rf.js';

function calculate(data) {
  //PARSING
  var input = data.toString().split('\r\n');

  return [input, input.length];
}
rf('day16/sample.txt', calculate);
rf('day16/input.txt', calculate);
