import React, { useRef } from "react";
import {
  Navbar,
  Container,
  Nav,
  Button,
  NavDropdown,
  NavLink,
} from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";
import { MyNavbarProps } from "../types/types";
import { uploadFile } from "../api/fileUpload";
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

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    console.log("clicked upload");
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadFile(file);
    }
  };

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

              {/* currently debugging */}

              {/* <Nav.Link onClick={toggleComparisonMode}>
                {comparisonMode
                  ? "Exit Comparison Mode"
                  : "Enter Comparison Mode"}
              </Nav.Link> */}

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
          <input
            type="file"
            id="fileInput"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <div className="ml-auto d-flex align-items-center">
            <Button
              variant="outline-secondary" // removes background color
              style={{ marginRight: "20px" }} // adds space to the right
              onClick={handleUploadClick}
            >
              Upload File
            </Button>
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
