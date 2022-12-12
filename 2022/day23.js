import { rf } from './../utils/rf.js';

function calculate(data) {
  //PARSING
  var input = data.toString().split('\r\n');

  return [input[0], input.length];
}
rf('2022/day23/sample.txt', calculate,['sample input',1]);
rf('2022/day23/input.txt', calculate);
