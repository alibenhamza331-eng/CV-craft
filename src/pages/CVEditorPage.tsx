import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { CVData } from '@/types/cv';
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
import { FormStep } from "@/components/cv-editor/FormStep";
import { EditStep } from "@/components/cv-editor/EditStep";
import { GalleryStep } from "@/components/cv-editor/GalleryStep";
import { CustomizeStep } from "@/components/cv-editor/CustomizeStep";
import { ExportStep } from "@/components/cv-editor/ExportStep";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";

const templates = [
  CVTemplate1, CVTemplate2, CVTemplate3, CVTemplate4, CVTemplate5,
  CVTemplate6, CVTemplate7, CVTemplate8, CVTemplate9, CVTemplate10
];

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

const CVEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState<'form' | 'generate' | 'edit' | 'gallery' | 'customize' | 'export'>('form');
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [photoUrl, setPhotoUrl] = useState<string>("");
  
  const [basicInfo, setBasicInfo] = useState({
    name: "",
    email: "",
    phone: "",
    title: "",
    experience: "",
    education: "",
  });

  const [cvData, setCvData] = useState<CVData>({
    name: "",
    email: "",
    phone: "",
    title: "",
    photo: "",
    summary: "",
    experience: [],
    education: [],
    skills: [],
    languages: [],
    interests: [],
  });

  useEffect(() => {
    if (id && id !== "new") {
      loadCV();
    } else {
      setStep('form');
    }
  }, [id]);

  const loadCV = async () => {
    try {
      const { data, error } = await supabase
        .from("cvs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      if (data) {
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
        setStep('edit');
      }
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateWithAI = async () => {
    if (!basicInfo.name || !basicInfo.title) {
      toast({
        title: "Info manquante",
        description: "Veuillez au moins remplir votre nom et votre poste",
        variant: "destructive",
      });
      return;
    }

    setGenerating(true);
    setStep('generate');

    try {
      const { data, error } = await supabase.functions.invoke('generate-cv-content', {
        body: { basicInfo, language }
      });

      if (error) throw error;

      if (!data?.cvData) {
        throw new Error('Réponse IA invalide');
      }

      const safe = data.cvData || {};

      setCvData({
        name: basicInfo.name,
        email: basicInfo.email,
        phone: basicInfo.phone,
        title: basicInfo.title,
        photo: photoUrl,
        summary: typeof safe.summary === 'string' ? safe.summary : '',
        experience: Array.isArray(safe.experience) ? safe.experience : [],
        education: Array.isArray(safe.education) ? safe.education : [],
        skills: Array.isArray(safe.skills) ? safe.skills : [],
        languages: Array.isArray(safe.languages) ? safe.languages : [],
        interests: Array.isArray(safe.interests) ? safe.interests : [],
      });

      toast({
        title: language === 'fr' ? "CV généré!" : "CV generated!",
        description: language === 'fr' ? "Votre CV a été créé avec l'IA" : "Your CV has been created with AI",
      });
      
      setStep('edit');
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Erreur lors de la génération",
        variant: "destructive",
      });
      setStep('form');
    } finally {
      setGenerating(false);
    }
  };

  const saveCV = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        navigate("/auth");
        return;
      }

      const cvToSave = {
        user_id: user.id,
        full_name: cvData.name,
        email: cvData.email,
        phone: cvData.phone,
        title: cvData.title,
        summary: cvData.summary,
        experience: cvData.experience as any,
        education: cvData.education as any,
        skills: cvData.skills as any,
        languages: cvData.languages as any,
      };

      if (id && id !== "new") {
        const { error } = await supabase
          .from("cvs")
          .update(cvToSave)
          .eq("id", id);

        if (error) throw error;
        
        toast({
          title: language === 'fr' ? "CV sauvegardé" : "CV saved",
          description: language === 'fr' ? "Votre CV a été enregistré avec succès" : "Your CV has been saved successfully",
        });
      } else {
        const { data: newCV, error } = await supabase
          .from("cvs")
          .insert(cvToSave)
          .select()
          .single();
          
        if (error) throw error;
        
        toast({
          title: language === 'fr' ? "CV créé et sauvegardé" : "CV created and saved",
          description: language === 'fr' ? "Votre CV a été créé avec succès" : "Your CV has been created successfully",
        });
        
        navigate(`/editor/${newCV.id}`, { replace: true });
        return;
      }

      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: language === 'fr' ? "Erreur" : "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const TemplateComponent = templates[selectedTemplate];
  const currentColor = colorPalettes[selectedColor].color;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {step === 'form' && (
        <FormStep
          language={language}
          setLanguage={setLanguage}
          basicInfo={basicInfo}
          setBasicInfo={setBasicInfo}
          photoUrl={photoUrl}
          onPhotoUpload={handlePhotoUpload}
          generating={generating}
          onGenerate={generateWithAI}
          onReset={() => {
            setBasicInfo({ name: '', email: '', phone: '', title: '', experience: '', education: '' });
            setCvData({ name: '', email: '', phone: '', title: '', photo: '', summary: '', experience: [], education: [], skills: [], languages: [], interests: [] });
            setPhotoUrl('');
            setSelectedTemplate(0);
            setSelectedColor(0);
            setStep('form');
          }}
        />
      )}

      {step === 'generate' && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Sparkles className="w-16 h-16 animate-pulse text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">
              {language === 'fr' ? 'L\'IA crée votre CV...' : 'AI is creating your CV...'}
            </h2>
            <p className="text-muted-foreground">
              {language === 'fr' ? 'Cela prend quelques secondes' : 'This takes a few seconds'}
            </p>
          </div>
        </div>
      )}

      {step === 'edit' && (
        <EditStep
          language={language}
          cvData={cvData}
          onCvDataChange={setCvData}
          onNext={() => setStep('gallery')}
          onSave={saveCV}
          loading={loading}
        />
      )}

      {step === 'gallery' && (
        <GalleryStep
          language={language}
          cvData={cvData}
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
          currentColor={currentColor}
          onBack={() => setStep('edit')}
          onNext={() => setStep('customize')}
        />
      )}

      {step === 'customize' && (
        <CustomizeStep
          language={language}
          cvData={cvData}
          selectedTemplate={selectedTemplate}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          currentColor={currentColor}
          onNext={() => setStep('export')}
          onBack={() => setStep('gallery')}
          templateComponent={TemplateComponent}
        />
      )}

      {step === 'export' && (
        <ExportStep
          language={language}
          cvData={cvData}
          cvId={id}
          accentColor={currentColor}
          templateComponent={TemplateComponent}
          onBack={() => setStep('customize')}
        />
      )}
    </div>
  );
};

export default CVEditor;
