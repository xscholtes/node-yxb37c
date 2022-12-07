import { rf } from './utils/rf.js';
import { pairs } from 'underscore';

function calculate(data) {
  //PARSING
  var input = data.toString().split('\r\n');

  return [input, input.length];
}
rf('day7/sample.txt', calculate);
rf('day7/input.txt', calculate);
