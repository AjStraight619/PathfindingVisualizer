import React from "react";
import {
  Button,
  Container,
  Nav,
  NavDropdown,
  NavLink,
  Navbar,
} from "react-bootstrap";
import { FiGithub } from "react-icons/fi";
import { BrowserRouter as Router } from "react-router-dom";
import { MyNavbarProps } from "../types/types";
import "./MyNavBar.css";

const MyNavbar: React.FC<MyNavbarProps> = (props) => {
  const {
    comparisonMode,
    selectedAlgorithms,
    selectedMaze,
    runAlgorithm,
    algoSelection,
    isWeightToggled,
    toggleWeights,
    // toggleComparisonMode,
    clearBoard,
    clearVisualization,
    mazeSelection,
    algorithmMapping,
    mazeMapping,
    speedMapping,
    speedSelection,
    toggleTutorial,
    generateMaze,
    selectedSpeed,
    toggleAllowDiagonalMovement,
    allowDiagonalMovement,
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
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <Button
                  className={`custom-button custom-primary-button ${
                    comparisonMode ? "comparison-button" : "primary"
                  }`}
                  onClick={() => runAlgorithm(selectedAlgorithms)}
                >
                  {selectedAlgorithms.length > 0
                    ? "Visualize Algorithm"
                    : "Select an algorithm"}
                </Button>
                <Button
                  className={`custom-button custom-secondary-button ml-auto ${
                    selectedMaze.length === 0 && "disabled"
                  }`}
                  onClick={() => generateMaze(selectedMaze)}
                  disabled={selectedMaze.length === 0}
                >
                  {selectedMaze.length > 0
                    ? `Generate ${selectedMaze[0].name}`
                    : "Select a maze"}
                </Button>
              </div>

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

              <Nav.Link onClick={toggleAllowDiagonalMovement}>
                {allowDiagonalMovement
                  ? "Disable Diagonal Movement"
                  : "Enable Diagonal Movement"}
              </Nav.Link>

              <Nav.Link onClick={() => clearVisualization()}>
                Clear Path
              </Nav.Link>
              <Nav.Link onClick={() => clearBoard()}>Clear Board</Nav.Link>
              <Nav.Link onClick={toggleTutorial}>Tutorial</Nav.Link>
            </Nav>
          </Navbar.Collapse>

          <div className="ml-auto d-flex align-items-center">
            <Button
              target="_blank"
              href="https://github.com/AjStraight619/PathfindingVisualizer"
              className="btn btn-dark"
            >
              <FiGithub />
            </Button>
          </div>
        </Container>
      </Navbar>
    </Router>
  );
};

export default MyNavbar;
