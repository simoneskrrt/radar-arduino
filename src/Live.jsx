import Radar from "./Radar";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const Live = (props) => {
  // URL del server Firebase per ottenere i dati in tempo reale
  const serverUrl =
    "https://radar-arduino-default-rtdb.europe-west1.firebasedatabase.app/arduinolive";
  let newDetections;

  // useEffect viene utilizzato per eseguire il codice una volta che il componente è montato
  useEffect(() => {
    // Imposta la modalità live su true
    props.setLive(true);

    // Imposta un intervallo per eseguire il codice ogni 500ms
    setInterval(async () => {
      // Effettua una richiesta GET per ottenere i dati dal server Firebase
      axios.get(serverUrl + ".json").then(async (resp) => {
        // Itera sui dati ottenuti dalla risposta
        for (let key in resp.data) {
          // Aggiunge una nuova linea di rilevamento con i dati ottenuti
          await props.addLine((Number(resp.data[key].degree).toFixed()), resp.data[key].distance);
          // Elimina i dati dal server dopo averli elaborati
          await axios.delete(`${serverUrl}/${key}.json`);
        }
      });
    }, 500); // intervallo di 500ms
  }, []); // L'array vuoto assicura che questo effetto venga eseguito solo una volta

  return (
    <>
      {/* Componente Radar che visualizza i rilevamenti */}
      <Radar
        detections={props.detections}
        setDetections={props.setDetections}
        opacity={props.opacity}
        degree={props.degree}
      />
      {/* Link per tornare alla home page */}
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
          // Reset dei rilevamenti e dell'opacità quando si torna alla home
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
          Torna alla HOME!
        </button>
      </Link>
    </>
  );
};
