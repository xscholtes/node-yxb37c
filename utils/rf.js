import { open } from 'fs/promises';
import { toArray} from 'underscore';

export async function rf(file, callback, expected) {
  let filehandle;
  try {

    let filehandle = await open(file, 'r');
    let reader = filehandle.createReadStream();
    reader.on('data', (a) => {
      console.time(file);
      
      let result = callback(a);
      let table = [];
      toArray(result).forEach((r,x) => { 
        table.push({result:r});
      });
      toArray(expected).forEach((r,x) => { 
        table[x].valid = (table[x].result === r ? 'YES' : null);
        table[x].expected = r;
      });
      console.timeLog(file);
      console.table(table);
      
    });
  } finally {
    await filehandle?.close();
  }
}
