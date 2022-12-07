import { rf } from './utils/rf.js';

function calculate(data) {
  //get calories per elf
  var elfes = data
    .toString()
    .split('\r\n\r\n')
    .map((a) => {
      return a
        .split('\r\n')
        .map((b) => parseInt(b))
        .reduce((a, b) => a + b, 0);
    });
  //get max
  return [
    elfes.reduce((a, b) => Math.max(a, b), -Infinity),
    //sum max 3
    elfes
      .sort()
      .reverse()
      .slice(0, 3)
      .reduce((a, b) => a + b, 0),
  ];
}

rf('day1/sample.txt', calculate);
rf('day1/input.txt', calculate);
