import { rf } from './utils/rf.js';
import { uniq } from 'underscore';
function calculate(data, length) {
  //PARSING
  var signal = data.toString().split('');
  var start = -1;
  for (i = 0; i <= signal.length; i++) {
    if (uniq(signal.slice(i, i + length)).length == length) {
      start = i + length;
      break;
    }
  }
  return start;
}

rf('day6/sample.txt', (a) => calculate(a, 7));
rf('day6/sample2.txt', (a) => calculate(a, 7));
rf('day6/sample3.txt', (a) => calculate(a, 7));
rf('day6/sample4.txt', (a) => calculate(a, 7));
rf('day6/sample5.txt', (a) => calculate(a, 7));
rf('day6/input.txt', (a) => calculate(a, 7));
rf('day6/sampleb1.txt', (a) => calculate(a, 14));
rf('day6/sampleb2.txt', (a) => calculate(a, 14));
rf('day6/sampleb3.txt', (a) => calculate(a, 14));
rf('day6/sampleb4.txt', (a) => calculate(a, 14));
rf('day6/sampleb5.txt', (a) => calculate(a, 14));
rf('day6/input.txt', (a) => calculate(a, 14));
