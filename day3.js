import { open } from 'fs/promises';
import { uniq } from 'underscore';
let filehandle;
try {
  function calculate(data) {
    //result A
    var compartments = data
      .toString()
      .split('\r\n')
      .map((a) => [
        a.substr(0, a.length / 2),
        a.substr(a.length / 2, a.length / 2),
      ]);
    var result = [];
    compartments.forEach((c) => {
      var character = uniq(
        c[0].split('').filter((b) => c[1].indexOf(b) != -1)
      )[0];
      var value =
        character.toLowerCase() == character
          ? character.charCodeAt(0) - 96
          : character.charCodeAt(0) - 38;
      result.push(value);
    });
    console.log(result.reduce((a, b) => a + b, 0));
    //result B
    var groups = [];
    var curr = [];
    data
      .toString()
      .split('\r\n')
      .forEach((a) => {
        curr.push(a);
        if (curr.length == 3) {
          var comm = curr[0]
            .split('')
            .filter((c) => curr[1].indexOf(c) != -1)
            .filter((c) => curr[2].indexOf(c) != -1);
          var character = uniq(comm)[0];
          var value =
            character.toLowerCase() == character
              ? character.charCodeAt(0) - 96
              : character.charCodeAt(0) - 38;
          groups.push(value);
          curr = [];
        }
      });

    console.log(groups.reduce((a, b) => a + b, 0));
  }

  let filehandle = await open('day3_sample.txt', 'r');
  console.log(`sample 3`);
  let reader = filehandle.createReadStream();
  reader.on('data', calculate);
  filehandle = await open('day3_input.txt', 'r');
  console.log(`day 3`);
  reader = filehandle.createReadStream();
  reader.on('data', calculate);
} finally {
  await filehandle?.close();
}
