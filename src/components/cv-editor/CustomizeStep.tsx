import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import type { CVData } from '@/types/cv';

const colorPalettes = [
  { name: 'Violet', color: '#8B5CF6' },
  { name: 'Bleu', color: '#3B82F6' },
  { name: 'Vert', color: '#10B981' },
  { name: 'Rouge', color: '#EF4444' },
  { name: 'Orange', color: '#F59E0B' },
  { name: 'Rose', color: '#EC4899' },
  { name: 'Cyan', color: '#06B6D4' },
  { name: 'Indigo', color: '#6366F1' },
  { name: 'Amber', color: '#F59E0B' },
  { name: 'Emerald', color: '#10B981' },
  { name: 'Fuchsia', color: '#D946EF' },
  { name: 'Lime', color: '#84CC16' },
  { name: 'Sky', color: '#0EA5E9' },
  { name: 'Teal', color: '#14B8A6' },
  { name: 'Slate', color: '#64748B' },
  { name: 'Zinc', color: '#71717A' },
];

const fonts = [
  { name: 'Inter', value: 'font-sans' },
  { name: 'Playfair Display', value: 'font-serif' },
  { name: 'Roboto', value: 'font-roboto' },
  { name: 'Montserrat', value: 'font-montserrat' },
  { name: 'Lato', value: 'font-lato' },
  { name: 'Open Sans', value: 'font-opensans' },
];

interface CustomizeStepProps {
  language: 'fr' | 'en';
  cvData: CVData;
  selectedTemplate: number;
  selectedColor: number;
  setSelectedColor: (index: number) => void;
  currentColor: string;
  onNext: () => void;
  onBack: () => void;
  templateComponent: any;
}

export const CustomizeStep = ({
  language,
  cvData,
  selectedColor,
  setSelectedColor,
  currentColor,
  onNext,
  onBack,
  templateComponent: TemplateComponent
}: CustomizeStepProps) => {
  const [fontSize, setFontSize] = useState(100);
  const [spacing, setSpacing] = useState(100);
  const [selectedFont, setSelectedFont] = useState('font-sans');

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">
            {language === 'fr' ? 'Personnalisez votre CV' : 'Customize your CV'}
          </h2>
          <p className="text-muted-foreground">
            {language === 'fr' ? 'Ajustez les couleurs, polices et espacements' : 'Adjust colors, fonts and spacing'}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg shadow-elegant space-y-4">
              <h3 className="text-xl font-semibold mb-4">
                {language === 'fr' ? 'Couleur d\'accent' : 'Accent Color'}
              </h3>
              <div className="grid grid-cols-4 gap-3">
                {colorPalettes.map((palette, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(idx)}
                    className={`w-full h-12 rounded-lg transition-all ${
                      idx === selectedColor ? 'ring-4 ring-primary ring-offset-2 scale-110' : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: palette.color }}
                    title={palette.name}
                  />
                ))}
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-elegant space-y-4">
              <h3 className="text-xl font-semibold mb-4">
                {language === 'fr' ? 'Police de caractères' : 'Font Family'}
              </h3>
              <Select value={selectedFont} onValueChange={setSelectedFont}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fonts.map(font => (
                    <SelectItem key={font.value} value={font.value}>
                      <span className={font.value}>{font.name}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-elegant space-y-4">
              <div>
                <Label className="text-base font-semibold">
                  {language === 'fr' ? 'Taille du texte' : 'Font Size'}: {fontSize}%
                </Label>
                <Slider
                  value={[fontSize]}
                  onValueChange={(v) => setFontSize(v[0])}
                  min={80}
                  max={120}
                  step={5}
                  className="mt-2"
                />
              </div>

              <div>
                <Label className="text-base font-semibold">
                  {language === 'fr' ? 'Espacement' : 'Spacing'}: {spacing}%
                </Label>
                <Slider
                  value={[spacing]}
                  onValueChange={(v) => setSpacing(v[0])}
                  min={80}
                  max={120}
                  step={5}
                  className="mt-2"
                />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-6 shadow-elegant">
            <h3 className="text-lg font-semibold mb-4 text-center">
              {language === 'fr' ? 'Aperçu' : 'Preview'}
            </h3>
            <div 
              className={`scale-75 transform origin-top ${selectedFont}`}
              style={{
                fontSize: `${fontSize}%`,
                letterSpacing: `${(spacing - 100) / 100}em`
              }}
            >
              <TemplateComponent data={cvData} accentColor={currentColor} />
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <Button variant="outline" onClick={onBack}>
            {language === 'fr' ? 'Retour' : 'Back'}
          </Button>
          <Button onClick={onNext}>
            {language === 'fr' ? 'Voir le résultat final' : 'See final result'}
          </Button>
        </div>
      </div>
    </div>
  );
};