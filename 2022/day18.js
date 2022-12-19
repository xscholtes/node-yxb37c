import { rf } from './../utils/rf.js';

function calculate(data) {
  //PARSING
  var input = data.toString().split('\n').map(l => l.split(',').map(e => parseInt(e)));

  var faces = 0;
  var trapped = {};
  input.forEach(i => {
    input.forEach(j => {
      faces = (Math.abs(i[0] - j[0]) + Math.abs(i[1] - j[1]) + Math.abs(i[2] - j[2])) == 1 ? faces +1:faces;
      if((Math.abs(i[0] - j[0]) + Math.abs(i[1] - j[1]) + Math.abs(i[2] - j[2])) >= 2) {
          if(i[0] == j[0] && i[1] == j[1]) {
            for(var p = i[2] + 1; p < j[2]; p+=1){
              var drop = [i[0],i[1],p];
              trapped[drop.join(':')] = trapped[drop.join(':')] ? [trapped[drop.join(':')][0],trapped[drop.join(':')][1],trapped[drop.join(':')][2] + 1] : [0,0,1];
            }
          }
          if(i[0] == j[0] && i[2] == j[2]) {
            for(var p = i[1] + 1; p < j[1]; p+=1){
              var drop = [i[0],p,i[2]];
              trapped[drop.join(':')] = trapped[drop.join(':')] ? [trapped[drop.join(':')][0],trapped[drop.join(':')][1] + 1,trapped[drop.join(':')][2]] : [0,1,0];
            }
          }
          if(i[1] == j[1] && i[2] == j[2]) {
            for(var p = i[0] + 1; p < j[0]; p+=1){
              var drop = [p,i[1],i[2]];
              trapped[drop.join(':')] = trapped[drop.join(':')] ? [trapped[drop.join(':')][0]+1,trapped[drop.join(':')][1],trapped[drop.join(':')][2]] : [0,1,0];
            }
          }
      }
    });
  });
  input.forEach(i => { 
    delete trapped[i.join(':')]
  });
  let closedbox = 0;
  for(var t in trapped){
    if((trapped[t][0] >= 1 && trapped[t][1] >= 1 && trapped[t][2] >= 1) === false){
      delete trapped[t]
    } else {
      closedbox +=1;
    }
  }
  let faces2 = 0
  //calcul des faces exterieures
  for(var u in trapped){
    let r = u.split(':').map(e => parseInt(e));
    for(var v in trapped){
      let s = v.split(':').map(e => parseInt(e));
      faces2 = (Math.abs(r[0] - s[0]) + Math.abs(r[1] - s[1]) + Math.abs(r[2] - s[2])) == 1 ? faces2 +1:faces2;
    };
  };
  console.log(faces2,closedbox,(closedbox * 6) -faces2);
  //4168 to high
  //4150 not good
  //2418 not good
  //console.log(trapped);
  return [(input.length * 6) -faces, (input.length * 6) -faces - ((closedbox * 6)-faces2)];
}
rf('2022/day18/sample.txt', calculate,[64,48]);
rf('2022/day18/input.txt', calculate,[4390,1]);
