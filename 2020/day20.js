import { rf } from './../utils/rf.js';
import { without } from 'underscore';

function calculate(data) {
    let trans = [];
    [
        [0,2,4,6],
        [1,6,5,2]
    ].forEach(l => {  
        trans.push([l[0],l[1],l[2],l[3]]);
        trans.push([l[3],l[0],l[1],l[2]]);
        trans.push([l[2],l[3],l[0],l[1]]);
        trans.push([l[1],l[2],l[3],l[0]]); 
    });

    //PARSING
    var input = data.toString().split('\n\n').map(tile => {
        var t = tile.split('\n');
        var title = t.shift();
        var matrix = t.map(l => l.split('').map(c => c.charCodeAt(0) == 46 ? 1 : 0));
        var binaryEdges = [matrix[0], matrix.map(a => a[a.length - 1]), matrix[matrix.length - 1], matrix.map(a => a[0])];
        t.shift();
        t.pop();
        var w = t.map(l => {
            var nl = l.split('').map(c => c.charCodeAt(0) == 46 ? 1 : 0)
            nl.pop(); nl.shift();
            return nl;
        });
        let edges = [];
        binaryEdges.forEach(e => {
            edges.push(parseInt(e.join(''), 2));
            edges.push(parseInt(e.reverse().join(''), 2));
        });
        return {
            n: parseInt(title.replace(/[a-zA-Z :]/g, '')),
            m: edges,
            e: [],
            ixe:[],
            wb: w
        }
    });
    //match edges
    input.forEach(i => {
        input.forEach(j => {
            j.m.forEach(x => {
                if (i.m.indexOf(x) >= 0 && i.n != j.n) { 
                    i.e.push(j.n);
                    i.ixe.push(i.m.indexOf(x));
                }
            })
        });
    });
    let result1 = input.filter(i => i.e.length == 4).map(u => u.n).reduce((a, b) => a * b, 1);

    // build puzzle
    var pr = input.filter(i => i.e.length == 4)[0];
    var tiles = input.map(t => t.n);
    var p = [[{tile:pr.n}]];
    let row = 0;
    let col = 0;
    let pEdges = {};
    input.forEach(t => pEdges[t.n] = t.m );
    tiles = without(tiles, pr.n);
    while (tiles.length > 0) {
        input.forEach(t => {
                var pieces = (row == 0) ? [p[row][col].tile]:(col == 0) ? [p[row - 1][col].tile] : [p[row - 1][col].tile, p[row][col - 1].tile];
                var cond = ((row == 0 || col == 0 ) &&  t.e.length != 8) || (row != 0 && col != 0 );
                if (tiles.indexOf(t.n) >= 0 && pieces.every(pie => t.e.indexOf(pie) >= 0) && cond) {
                    var eds =  pEdges[pieces[0]].map((edge,x) => [x,t.m.indexOf(edge)]).filter(f => f[1] >= 0);
                    p[row].push({tile:t.n,map: eds});
                    tiles = without(tiles, t.n);
                    if ((row == 0 && t.e.length == 4) || (row != 0 && col == p[0].length -1)) {
                        row += 1;
                        col = 0;
                        if(tiles.length > 0) {p[row] = [];}
                    } else {
                        col += 1
                    }
                }
        });
    }
    //orientation
    
    let monster = ['.#...#.###...#.##.O#','O.##.OO#.#.OO.##.OOO','#O.#O#.O##O..O.#O##.'].map(m => parseInt(m.replace(/[^O]/g,'0').replace(/O/g,'1'),2));

    const mlentgth = 20;

    console.log(monster);

    return [result1, input.length];
}

rf('2020/day20/sample.txt', calculate, [20899048083289, 1]);
rf('2020/day20/input.txt', calculate,[111936085519519,1]);
