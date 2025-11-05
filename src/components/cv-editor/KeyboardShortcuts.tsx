import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface KeyboardShortcutsProps {
  onSave: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onExport?: () => void;
  language: 'fr' | 'en';
}

export const KeyboardShortcuts = ({ onSave, onUndo, onRedo, onExport, language }: KeyboardShortcutsProps) => {
  const { toast } = useToast();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + S = Save
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        onSave();
        toast({
          title: language === 'fr' ? "Sauvegarde" : "Save",
          description: language === 'fr' ? "CV sauvegardé" : "CV saved"
        });
      }
      
      // Ctrl/Cmd + Z = Undo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey && onUndo) {
        e.preventDefault();
        onUndo();
      }
      
      // Ctrl/Cmd + Shift + Z = Redo
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z' && onRedo) {
        e.preventDefault();
        onRedo();
      }
      
      // Ctrl/Cmd + E = Export
      if ((e.ctrlKey || e.metaKey) && e.key === 'e' && onExport) {
        e.preventDefault();
        onExport();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSave, onUndo, onRedo, onExport, language, toast]);

  return null;
};
