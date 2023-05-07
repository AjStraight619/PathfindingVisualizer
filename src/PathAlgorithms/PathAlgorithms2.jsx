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
import { FiAnchor, FiChevronRight, FiCrosshair } from "react-icons/fi";
import { recursiveDivisionMaze } from "../Mazes/recursiveDivisionMaze";
import { randomMaze } from "../Mazes/randomMaze";
import { NavLink, Button, ButtonGroup } from "react-bootstrap";
import Tutorial from "../Tutorial/Tutorial";
import { bestFirstSearch } from "../Algorithms/bestFirstSearch";
import "./PathFinding.css";
import "./Node/Node.css";

const START_NODE_ROW = 15;
const START_NODE_COL = 8;
const FINISH_NODE_ROW = 15;
const FINISH_NODE_COL = 57;
const weightedAlgos = "Dijkstra" && "A*";

export default class PathFinding extends Component {
  algoMapping = {
    Dijkstra: { algo: dijkstra, isShortestPathAlgo: true, weighted: true },
    "A*": { algo: aStar, isShortestPathAlgo: true, weighted: true },
    Greedy: { algo: greedyBFS, isShortestPathAlgo: false, weighted: false },
    "Breadth-first Search": {
      algo: BFS,
      isShortestPathAlgo: true,
      weighted: false,
    },
    DFS: { algo: depthFirstSearch, isShortestPathAlgo: false, weighted: false },
    "Random Search": {
      algo: randomSearch,
      isShortestPathAlgo: false,
      weighted: false,
    },
    "Best First Search": {
      algo: bestFirstSearch,
      isShortestPathAlgo: false,
      weighted: false,
    },
  };
  constructor() {
    super();
    this.algoSelection = this.algoSelection.bind(this);
    this.state = {
      initialGrid: [],
      grid: [],
      mouseIsPressed: false,
      dragging: false,
      isToggled: false,
      generatingMaze: false,
      visualizingAlgorithm: false,
      animationStopped: false,
      algorithm: " ",
      speed: "Fast",
      hasMaze: false,
      curAlgo: " ",
      algo: null,
      curMaze: " ",
      maze: null,
      startingNode: true,
      startNode: { row: START_NODE_ROW, col: START_NODE_COL },
      finishNode: { row: FINISH_NODE_ROW, col: FINISH_NODE_COL },
      dragType: null,
      currentStartNode: null,
      currentFinishNode: null,
      showTutorial: true,
      clearingPath: false,
      draggedNode: null,
      isShortestPath: false,
      isShortestPathAlgo: false,
      isWeightToggled: false,
      isAlgoSelected: false,
      weight: 1,
      weightedAlgos: ["A*", "Dijkstra"],
      selectedAlgorithms: [],
      comparisonMode: false,
      stopVisualization: false,
      stopShortestPathVisualization: false,
      isWeightDisabled: false,
    };
    this.algoSelection = this.algoSelection.bind(this);
    this.speed = 10;
    this.mazeSpeed = 10;
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.animationStopped = false;
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

    const startingNodeIndex = grid.findIndex((row) =>
      row.includes(this.state.startNode)
    );
    this.setState({ grid, initalGrid: grid, startingNodeIndex });
  }

