
import { create } from "zustand";

export const TIMELINE_SIZE = 1000;

// export const NOTE_TYPES = {
//   MISS: "MISS", 
//   OK: "OK", 
//   GOOD: "GOOD", 
//   PERFECT: "PERFECT", 
// };

// Couleurs associées à chaque note
export const NOTES_COLORS = {
  Middle: "#5A30DD", 
  Side: "#82BB78", 
  Crash: "orange", 
};

export const useSong = create((set, get) => {
  const getNotePosition = (note) => {
    const songData = get().songData; 
    if (!songData) return;

    const songDuration = songData.audio.duration; 
    return -(note.time / songDuration) * TIMELINE_SIZE; 
  };

  const onNotePlayed = [];

  const audioFiles = {
    Middle: "audios/Taiko-Middle.mp3",
    Side: "audios/Taiko-Side.mp3",
    Crash: "audios/Taiko-Crash.mp3",
  };

  const playNote = (note) => {
    const audioSrc = audioFiles[note];
    if (audioSrc) {
      const audio = new Audio(audioSrc);
      audio.currentTime = 0; 
      audio.play().catch((err) => console.error("Audio play error:", err));
      console.log(`Playing note: ${note}`);
    } else {
      console.error(`No audio file found for note: ${note}`);
    }
    get().playNoteFn(note);
    onNotePlayed.forEach((fn) => fn(note));
  };

  return {
    // passthrough: false,
    // setPassthrough: (value) => set({ passthrough: value }),

    songData: null, 
    getNotePosition, 
    playNote,
    playNoteFn: () => {}, 
    setPlayNoteFn: (fn) => set({ playNoteFn: fn }),
  };
});
