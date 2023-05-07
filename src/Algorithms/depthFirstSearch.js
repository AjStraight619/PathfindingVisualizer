// export function depthFirstSearch(grid, startNode, finishNode) {
//   if (!startNode || !finishNode || startNode === finishNode) {
//     return false;
//   }
//   let unvisitedNodes = [];
//   let visitedNodesInOrder = [];
//   unvisitedNodes.push(startNode);
//   while (unvisitedNodes.length !== 0) {
//     let closestNode = unvisitedNodes.shift();
//     if (closestNode.isWall) continue;
//     if (closestNode === finishNode) return visitedNodesInOrder;
//     visitedNodesInOrder.push(closestNode);
//     closestNode.isVisited = true;
//     let unvisitedNeighbours = getUnvisitedNeighbors(closestNode, grid);
//     for (let unvisitedNeighbour of unvisitedNeighbours) {
//       unvisitedNeighbour.previousNode = closestNode;
//       unvisitedNodes.unshift(unvisitedNeighbour);
//     }
//   }
//   return visitedNodesInOrder;
// }

function getUnvisitedNeighbors(node, grid) {
  let neighbors = [];
  let { row, col } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

// recursive implementation
export function depthFirstSearch(grid, startNode, finishNode) {
  if (!startNode || !finishNode || startNode === finishNode) {
    return false;
  }
  const visitedNodesInOrder = [];
  depthFirstSearchHelper(startNode, finishNode, visitedNodesInOrder, grid);
  return visitedNodesInOrder;
}

function depthFirstSearchHelper(currentNode, finishNode, visitedNodesInOrder, grid) {
  currentNode.isVisited = true;
  visitedNodesInOrder.unshift(currentNode);

  if (currentNode === finishNode) {
    return true;
  }

  const unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);
  for (const neighbor of unvisitedNeighbors) {
    if (!neighbor.isVisited) {
      neighbor.previousNode = currentNode;
      if (depthFirstSearchHelper(neighbor, finishNode, visitedNodesInOrder, grid)) {
        return true;
      }
    }
  }
  return false;
}
