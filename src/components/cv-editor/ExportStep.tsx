import { Button } from "@/components/ui/button";
import { Download, FileImage, FileText, Share2, Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import type { CVData } from '@/types/cv';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ExportStepProps {
  language: 'fr' | 'en';
  cvData: CVData;
  cvId?: string;
  accentColor: string;
  templateComponent: any;
  onBack: () => void;
}

export const ExportStep = ({
  language,
  cvData,
  cvId,
  accentColor,
  templateComponent: TemplateComponent,
  onBack
}: ExportStepProps) => {
  const { toast } = useToast();
  const [exporting, setExporting] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [shareToken, setShareToken] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const downloadPDF = async () => {
    const element = document.getElementById("cv-export-content");
    if (!element) return;

    try {
      setExporting(true);
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${cvData.name || 'cv'}.pdf`);

      toast({
        title: language === 'fr' ? "PDF téléchargé!" : "PDF downloaded!",
        description: language === 'fr' ? "Votre CV a été téléchargé" : "Your CV has been downloaded",
      });
    } catch (error) {
      toast({
        title: language === 'fr' ? "Erreur" : "Error",
        description: language === 'fr' ? "Erreur lors du téléchargement" : "Error downloading",
        variant: "destructive",
      });
    } finally {
      setExporting(false);
    }
  };

  const downloadImage = async (format: 'png' | 'jpg') => {
    const element = document.getElementById("cv-export-content");
    if (!element) return;

    try {
      setExporting(true);
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: format === 'png' ? null : '#ffffff',
      });

      const link = document.createElement('a');
      link.download = `${cvData.name || 'cv'}.${format}`;
      link.href = canvas.toDataURL(`image/${format}`);
      link.click();

      toast({
        title: language === 'fr' ? `Image ${format.toUpperCase()} téléchargée!` : `${format.toUpperCase()} image downloaded!`,
        description: language === 'fr' ? "Votre CV a été téléchargé" : "Your CV has been downloaded",
      });
    } catch (error) {
      toast({
        title: language === 'fr' ? "Erreur" : "Error",
        description: language === 'fr' ? "Erreur lors du téléchargement" : "Error downloading",
        variant: "destructive",
      });
    } finally {
      setExporting(false);
    }
  };

  const togglePublicSharing = async () => {
    if (!cvId || cvId === 'new') {
      toast({
        title: language === 'fr' ? "Erreur" : "Error",
        description: language === 'fr' ? "Vous devez d'abord enregistrer votre CV" : "You must save your CV first",
        variant: "destructive",
      });
      return;
    }

    try {
      const newPublicState = !isPublic;
      
      const { data, error } = await supabase
        .from("cvs")
        .update({ is_public: newPublicState })
        .eq("id", cvId)
        .select('share_token')
        .single();

      if (error) throw error;

      setIsPublic(newPublicState);
      setShareToken(data.share_token);

      toast({
        title: language === 'fr' ? (newPublicState ? "Partage activé!" : "Partage désactivé") : (newPublicState ? "Sharing enabled!" : "Sharing disabled"),
        description: language === 'fr' 
          ? (newPublicState ? "Votre CV est maintenant public" : "Votre CV est maintenant privé")
          : (newPublicState ? "Your CV is now public" : "Your CV is now private"),
      });
    } catch (error: any) {
      toast({
        title: language === 'fr' ? "Erreur" : "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const copyShareLink = () => {
    if (!shareToken) return;
    
    const shareUrl = `${window.location.origin}/cv/${shareToken}`;
    navigator.clipboard.writeText(shareUrl);
    
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    toast({
      title: language === 'fr' ? "Lien copié!" : "Link copied!",
      description: language === 'fr' ? "Le lien de partage a été copié" : "Share link has been copied",
    });
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">
            {language === 'fr' ? 'Exporter et partager' : 'Export and share'}
          </h2>
          <p className="text-muted-foreground">
            {language === 'fr' ? 'Téléchargez votre CV dans différents formats' : 'Download your CV in different formats'}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg shadow-elegant space-y-4">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Download className="w-5 h-5" />
                {language === 'fr' ? 'Télécharger' : 'Download'}
              </h3>
              
              <div className="space-y-3">
                <Button 
                  onClick={downloadPDF} 
                  disabled={exporting}
                  className="w-full gap-2"
                  size="lg"
                >
                  <FileText className="w-5 h-5" />
                  {language === 'fr' ? 'Télécharger en PDF' : 'Download as PDF'}
                </Button>
                
                <Button 
                  onClick={() => downloadImage('png')} 
                  disabled={exporting}
                  variant="outline"
                  className="w-full gap-2"
                  size="lg"
                >
                  <FileImage className="w-5 h-5" />
                  {language === 'fr' ? 'Télécharger en PNG' : 'Download as PNG'}
                </Button>
                
                <Button 
                  onClick={() => downloadImage('jpg')} 
                  disabled={exporting}
                  variant="outline"
                  className="w-full gap-2"
                  size="lg"
                >
                  <FileImage className="w-5 h-5" />
                  {language === 'fr' ? 'Télécharger en JPG' : 'Download as JPG'}
                </Button>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-elegant space-y-4">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                {language === 'fr' ? 'Partager en ligne' : 'Share online'}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4">
                {language === 'fr' 
                  ? "Créez un lien public pour partager votre CV en ligne"
                  : "Create a public link to share your CV online"}
              </p>

              <Button 
                onClick={togglePublicSharing}
                variant={isPublic ? "destructive" : "default"}
                className="w-full gap-2"
                size="lg"
              >
                {isPublic 
                  ? (language === 'fr' ? 'Désactiver le partage public' : 'Disable public sharing')
                  : (language === 'fr' ? 'Activer le partage public' : 'Enable public sharing')}
              </Button>

              {isPublic && shareToken && (
                <div className="mt-4 p-4 bg-secondary rounded-lg">
                  <p className="text-sm font-medium mb-2">
                    {language === 'fr' ? 'Lien de partage:' : 'Share link:'}
                  </p>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={`${window.location.origin}/cv/${shareToken}`}
                      readOnly
                      className="flex-1 px-3 py-2 text-sm bg-background rounded border"
                    />
                    <Button 
                      onClick={copyShareLink}
                      variant="outline"
                      size="icon"
                    >
                      {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-card rounded-lg p-6 shadow-elegant">
            <h3 className="text-lg font-semibold mb-4 text-center">
              {language === 'fr' ? 'Aperçu' : 'Preview'}
            </h3>
            <div className="scale-75 transform origin-top" id="cv-export-content">
              <TemplateComponent data={cvData} accentColor={accentColor} />
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <Button variant="outline" onClick={onBack}>
            {language === 'fr' ? 'Retour' : 'Back'}
          </Button>
        </div>
      </div>
    </div>
  );
};
