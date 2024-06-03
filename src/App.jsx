import "./app.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import { Live } from "./Live.jsx";
import { Home } from "./Home.jsx";

export default function App() {
  // States per rilevamenti, opacità, modalità live e grado
  const [detections, setDetections] = useState([]);
  const [opacity, setOpacity] = useState([]);
  const [live, setLive] = useState(false);
  const [degree, setDegree] = useState(90);

  // Variabili per la direzione e il tempo con cui si muove il radar
  let direction = false;
  let time = 200;

  // Funzione per aggiungere una nuova linea di rilevamento
  const addLine = async (newDegree, newDistance) => {
    return new Promise((resolve) => {
      setDetections((prevDetections) => {
        const newArray = [
          ...prevDetections,
          { degree: newDegree, distance: newDistance },
        ];

        setOpacity((prevOpacity) => [...prevOpacity, 0]);

        return newArray;
      });

      resolve();
    });
  };

  // Funzione per cambiare il grado del radar
  const changeDegree = async () => {
    setDegree((prevDegree) => {
      let newDegree = direction ? prevDegree + 1 : prevDegree - 1;

      // Cambia la direzione se si raggiungono i limiti di 90 e -90 gradi
      if (newDegree === -90 || newDegree === 90) {
        direction = !direction;
      }

      return newDegree;
    });

    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  };

  // Funzione ricorsiva per eseguire una funzione ciclicamente in maniera asincrona
  const cycle = (anyFunction) => {
    anyFunction().then(() => {
      cycle(anyFunction);
    });
  };

  // useEffect per avviare il ciclo del cambiamento di grado quando il componente è montato
  useEffect(() => {
    cycle(changeDegree);
  }, []);

  // useEffect per aggiornare l'opacità dei rilevamenti in base al grado attuale
  useEffect(() => {
    setOpacity((prevOpacity) => {
      let newOpacity = [...prevOpacity];

      detections?.forEach((value, index) => {
        if (90 - value.degree == degree) {
          newOpacity[index] = 100;
        } else if (
          prevOpacity[index] !== 0 &&
          prevOpacity[index] !== undefined
        ) {
          newOpacity[index] = prevOpacity[index] - 5;
        } else if (prevOpacity[index] === 0) {
          newOpacity[index] = 0;
        }
      });

      return newOpacity;
    });

    // Rimuove i rilevamenti una volta mostrati la prima volta quando in modalità live
    if (live) {
      setOpacity((prevOpacity) => {
        let newOpacity = [];
        let newDetections = [];

        setDetections((prevDetections) => {
          prevOpacity.map((value, index) => {
            if (value != 5) {
              newOpacity.push(value);
              newDetections.push(prevDetections[index]);
            }
          });

          return newDetections;
        });

        return newOpacity;
      });
    }
  }, [degree]);

  return (
    <div style={{ height: "fit-content" }}>
      {/* Configura il router per la navigazione */}
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
                  live={live}
                  setLive={setLive}
                  degree={degree}
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
                  live={live}
                  setLive={setLive}
                  degree={degree}
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
