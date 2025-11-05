import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";

interface Language {
  name?: string;
  language?: string;
  level: string;
}

interface LanguageManagerProps {
  languages: Language[];
  onChange: (languages: Language[]) => void;
  langText: {
    title: string;
    add: string;
    languagePlaceholder: string;
    levelLabel: string;
    beginner: string;
    intermediate: string;
    advanced: string;
    native: string;
  };
}

export const LanguageManager = ({ languages, onChange, langText }: LanguageManagerProps) => {
  const addLanguage = () => {
    onChange([...languages, { name: '', language: '', level: 'Intermédiaire' }]);
  };

  const removeLanguage = (index: number) => {
    onChange(languages.filter((_, i) => i !== index));
  };

  const updateLanguage = (index: number, field: string, value: string) => {
    const updated = [...languages];
    updated[index] = { ...updated[index], [field]: value };
    if (field === 'name') updated[index].language = value;
    if (field === 'language') updated[index].name = value;
    onChange(updated);
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">{langText.title}</h3>
        <Button onClick={addLanguage} size="sm" variant="outline" className="gap-2">
          <Plus className="w-4 h-4" />
          {langText.add}
        </Button>
      </div>

      {languages.map((lang, idx) => (
        <Card key={idx} className="p-4 space-y-3 border-2">
          <div className="flex justify-between items-start">
            <h4 className="font-medium">{langText.title} #{idx + 1}</h4>
            <Button onClick={() => removeLanguage(idx)} size="sm" variant="ghost">
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>{langText.languagePlaceholder}</Label>
              <Input 
                value={lang.name || lang.language || ''} 
                onChange={(e) => updateLanguage(idx, 'name', e.target.value)}
                placeholder="Français, English, العربية..."
              />
            </div>
            <div>
              <Label>{langText.levelLabel}</Label>
              <Select 
                value={lang.level} 
                onValueChange={(value) => updateLanguage(idx, 'level', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Débutant">{langText.beginner}</SelectItem>
                  <SelectItem value="Intermédiaire">{langText.intermediate}</SelectItem>
                  <SelectItem value="Avancé">{langText.advanced}</SelectItem>
                  <SelectItem value="Natif">{langText.native}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      ))}
    </Card>
  );
};
