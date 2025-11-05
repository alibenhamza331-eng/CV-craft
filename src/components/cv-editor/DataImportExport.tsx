import { Button } from "@/components/ui/button";
import { Download, Upload, FileJson } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { CVData } from '@/types/cv';

interface DataImportExportProps {
  cvData: CVData;
  onImport: (data: CVData) => void;
  language: 'fr' | 'en';
}

export const DataImportExport = ({ cvData, onImport, language }: DataImportExportProps) => {
  const { toast } = useToast();

  const exportData = () => {
    const dataStr = JSON.stringify(cvData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cv-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: language === 'fr' ? "Données exportées" : "Data exported",
      description: language === 'fr' ? "Fichier JSON téléchargé" : "JSON file downloaded"
    });
  };

  const importData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target?.result as string);
            onImport(data);
            toast({
              title: language === 'fr' ? "Données importées" : "Data imported",
              description: language === 'fr' ? "Vos données ont été chargées" : "Your data has been loaded"
            });
          } catch (error) {
            toast({
              title: language === 'fr' ? "Erreur" : "Error",
              description: language === 'fr' ? "Fichier JSON invalide" : "Invalid JSON file",
              variant: "destructive"
            });
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="flex gap-3">
      <Button onClick={exportData} variant="outline" className="gap-2">
        <Download className="w-4 h-4" />
        {language === 'fr' ? 'Exporter données' : 'Export data'}
      </Button>
      <Button onClick={importData} variant="outline" className="gap-2">
        <Upload className="w-4 h-4" />
        {language === 'fr' ? 'Importer données' : 'Import data'}
      </Button>
    </div>
  );
};
