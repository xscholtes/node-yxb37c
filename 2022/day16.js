import { rf } from './../utils/rf.js';

function calculate(data) {
  //PARSING
  var valves = data.toString().split('\n').map((l) => {
    return eval("[['" + l.replace(/Valve/g, '').replace(/[a-z\s]/g, '').replace(/,/g, "','").replace(/;/g, "],['").replace(/=/g, "',") + "']]")
  });

  // console.log(valves);
  // let dot = "digraph g {\n";
  // valves.forEach(v => {
  //   dot += '\t' +v[0][0] + '[label="' + v[0][0] + "\\l" + v[0][1] + '"];\n';
  // });
  // valves.forEach(v => {
  //   v[1].forEach(l => {
  //     dot += '\t' + v[0][0] + ' -> ' + l + ';\n';  
  //   })
  // });
  // console.log(dot + '}');
  //var graph = valves.map(v => {
  //  return 
  //});
  // calculate total flow obtained by visiting node
  // A - B = (move to B: 1) + (open B: 1) + (time - ((move to B: 1) + (open B: 1)))
  // A - C = (move to B + move to C: 2) + (open C: 1) + (time - ((2) + (open C: 1)))


  var rates = {};
  var graph = {};
  valves.forEach(e => {
    graph[e[0][0]] = [];
    e[1].forEach(l => graph[e[0][0]][l] = 1);
    rates[e[0][0]] = e[0][1];
  });
  // calculate possible paths
    var distances = {};
  valves.forEach(a => {
    distances[a[0][0]] = {}
    valves.filter(v => v[0][0] != a[0][0]).forEach(b => {
      distances[a[0][0]][b[0][0]] = dijkstra.find_path(graph, a[0][0], b[0][0]).length;
    })
  });

  let round = 30;
  var visited = [];
  let starts = [{ node: 'AA', rate: 0, left: 30, opened: [], flow: 0, resthelp:26, flowhelp:0}];
  let totest = valves.filter(v => rates[v[0][0]] > 0).map(v => { return { node: v[0][0], rate: v[0][1], dist: distances[v[0][0]] }});
  while (round >= 0) {
    let waiting = [];
    totest.forEach(v => {
      let scores = starts.filter(start => v.node != start.node && start.opened.indexOf(v.node) == -1).map(start => {
        let path = start.opened.concat(v.node);

        let rest = start.left - v.dist[start.node];
        let flow = start.flow + (v.rate * rest);
        
        //WITH HELP
        let restwithhelp = start.resthelp - v.dist[start.node];
        let flowwithhelp = start.flowhelp + (v.rate * restwithhelp);

        return { node: v.node, rate: rates[v.node], flow: flow, left: rest, opened: path, resthelp:restwithhelp,flowhelp:flowwithhelp };
      });

      visited = visited.concat(scores.filter(s => s.left >= 0));
      waiting = waiting.concat(scores.filter(s => s.left >= 1));
    })
    starts = waiting;
    round -= 1;
  }
  
  let result1 = visited.reduce((a, b) => b.flow > a.flow ? b : a).flow;
  
  //WITH ELEPHANT (HELP)
  let visitedhelp = visited.filter(h => h.resthelp >=0);
  let paired = {};
  visitedhelp.forEach(v => {
    var p1 = v.opened.sort().join('/');
    if(paired[p1]) {
      paired[p1] = v.flowhelp > paired[p1] ? v.flowhelp :paired[p1] ;
    } else{
      paired[p1] = v.flowhelp;
    }
  })

  var result2 = 0;
  for(var pair1 in paired){
    for(var pair2 in paired){
        if(pair1.split('/').every(el => pair2.indexOf(el) == -1)){
          result2 = (paired[pair1] + paired[pair2]) > result2 ? (paired[pair1] + paired[pair2]) : result2;
        }
    }
  }
  return [result1, result2];

}

rf('2022/day16/sample.txt', calculate, [1651, 1707]);
rf('2022/day16/input.txt', calculate,[1653,2223]);

