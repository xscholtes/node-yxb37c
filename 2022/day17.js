import { rf } from './../utils/rf.js';

function calculate(data, nbRocks,rinfo) {
  let recurring = 0;
  if(rinfo) {
    nbRocks = nbRocks;
    rinfo.recurring = ((nbRocks - (nbRocks % rinfo.rocks)) / rinfo.rocks) * rinfo.length;
    nbRocks = nbRocks % rinfo.rocks; 
    rinfo.left = nbRocks;
  } else {
    rinfo = {recurring:0,left:0}
  }
  //PARSING
  var input = data.toString().trim().split('');
  const rocks = [
    // ####
    [
      parseInt('000111100', 2)
    ],
    // .#.
    // ###
    // .#.
    [
      parseInt('000010000', 2),
      parseInt('000111000', 2),
      parseInt('000010000', 2),
    ],
    // ..#    ###
    // ..# => ..#
    // ###    ..#
    [
      parseInt('000001000', 2),
      parseInt('000001000', 2),
      parseInt('000111000', 2),
    ],
    // #
    // #
    // #
    // #
    [
      parseInt('000100000', 2),
      parseInt('000100000', 2),
      parseInt('000100000', 2),
      parseInt('000100000', 2),
    ],
    // ##
    // ##
    [
      parseInt('000110000', 2),
      parseInt('000110000', 2),
    ]
  ];
  const wall = parseInt('100000001', 2);
  const ground = parseInt('111111111', 2);
  let pile = [ground];
  let px = 0;
  let rx = 0;
  let rock = rocks[rx];
  pile.push(wall);
  pile.push(wall);
  pile.push(wall);

  rock.forEach(l => pile.push(wall));
  px = pile.length - 1;
  let nbrock = 1;
  let lastlength =0;
  let lastrock =0;
  rinfo = {
    start:0,
    length:0,
    startrock:0,
    rocks:0,
    recurring: rinfo.recurring,
    left: rinfo.left
  };
  while (nbrock <= nbRocks) {
    input.forEach((move, x) => {
      if (nbrock <= nbRocks) {
        if (move == '>') {
          rock = rock.some((l, y) => {
            return ((l >>> 1) & pile[px - y]) !== 0
          }) ? rock : rock.map(l => l >>> 1);
        } else if (move == '<') {
          rock = rock.some((l, y) => {
            return ((l << 1) & pile[px - y]) !== 0
          }) ? rock : rock.map(l => l << 1);
        }
        //try to go down
        var blocked = rock.some((l, y) => {
          return (l & pile[px - y - 1]) !== 0
        });
        if (blocked) {
          rock.forEach((l, y) => {
            pile[px - y] = pile[px - y] | l;
          });
          while (pile[pile.length - 1] == wall) {
            pile.pop();
          }
          rx = rocks.length - 1 == rx ? 0 : rx + 1;
          rock = rocks[rx];
          if(x ==0) {
            if(rinfo.length == 0 || rinfo.length  < (pile.length - lastlength)){
              rinfo.length = pile.length - lastlength;
              rinfo.start = pile.length;
              rinfo.rocks = nbrock - lastrock;
              rinfo.startrock = nbrock;
              lastlength = pile.length;
              lastrock = nbrock;
            }
          }
          pile.push(wall);
          pile.push(wall);
          pile.push(wall);
          rock.forEach(l => pile.push(wall));
          px = pile.length - 1;
          nbrock += 1;

        } else {
          px = px - 1;
        }
      }
    })
  }
  while (pile[pile.length - 1] == wall) {
    pile.pop();
  }
  return  [rinfo.recurring + (pile.length - 1),rinfo] ;
}

rf('2022/day17/sample.txt', function (data) { 
  var first = calculate(data, 2022);
 
  return [first[0], calculate(data,1000000000000,first[1])[0]]; 

} , [3068, 1514285714288]);//calculate(data,1000000000000)]; 



rf('2022/day17/input.txt', function (data) { 
  var first = calculate(data, 400000);
 
  return [first[0], calculate(data,1000000000000,first[1])[0]]; 

} , [3175, 1]);


