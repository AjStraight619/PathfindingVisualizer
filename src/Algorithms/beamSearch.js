export function beamSearch(grid, startNode, finishNode, beamWidth = 5) {
    let openSet = [startNode];
    let closedSet = [];
  
    while (openSet.length > 0) {
      const nextSet = [];
  
      for (const currentNode of openSet) {
        if (currentNode === finishNode) {
          return closedSet;
        }
  
        if (currentNode.isWall) continue;
        currentNode.isVisited = true;
  
        closedSet.push(currentNode);
        const neighbors = getUnvisitedNeighbors(currentNode, grid);
  
        for (const neighbor of neighbors) {
          if (!closedSet.includes(neighbor) && !neighbor.isWall) {
            neighbor.previousNode = currentNode;
            neighbor.cost = currentNode.cost + neighbor.weight;
          }
        }
  
        nextSet.push(...neighbors);
      }
  
      openSet = nextSet
        .sort((a, b) => heuristic(a, finishNode) - heuristic(b, finishNode))
        .slice(0, beamWidth);
    }
  
    return null;
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
    return neighbors.filter((neighbor) => !neighbor.isVisited);
  }
  
  function heuristic(node, finishNode) {
    const dx = Math.abs(node.row - finishNode.row);
    const dy = Math.abs(node.col - finishNode.col);
    return dx + dy;
  }