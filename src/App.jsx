import "./app.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

import { Live } from "./Live.jsx";
import { Home } from "./Home.jsx";
import Radar from "./Radar.jsx";

export default function App() {
  const [detections, setDetections] = useState([]);
  const [opacity, setOpacity] = useState([]);

  const addLine = async (newDegree, newDistance) => {
    return new Promise((resolve) => {
      setDetections((prevDetections) => {
        const newArray = [
          ...prevDetections,
          { degree: newDegree, distance: newDistance },
        ];
        setOpacity((prevOpacity) => {
          let newOpacity = [...prevOpacity, 0];
          return newOpacity;
        });
        resolve(newArray);
        return newArray;
      });
    });
  };

  return (
    <div style={{ height: "fit-content" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/radar-arduino/">
            <Route
              index
              element={
                <Home
                  detections={detections}
                  setDetections={setDetections}
                  opacity={opacity}
                  setOpacity={setOpacity}
                  addLine={addLine}
                  live={false}
                />
              }
            />
            <Route
              path="live"
              element={
                <Live
                  detections={detections}
                  setDetections={setDetections}
                  opacity={opacity}
                  setOpacity={setOpacity}
                  addLine={addLine}
                  live={true}
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
