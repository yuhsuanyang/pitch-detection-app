import { useState, useEffect } from "react";

class KeyInfo {
  constructor(keyType, offsetFactor) {
    this.keyType = keyType;
    this.offsetFactor = offsetFactor;
    this.color = keyType === "black" ? "black" : "white";
  }
}

// function Key(props) {
function Key({ note, isActivated }) {
  const noteToKeys = {
    C: new KeyInfo("whiteLeft", 0),
    "C#": new KeyInfo("black", 0.5),
    D: new KeyInfo("whiteCenter", 0.75),
    "D#": new KeyInfo("black", 1),
    E: new KeyInfo("whiteRight", 1.5),
    F: new KeyInfo("whiteLeft", 1.5),
    "F#": new KeyInfo("black", 2),
    G: new KeyInfo("whiteCenterLeft", 2.25),
    "G#": new KeyInfo("black", 2.625),
    A: new KeyInfo("whiteCenterRight", 3),
    "A#": new KeyInfo("black", 3.25),
    B: new KeyInfo("whiteRight", 3.75),
  };
  //  const originalColor = noteToKeys[props.note].color;
  const noteName = note.replace(/[0-9]/g, "");
  //  const noteName = note;
  const group = parseInt(note.replace(/[^0-9]/g, ""), 10) - 3;
  const offsetFactor = noteToKeys[noteName].offsetFactor + group * 3.75;
  //  console.log(offsetFactor);
  const originalColor = noteToKeys[noteName].color;
  const [color, setColor] = useState(originalColor);
  const whiteKeyLength = 280;
  const blackKeyLength = whiteKeyLength * 0.68;
  const keyWidth = 40;
  useEffect(() => {
    isActivated ? setColor("lime") : setColor(originalColor);
  }, [isActivated]);
  //    const keyWidth = keyWidth * 0.75;
  const points = {
    black: `0,0 ${keyWidth * 0.75},0 ${keyWidth * 0.75},${blackKeyLength}, 0,${blackKeyLength}`,
    whiteLeft: `0,0 ${keyWidth * 0.5},0 ${keyWidth * 0.5},${blackKeyLength} ${keyWidth},${blackKeyLength} ${keyWidth},${whiteKeyLength} 0,${whiteKeyLength}`,
    whiteCenter: `0,${blackKeyLength} ${keyWidth * 0.25},${blackKeyLength} ${keyWidth * 0.25},0 ${keyWidth * 0.75},0 ${
      keyWidth * 0.75
    },${blackKeyLength} ${keyWidth},${blackKeyLength} ${keyWidth},${whiteKeyLength} 0,${whiteKeyLength}`,

    whiteCenterLeft: `0,${blackKeyLength} ${keyWidth * 0.25},${blackKeyLength} ${keyWidth * 0.25},0 ${keyWidth * 0.625},0 ${
      keyWidth * 0.625
    },${blackKeyLength} ${keyWidth},${blackKeyLength} ${keyWidth},${whiteKeyLength} 0,${whiteKeyLength}`,

    whiteCenterRight: `0,${blackKeyLength} ${keyWidth * 0.375},${blackKeyLength} ${keyWidth * 0.375},0 ${keyWidth * 0.75},0 ${
      keyWidth * 0.75
    },${blackKeyLength} ${keyWidth},${blackKeyLength} ${keyWidth},${whiteKeyLength} 0,${whiteKeyLength}`,
    whiteRight: `0,${blackKeyLength} ${keyWidth * 0.5},${blackKeyLength} ${keyWidth * 0.5},0 ${keyWidth},0 ${keyWidth},${whiteKeyLength} 0,${whiteKeyLength}`,
  };
  const handleMouseDown = (event) => {
    const svg = event.target.ownerSVGElement || event.target; // get the svg element
    const pt = svg.createSVGPoint();
    pt.x = event.clientX;
    pt.y = event.clientY;
    const cursor = pt.matrixTransform(svg.getScreenCTM().inverse());
    console.log(
      // `Clicked at SVG coordinates: x=${cursor.x}, y=${cursor.y}, note: ${props.note}`,
      `Clicked at SVG coordinates: x=${cursor.x}, y=${cursor.y}, note: ${note}`,
    );
    setColor("lime");
  };
  return (
    <div
      style={{
        transform: `translateX(-${offsetFactor * keyWidth}px)`,
      }}
    >
      <svg
        height={originalColor === "black" ? blackKeyLength : whiteKeyLength}
        width={originalColor === "black" ? keyWidth * 0.75 : keyWidth}
        xmlns="http://www.w3.org/2000/svg"
        onMouseDown={(e) => {
          handleMouseDown(e);
        }}
        onMouseUp={() => {
          setColor(originalColor);
        }}
      >
        <polygon
          points={points[noteToKeys[noteName].keyType]}
          fill={color}
          stroke="black"
        />
      </svg>
    </div>
  );
}

export default Key;
