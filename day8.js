import { rf } from './utils/rf.js';
import { pairs } from 'underscore';

function calculate(data) {
  //PARSING
  var input = data.toString().split('\r\n');

  return [input, input.length];
}
rf('day8/sample.txt', calculate);
rf('day8/input.txt', calculate);
