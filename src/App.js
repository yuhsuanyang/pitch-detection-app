import "./App.css";
import { useState, useEffect } from "react";
import Key from "./components/Key";
import Detector from "./components/Detector";

function App() {
  const scale = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];
  const initialStatus = {};
  scale.forEach((note) => {
    initialStatus[note] = false;
  });

  const [note, setNote] = useState("");
  const [isActivated, setIsActivate] = useState(initialStatus);

  useEffect(() => {
    setIsActivate(initialStatus);
    if (note !== "") {
      setIsActivate((prev) => ({ ...prev, [note]: true }));
    }
    //    console.log(note);
    // console.log(isActivated);
  }, [note]);

  return (
    <div className="App">
      <header className="App-header">
        <Detector note={note} setNote={setNote} scale={scale} />
        <div id="keyboard" style={{ display: "flex" }}>
          {Object.entries(isActivated).map(([key, value]) => (
            <Key note={key} isActivated={value} />
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
