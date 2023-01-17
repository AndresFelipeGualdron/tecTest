const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Dijkstra {
  constructor(graph) {
    this.graph = graph;
    this.nodes = Object.keys(graph);
    this.distances = {};
    this.prev = {};
    this.visited = {};
    this.start;
    this.end;
  }

  shortestPath(start, end) {
    this.start = start;
    this.end = end;
    this.nodes.forEach(node => {
      this.distances[node] = Infinity;
    });
    this.distances[start] = 0;

    while (this.nodes.length) {
      let smallestNode = this.getSmallestNode();
      if (smallestNode === end) {
        let path = [end];
        while (path[path.length - 1] !== start) {
          path.push(this.prev[path[path.length - 1]]);
        }
        return path.reverse();
      }
      this.visited[smallestNode] = true;
      this.updateNeighborDistances(smallestNode);
    }
  }

  getSmallestNode() {
    let smallestNode;
    this.nodes.forEach(node => {
      if (!this.visited[node] && (!smallestNode || this.distances[node] < this.distances[smallestNode])) {
        smallestNode = node;
      }
    });
    return smallestNode;
  }

  updateNeighborDistances(node) {
    this.graph[node].forEach(neighbor => {
      if (!this.visited[neighbor.node]) {
        let newDistance = this.distances[node] + neighbor.weight;
        if (newDistance < this.distances[neighbor.node]) {
          this.distances[neighbor.node] = newDistance;
          this.prev[neighbor.node] = node;
        }
      }
    });
  }
}

let graph = {};
let start, end;
let counter = 0;
let totalLines;

rl.on("line", line => {
    if(counter === 0){
        totalLines = parseInt(line);
    }else{
        let parts = line.split(" ");
        let vertex = parts.shift();
        graph[vertex] = [];
        for(let i=0; i< parts.length; i++){
            graph[vertex].push({ node: parts[i], weight: 1 });
        }
    }
	
	if (counter === 1) {
		start = line;
	}
    counter++;
    if(counter === totalLines + 1){
        end = line.split(" ")[0];
        const dijkstra = new Dijkstra(graph);
        const path = dijkstra.shortestPath(start, end);
        console.log(`El camino más corto desde ${start} hasta ${end} es: ${path.join(" -> ")}`);
        rl.close();
    }
});
