import { NodeType } from "../types/types";

const beamSearch = (
  grid: NodeType[][],
  startNode: NodeType,
  finishNode: NodeType,
  beamWidth = 5
): NodeType[] | null => {
  let openSet: NodeType[] = [startNode];
  let closedSet: NodeType[] = [];

  while (openSet.length > 0) {
    const nextSet: NodeType[] = [];

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
          neighbor.parent = currentNode;
          neighbor.weight = currentNode.weight + neighbor.weight;
        }
      }

      nextSet.push(...neighbors);
    }

    openSet = nextSet
      .sort((a, b) => heuristic(a, finishNode) - heuristic(b, finishNode))
      .slice(0, beamWidth);
  }

  return null;
};

function getUnvisitedNeighbors(node: NodeType, grid: NodeType[][]): NodeType[] {
  const neighbors: NodeType[] = [];

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

function heuristic(node: NodeType, finishNode: NodeType): number {
  const dx = Math.abs(node.row - finishNode.row);
  const dy = Math.abs(node.col - finishNode.col);
  return dx + dy;
}

export default beamSearch;
