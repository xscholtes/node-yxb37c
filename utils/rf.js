import { open } from 'fs/promises';

export async function rf(file, callback) {
  filehandle = await open(file, 'r');
  reader = filehandle.createReadStream();
  reader.on('data', (a) => {
    console.log(file);
    callback(a);
  });
}
