import { Button } from "@/components/ui/button";
import CVTemplate1 from "@/components/cv/CVTemplate1";
import CVTemplate2 from "@/components/cv/CVTemplate2";
import CVTemplate3 from "@/components/cv/CVTemplate3";
import CVTemplate4 from "@/components/cv/CVTemplate4";
import CVTemplate5 from "@/components/cv/CVTemplate5";
import CVTemplate6 from "@/components/cv/CVTemplate6";
import CVTemplate7 from "@/components/cv/CVTemplate7";
import CVTemplate8 from "@/components/cv/CVTemplate8";
import CVTemplate9 from "@/components/cv/CVTemplate9";
import CVTemplate10 from "@/components/cv/CVTemplate10";
import type { CVData } from '@/types/cv';

const templates = [
  CVTemplate1,
  CVTemplate2,
  CVTemplate3,
  CVTemplate4,
  CVTemplate5,
  CVTemplate6,
  CVTemplate7,
  CVTemplate8,
  CVTemplate9,
  CVTemplate10,
];

interface GalleryStepProps {
  language: 'fr' | 'en';
  cvData: CVData;
  selectedTemplate: number;
  setSelectedTemplate: (index: number) => void;
  currentColor: string;
  onNext: () => void;
  onBack: () => void;
}

export const GalleryStep = ({
  language,
  cvData,
  selectedTemplate,
  setSelectedTemplate,
  currentColor,
  onNext,
  onBack
}: GalleryStepProps) => {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">
            {language === 'fr' ? 'Choisissez votre design' : 'Choose your design'}
          </h2>
          <p className="text-muted-foreground">
            {language === 'fr' ? 'Sélectionnez le template qui vous correspond' : 'Select the template that suits you'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {templates.map((Template, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedTemplate(idx)}
              className={`cursor-pointer transform transition-all duration-300 hover:scale-105 rounded-lg overflow-hidden ${
                idx === selectedTemplate 
                  ? 'ring-4 ring-primary shadow-[var(--shadow-glow)] scale-105' 
                  : 'hover:shadow-[var(--shadow-elegant)]'
              }`}
            >
              <div className="scale-[0.35] origin-top-left h-[350px] overflow-hidden border-2">
                <Template data={cvData} accentColor={currentColor} />
              </div>
              <div className="bg-card p-2 text-center">
                <p className="font-medium text-sm">
                  {language === 'fr' ? 'Design' : 'Template'} {idx + 1}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={onBack}>
            {language === 'fr' ? 'Retour' : 'Back'}
          </Button>
          <Button onClick={onNext}>
            {language === 'fr' ? 'Personnaliser les couleurs' : 'Customize colors'}
          </Button>
        </div>
      </div>
    </div>
  );
};