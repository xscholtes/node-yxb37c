import { rf } from './../utils/rf.js';

function calculate(data) {
  //PARSING
  var input = data.toString().split('\n');

  return [input[0], input.length];
}
rf('2020/day20/sample.txt', calculate,['sample input',1]);
rf('2020/day20/input.txt', calculate);
