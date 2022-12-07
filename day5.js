import { range } from 'underscore';
  function calculate(data) {
    //PARSING
    var crates = data.toString().split('\r\n\r\n')[0].split('\r\n');
    var cols = range(0, (crates.pop().length + 1) / 4).map((c) => []);
    var stacks = [];
    crates.forEach((cr) => {
      var line = cols.map((c, i) => cr.substr(i * 4 + 1, 1));
      for (let j = 0; j < line.length; j++) {
        stacks[j] = stacks[j] || [];
        if (line[j] != ' ') {
          stacks[j].push(line[j]);
        }
      }
    });
    //GET A COPY FOR B
    var stacks2 = stacks.map((x) => x.concat());

    var moves = data
      .toString()
      .split('\r\n\r\n')[1]
      .split('\r\n')
      .map((m) =>
        m
          .replace(/[a-z]/g, '')
          .trim()
          .split('  ')
          .map((s) => parseInt(s))
      );
    //RESULT A
    moves.forEach((move) => {
      for (let i = move[0]; i > 0; i--) {
        stacks[move[2] - 1].unshift(stacks[move[1] - 1].shift());
      }
    });
    //RESULT B
    moves.forEach((move) => {
      var moved = stacks2[move[1] - 1].splice(0, move[0]);
      stacks2[move[2] - 1] = moved.concat(stacks2[move[2] - 1]);
    });
    return [stacks.map((s) => s.shift()).join('')),
    stacks2.map((s) => s.shift()).join('')];
  }

  rf('day5/sample.txt', calculate);
  rf('day5/input.txt', calculate);
