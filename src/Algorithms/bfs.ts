import { NodeType } from "../types/types";

const BFS = (
  grid: NodeType[][],
  startNode: NodeType,
  finishNode: NodeType
): NodeType[] => {
  const openSet = new Queue<NodeType>();
  const closedSet: NodeType[] = [];
  startNode.isVisited = true;
  openSet.enqueue(startNode);

  while (!openSet.isEmpty()) {
    const currentNode = openSet.dequeue();

    // Check if currentNode is not undefined
    if (!currentNode) {
      break;
    }

    if (currentNode.isWall) continue;
    closedSet.push(currentNode);

    if (currentNode === finishNode) {
      return closedSet;
    }

    const neighbors = getUnvisitedNeighbors(currentNode, grid);
    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];
      if (!closedSet.includes(neighbor) && !neighbor.isWall) {
        neighbor.parent = currentNode;
        neighbor.isVisited = true;
        openSet.enqueue(neighbor);
      }
    }
  }

  return closedSet;
};

function getUnvisitedNeighbors(
  node: NodeType | undefined,
  grid: NodeType[][]
): NodeType[] {
  const neighbors: NodeType[] = [];
  const { col, row } = node || { col: 0, row: 0 };

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

class Queue<T> {
  private elements: { [key: number]: T };
  private head: number;
  private tail: number;

  constructor() {
    this.elements = {};
    this.head = 0;
    this.tail = 0;
  }

  enqueue(element: T): void {
    this.elements[this.tail] = element;
    this.tail++;
  }

  dequeue(): T | undefined {
    const item = this.elements[this.head];
    delete this.elements[this.head];
    this.head++;
    return item;
  }

  peek(): T | undefined {
    return this.elements[this.head];
  }

  length(): number {
    return this.tail - this.head;
  }

  isEmpty(): boolean {
    return this.length() === 0;
  }
}

export default BFS;
