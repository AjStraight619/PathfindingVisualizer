import { NodeType } from "../types/types";

const dijkstra = (
  grid: NodeType[][],
  startNode: NodeType,
  finishNode: NodeType
): NodeType[] => {
  const visitedNodesInOrder: NodeType[] = [];
  const unVisitedNodes = getAllNodes(grid);
  startNode.distance = 0;

  while (unVisitedNodes.length) {
    sortNodesbyDistance(unVisitedNodes);
    const currentNode = unVisitedNodes.shift();

    if (currentNode?.isWall) continue;
    if (currentNode?.distance === Infinity) return visitedNodesInOrder;

    if (currentNode) {
      currentNode.isVisited = true;
      visitedNodesInOrder.push(currentNode);
    }

    if (currentNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(currentNode, grid);
  }

  return visitedNodesInOrder; // this line added just for safety
};

function getAllNodes(grid: NodeType[][]): NodeType[] {
  const nodes: NodeType[] = [];

  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }

  return nodes;
}

function sortNodesbyDistance(unVisitedNodes: NodeType[]): void {
  unVisitedNodes.sort((node1, node2) => node1.distance - node2.distance);
}

function updateUnvisitedNeighbors(
  node: NodeType | undefined,
  grid: NodeType[][]
): void {
  if (node) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      const distance = node.distance + neighbor.weight;
      if (distance < neighbor.distance) {
        neighbor.distance = distance;
        neighbor.parent = node;
      }
    }
  }
}

function getUnvisitedNeighbors(node: NodeType, grid: NodeType[][]): NodeType[] {
  const neighbors: NodeType[] = [];
  const { col, row } = node;

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

export default dijkstra;
