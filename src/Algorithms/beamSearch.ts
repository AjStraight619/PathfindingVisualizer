import { NodeType } from "../types/types";
import { getNeighborsForDiagonal, getNeighbors } from "../PathFindingUtils";

const beamSearch = (
  grid: NodeType[][],
  startNode: NodeType,
  finishNode: NodeType,
  allowDiagonal: boolean,
  beamWidth = 3
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

      const neighbors = allowDiagonal
        ? getNeighborsForDiagonal(currentNode, grid)
        : getNeighbors(currentNode, grid);

      for (const neighbor of neighbors) {
        if (!closedSet.includes(neighbor) && !neighbor.isWall) {
          neighbor.parent = currentNode;
          neighbor.weight = currentNode.weight + neighbor.weight;
          nextSet.push(neighbor);
        }
      }
    }

    openSet = nextSet
      .sort((a, b) => heuristic(a, finishNode) - heuristic(b, finishNode))
      .slice(0, beamWidth);
  }

  return null;
};

function heuristic(node: NodeType, finishNode: NodeType): number {
  const dx = Math.abs(node.row - finishNode.row);
  const dy = Math.abs(node.col - finishNode.col);
  return dx + dy;
}

export default beamSearch;
