import "./App.css";
import { useState, useEffect } from "react";
import Key from "./components/Key";
import Detector from "./components/Detector";

function App() {
  const noteNames = [
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
  const octaves = [1, 2, 3];
  const scales = octaves.flatMap((octave) =>
    noteNames.map((note) => `${octave}${note}`),
  );
  console.log(scales);
  const initialStatus = {};
  scales.forEach((note) => {
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
        {/* <Detector note={note} setNote={setNote} scale={scales} />*/}
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
