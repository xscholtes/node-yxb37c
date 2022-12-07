import { rf } from './utils/rf.js';
import { range, difference } from 'underscore';

function calculate(data) {
  //result A
  var pairs = data
    .toString()
    .split('\r\n')
    .map((a) => {
      var slots = a
        .split(',')
        .map((s) =>
          range(parseInt(s.split('-')[0]), parseInt(s.split('-')[1]) + 1)
        );
      return difference(slots[1], slots[0]).length == 0 ||
        difference(slots[0], slots[1]).length == 0
        ? 1
        : 0;
    });
  var result1 = pairs.reduce((a, b) => a + b, 0);
  //result B
  var pairsOverlap = data
    .toString()
    .split('\r\n')
    .map((a) => {
      var slots = a
        .split(',')
        .map((s) =>
          range(parseInt(s.split('-')[0]), parseInt(s.split('-')[1]) + 1)
        );
      return difference(slots[0], slots[1]).length < slots[0].length ||
        difference(slots[1], slots[0]).length < slots[1].length
        ? 1
        : 0;
    });
  var result2 = pairsOverlap.reduce((a, b) => a + b, 0);
  return [result1, result2];
}

rf('day4/sample.txt', calculate);
rf('day4/input.txt', calculate);
