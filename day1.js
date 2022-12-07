import { open } from 'fs/promises';

let filehandle;
try {
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
    console.log(elfes.reduce((a, b) => Math.max(a, b), -Infinity));
    //sum max 3
    console.log(
      elfes
        .sort()
        .reverse()
        .slice(0, 3)
        .reduce((a, b) => a + b, 0)
    );
  }

  let filehandle = await open('day1_sample.txt', 'r');
  console.log(`sample 1`);
  let reader = filehandle.createReadStream();
  reader.on('data', calculate);

  filehandle = await open('day1_input.txt', 'r');
  console.log(`day 1`);
  reader = filehandle.createReadStream();
  reader.on('data', calculate);
} finally {
  await filehandle?.close();
}
