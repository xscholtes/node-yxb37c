import { rf } from './../utils/rf.js';
import { isArray,findIndex } from 'underscore';
function calculate(data) {
  //PARSING
  var pairs = data
    .toString()
    .split('\n\n')
    .map((p) => p.split('\n').map((a) => eval(a)));
 
// - If both values are integers, the lower integer should come first. 
//   If the left integer is lower than the right integer, the inputs are in the right order. 
//   If the left integer is higher than the right integer, the inputs are not in the right order. 
//   Otherwise, the inputs are the same integer; continue checking the next part of the input.
// - If both values are lists, compare the first value of each list, then the second value, and so on. 
//   If the left list runs out of items first, the inputs are in the right order. 
//   If the right list runs out of items first, the inputs are not in the right order. 
//   If the lists are the same length and no comparison makes a decision about the order, 
//   continue checking the next part of the input.
// - If exactly one value is an integer, 
//   convert the integer to a list which contains that integer as its only value, then retry the comparison. 
//   For example, if comparing [0,0,0] and 2, convert the right value to [2] (a list containing 2); 
//   the result is then found by instead comparing [0,0,0] and [2].

  function compare(a, b,pair) {
    a = isArray(b) && isArray(a) == false ? [a] : a;
    b = isArray(a) && isArray(b) == false? [b] : b;
    if (isArray(a)) {
      if(a.length == 0 && b.length == 0) return 0;
      if(a.length == 0) return 1;
      if(b.length == 0) return -1;
      var c = compare(a[0],b[0]);
      if( c == 1) {
        return 1;
      } else if(c == 0) {
        a.shift();
        b.shift();
      } else {
          return -1;
       
      }
      return compare(a,b);
    } else {
      return (a < b) ? 1: (a == b) ? 0 : -1;
    }
  }
  let result1 = pairs.map((p,x) => compare(p[0], p[1],x) == 1? x+1:0 ).reduce((a,b) => a +b,0);
  
  var pairs2 = data
    .toString()
    .replace(/\n\n/g,'\n')
    .split('\n')
    .map((p) => p.split('\n').map((a) => eval(a)));

  pairs2.push([[2]]);
  pairs2.push([[6]]);
  let result2 = pairs2.sort((a,b) => compare(JSON.parse(JSON.stringify(a)),JSON.parse(JSON.stringify(b)))).reverse().map(x => JSON.stringify(x));
  return [result1, (result2.indexOf('[[2]]') + 1) * (result2.indexOf('[[6]]') + 1)];
}
rf('2022/day13/sample.txt', calculate, [13, 1]);
rf('2022/day13/input.txt', calculate, [5390,19261]);
