import { rf } from './utils/rf.js';
import { pairs } from 'underscore';

function calculate(data) {
  //PARSING
  var input = data.toString().split('\r\n');
  var tree = {};
  var path = '';
  input.forEach((i) => {
    if (i == '$ cd /') return;
    let d = i.match(/cd (.*)/)?.[1] || false;
    path = d
      ? d == '..'
        ? path.split('/').slice(0, -1).join('/')
        : path.split('/').concat([d]).join('/')
      : path;

    tree[path] = tree[path] || 0;
    let f = parseInt(i.match(/(\d.*) /)?.[1] || 0);
    if (f >= 1) {
      for (i = 1; i <= path.split('/').length; i++) {
        tree[path.split('/').slice(0, i).join('/')] += f;
      }
    }
  });
  return [
    pairs(tree)
      .filter((p) => p[1] <= 100000)
      .map((p) => p[1])
      .reduce((a, b) => a + b, 0),
    pairs(tree)
      .filter((p) => p[1] >= 30000000 - (70000000 - tree['']))
      .map((p) => p[1])
      .sort()[0],
  ];
}
rf('day7/sample.txt', calculate);
rf('day7/input.txt', calculate);
