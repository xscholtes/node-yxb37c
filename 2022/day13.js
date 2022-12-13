import { rf } from './../utils/rf.js';

function calculate(data) {
  //PARSING
  var pairs = data.toString().split('\n\n').map( p => p.split('\n').map(a => eval(a)));
  pairs.forEach(p => {
    var left = p[0]
    console.log(p[0],p[1]);
  });
  console.log(pairs);
  return [pairs.length, pairs.length];
}
rf('2022/day13/sample.txt', calculate,['sample input',1]);
//rf('2022/day13/input.txt', calculate);
