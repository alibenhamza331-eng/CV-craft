import { useState, useCallback } from "react";
import type { CVData } from '@/types/cv';

export const useUndoRedo = (initialData: CVData) => {
  const [history, setHistory] = useState<CVData[]>([initialData]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const addToHistory = useCallback((data: CVData) => {
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(data);
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
  }, [history, currentIndex]);

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      return history[currentIndex - 1];
    }
    return null;
  }, [currentIndex, history]);

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
      return history[currentIndex + 1];
    }
    return null;
  }, [currentIndex, history]);

  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;

  return { addToHistory, undo, redo, canUndo, canRedo };
};
