import { rf } from './../utils/rf.js';
import { first } from 'underscore';
function calculate(data) {
  //PARSING
  var input = data.toString().split('\n');
  var cycles = [1];
  let lastx = 0;
  input.forEach(a => {
    if(/addx/.test(a)){ cycles.push(0);}
    cycles.push(parseInt(a.replace('addx ','').replace('noop','0')));
  })
  var result1 =0;
  for(let i = 20; i <= 220; i+= 40){
    result1 += first(cycles,i).reduce((a,b) => a + b,0) * i;
  }
  
  let crt = ' ';
  let posx =1;
  let line = '';
  cycles.forEach((c,ix) =>{
    let sprite = Array(40).fill(".");
    posx += c;
    sprite[posx-1] = (posx != 0) ? '#' :'.';
    sprite[posx] = '#';
    sprite[posx +1] = (posx != 39) ? '#' :'.';
    crt += (ix % 40 +1) !==40 ? sprite[ix% 40 +1]:' ';
  });
  for(let i = 40; i <= 220; i+= 41){
    crt = [crt.slice(0, i), '\n', crt.slice(i )].join('');
  }
  console.log([crt.slice(0,245)].join(''));
  return [result1, input.length];
}
rf('2022/day10/sample.txt', calculate,[13140]);
rf('2022/day10/input.txt', calculate);

