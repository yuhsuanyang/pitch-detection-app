import React, { useEffect, useRef, useState } from "react";
import ml5 from "ml5";

function Detector({ note, setNote, scale }) {
  const [pitch, setPitch] = useState(null);
  // const [frequency, setFrequency] = useState("");
  const audioContextRef = useRef();
  const micStreamRef = useRef();
  const pitchRef = useRef();
  function freqToMidi(f) {
    const mathlog2 = Math.log(f / 440) / Math.log(2);
    const m = Math.round(12 * mathlog2) + 69;
    return m;
  }

  function midiToNote(m) {
    const octave = Math.max(3, Math.floor(m / 12) - 1);
    const noteName = scale[m % 12];
    return `${noteName}${octave}`;
  }
  useEffect(() => {
    const initMicAndPitch = async () => {
      try {
        // 1. Request microphone access
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        micStreamRef.current = stream;

        // 2. Create AudioContext
        audioContextRef.current = new (window.AudioContext ||
          window.webkitAudioContext)();

        // 3. Load Pitch Detection Model
        const modelURL = process.env.PUBLIC_URL + "/models/crepe/";
        pitchRef.current = ml5.pitchDetection(
          modelURL,
          audioContextRef.current,
          stream,
          modelLoaded,
        );
      } catch (err) {
        console.error("Error accessing mic:", err);
      }
    };
    const modelLoaded = () => {
      console.log("Pitch Detection Model Loaded");
      getPitch();
    };

    const getPitch = () => {
      pitchRef.current.getPitch((err, frequency) => {
        if (err) {
          console.error(err);
        } else if (frequency) {
          const midi = freqToMidi(frequency.toFixed(2));
          // setFrequency(frequency.toFixed(2));
          setPitch(midi);
          setNote(midiToNote(midi));
        }
        requestAnimationFrame(getPitch);
      });
    };

    initMicAndPitch();
  }, []);
  return (
    <div>
      <p>{pitch ? `Detected Pitch: ${pitch} Hz ${note}` : "Listening..."}</p>
    </div>
  );
}

export default Detector;
