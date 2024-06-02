import Radar from "./Radar";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const Live = (props) => {
  const serverUrl =
    "https://radar-arduino-default-rtdb.europe-west1.firebasedatabase.app/arduinolive";
  let newDetections;

  useEffect(() => {
    setInterval(async () => {
      axios.get(serverUrl + ".json").then((resp) => {
        for (let key in resp.data) {
          props.setDetections((prevDetections) => {
            let newDetections = prevDetections;
            newDetections.push(resp.data[key]);
            axios.delete(`${serverUrl}/${key}.json`);
            return newDetections;
          });
        }
      });
    }, 500);
  }, []);

  return (
    <>
      <Radar
        detections={props.detections}
        setDetections={props.setDetections}
        opacity={props.opacity}
      />
      <Link
        to="/radar-arduino"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "40px",
          marginBottom: "20px",
          textDecoration: "none",
        }}
        onClick={() => {
          props.setDetections([]);
        }}
      >
        <button
          style={{
            width: "40%",
            height: "10%",
            fontSize: 46,
            margin: "auto auto",
            borderRadius: 0,
          }}
        >
          Torna alla HOME!
        </button>
      </Link>
    </>
  );
};
