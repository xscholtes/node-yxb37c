import nodemon from 'nodemon';

nodemon({ script: '2022/day17.js' })
  .on('start', console.clear)
  .on('restart', console.clear)
  .on('quit', () => {
    console.log('App has quit');
    process.exit();
  });
