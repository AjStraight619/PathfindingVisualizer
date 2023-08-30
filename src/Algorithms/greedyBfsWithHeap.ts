import { NodeType } from "../types/types";
import { getNeighborsForDiagonal, getNeighbors } from "../PathFindingUtils";
import Heap from "heap";

const greedyBFS = (
  grid: NodeType[][],
  startNode: NodeType,
  finishNode: NodeType,
  allowDiagonal: boolean
): Set<NodeType> => {
  startNode.distance = 0;

  const openSet = new Heap<NodeType>((a, b) => a.distance - b.distance);
  const closedSet = new Set<NodeType>();

  openSet.push(startNode);

  while (!openSet.empty()) {
    const currentNode = openSet.pop();

    if (!currentNode) {
      break; // Stop the loop if there's no current node
    }

    if (currentNode === finishNode) {
      return closedSet;
    }

    if (currentNode.isWall) {
      continue; // Skip wall nodes
    }

    closedSet.add(currentNode); // Replace this with whatever method you're using to mark a node as "closed"

    const neighbors = allowDiagonal
      ? getNeighborsForDiagonal(currentNode, grid)
      : getNeighbors(currentNode, grid);

    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];

      if (closedSet.has(neighbor) || neighbor.isWall) {
        continue; // Skip nodes that are already closed or are walls
      }

      neighbor.distance = manhattanDistance(neighbor, finishNode);
      neighbor.parent = currentNode;

      openSet.push(neighbor);
    }
  }

  return closedSet;
};

// Helper functions
function manhattanDistance(node: NodeType, finishNode: NodeType): number {
  return (
    Math.abs(node.row - finishNode.row) + Math.abs(node.col - finishNode.col)
  );
}

export default greedyBFS;
