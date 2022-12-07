import { open } from 'fs/promises';

export async function rf(file, callback) {
  let filehandle;
  try {
    filehandle = await open(file, 'r');
    let reader = filehandle.createReadStream();
    reader.on('data', (a) => {
      console.log(file);
      callback(a);
    });
  } finally {
    await filehandle?.close();
  }
}
