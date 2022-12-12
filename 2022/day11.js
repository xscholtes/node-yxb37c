import { rf } from './../utils/rf.js';

function calculate(data) {
  //PARSING
  var monkeys = data.toString().split('\n\n')
    .map(m => (m + '\n0').split('\n').map((i, x) => {
      let m = i.replace(/old/g, '#').replace(/[a-zA-Z:\s=]/g, '');
      return x == 1 ? m.split(',').map(a => parseInt(a)) : (x != 2 ? parseInt(m) : m);
    })
  );
  
  let rounds = 20;
  while (rounds > 0) {

    monkeys.forEach((monkey, ix) => {
      while (monkey[1].length != 0) {
        let item = monkey[1].shift()
        monkey[6] += 1;
        let newItem = Math.floor(eval(monkey[2].replace(/#/g, item)) / 3);
        if (newItem % monkey[3] == 0) { monkeys[monkey[4]][1].push(newItem); } else { monkeys[monkey[5]][1].push(newItem); }
      };
    })

    rounds--;
  }

  let result1 = monkeys.map(m => m[6]).sort((a, b) => b - a).slice(0, 2).reduce((a, b) => a * b, 1);

  monkeys = data.toString().split('\n\n')
    .map(m => (m + '\n0').split('\n').map((i, x) => {
      let m = i.replace(/old/g, '#').replace(/[a-zA-Z:\s=]/g, '');
      return x == 1 ? m.split(',').map(a => parseInt(a)) : (x != 2 ? parseInt(m) : m);
    })
    );
  rounds = 10000;
  const newdiv = monkeys.map(m => m[3]).reduce((a, b) => a * b, 1);
  while (rounds > 0) {
    monkeys.forEach((monkey, ix) => {
      while (monkey[1].length != 0) {
        let item = monkey[1].shift()
        monkey[6] += 1;
        let newItem = eval(monkey[2].replace(/#/g, item)) % newdiv;
        if (newItem % monkey[3] == 0) { monkeys[monkey[4]][1].push(newItem); } else { monkeys[monkey[5]][1].push(newItem); }
      };
    })

    rounds--;
  }
  let result2 = monkeys.map(m => m[6]).sort((a, b) => b - a).slice(0, 2).reduce((a, b) => a * b, 1);


  return [result1, result2];
}
rf('2022/day11/sample.txt', calculate, [10605, 2713310158]);
rf('2022/day11/input.txt', calculate, [90882, 30893109657]);
