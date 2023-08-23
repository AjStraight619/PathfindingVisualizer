import React from "react";
import {
  Navbar,
  Container,
  Nav,
  ButtonGroup,
  Button,
  NavDropdown,
  NavLink,
} from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";
import { Algorithm, Maze } from "../types/types";

interface MyNavbarProps {
  runAlgorithm: (selectedAlgorithms: Algorithm[]) => void;
  algoSelection: (algo: string) => void;
  selectedAlgorithms: Algorithm[];
  algorithmMapping: { [key: string]: Algorithm };
  comparisonMode: boolean;
  isWeightToggled: boolean;
  clearVisualization: () => void;
  clearBoard: () => void;
  speed: number;
  mazeSelection: (maze: string) => void;
  toggleWeights: () => void;
  setSpeed: (speed: number) => void;
  toggleComparisonMode: () => void;
  // generatingMaze: boolean;
  selectedMaze: Maze[];
  mazeMapping: { [key: string]: Maze };
  speedMapping: { [key: string]: number };
  speedSelected: number;
  speedSelection: (speed: string) => void;
  toggleTutorial: () => void;
  selectedSpeed: string;
}

const MyNavbar: React.FC<MyNavbarProps> = (props) => {
  const {
    comparisonMode,
    selectedAlgorithms,
    selectedMaze,
    runAlgorithm,
    algoSelection,
    isWeightToggled,
    toggleWeights,
    toggleComparisonMode,
    clearBoard,
    clearVisualization,
    mazeSelection,
    algorithmMapping,
    mazeMapping,
    speedMapping,
    speedSelection,
    toggleTutorial,
    selectedSpeed,
  } = props;
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg" color="">
        <Container fluid className="d-flex justify-content-between">
          <Navbar.Brand href="#">
            <img
              src={"/path.png"}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt=""
            />
            {" Pathfinding Algorithms"}
          </Navbar.Brand>
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
                    comparisonMode ? "comparison-button mr-2" : "primary mr-2"
                  }
                  onClick={() => runAlgorithm(selectedAlgorithms)}
                >
                  Visualize{" "}
                  {comparisonMode
                    ? selectedAlgorithms.map((algo) => algo.name).join(" vs ")
                    : selectedAlgorithms && selectedAlgorithms.length > 0
                    ? selectedAlgorithms[0].name
                    : ""}
                </Button>
                <Button className="ml-2" variant="secondary">
                  Generate {selectedMaze.length > 0 ? selectedMaze[0].name : ""}
                </Button>
              </ButtonGroup>

              <NavDropdown
                title="Choose an Algorithm!"
                id="navbarScrollingDropdown"
              >
                {Object.keys(algorithmMapping || {}).map((algoName) => (
                  <NavDropdown.Item
                    key={algoName}
                    onClick={() => {
                      algoSelection(algoName);
                    }}
                  >
                    {algoName}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>

              <NavDropdown title="Choose a Maze!" id="navbarScrollingDropdown">
                {Object.keys(mazeMapping || {}).map((mazeName) => (
                  <NavDropdown.Item
                    key={mazeName}
                    onClick={() => {
                      mazeSelection(mazeName);
                    }}
                  >
                    {mazeName}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
              <NavLink onClick={() => toggleWeights()}>
                {isWeightToggled ? "Toggle Walls" : "Toggle Weights"}
              </NavLink>

              <NavDropdown
                title={`Speed: ${selectedSpeed}`}
                id="navbarScrollingDropdown"
              >
                {Object.keys(speedMapping || {}).map((speedName) => (
                  <NavDropdown.Item
                    key={speedName}
                    onClick={() => {
                      speedSelection(speedName);
                    }}
                  >
                    {speedName}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>

              <Nav.Link onClick={toggleComparisonMode}>
                {comparisonMode
                  ? "Exit Comparison Mode"
                  : "Enter Comparison Mode"}
              </Nav.Link>

              <Nav.Link onClick={() => clearVisualization()}>
                Clear Path
              </Nav.Link>
              <Nav.Link onClick={() => clearBoard()}>Clear Board</Nav.Link>
              <Nav.Link onClick={toggleTutorial}>Tutorial</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <div className="ml-auto">
            <Button
              target="_blank"
              href="https://github.com/AjStraight619/PathfindingVisualizer"
              className="btn btn-dark"
            >
              Github
            </Button>
          </div>
        </Container>
      </Navbar>
    </Router>
  );
};

export default MyNavbar;
