import { open } from 'fs/promises';
import { uniq } from 'underscore';
let filehandle;
try {
  function calculate(data, length) {
    //PARSING
    var signal = data.toString().split('');
    var start = -1;
    for (i = 0; i <= signal.length; i++) {
      if (uniq(signal.slice(i, i + length)).length == length) {
        start = i + length;
        break;
      }
    }
    console.log(start);
  }

  let filehandle = await open('day6_sample.txt', 'r');
  console.log(`sample 6`);
  let reader = filehandle.createReadStream();
  reader.on('data', (d) => calculate(d, 4));

  filehandle = await open('day6_sample2.txt', 'r');
  reader = filehandle.createReadStream();
  reader.on('data', (d) => calculate(d, 4));

  filehandle = await open('day6_sample3.txt', 'r');
  reader = filehandle.createReadStream();
  reader.on('data', (d) => calculate(d, 4));

  filehandle = await open('day6_sample4.txt', 'r');
  reader = filehandle.createReadStream();
  reader.on('data', (d) => calculate(d, 4));

  filehandle = await open('day6_sample5.txt', 'r');
  reader = filehandle.createReadStream();
  reader.on('data', (d) => calculate(d, 4));

  console.log(`input 6`);
  filehandle = await open('day6_input.txt', 'r');
  reader = filehandle.createReadStream();
  reader.on('data', (d) => calculate(d, 4));

  filehandle = await open('day6_sampleb1.txt', 'r');
  console.log(`sample 6 b`);
  reader = filehandle.createReadStream();
  reader.on('data', (d) => calculate(d, 14));

  filehandle = await open('day6_sampleb2.txt', 'r');
  reader = filehandle.createReadStream();
  reader.on('data', (d) => calculate(d, 14));

  filehandle = await open('day6_sampleb3.txt', 'r');
  reader = filehandle.createReadStream();
  reader.on('data', (d) => calculate(d, 14));

  filehandle = await open('day6_sampleb4.txt', 'r');
  reader = filehandle.createReadStream();
  reader.on('data', (d) => calculate(d, 14));

  filehandle = await open('day6_sampleb5.txt', 'r');
  reader = filehandle.createReadStream();
  reader.on('data', (d) => calculate(d, 14));

  filehandle = await open('day6_input.txt', 'r');
  console.log(`input 6 b`);
  reader = filehandle.createReadStream();
  reader.on('data', (d) => calculate(d, 14));
} finally {
  await filehandle?.close();
}
