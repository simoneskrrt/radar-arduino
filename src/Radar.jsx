import "./radar.css";

const Radar = (props) => {
  return (
    <div className="screen">
      {/* Sfondo del radar con due livelli */}
      <div className="background-radar">
        <div className="background-radar-due" />
        <div className="background-radar-tre" />
      </div>
      {/* Linee statiche del radar */}
      <div className="line" style={{ transform: "rotate(30deg)" }} />
      <div className="line" style={{ transform: "rotate(60deg)" }} />
      <div className="line" />
      <div className="line" style={{ transform: "rotate(-30deg)" }} />
      <div className="line" style={{ transform: "rotate(-60deg)" }} />
      {/* Linea rotante del radar basata sul grado passato come prop */}
      <div
        className="line rotation"
        style={{
          transform: `rotate(${props.degree}deg)`,
        }}
      />
      {/* Mappa dei rilevamenti per mostrare le linee dinamiche */}
      {props.detections?.map((value, key) => {
        return (
          <div
            className="line"
            style={{
              transform: `rotate(${90 - value.degree}deg)`,
              borderImage: `linear-gradient(to top, transparent ${
                (value.distance / 60) * 100
              }%, red ${(value.distance / 60) * 100}%) 5`,
              opacity: props.opacity[key] != undefined ? props.opacity[key] / 100 : 0,
            }}
            key={key}
          ></div>
        );
      })}
    </div>
  );
};

export default Radar;
