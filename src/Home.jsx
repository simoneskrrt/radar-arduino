import "./app.css";
import "./home.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Radar from "./Radar";

export function Home(props) {
  // States per input manuale di angolo e distanza
  const [inputDegree, setInputDegree] = useState(0);
  const [inputDistance, setInputDistance] = useState(0);

  // Funzioni per aggiungere casi di rilevamenti predefiniti
  const addCase1 = async () => {
    props.setDetections([]);
    props.setOpacity([]);

    await props.addLine(45, 20);
    await props.addLine(46, 28);
    await props.addLine(89, 54);
    await props.addLine(153, 12);
  };

  const addCase2 = async () => {
    props.setDetections([]);
    props.setOpacity([]);

    await props.addLine(7, 4);
    await props.addLine(81, 6);
    await props.addLine(7, 4);
    await props.addLine(81, 6);
    await props.addLine(118, 9);
    await props.addLine(139, 16);
    await props.addLine(155, 26);
    await props.addLine(157, 29);
    await props.addLine(172, 39);
    await props.addLine(173, 47);
  };

  const addCase3 = async () => {
    props.setDetections([]);
    props.setOpacity([]);

    await props.addLine(15, 8);
    await props.addLine(143, 15);
    await props.addLine(174, 38);
  };

  // Imposta la modalità live su false quando il componente è montato
  useEffect(() => {
    props.setLive(false);
  }, []);

  return (
    <>
      {/* Componente Radar che visualizza i rilevamenti */}
      <Radar
        detections={props.detections}
        setDetections={props.setDetections}
        opacity={props.opacity}
        degree={props.degree}
      />
      <div className="container">
        {/* Sezione per mostrare casi predefiniti */}
        <div className="storico">
          <h2>Scegli la registrazione che vuoi mostrare: </h2>
          <div className="storico-buttons">
            <button onClick={addCase1}>Caso 1</button>
            <button onClick={addCase2}>Caso 2</button>
            <button onClick={addCase3}>Caso 3</button>
          </div>
        </div>
        {/* Sezione per aggiungere rilevamenti manualmente */}
        <div className="manuale">
          <h2>Aggiungi manualmente degli elementi da mostrare: </h2>
          <div className="input-form">
            <h3>Angolo (compreso tra 0 e 180)</h3>
            <input
              type="number"
              onChange={(event) => {
                setInputDegree(event.target.value);
              }}
              value={inputDegree}
            />
          </div>
          <div className="input-form">
            <h3>Distanza (compreso tra 0 e 60 cm)</h3>
            <input
              type="number"
              onChange={(event) => {
                setInputDistance(event.target.value);
              }}
              value={inputDistance}
            />
          </div>
          <div className="manuale-buttons">
            <button
              onClick={() => {
                // Aggiunge una nuova linea di rilevamento manuale
                props.addLine(inputDegree, inputDistance).then(() => {
                  setInputDegree(0);
                  setInputDistance(0);
                });
              }}
            >
              Invia
            </button>
            <button
              onClick={() => {
                // Reset dei rilevamenti e dell'opacità
                props.setDetections([]);
                props.setOpacity([]);
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      {/* Link per passare alla modalità live */}
      <Link
        to="/radar-arduino/live"
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
          props.setOpacity([]);
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
          Funziona anche LIVE!
        </button>
      </Link>
    </>
  );
}