var dijkstra = {
  single_source_shortest_paths: function (graph, s, d) {
    // Predecessor map for each node that has been encountered.
    // node ID => predecessor node ID
    var predecessors = {};

    // Costs of shortest paths from s to all nodes encountered.
    // node ID => cost
    var costs = {};
    costs[s] = 0;

    // Costs of shortest paths from s to all nodes encountered; differs from
    // `costs` in that it provides easy access to the node that currently has
    // the known shortest path from s.
    // XXX: Do we actually need both `costs` and `open`?
    var open = dijkstra.PriorityQueue.make();
    open.push(s, 0);

    var closest,
      u, v,
      cost_of_s_to_u,
      adjacent_nodes,
      cost_of_e,
      cost_of_s_to_u_plus_cost_of_e,
      cost_of_s_to_v,
      first_visit;
    while (!open.empty()) {
      // In the nodes remaining in graph that have a known cost from s,
      // find the node, u, that currently has the shortest path from s.
      closest = open.pop();
      u = closest.value;
      cost_of_s_to_u = closest.cost;

      // Get nodes adjacent to u...
      adjacent_nodes = graph[u] || {};

      // ...and explore the edges that connect u to those nodes, updating
      // the cost of the shortest paths to any or all of those nodes as
      // necessary. v is the node across the current edge from u.
      for (v in adjacent_nodes) {
        if (adjacent_nodes.hasOwnProperty(v)) {
          // Get the cost of the edge running from u to v.
          cost_of_e = adjacent_nodes[v];

          // Cost of s to u plus the cost of u to v across e--this is *a*
          // cost from s to v that may or may not be less than the current
          // known cost to v.
          cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;

          // If we haven't visited v yet OR if the current known cost from s to
          // v is greater than the new cost we just found (cost of s to u plus
          // cost of u to v across e), update v's cost in the cost list and
          // update v's predecessor in the predecessor list (it's now u).
          cost_of_s_to_v = costs[v];
          first_visit = (typeof costs[v] === 'undefined');
          if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
            costs[v] = cost_of_s_to_u_plus_cost_of_e;
            open.push(v, cost_of_s_to_u_plus_cost_of_e);
            predecessors[v] = u;
          }
        }
      }
    }

    if (typeof d !== 'undefined' && typeof costs[d] === 'undefined') {
      var msg = ['Could not find a path from ', s, ' to ', d, '.'].join('');
      throw new Error(msg);
    }

    return predecessors;
  },

  extract_shortest_path_from_predecessor_list: function (predecessors, d) {
    var nodes = [];
    var u = d;
    var predecessor;
    while (u) {
      nodes.push(u);
      predecessor = predecessors[u];
      u = predecessors[u];
    }
    nodes.reverse();
    return nodes;
  },

  find_path: function (graph, s, d) {
    var predecessors = dijkstra.single_source_shortest_paths(graph, s, d);
    return dijkstra.extract_shortest_path_from_predecessor_list(
      predecessors, d);
  },

  /**
   * A very naive priority queue implementation.
   */
  PriorityQueue: {
    make: function (opts) {
      var T = dijkstra.PriorityQueue,
        t = {},
        key;
      opts = opts || {};
      for (key in T) {
        if (T.hasOwnProperty(key)) {
          t[key] = T[key];
        }
      }
      t.queue = [];
      t.sorter = opts.sorter || T.default_sorter;
      return t;
    },

    default_sorter: function (a, b) {
      return a.cost - b.cost;
    },

    /**
     * Add a new item to the queue and ensure the highest priority element
     * is at the front of the queue.
     */
    push: function (value, cost) {
      var item = { value: value, cost: cost };
      this.queue.push(item);
      this.queue.sort(this.sorter);
    },

    /**
     * Return the highest priority element in the queue.
     */
    pop: function () {
      return this.queue.shift();
    },

    empty: function () {
      return this.queue.length === 0;
    }
  }
};
