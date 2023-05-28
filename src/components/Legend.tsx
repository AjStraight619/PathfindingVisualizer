import React from "react";
import { FiChevronRight, FiCrosshair, FiAnchor } from "react-icons/fi";
import { Algorithm } from "../types/types";
import "./Legend.css";

interface MyLegend {
  comparisonMode: boolean;
  selectedAlgorithms: Algorithm[];
}

const Legend: React.FC<MyLegend> = (props) => {
  const { comparisonMode, selectedAlgorithms } = props;

  return (
    <div className="legend-container">
      <ul className="legend-list">
        <li>
          <span>Start Node</span>
          <div className="text-with-icon legend-icon">
            <div className="node-for-legend start-icon"></div>
            <FiChevronRight />
          </div>
        </li>
        <li>
          <span>Target Node</span>
          <div className="text-with-icon legend-icon">
            <div className="node-for-legend finish-icon"></div>
            <FiCrosshair />
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
            <FiAnchor />
          </div>
        </li>
      </ul>
      {comparisonMode && selectedAlgorithms.length === 2 && (
        <ul className="comparison-list">
          <li>
            <span>{selectedAlgorithms[0].name}</span>
            <div className="text-with-icon legend-icon"></div>
            <div className="node-for-legend node node-visited"></div>
          </li>
          <li>
            <span>{selectedAlgorithms[1].name}</span>
            <div className="text-with-icon legend-icon"></div>
            <div className="node-for-legend node node node-visited-second"></div>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Legend;
