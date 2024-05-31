import "./radar.css";
import { useState, useEffect } from "react";

const Radar = (props) => {
  const [degree, setDegree] = useState(-90);
  const [opacity, setOpacity] = useState([]);

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
    props.detections.map((value, index) => {
      setOpacity((prevOpacity) => {
        let newOpacity = prevOpacity;

        if (value.degree == degree) {
          newOpacity[index] = 100;
        } else if (opacity.at(index) != 0) {
          newOpacity[index] = newOpacity.at(index) - 5;
        }

        return newOpacity;
      });
    });
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
      {props.detections.map((value, key) => {
        return (
          <div
            className="line"
            style={{
              transform: `rotate(${value.degree}deg`,
              borderImage: `linear-gradient(to top, transparent ${
                (value.distance / 60) * 100
              }%, red ${(value.distance / 60) * 100}%) 5`,
              opacity: opacity[key] != undefined ? (opacity[key] / 100) : 0
            }}
            key={key}
          ></div>
        );
      })}
      <div
        style={{
          background: "black",
          width: "100vw",
          height: "500px",
          zIndex: -1,
          position: "absolute",
        }}
      ></div>
    </div>
  );
};

export default Radar;
