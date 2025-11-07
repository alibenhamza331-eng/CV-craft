import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Download, Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import type { CVData } from '@/types/cv';

const templates = [
  CVTemplate1, CVTemplate2, CVTemplate3, CVTemplate4, CVTemplate5,
  CVTemplate6, CVTemplate7, CVTemplate8, CVTemplate9, CVTemplate10
];

const PublicCV = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [templateIndex, setTemplateIndex] = useState(0);
  const [accentColor, setAccentColor] = useState('#8B5CF6');

  useEffect(() => {
    loadPublicCV();
  }, [token]);

  const loadPublicCV = async () => {
    try {
      const { data, error } = await supabase
        .from("cvs")
        .select("*")
        .eq("share_token", token)
        .eq("is_public", true)
        .single();

      if (error || !data) {
        toast({
          title: "CV introuvable",
          description: "Ce CV n'existe pas ou n'est plus public",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      setCvData({
        name: data.full_name,
        email: data.email,
        phone: data.phone || "",
        title: data.title,
        photo: "",
        summary: data.summary || "",
        experience: (data.experience as any) || [],
        education: (data.education as any) || [],
        skills: (data.skills as any) || [],
        languages: (data.languages as any) || [],
        interests: [],
      });
      
      // Use template_id if stored, otherwise default to 0
      setTemplateIndex(0);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    const element = document.getElementById("public-cv-content");
    if (!element) return;

    try {
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
      pdf.save(`${cvData?.name || 'cv'}.pdf`);

      toast({
        title: "Téléchargé!",
        description: "Le CV a été téléchargé",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors du téléchargement",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement du CV...</p>
        </div>
      </div>
    );
  }

  if (!cvData) {
    return null;
  }

  const TemplateComponent = templates[templateIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={() => navigate("/")} className="gap-2">
            <Home className="w-4 h-4" />
            Accueil
          </Button>
          <Button onClick={downloadPDF} className="gap-2">
            <Download className="w-4 h-4" />
            Télécharger PDF
          </Button>
        </div>

        <div className="bg-card rounded-lg p-8 shadow-elegant">
          <div className="flex justify-center" id="public-cv-content">
            <TemplateComponent data={cvData} accentColor={accentColor} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicCV;
