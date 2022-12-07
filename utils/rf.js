import { open } from 'fs/promises';

export async function rf(file, callback) {
  let filehandle;
  try {
    let filehandle = await open(file, 'r');
    let reader = filehandle.createReadStream();
    reader.on('data', (a) => {
      console.log(file);
      console.log(callback(a));
    });
  } finally {
    await filehandle?.close();
  }
}
