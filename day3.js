import { rf } from './utils/rf.js';
import { uniq } from 'underscore';

function calculate(data) {
  //result A
  var compartments = data
    .toString()
    .split('\r\n')
    .map((a) => [
      a.substr(0, a.length / 2),
      a.substr(a.length / 2, a.length / 2),
    ]);
  var result = [];
  compartments.forEach((c) => {
    var character = uniq(
      c[0].split('').filter((b) => c[1].indexOf(b) != -1)
    )[0];
    var value =
      character.toLowerCase() == character
        ? character.charCodeAt(0) - 96
        : character.charCodeAt(0) - 38;
    result.push(value);
  });
  var result1 = result.reduce((a, b) => a + b, 0);
  //result B

  var groups = [];
  var curr = [];
  data
    .toString()
    .split('\r\n')
    .forEach((a) => {
      curr.push(a);
      if (curr.length == 3) {
        var comm = curr[0]
          .split('')
          .filter((c) => curr[1].indexOf(c) != -1)
          .filter((c) => curr[2].indexOf(c) != -1);
        var character = uniq(comm)[0];
        var value =
          character.toLowerCase() == character
            ? character.charCodeAt(0) - 96
            : character.charCodeAt(0) - 38;
        groups.push(value);
        curr = [];
      }
    });

  var result2 = groups.reduce((a, b) => a + b, 0);
  return [result1, result2];
}

rf('day3/sample.txt', calculate);
rf('day3/input.txt', calculate);
