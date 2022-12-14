import { rf } from './../utils/rf.js';

function calculate(data) {
  function computeSandFall(data, solidGround) {
    //PARSING
    let topLeft = [10000000000, 10000000000];
    let bottomRight = [0, 0];
    var paths = data.toString().split('\n').map(l => {
      return l.split(' -> ').map(p => {
        return p.split(',').map((e, x) => {
          let c = parseInt(e);
          topLeft[x] = c < topLeft[x] ? c : topLeft[x];
          bottomRight[x] = c > bottomRight[x] ? c : bottomRight[x];
          return c;
        });
      })
    });
    var wall = Array(bottomRight[1] + (solidGround ? 3: 1)).fill('');
    wall = wall.map((l,x) => '.'.padEnd(bottomRight[0] + 1 + (solidGround ? 500: 0), solidGround ? (x == wall.length -1 ? '#' : '.'): '.').split(''));
    paths.forEach(pa => {
      let from = null;
      pa.forEach((pt, i) => {
        wall[pt[1]] = wall[pt[1]] || [];
        wall[pt[1]][pt[0]] = '#';
        if (i != 0) {
          let mv = [0, 0];
          mv = from[0] < pt[0] ? [1, 0] : from[0] > pt[0] ? [-1, 0] : mv;
          mv = from[1] < pt[1] ? [0, 1] : from[1] > pt[1] ? [0, -1] : mv;
          do {
            from = [from[0] + mv[0], from[1] + mv[1]];
            wall[from[1]][from[0]] = '#';
          } while (from[0] != pt[0] || from[1] != pt[1])
        }
        from = pt;
      });
    });
    let border = [wall[1].length,0]
    wall[0][500] = '+';
    let fallingForever = false;
    while (fallingForever == false) {
      let mv = [[1, 0], [1, -1], [1, 1]];
      let canMove = true;
      let next = [0, 500];
      let pos = [0, 500];
      do {
        let prev = [pos[0], pos[1]];
        for (let i = 2; i >= 0; --i) {
          next = [prev[0] + mv[i][0], prev[1] + mv[i][1]];
          fallingForever = next[0] >= wall.length || next[1] >= wall[1].length || next[0] < 0 || next[1] < 0;
          if (fallingForever) {
            canMove = false;
            break;
          }
          canMove = (wall[next[0]][next[1]] == '.');
          if (canMove) {
            pos = next;
          }
        }
        canMove = (pos[0] != prev[0] || pos[1] != prev[1]);
        if(pos[0] == 0 && pos[1] == 500 && solidGround == true) {fallingForever = true;}
      } while (canMove == true)
      if (fallingForever == false) {
        border[0] = (pos[1] < border[0]) ? pos[1] : border[0];
        border[1] = (pos[1] > border[1]) ? pos[1] : border[1];
        wall[pos[0]][pos[1]] = 'O';
      }
    }
    console.log(wall.map(l => l.slice(border[0] - 1, border[1] + 2).join('')).join('\n'));
    return  wall.map(l => l.join('')).join('').replace(/[^O]/g, '').length + (solidGround ? 1 : 0);
    
  }
  return [computeSandFall(data, false), computeSandFall(data, true)];
}
rf('2022/day14/sample.txt', calculate, [24, 93]);
rf('2022/day14/input.txt', calculate);
