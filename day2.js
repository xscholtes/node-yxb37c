import { open } from 'fs/promises';

let filehandle;
try {
  function calculate(data) {
    //get calories per elf
    var elf1 = ['A', 'B', 'C'];
    var elf2 = ['X', 'Y', 'Z'];
    var rewards = [1, 2, 3];
    var result = [
      [
        //A Rock
        [3], //X Rock
        [6], //Y Paper
        [0], //Z Scissors
      ],
      [
        //B Paper
        [0], //X Rock
        [3], //Y Paper
        [6], //Z Scissors
      ],
      [
        //C Scissor
        [6], //X Rock
        [0], //Y Paper
        [3], //Z Scissors
      ],
    ];
    var games = data
      .toString()
      .split('\r\n')
      .map((a) => a.split(' '));
    var rewardsSum = games.reduce(
      (acc, b) =>
        acc +
        rewards[elf2.indexOf(b[1])] +
        +result[elf1.indexOf(b[0])][elf2.indexOf(b[1])],
      0
    );
    console.log(rewardsSum);
    var rewardsStrategy2 = [0, 3, 6];
    var resultStrategy2 = [
      [
        //A Rock
        [3], //X Loose / Scissors
        [1], //Y Draw / Rock
        [2], //Z Win / Paper
      ],
      [
        //B Paper
        [1], //X Loose / Rock
        [2], //Y Draw / Paper
        [3], //Z Win / Scissors
      ],
      [
        //C Scissor
        [2], //X Loose / Paper
        [3], //Y Draw / Scissors
        [1], //Z Win / Paper
      ],
    ];
    var rewardsSum2 = games.reduce(
      (acc, b) =>
        acc +
        rewardsStrategy2[elf2.indexOf(b[1])] +
        +resultStrategy2[elf1.indexOf(b[0])][elf2.indexOf(b[1])],
      0
    );
    console.log(rewardsSum2);
  }

  let filehandle = await open('day2_sample.txt', 'r');
  console.log(`sample 2`);
  let reader = filehandle.createReadStream();
  reader.on('data', calculate);

  filehandle = await open('day2_input.txt', 'r');
  console.log(`day 2`);
  reader = filehandle.createReadStream();
  reader.on('data', calculate);
} finally {
  await filehandle?.close();
}
