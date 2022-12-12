import { rf } from './../utils/rf.js';
import { uniq } from 'underscore';
function calculate(data, length) {
  //PARSING
  var signal = data.toString().split('');
  var start = -1;
  for (let i = 0; i <= signal.length; i++) {
    if (uniq(signal.slice(i, i + length)).length == length) {
      start = i + length;
      break;
    }
  }
  return [start];
}

rf('2022/day6/sample.txt', (a) => calculate(a, 7),[10]);
rf('2022/day6/sample2.txt', (a) => calculate(a, 7),[15]);
rf('2022/day6/sample3.txt', (a) => calculate(a, 7),[9]);
rf('2022/day6/sample4.txt', (a) => calculate(a, 7),[22]);
rf('2022/day6/sample5.txt', (a) => calculate(a, 7),[14]);
rf('2022/day6/input.txt', (a) => calculate(a, 7));
rf('2022/day6/sampleb1.txt', (a) => calculate(a, 14),[19]);
rf('2022/day6/sampleb2.txt', (a) => calculate(a, 14),[23]);
rf('2022/day6/sampleb3.txt', (a) => calculate(a, 14),[23]);
rf('2022/day6/sampleb4.txt', (a) => calculate(a, 14),[29]);
rf('2022/day6/sampleb5.txt', (a) => calculate(a, 14),[26]);
rf('2022/day6/input.txt', (a) => calculate(a, 14));
