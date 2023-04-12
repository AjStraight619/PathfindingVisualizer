import React, { Component } from "react";
import Node from "./Node/Node";
import { aStar } from "../Algorithms/aStar";
import { randomSearch } from "../Algorithms/randomSearch";
import { dijkstra } from "../Algorithms/dijkstra";
import { greedyBFS } from "../Algorithms/greedyBFS";
import "./PathFinding.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { BFS } from "../Algorithms/BFS";
import { depthFirstSearch } from "../Algorithms/depthFirstSearch";
import { bidirectionalGreedySearch } from "../Algorithms/bidirectionalGreedySearch";
import { getNodesInShortestPathOrderBidirectionalGreedySearch } from "../Algorithms/bidirectionalGreedySearch";
import { recursiveDivisionMaze } from "../Mazes/recursiveDivisionMaze";
import { randomMaze } from "../Mazes/randomMaze";
import { NavLink } from "react-bootstrap";
import Tutorial from "../Tutorial/Tutorial";
import { bestFirstSearch } from "../Algorithms/bestFirstSearch";

const START_NODE_ROW = 15;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 15;
const FINISH_NODE_COL = 47;

export default class PathFinding extends Component {
  constructor() {
    super();
    this.state = {
      initialGrid: [],
      grid: [],
      mouseIsPressed: false,
      dragging: false,
      isToggled: false,
      generatingMaze: false,
      visualizingAlgorithm: false,
      algorithm: " ",
      speed: "Fast",
      hasMaze: false,
      curAlgo: "",
      algo: null,
      curMaze: "",
      maze: null,
      startingNode: true,
      startNode: { row: 15, col: 8 },
      finishNode: { row: 15, col: 47 },
      dragType: null,
      currentStartNode: null,
      currentFinishNode: null,
      showTutorial: true,
      clearingPath: false,
      draggedNode: null,
      isShortestPath: false,
    };

    this.speed = 10;
    this.mazeSpeed = 10;
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  setSpeed(speed) {
    if (speed === 10) {
      this.setState({ speed: "Fast" });
    } else if (speed === 20) {
      this.setState({ speed: "Medium" });
    } else if (speed === 60) {
      this.setState({ speed: "Slow" });
    }
    this.speed = speed;
  }

  handleDragOver = (e) => {
    e.preventDefault();
  };

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid, initalGrid: grid });
  }
  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }
  handleStartNodeMouseDown(row, col) {
    const { startNode } = this.state;

    if (startNode && startNode.row === row && startNode.col === col) {
      this.setState({
        draggedNode: startNode,
        dragType: "start",
      });
    }
  }

  handleMouseMove(row, col) {
    const { draggedNode } = this.state;

    if (draggedNode) {
      const newGrid = this.state.grid.slice();

      newGrid[draggedNode.row][draggedNode.col] = {
        ...newGrid[draggedNode.row][draggedNode.col],
        isStart: false,
      };

      newGrid[row][col] = {
        ...newGrid[row][col],
        isStart: true,
      };

      this.setState({
        grid: newGrid,
        draggedNode: { row, col },
      });
    }
  }

  handleMouseEnter(row, col) {
    const { draggedNode } = this.state;

    if (draggedNode) {
      const newGrid = this.state.grid.slice();

      newGrid[draggedNode.row][draggedNode.col] = {
        ...newGrid[draggedNode.row][draggedNode.col],
        isStart: false,
      };

      newGrid[row][col] = {
        ...newGrid[row][col],
        isStart: true,
      };

      this.setState({
        grid: newGrid,
        draggedNode: { row, col },
      });
    } else {
      if (!this.state.mouseIsPressed) return;
      const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
      this.setState({ grid: newGrid });
    }
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false, draggedNode: null });
  }

  handleDragStart(e, dragType, row, col) {
    if (!this.state.grid[row][col].isDraggable) return;
    if (!e || !e.dataTransfer) return;
    e.dataTransfer.setData("text/plain", dragType);

    if (dragType === "start" || dragType === "finish") {
      const nodeElement = document.getElementById(`node-${row}-${col}`);
      nodeElement.classList.add("dragging");
    }

    this.setState({ dragging: true, dragType: dragType });
  }

  // handleDrop(e, newRow, newCol) {
  //   e.preventDefault();

  //   const { startNode, finishNode } = this.state;
  //   const { row, col } = this.state.draggedNode;

  //   const newGrid = this.state.grid.slice();

  //   // Reset the original node to a regular node
  //   newGrid[row][col].isStart = false;
  //   newGrid[row][col].isFinish = false;

  //   newGrid[startNode.row][startNode.col].isStart = false;
  //   newGrid[finishNode.row][finishNode.col].isFinish = false;

  //   if (this.state.dragType === "start") {
  //     newGrid[newRow][newCol].isStart = true;
  //     this.setState({ startNode: { row: newRow, col: newCol } });
  //   } else if (this.state.dragType === "finish") {
  //     newGrid[newRow][newCol].isFinish = true;
  //     this.setState({ finishNode: { row: newRow, col: newCol } });
  //   }

  //   this.setState({ grid: newGrid, draggedNode: null });
  // }
  handleDrop(e, newRow, newCol) {
    e.preventDefault();
  
    const { startNode, finishNode } = this.state;
    const draggedNode = this.state.draggedNode;
    if (!draggedNode) {
      return; // Exit early if draggedNode is null or undefined
    }
  
    const { row, col } = draggedNode;
    const newGrid = this.state.grid.slice();
  
    // Reset the original node to a regular node
    newGrid[row][col].isStart = false;
    //newGrid[row][col].isFinish = false;
  
    newGrid[startNode.row][startNode.col].isStart = false;
    //newGrid[finishNode.row][finishNode.col].isFinish = false;
  
    if (this.state.dragType === "start") {
      newGrid[newRow][newCol].isStart = true;
      this.setState({ startNode: { row: newRow, col: newCol } });
    } else if (this.state.dragType === "finish") {
      newGrid[newRow][newCol].isFinish = true;
      this.setState({ finishNode: { row: newRow, col: newCol } });
    }
  
    this.setState({ grid: newGrid, draggedNode: null });
  }
  

  // handleDragEnd(dragType, row, col) {
  //   if (dragType === "start" || dragType === "finish") {
  //     const nodeElement = document.getElementById(`node-${row}-${col}`);
  //     nodeElement.classList.remove("dragging");

  //     if (dragType === "start") {
  //       this.setState({ currentStartNode: null });
  //     } else if (dragType === "finish") {
  //       this.setState({ currentFinishNode: null });
  //     }
  //   }
  // }

  handleDragEnd(dragType, row, col) {
    this.setState(prevState => {
      const newGrid = prevState.grid.slice();
      const node = newGrid[row][col];
      const newNode = {
        ...node,
        isStart: false,
      };
      newGrid[row][col] = newNode;
  
      const updatedState = {
        grid: newGrid,
        mouseIsPressed: false,
        draggedNode: null,
      };
  
      if (dragType === "start") {
        updatedState.startNode = { row, col };
        updatedState.currentStartNode = null;
      }
  
      return updatedState;
    });
  }
  

  handleStartNodeDrag(row, col) {
    const newGrid = this.state.grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isStart: false,
    };
    newGrid[row][col] = newNode;
    this.setState({
      grid: newGrid,
      mouseIsPressed: true,
      startNodeDragging: true,
    });
  }

  handleNodeDrag(row, col) {
    const { draggedNode } = this.state;
    if (!draggedNode) return;

    const newGrid = this.state.grid.slice();
    newGrid[draggedNode.row][draggedNode.col] = {
      ...newGrid[draggedNode.row][draggedNode.col],
      isStart: false,
    };
    newGrid[row][col] = {
      ...newGrid[row][col],
      isStart: true,
    };

    this.setState({
      grid: newGrid,
      draggedNode: { row, col },
    });
  }

  handleNodeDragEnd() {
    this.setState({
      mouseIsPressed: false,
      startNodeDragging: false,
      finishNodeDragging: false,
    });
  }

  algoSelection(currentAlgoSelected) {
    this.setState({ algorithm: currentAlgoSelected });

    if (currentAlgoSelected === "Dijkstra") {
      this.setState({ algo: dijkstra });
    } else if (currentAlgoSelected === "A*") {
      this.setState({ algo: aStar });
    } else if (currentAlgoSelected === "Greedy") {
      this.setState({ algo: greedyBFS });
    } else if (currentAlgoSelected === "Breadth-first search") {
      this.setState({ algo: BFS });
    } else if (currentAlgoSelected === "DFS") {
      this.setState({ algo: depthFirstSearch });
    } else if (currentAlgoSelected === "Random Search") {
      this.setState({ algo: randomSearch });
    } else if (currentAlgoSelected === "Best first search") {
      this.setState({ algo: bestFirstSearch });
    } else {
      this.setState({ algo: bidirectionalGreedySearch });
    }
  }

  mazeSelection(currentMazeSelected) {
    console.log(currentMazeSelected);
    this.setState({ curMaze: currentMazeSelected });
    if (currentMazeSelected === "") return;
    if (currentMazeSelected === "Recursive Division") {
      this.setState({ maze: recursiveDivisionMaze });
    } else {
      this.setState({ maze: randomMaze });
    }
  }

  generateCurMaze(curMaze) {
    if (this.state.maze === null) return;
    if (curMaze === recursiveDivisionMaze) {
      this.generateRecursiveDivisionMaze();
    } else {
      this.generateRandomMaze();
    }
  }

  // Moduralizing code to only need one function for visualization.
  // visualizeAlgorithm() {
  //   if (
  //     !this.state.algo ||
  //     this.state.visualizingAlgorithm ||
  //     this.state.generatingMaze
  //   ) {
  //     return;
  //   }

  //   let startNode;
  //   let finishNode;
  //   this.setState({ visualizingAlgorithm: true });
  //   const { grid } = this.state;
  //   console.log("Start node row:" + this.state.startNodeRow);
  //   if (this.state.startingNode == true) {
  //     startNode = grid[this.state.startNode.row][this.state.startNode.col];
  //     finishNode = grid[this.state.finishNode.row][this.state.finishNode.col];
  //   } else {
  //     this.setState({ startingNode: false });
  //     startNode =
  //       grid[this.state.currentStartNode.row][this.state.currentStartNode.col];
  //     finishNode = grid[this.state.finishNode.row][this.state.finishNode.col];
  //   }
  //   const visitedNodesInOrder = this.state.algo(grid, startNode, finishNode);
  //   const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
  //   this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
  // }

  visualizeAlgorithm() {
    if (
      !this.state.algo ||
      this.state.visualizingAlgorithm ||
      this.state.generatingMaze
    ) {
      return;
    }
  
    let startNode;
    let finishNode;
    this.setState({ visualizingAlgorithm: true });
    const { grid } = this.state;
    console.log("Start node row:" + this.state.startNodeRow);
    if (this.state.startingNode) {
      startNode = grid[this.state.startNode.row][this.state.startNode.col];
      finishNode = grid[this.state.finishNode.row][this.state.finishNode.col];
    } else {
      this.setState({ startingNode: false });
      startNode = grid[this.state.currentStartNode.row][this.state.currentStartNode.col];
      finishNode = grid[this.state.currentFinishNode.row][this.state.currentFinishNode.col];
    }
    const visitedNodesInOrder = this.state.algo(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  

  // visualizeBidirectionalGreedySearch() {
  //   if (this.state.visualizingAlgorithm || this.state.generatingMaze) {
  //     return;
  //   }
  //   this.setState({ visualizingAlgorithm: true });

  //   setTimeout(() => {
  //     const { grid } = this.state;
  //     const startNode = grid[START_NODE_ROW][START_NODE_COL];
  //     const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
  //     const visitedNodesInOrder = bidirectionalGreedySearch(
  //       grid,
  //       startNode,
  //       finishNode
  //     );
  //     const visitedNodesInOrderStart = visitedNodesInOrder[0];
  //     const visitedNodesInOrderFinish = visitedNodesInOrder[1];
  //     const isShortedPath = visitedNodesInOrder[2];
  //     const nodesInShortestPathOrder =
  //       getNodesInShortestPathOrderBidirectionalGreedySearch(
  //         visitedNodesInOrderStart[visitedNodesInOrderStart.length - 1],
  //         visitedNodesInOrderFinish[visitedNodesInOrderFinish.length - 1]
  //       );
  //     this.animateBidirectionalAlgorithm(
  //       visitedNodesInOrderStart,
  //       visitedNodesInOrderFinish,
  //       nodesInShortestPathOrder,
  //       isShortedPath
  //     );
  //   }, this.speed);
  // }

  runAlgorithm() {
    this.clearVisualization();
    this.visualizeAlgorithm(this.state.algo);
  }

  animate(visitedNodesInOrder, nodesInShortestPathOrder) {
    if (this.state.clearingPath === true) {
      this.setState({ visualizingAlgorithm: false });
      return;
    }
    if (!visitedNodesInOrder || visitedNodesInOrder.length === 0) {
      console.error("Visited nodes array is undefined or empty");
      return;
    }

    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, this.speed * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if (node) {
          // Add this check to avoid TypeError
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-visited";
        }
      }, this.speed * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      // if (this.state.clearingPath === true ) return;
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  }

  // animateBidirectionalAlgorithm(
  //   visitedNodesInOrderStart,
  //   visitedNodesInOrderFinish,
  //   nodesInShortestPathOrder,
  //   isShortedPath
  // ) {
  //   let len = Math.max(
  //     visitedNodesInOrderStart.length,
  //     visitedNodesInOrderFinish.length
  //   );
  //   for (let i = 1; i <= len; i++) {
  //     let nodeA = visitedNodesInOrderStart[i];
  //     let nodeB = visitedNodesInOrderFinish[i];
  //     if (i === visitedNodesInOrderStart.length) {
  //       setTimeout(() => {
  //         let visitedNodesInOrder = getVisitedNodesInOrder(
  //           visitedNodesInOrderStart,
  //           visitedNodesInOrderFinish
  //         );
  //         if (isShortedPath) {
  //           this.animateShortestPath(
  //             nodesInShortestPathOrder,
  //             visitedNodesInOrder
  //           );
  //           setTimeout(() => {
  //             this.setState({ visualizingAlgorithm: false });
  //           }, nodesInShortestPathOrder.length * this.speed);
  //         } else {
  //           this.setState({ visualizingAlgorithm: false });
  //         }
  //       }, i * this.speed);
  //       return;
  //     }
  //     setTimeout(() => {
  //       if (nodeA !== undefined)
  //         document.getElementById(`node-${nodeA.row}-${nodeA.col}`).className =
  //           "node node-visited";
  //       if (nodeB !== undefined)
  //         document.getElementById(`node-${nodeB.row}-${nodeB.col}`).className =
  //           "node node-visited";
  //     }, i * this.speed);
  //   }
  // }

  generateRecursiveDivisionMaze() {
    let startNode;
    let finishNode;
    if (
      this.state.visualizingAlgorithm ||
      this.state.generatingMaze ||
      this.state.hasMaze
    ) {
      return;
    }
    this.setState({ generatingMaze: true, hasMaze: true });
    setTimeout(() => {
      const { grid } = this.state;
      if (this.state.startingNode == true) {
        startNode = grid[this.state.startNode.row][this.state.startNode.col];
        finishNode = grid[this.state.finishNode.row][this.state.finishNode.col];
      } else {
        startNode =
          grid[this.state.currentStartNode.row][
            this.state.currentStartNode.col
          ];
        finishNode = grid[this.state.finishNode.row][this.state.finishNode.col];
      }

      const walls = recursiveDivisionMaze(grid, startNode, finishNode);
      this.animateMaze(walls);
    }, this.mazeSpeed);
  }

  generateRandomMaze() {
    if (
      this.state.visualizingAlgorithm ||
      this.state.generatingMaze ||
      this.state.hasMaze
    ) {
      return;
    }
    this.setState({ generatingMaze: true, hasMaze: true });
    setTimeout(() => {
      const { grid } = this.state;
      const startNode =
        grid[this.state.startNode.row][this.state.startNode.col];
      const finishNode =
        grid[this.state.finishNode.row][this.state.finishNode.col];
      const walls = randomMaze(grid, startNode, finishNode);
      this.animateMaze(walls);
    }, this.mazeSpeed);
  }

  animateMaze = (walls) => {
    for (let i = 0; i <= walls.length; i++) {
      if (i === walls.length) {
        setTimeout(() => {
          let newGrid = getNewGridWithMaze(this.state.grid, walls);
          this.setState({ grid: newGrid, generatingMaze: false });
        }, i * this.mazeSpeed);
        return;
      }
      let wall = walls[i];
      let node = this.state.grid[wall[0]][wall[1]];
      setTimeout(() => {
        //Walls
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-wall-animated";
      }, i * this.mazeSpeed);
    }
  };

  clearVisualization() {
    const { grid } = this.state;
    this.setState({ clearingPath: true });

    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        const node = grid[row][col];
        const nodeId = `node-${node.row}-${node.col}`;
        node.isVisited = false;

        if (node.isStart) {
          document.getElementById(nodeId).className = "node node-start";
        } else if (node.isFinish) {
          document.getElementById(nodeId).className = "node node-finish";
        } else if (node.isWall) {
          document.getElementById(nodeId).className = "node node-wall";
        } else {
          document.getElementById(nodeId).className = "node";
          //node.visited = false;
          node.distance = Infinity;
          node.previousNode = null;
        }
      }
    }
    this.setState({ visualizingAlgorithm: false, clearingPath: false });
  }

  // clearBoard() {
  //   const initialGrid = getInitialGrid();
  //   this.setState({
  //     grid: initialGrid,
  //     startNode: { row: 15, col: 15 },
  //     finishNode: { row: 15, col: 47 },
  //   });
  // }


  clearBoard() {
    const { grid } = this.state;
    const newGrid = grid.map((row) =>
      row.map((node) =>
        node.isStart
          ? {
              ...node,
              isVisited: false,
              isShortestPath: false,
            }
          : node.isFinish
          ? {
              ...node,
              isVisited: false,
              isShortestPath: false,
            }
          : {
              ...node,
              isVisited: false,
              isWall: false,
              isShortestPath: false,
            }
      )
    );
    this.setState({ grid: newGrid });
  }
  

  render() {
    const { grid, mouseIsPressed, startNode, finishNode } = this.state;

    return (
      <React.Fragment>
        <div>
          <Router>
            <Navbar bg="dark" variant="dark" expand="lg" color="">
              <Container fluid>
                <Navbar.Brand href="#">Pathfinding Algorithms</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                  <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: "150px" }}
                    navbarScroll
                  >
                    <NavLink
                      className="visualizeButton"
                      onClick={() =>
                        this.state.algo !== bidirectionalGreedySearch
                          ? this.runAlgorithm()
                          : this.visualizeBidirectionalGreedySearch()
                      }
                    >
                      Visualize {this.state.algorithm}
                    </NavLink>
                    <NavLink
                      className="generateMazeButton"
                      onClick={() => this.generateCurMaze(this.state.maze)}
                    >
                      Generate {this.state.curMaze}
                    </NavLink>

                    <NavDropdown
                      title="Choose an Algorithm!"
                      id="navbarScrollingDropdown"
                    >
                      <NavDropdown.Item
                        onClick={() => {
                          this.algoSelection("Dijkstra");
                        }}
                      >
                        Dijkstra's
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        onClick={() => {
                          this.algoSelection("A*");
                        }}
                      >
                        A*
                      </NavDropdown.Item>

                      <NavDropdown.Item
                        onClick={() => {
                          this.algoSelection("Greedy");
                        }}
                      >
                        Greedy BFS
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        onClick={() => {
                          this.algoSelection("Breadth-first search");
                        }}
                      >
                        Breadth-first search
                      </NavDropdown.Item>

                      <NavDropdown.Item
                        onClick={() => {
                          this.algoSelection("DFS");
                        }}
                      >
                        Depth First Search
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        onClick={() => {
                          this.algoSelection("Random Search");
                        }}
                      >
                        Random Search
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        onClick={() => {
                          this.algoSelection("Best first search");
                        }}
                      >
                        Best first search
                      </NavDropdown.Item>

                      {/* <NavDropdown.Item
                        onClick={() => {
                          this.algoSelection("Bi directional Greedy");
                        }}
                      >
                        Bi directional Greedy Search
                      </NavDropdown.Item> */}
                    </NavDropdown>

                    <NavDropdown
                      title="Choose a Maze!"
                      id="navbarScrollingDropdown"
                    >
                      <NavDropdown.Item
                        onClick={() => this.mazeSelection("Recursive Division")}
                      >
                        Recursive Division
                      </NavDropdown.Item>

                      <NavDropdown.Item
                        onClick={() => this.mazeSelection("Random Maze")}
                      >
                        Random Maze
                      </NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown title="Speed" id="navbarScrollingDropdown">
                      <NavDropdown.Item onClick={() => this.setSpeed(10)}>
                        Fast
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={() => this.setSpeed(20)}>
                        Medium
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={() => this.setSpeed(60)}>
                        Slow
                      </NavDropdown.Item>
                    </NavDropdown>

                    <Nav.Link onClick={() => this.clearVisualization()}>
                      Clear Path
                    </Nav.Link>
                    <Nav.Link onClick={() => this.clearBoard()}>
                      Clear Board
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </Router>
        </div>
        <div id="mainText">
          <ul>
            <li>
              <div class="start"></div>Start Node
            </li>
            <li>
              <div class="finish"></div>Target Node
            </li>
            <li>
              <div class="unvisited"></div>Unvisited Node
            </li>
            <li>
              <div class="visited"></div>
              <div class="visitedobject"></div>Visited Nodes
            </li>
            <li>
              <div class="node-shortest-path"></div>Shortest-path Node
            </li>
            <li>
              <div class="wall"></div>Wall Node
            </li>
            <li>
              <div class="speed"></div>Speed: {this.state.speed}
            </li>
          </ul>
        </div>

        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isWall } = node;
                  const isStart =
                    row === startNode.row && col === startNode.col;
                  const isFinish =
                    row === finishNode.row && col === finishNode.col;

                  return (
                    <Node
                      key={nodeIdx}
                      className="node"
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      isDraggable={isStart}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) =>
                        isStart
                          ? this.handleStartNodeMouseDown(row, col)
                          : this.handleMouseDown(row, col)
                      }
                      onDrag={(e) => this.handleNodeDrag(row, col)}
                      onMouseMove={(row, col) => this.handleMouseMove(row, col)} // Add this line
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => this.handleDrop(e, row, col)}
                      row={row}
                      // onDragStart={(e) => this.handleDragStart(e, isStart ? "start" : "finish")}
                      onDragStart={(e) =>
                        this.handleDragStart(
                          e,
                          isStart ? "start" : "finish",
                          row,
                          col
                        )
                      }
                      onDragEnd={(e) =>
                        this.handleDragEnd(
                          isStart ? "start" : "finish",
                          row,
                          col
                        )
                      }
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
        {this.state.showTutorial && (
          <Tutorial onClose={() => this.setState({ showTutorial: false })} />
        )}
      </React.Fragment>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 29; row++) {
    const currentRow = [];
    for (let col = 0; col < 56; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }

  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    f: 0,
    g: 0,
    h: 0,
    pos: 0,
    closest: 0,
    totalDis: 0,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    draggable:
      (row === START_NODE_ROW && col === START_NODE_COL) ||
      (row === FINISH_NODE_ROW && col === FINISH_NODE_COL),
    dis: Infinity,
    isVisited: false,
    isWall: false,
    isShortestPath: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const getNewGridWithMaze = (grid, walls) => {
  let newGrid = grid.slice();
  for (let wall of walls) {
    let node = grid[wall[0]][wall[1]];
    let newNode = {
      ...node,
      isWall: true,
    };
    newGrid[wall[0]][wall[1]] = newNode;
  }
  return newGrid;
};

function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode ? currentNode.previousNode : null;
  }
  return nodesInShortestPathOrder;
}

// const getVisitedNodesInOrder = (
//   visitedNodesInOrderStart,
//   visitedNodesInOrderFinish
// ) => {
//   let visitedNodesInOrder = [];
//   let n = Math.max(
//     visitedNodesInOrderStart.length,
//     visitedNodesInOrderFinish.length
//   );
//   for (let i = 0; i < n; i++) {
//     if (visitedNodesInOrderStart[i] !== undefined) {
//       visitedNodesInOrder.push(visitedNodesInOrderStart[i]);
//     }
//     if (visitedNodesInOrderFinish[i] !== undefined) {
//       visitedNodesInOrder.push(visitedNodesInOrderFinish[i]);
//     }
//   }
//   return visitedNodesInOrder;
// };
