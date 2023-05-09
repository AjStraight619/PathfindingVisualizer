// recursive implementation
export function depthFirstSearch(grid, startNode, finishNode) {
  if (!startNode || !finishNode || startNode === finishNode) {
    return false;
  }
  console.log("startNode", startNode, "finishNode", finishNode);
  const visitedNodesInOrder = [];
  depthFirstSearchHelper(startNode, finishNode, visitedNodesInOrder, grid);
  visitedNodesInOrder.reverse();
  return visitedNodesInOrder;
}

function depthFirstSearchHelper(currentNode, finishNode, visitedNodesInOrder, grid) {
  
  currentNode.isVisited = true;
  
  visitedNodesInOrder.unshift(currentNode);

  if (currentNode === finishNode) {
    return true;
  }

  function getUnvisitedNeighbors(node, grid) {
    let neighbors = [];
    let { row, col } = node;
  
    if (row > 0) neighbors.push(grid[row - 1][col]); // top
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // right
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // bottom
    if (col > 0) neighbors.push(grid[row][col - 1]); // left
  
    return neighbors.filter((neighbor) => !neighbor.isVisited);
  }

  const unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);
  for (const neighbor of unvisitedNeighbors) {
    if (!neighbor.isVisited && !neighbor.isWall) {
      neighbor.previousNode = currentNode;
      if (depthFirstSearchHelper(neighbor, finishNode, visitedNodesInOrder, grid)) {
        return true;
      }
    }
  }
  return false;
}
