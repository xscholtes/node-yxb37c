import { rf } from './../utils/rf.js';
import { uniq } from 'underscore';

function calculate(data, row, max) {
  //PARSING
  var links = data.toString().split('\n').map(l => {
    let link = eval('[' + l.replace(/[^,=xy:\-\d]/g, '').replace(/x=/g, '[').replace(/y=/g, '').replace(/:/g, '],') + ']]');
    let distance = Math.abs(link[0][0] - link[1][0]) + Math.abs(link[0][1] - link[1][1]);
    link.push(distance);
    return link;
  });
  function coverage(links, row) {
    let crossing = links.filter(l => {
      return l[2] >= Math.abs(l[0][1] - row);
    });
    let occupied = [];
    crossing.forEach(link => {
      let dy = Math.abs(link[0][1] - row);
      let dx = link[2] - dy;
      occupied.push([link[0][0] - dx, link[0][0] + dx]);
    });
    // union of ranges
    let ranges = [];
    let start = null;
    occupied.sort((a, b) => a[0] - b[0]).forEach((a, i) => {
      if (i == 0) {
        ranges.push(a);
      } else {
        if (a[0] <= ranges[ranges.length - 1][1] && a[1] >= ranges[ranges.length - 1][1]) {
          ranges[ranges.length - 1][1] = a[1]
        } else if (a[0] <= ranges[ranges.length - 1][1] && a[1] <= ranges[ranges.length - 1][1]) {
          //do nothing
        } else {
          ranges.push(a);
        }
      }
    });
    return ranges.map(r => Math.abs(r[1] - r[0])).reduce((a, b) => a + b, 0);
  }
  function hole(links, max) {
    let result = null;
    let row = 0
    for (row = 0; row <= max; row += 1) {
      let crossing = links.filter(l => {
        return l[2] >= Math.abs(l[0][1] - row);
      });
      let occupied = [];
      crossing.forEach(link => {
        let dy = Math.abs(link[0][1] - row);
        let dx = link[2] - dy;
        occupied.push([link[0][0] - dx, link[0][0] + dx]);
      });
      // union of ranges
      let ranges = [];
      let sorted = occupied.sort((a, b) => a[0] - b[0])
      for (let i = 0; i < sorted.length; i += 1) {
        let a = sorted[i];
        if (i == 0) {
          ranges.push(a);
        } else {
          if (a[0] - 1 <= ranges[ranges.length - 1][1] && a[1] >= ranges[ranges.length - 1][1]) {
            ranges[ranges.length - 1][1] = a[1]
          } else if (a[0] <= ranges[ranges.length - 1][1] && a[1] <= ranges[ranges.length - 1][1]) {
            //do nothing
          } else if (a[0] <= ranges[ranges.length - 1][1] && a[1] <= ranges[ranges.length - 1][1]) {
            //do nothing
          } else {
            ranges.push(a);
          }
        }
        if (ranges.length == 2) {
          result = ranges;
          break;
        }
      }
      if(result != null) break;
    }
    return (result[0][1] + 1) * 4000000 + row;
  }
  //to high 4996188
  //to low 4631378
  let result1 = coverage(links, row);
  let result2 = hole(links, max);
  return [result1, result2];
}
rf('2022/day15/sample.txt', function (data) { return calculate(data, 10, 20); }, [26, 56000011]);
rf('2022/day15/input.txt', function (data) { return calculate(data, 2000000, 4000000); }, [4876693, 11645454855041]);
