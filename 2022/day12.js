import { rf } from './../utils/rf.js';
import { min} from 'underscore';

function calculate(data) {
  let start = 'S'.charCodeAt(0);
  let end = 'E'.charCodeAt(0);
  let startKey = '';
  let endKey = '';
  let candidates = []; 
  //PARSING
  var input = data.toString().split('\n').map((l, x) => l.split("").map((b, y) => {
    var v = b.charCodeAt(0);
    if (v == start) {
      v = 'a'.charCodeAt(0);
      startKey = 'n' + x + ':' + y;
    }
    if (v == end) {
      v = 'z'.charCodeAt(0);
      endKey = 'n' + x + ':' + y;
    }
    if( v == 'a'.charCodeAt(0)){
      candidates.push('n' + x + ':' + y);
    }
    return v;
  }));

  var graph = {};
  input.forEach((a, ax) => {
    a.forEach((v, bx) => {
      var key = 'n' + ax + ':' + bx;
      var value = {};
      if (bx >= 1 && (a[bx - 1] - v) <= 1) {
        value['n' + ax + ':' + (bx - 1)] = 1;
      }
      if (bx < a.length - 1 && (a[bx + 1] - v) <= 1) {
        value['n' + ax + ':' + (bx + 1)] = 1;
      }
      if (ax >= 1 && (input[ax - 1][bx] - v) <= 1) {
        value['n' + (ax - 1) + ':' + bx] = 1;
      }
      if (ax < input.length - 1 && (input[ax + 1][bx] - v) <= 1) {
        value['n' + (ax + 1) + ':' + bx] = 1;
      }
      graph[key] = value;
    });
  });
  var path = dijkstra.find_path(graph, startKey, endKey);
  var paths = [];
  for(let i = 0; i < candidates.length;++i) {
    try {
     paths.push(dijkstra.find_path(graph, candidates[i], endKey).length -1);
    }catch(ex){
      //console.log(ex.message);
    }
   }
  return [path.length -1 , min(paths)];
}


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
rf('2022/day12/sample.txt', calculate, [31, 29]);
rf('2022/day12/input.txt', calculate,[408,399]);
