import { NodeType } from "../types/types";
import { getNeighbors } from "../PathFindingUtils";

// Recursive implementation
const depthFirstSearch = (
  grid: NodeType[][],
  startNode: NodeType,
  finishNode: NodeType
): NodeType[] => {
  if (!startNode || !finishNode || startNode === finishNode) {
    return [];
  }
  const visitedNodesInOrder: NodeType[] = [];
  depthFirstSearchHelper(startNode, finishNode, visitedNodesInOrder, grid);
  visitedNodesInOrder.reverse();
  return visitedNodesInOrder;
};

function depthFirstSearchHelper(
  currentNode: NodeType,
  finishNode: NodeType,
  visitedNodesInOrder: NodeType[],
  grid: NodeType[][]
): boolean {
  currentNode.isVisited = true;
  visitedNodesInOrder.unshift(currentNode);

  if (currentNode === finishNode) {
    return true;
  }

  const unvisitedNeighbors = getNeighbors(currentNode, grid);
  for (const neighbor of unvisitedNeighbors) {
    if (!neighbor.isVisited && !neighbor.isWall) {
      neighbor.parent = currentNode;
      if (
        depthFirstSearchHelper(neighbor, finishNode, visitedNodesInOrder, grid)
      ) {
        return true;
      }
    }
  }
  return false;
}

export default depthFirstSearch;
