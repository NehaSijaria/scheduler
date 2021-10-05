import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace=false) {
    //if true, then replace by new Item
    if (replace) {
      const itemOnTop = history.length - 1;
      history[itemOnTop] = newMode;
      setMode(newMode);
    } else {
      setMode(newMode);
      history.push(newMode);
    }
  }
  function back() {
    if (history.length > 1) {
      const topItem = history.length - 1;
      setHistory(history.slice(0, topItem));
      const previousMode = history[topItem - 1];
      setMode(previousMode);     

    }
  }

  return { mode, transition, back };
}



