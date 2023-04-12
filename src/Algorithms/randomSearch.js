export function randomSearch(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    const queue = [startNode];
    startNode.previousNode = null;
    while (queue.length) {
      const currentNode = queue.shift();
      if (currentNode.isWall) continue;
      if (currentNode === finishNode) return visitedNodesInOrder;
      if (currentNode.isVisited) continue;
      currentNode.isVisited = true;
      visitedNodesInOrder.push(currentNode);
      const neighbors = getUnvisitedNeighbors(currentNode, grid);
      neighbors.forEach((neighbor) => {
        queue.push(neighbor);
        neighbor.previousNode = currentNode;
      });
      shuffle(queue);
    }
    return visitedNodesInOrder;
  }
  
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
  
    const { col, row } = node;
  
    if (row > 0) {
      neighbors.push(grid[row - 1][col]);
    }
    if (row < grid.length - 1) {
      neighbors.push(grid[row + 1][col]);
    }
    if (col > 0) {
      neighbors.push(grid[row][col - 1]);
    }
    if (col < grid[0].length - 1) {
      neighbors.push(grid[row][col + 1]);
    }
    for (let i = 0; i < neighbors.length; i++) {
      console.log(neighbors[i]);
    }
    return neighbors.filter((neighbor) => !neighbor.isVisited);
  }