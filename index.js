import { SerialPort } from "serialport";
import axios from "axios";

let serverUrl =
  "https://radar-arduino-default-rtdb.europe-west1.firebasedatabase.app/arduinolive.json";
let whatValue = true;
let newObject = {};

let path = await SerialPort.list().then((ports) => {
  let newPort;
  ports.forEach((port) => (newPort = port.path));

  return newPort;
});

const serial = new SerialPort({ path: path, baudRate: 9600 });

serial.on("data", async (data) => {
  if (whatValue) {
    newObject["distance"] = +data.toString();

    whatValue = false;
  } else {
    newObject["degree"] = +data.toString();

    await axios.post(serverUrl, newObject);
    newObject = {};

    whatValue = true;
  }
});