  handleMouseDown(row, col) {
    let newGrid;
    if (this.state.isWeightToggled) {
      newGrid = getNewGridWithWeightToggled(this.state.grid, row, col);
    } else {
      newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    }
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

      if (this.state.isWeightToggled) {
        const newGrid = getNewGridWithWeightToggled(this.state.grid, row, col);
        this.setState({ grid: newGrid });
      } else {
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({ grid: newGrid });
      }
    }
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false, draggedNode: null });
  }

  handleDragStart(e, dragType, row, col) {
    if (!this.state.grid[row][col].isDraggable) return;
    if (!e || !e.dataTransfer) return;
    e.dataTransfer.setData("text/plain", dragType);

    if (dragType === "start") {
      const nodeElement = document.getElementById(`node-${row}-${col}`);
      nodeElement.classList.add("dragging");
    }

    this.setState({ dragging: true, dragType: dragType });
  }

  handleDrop(e, newRow, newCol) {
    e.preventDefault();

    const { startNode } = this.state;
    const draggedNode = this.state.draggedNode;
    if (!draggedNode) {
      return; // Exit early if draggedNode is null or undefined
    }

    const { row, col } = draggedNode;
    const newGrid = this.state.grid.slice();

    newGrid[row][col].isStart = false;

    newGrid[startNode.row][startNode.col].isStart = false;

    if (this.state.dragType === "start") {
      newGrid[newRow][newCol].isStart = true;
      this.setState({ startNode: { row: newRow, col: newCol } });
    } else if (this.state.dragType === "finish") {
      newGrid[newRow][newCol].isFinish = true;
      this.setState({ finishNode: { row: newRow, col: newCol } });
    }

    this.setState({ grid: newGrid, draggedNode: null });
  }

  handleDragEnd(dragType, row, col) {
    this.setState((prevState) => {
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

  toggleWeights() {
    this.setState((prevState) => ({
      isWeightToggled: !prevState.isWeightToggled,
    }));
  }

  enableOrDisableWeights() {
    const { grid, isWeightDisabled } = this.state;
  
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const node = grid[i][j];
      if (node.isWeight) {
        const element = document.getElementById(`node-${node.row}-${node.col}`);
        if (isWeightDisabled) {
          element.classList.add("weight-fade");
          node.isWeight = false;
          node.weight = 1;
        } else {
          element.classList.remove("weight-fade");
          node.isWeight = true;
          node.weight = this.state.weight;
        }
      }
    }
  }
}

  // algoSelection = (currentAlgoSelected) => {
  //   const { comparisonMode, selectedAlgorithms } = this.state;
  //   let newSelectedAlgorithms = [...selectedAlgorithms];

  //   const algoObj = this.algoMapping[currentAlgoSelected];
  //   if (algoObj && algoObj.weighted) {
  //     // Algorithm is weighted, update state to ignore weights
  //     this.setState({ isWeightDisabled: true });
  //     // Call disableWeights() to disable weights on the grid
  //     this.disableWeights();
  //   } else {
  //     // Algorithm is not weighted, enable weights on the grid
  //     this.setState({ isWeightDisabled: false });
  //   }

  //   // If comparisonMode is on, handle the selection accordingly
  //   if (comparisonMode) {
  //     if (newSelectedAlgorithms.includes(currentAlgoSelected)) {
  //       newSelectedAlgorithms = newSelectedAlgorithms.filter(
  //         (alg) => alg !== currentAlgoSelected
  //       );
  //     } else if (newSelectedAlgorithms.length < 2) {
  //       newSelectedAlgorithms.push(currentAlgoSelected);
  //     }
  //   } else {
  //     // In non-comparison mode, replace the selected algorithm
  //     newSelectedAlgorithms = [currentAlgoSelected];
  //   }

  //   const algoObj = this.algoMapping[currentAlgoSelected];

  //   this.setState({
  //     selectedAlgorithms: newSelectedAlgorithms,
  //     algorithm: currentAlgoSelected,
  //     isAlgoSelected: true,
  //     ...algoObj,
  //   });
  // };

  algoSelection = (currentAlgoSelected) => {
    const { comparisonMode, selectedAlgorithms } = this.state;
    let newSelectedAlgorithms = [...selectedAlgorithms];
  
    const algoObj = this.algoMapping[currentAlgoSelected];
    // if (algoObj && algoObj.weighted) {
    //   // Algorithm is weighted, disable weights on the grid
    //   this.setState({ isWeightDisabled: true });
    //   this.enableOrDisableWeights();
      
    // } else {
    //   // Algorithm is not weighted, enable weights on the grid
    //   this.setState({ isWeightDisabled: false });
    //   this.enableOrDisableWeights();
      
    // }
  
    // If comparisonMode is on, handle the selection accordingly
    if (comparisonMode) {
      if (newSelectedAlgorithms.includes(currentAlgoSelected)) {
        newSelectedAlgorithms = newSelectedAlgorithms.filter(
          (alg) => alg !== currentAlgoSelected
        );
      } else if (newSelectedAlgorithms.length < 2) {
        newSelectedAlgorithms.push(currentAlgoSelected);
      }
    } else {
      // In non-comparison mode, replace the selected algorithm
      newSelectedAlgorithms = [currentAlgoSelected];
    }
  
    this.setState({
      selectedAlgorithms: newSelectedAlgorithms,
      algorithm: currentAlgoSelected,
      isAlgoSelected: true,
      ...algoObj,
    });
  };

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

  visualizeAlgorithm(algo, visitedClass, shortestPathClass) {
    if (
      !this.state.algo ||
      this.state.visualizingAlgorithm ||
      this.state.generatingMaze
    ) {
      return;
    }

    let startNode;
    let finishNode;
    this.clearVisualization();
    this.setState({ visualizingAlgorithm: true });
    const { grid } = this.state;
    if (this.state.startingNode) {
      startNode = grid[this.state.startNode.row][this.state.startNode.col];
      finishNode = grid[this.state.finishNode.row][this.state.finishNode.col];
    } else {
      this.setState({ startingNode: false });
      startNode =
        grid[this.state.currentStartNode.row][this.state.currentStartNode.col];
      finishNode =
        grid[this.state.currentFinishNode.row][
          this.state.currentFinishNode.col
        ];
    }
    const visitedNodesInOrder = algo(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);

    this.animate(
      visitedNodesInOrder,
      nodesInShortestPathOrder,
      visitedClass,
      shortestPathClass
    );
    console.log("animate called");
  }

  runAlgorithm() {
    const { selectedAlgorithms, comparisonMode } = this.state;
    if (comparisonMode && selectedAlgorithms.length !== 2) return;

    if (comparisonMode) {
      // Run both algorithms
      this.visualizeAlgorithm(
        this.algoMapping[selectedAlgorithms[0]].algo,
        "node-visited",
        "node-shortest-path"
      );

      this.visualizeAlgorithm(
        this.algoMapping[selectedAlgorithms[1]].algo,
        "node-visited-second",
        "node-shortest-path-second"
      );
    } else {
      // Run the single selected algorithm
      this.visualizeAlgorithm(
        this.algoMapping[selectedAlgorithms[0]].algo,
        "node-visited",
        "node-shortest-path"
      );
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    const timeouts = [];

    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      const timeout = setTimeout(() => {
        if (this.state.animationStopped) {
          timeouts.forEach(clearTimeout);
          return;
        }

        const node = nodesInShortestPathOrder[i];
        const element = document.getElementById(`node-${node.row}-${node.col}`);
        if (element.classList.contains("node-visited-weight")) {
          element.className = "node node-visited-weight node-shortest-path";
        } else {
          element.className = "node node-shortest-path";
        }
      }, this.speed * i);
      timeouts.push(timeout);
    }
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

    const timeouts = [];
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (this.animationStopped) {
        timeouts.forEach(clearTimeout);
        return;
      }

      const timeout = setTimeout(() => {
        if (this.animationStopped) {
          timeouts.forEach(clearTimeout);
          return;
        }

        if (i === visitedNodesInOrder.length) {
          this.animateShortestPath(nodesInShortestPathOrder);
        } else {
          const node = visitedNodesInOrder[i];
          const element = document.getElementById(
            `node-${node.row}-${node.col}`
          );
          if (element) {
            if (element.classList.contains("node-weight")) {
              element.className = "node node-weight node-visited";
            } else {
              element.className = "node node-visited";
            }
          }
        }
      }, this.speed * i);
      timeouts.push(timeout);
    }
  }

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
      if (this.state.startingNode === true) {
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
    }, this.speed);
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
    }, this.speed);
  }

  animateMaze = (walls) => {
    for (let i = 0; i <= walls.length; i++) {
      if (i === walls.length) {
        setTimeout(() => {
          let newGrid = getNewGridWithMaze(this.state.grid, walls);
          this.setState({ grid: newGrid, generatingMaze: false });
        }, i * this.speed);
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
    this.setState({ animationStopped: true });

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
          node.distance = Infinity;
          node.previousNode = null;
        }
      }
    }

    this.setState({ visualizingAlgorithm: false, animationStopped: false });
  }

  clearBoard() {
    const { grid } = this.state;
    const newGrid = grid.map((row) =>
      row.map((node) =>
        node.isStart
          ? {
              ...node,
              isVisited: false,
              isShortestPath: false,
              className: "node node-start",
            }
          : node.isFinish
          ? {
              ...node,
              isVisited: false,
              isShortestPath: false,
              className: "node node-finish",
            }
          : {
              ...node,
              isVisited: false,
              isWall: false,
              isWeight: false,
              weight: 1,
              isShortestPath: false,
              className: "node",
            }
      )
    );
    this.setState({ grid: newGrid });
  }

  render() {
    const {
      grid,
      mouseIsPressed,
      startNode,
      finishNode,
      selectedAlgorithms,
      comparisonMode,
    } = this.state;

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
                    className="me-auto my-2 my-lg-0 justify-content-center"
                    style={{ maxHeight: "150px" }}
                    navbarScroll
                  >
                    <ButtonGroup className="my-2">
                      <Button
                        className={
                          comparisonMode
                            ? "comparison-button mr-2"
                            : "primary mr-2"
                        }
                        onClick={() => this.runAlgorithm()}
                      >
                        Visualize{" "}
                        {comparisonMode
                          ? selectedAlgorithms.join(" vs ")
                          : selectedAlgorithms[0]}
                      </Button>
                      <Button
                        className="ml-2"
                        variant="secondary"
                        onClick={() => this.generateCurMaze(this.state.maze)}
                      >
                        Generate {this.state.curMaze}
                      </Button>
                    </ButtonGroup>

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
                          this.algoSelection("Breadth-first Search");
                        }}
                      >
                        Breadth-first Search
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
                          this.algoSelection("Best First Search");
                        }}
                      >
                        Best First Search
                      </NavDropdown.Item>

                      {/* <NavDropdown.Item
                        onClick={() => {i
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
                    <NavLink onClick={() => this.toggleWeights()}>
                      {this.state.isWeightToggled
                        ? "Toggle Walls"
                        : "Toggle Weights"}
                    </NavLink>

                    <NavDropdown
                      title={`Speed: ${this.state.speed}`}
                      id="navbarScrollingDropdown"
                    >
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
                    <Nav.Link
                      onClick={() => {
                        this.setState({
                          comparisonMode: !this.state.comparisonMode,
                        });
                      }}
                    >
                      {this.state.comparisonMode
                        ? "Exit Comparison Mode"
                        : "Enter Comparison Mode"}
                    </Nav.Link>

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
        <div className="algorithm-info-container">
          <p className="algorithm-info">
            {comparisonMode
              ? this.state.selectedAlgorithms.length === 1
                ? "You are in comparison mode, choose one more algorithm to compare " +
                  this.state.selectedAlgorithms[0] +
                  " with."
                : this.state.selectedAlgorithms.length === 2
                ? "Comparing " +
                  this.state.selectedAlgorithms[0] +
                  " with " +
                  this.state.selectedAlgorithms[1]
                : ""
              : this.state.isAlgoSelected
              ? this.state.isShortestPathAlgo && weightedAlgos
                ? "You chose " +
                  this.state.selectedAlgorithms[0] +
                  ". This algorithm is weighted, and guarantees the shortest path."
                : "You chose " +
                  this.state.selectedAlgorithms[0] +
                  ", this algorithm is not weighted, and does not guarantee the shortest path."
              : ""}
          </p>
        </div>
        <div className="legend-container">
          <ul className="legend-list">
            <li>
              <span>Start Node</span>
              <div className="text-with-icon legend-icon">
                <div className="node-for-legend start-icon"></div>
                {<FiChevronRight />}
              </div>
            </li>
            <li>
              <span>Target Node</span>
              <div className="text-with-icon legend-icon">
                <div className="node-for-legend finish-icon"></div>
                {<FiCrosshair />}
              </div>
            </li>
            <li>
              <span>Unvisited Node</span>
              <div className="text-with-icon legend-icon">
                <div className="node-for-legend unvisited"></div>
              </div>
            </li>
            <li>
              <span>Visited Nodes</span>
              <div className="text-with-icon legend-icon">
                <div
                  className="node-for-legend visited-object legend-node"
                  style={{ marginRight: "4px" }}
                ></div>
                <div className="node-for-legend current-visited legend-node"></div>
              </div>
            </li>
            <li>
              <span>Shortest-path Node</span>
              <div className="text-with-icon legend-icon">
                <div className="node-for-legend node-shortest-path"></div>
              </div>
            </li>
            <li>
              <span>Wall Node</span>
              <div className="text-with-icon legend-icon">
                <div className="node-for-legend node-wall"></div>
              </div>
            </li>
            <li>
              <span>Weight Node</span>
              <div className="text-with-icon legend-icon">
                <div className="node-for-legend weight-icon"></div>
                {<FiAnchor />}
              </div>
            </li>
          </ul>
          {comparisonMode && this.state.selectedAlgorithms.length === 2 && (
            <ul className="comparison-list">
              <li>
                <span>{this.state.selectedAlgorithms[0]}</span>
                <div className="text-with-icon legend-icon"></div>
                <div className="node-for-legend node node-visited"></div>
              </li>
              <li>
                <span>{this.state.selectedAlgorithms[1]}</span>
                <div className="text-with-icon legend-icon"></div>
                <div className="node-for-legend node node node-visited-second"></div>
              </li>
            </ul>
          )}
        </div>

        <div className="grid-container">
          <div className="grid">
            {grid.map((row, rowIdx) => {
              return (
                <div key={rowIdx} className="row">
                  {row.map((node, nodeIdx) => {
                    const { row, col, isWall, isWeight } = node;
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
                        isWeight={isWeight}
                        isDragging={mouseIsPressed && isStart}
                        mouseIsPressed={mouseIsPressed}
                        onMouseDown={(row, col) =>
                          isStart
                            ? this.handleStartNodeMouseDown(row, col)
                            : this.handleMouseDown(row, col)
                        }
                        onDrag={(e) => this.handleNodeDrag(row, col)}
                        onMouseMove={(row, col) =>
                          this.handleMouseMove(row, col)
                        }
                        onMouseEnter={(row, col) =>
                          this.handleMouseEnter(row, col)
                        }
                        onMouseUp={() => this.handleMouseUp()}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => this.handleDrop(e, row, col)}
                        row={row}
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
  for (let row = 0; row < 35; row++) {
    const currentRow = [];
    for (let col = 0; col < 65; col++) {
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
    isWeight: false,
    weight: 1,
    // element: document.createElement("div"),
    // getClassName: function () {
    //   let className = "node";
    //   if (this.isStart) className += " node-start";
    //   if (this.isFinish) className += " node-finish";
    //   if (this.isWall) className += " node-wall";
    //   if (this.isShortestPath) className += " node-shortest-path";
    //   if (this.isWeight) className += " weight-node";
    //   return className;
    // },
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

const getNewGridWithWeightToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWeight: !node.isWeight,
    weight: Math.floor(Math.random() * 10) + 2, // set weight to random number between 2 and 10
  };

  newGrid[row][col] = newNode;
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
