import "./App.css";
import { useState, useEffect } from "react";

export default function App() {
  const [degree, setDegree] = useState(-90);
  let direction = true;
  let time = 200;

  const changeDegree = async () => {
    setDegree((prevDegree) => {
      let newDegree = direction ? prevDegree + 1 : prevDegree - 1;

      if (newDegree === -90 || newDegree === 90) {
        direction = !direction;
      }

      return newDegree;
    });

    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  };

  const cycle = (anyFunction) => {
    anyFunction().then(() => {
      cycle(anyFunction);
    });
  };

  useEffect(() => {
    cycle(changeDegree);
  }, []);

  useEffect(() => {
    console.log("degree: " + degree);
  }, [degree]);

  return (
    <div className="screen">
      <div className="background-radar">
        <div className="background-radar-due" />
        <div className="background-radar-tre" />
      </div>
      <div className="line" style={{ transform: "rotate(30deg)" }} />
      <div className="line" style={{ transform: "rotate(60deg)" }} />
      <div className="line" />
      <div className="line" style={{ transform: "rotate(-30deg)" }} />
      <div className="line" style={{ transform: "rotate(-60deg)" }} />
      <div
        className="line rotation"
        style={{
          transform: `rotate(${degree}deg)`,
        }}
      />
      <div
        style={{
          background: "black",
          width: "100vw",
          height: "calc(100vh - 500px)",
          zIndex: 10,
          position: "absolute",
        }}
      ></div>
    </div>
  );
}
