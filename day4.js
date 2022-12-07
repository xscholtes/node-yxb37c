import { open } from 'fs/promises';
import { uniq, range, difference } from 'underscore';
let filehandle;
try {
  function calculate(data) {
    //result A
    var pairs = data
      .toString()
      .split('\r\n')
      .map((a) => {
        var slots = a
          .split(',')
          .map((s) =>
            range(parseInt(s.split('-')[0]), parseInt(s.split('-')[1]) + 1)
          );
        return difference(slots[1], slots[0]).length == 0 ||
          difference(slots[0], slots[1]).length == 0
          ? 1
          : 0;
      });
    console.log(pairs.reduce((a, b) => a + b, 0));
    //result B
    var pairsOverlap = data
      .toString()
      .split('\r\n')
      .map((a) => {
        var slots = a
          .split(',')
          .map((s) =>
            range(parseInt(s.split('-')[0]), parseInt(s.split('-')[1]) + 1)
          );
        return difference(slots[0], slots[1]).length < slots[0].length ||
          difference(slots[1], slots[0]).length < slots[1].length
          ? 1
          : 0;
      });
    console.log(pairsOverlap.reduce((a, b) => a + b, 0));
  }

  let filehandle = await open('day4_sample.txt', 'r');
  console.log(`sample 4`);
  let reader = filehandle.createReadStream();
  reader.on('data', calculate);
  filehandle = await open('day4_input.txt', 'r');
  console.log(`input 4`);
  reader = filehandle.createReadStream();
  reader.on('data', calculate);
} finally {
  await filehandle?.close();
}
