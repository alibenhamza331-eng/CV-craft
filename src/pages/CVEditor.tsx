import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Download, ChevronLeft, ChevronRight, Sparkles, Camera, Palette } from "lucide-react";
import CVTemplate1 from "@/components/cv/CVTemplate1";
import CVTemplate2 from "@/components/cv/CVTemplate2";
import CVTemplate3 from "@/components/cv/CVTemplate3";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import type { CVData } from '@/types/cv';

const templates = [CVTemplate1, CVTemplate2, CVTemplate3];
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
];

const CVEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState<'form' | 'generate' | 'gallery' | 'customize' | 'preview'>('form');
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
      // Nouveau CV - toujours commencer par le formulaire
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
        // Toujours commencer par la galerie pour voir le CV chargé
        setStep('gallery');
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
      
      setStep('gallery');
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
        
        // Mettre à jour l'URL avec le nouvel ID
        navigate(`/editor/${newCV.id}`, { replace: true });
        return; // Ne pas rediriger vers le dashboard
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

  const downloadCV = async () => {
    const element = document.getElementById("cv-content");
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
      pdf.save(`${cvData.name || 'cv'}.pdf`);

      toast({
        title: "Téléchargé!",
        description: "Votre CV a été téléchargé",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors du téléchargement",
        variant: "destructive",
      });
    }
  };

  const TemplateComponent = templates[selectedTemplate];
  const currentColor = colorPalettes[selectedColor].color;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {step === 'form' && (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="max-w-2xl w-full bg-card rounded-lg shadow-elegant p-8 space-y-6">
            <div className="text-center mb-6">
              <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                {language === 'fr' ? 'Créez votre CV avec l\'assistant IA' : 'Create your CV with AI assistant'}
              </h1>
              <p className="text-muted-foreground">
                {language === 'fr' 
                  ? 'L\'IA génère un CV complet et professionnel à partir de vos informations' 
                  : 'AI generates a complete and professional CV from your information'}
              </p>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {language === 'fr' ? 'Langue:' : 'Language:'}
                </span>
                <div className="inline-flex rounded-md border">
                  <button
                    onClick={() => setLanguage('fr')}
                    className={`px-3 py-1 text-sm rounded-l-md transition-colors ${language === 'fr' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'}`}
                  >🇫🇷 FR</button>
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1 text-sm rounded-r-md transition-colors ${language === 'en' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'}`}
                  >🇬🇧 EN</button>
                </div>
              </div>
              <Button variant="outline" onClick={() => {
                setBasicInfo({ name: '', email: '', phone: '', title: '', experience: '', education: '' });
                setCvData({ name: '', email: '', phone: '', title: '', photo: '', summary: '', experience: [], education: [], skills: [], languages: [], interests: [] });
                setPhotoUrl('');
                setSelectedTemplate(0);
                setSelectedColor(0);
                setStep('form');
              }}>
                {language === 'fr' ? 'Tout remettre à zéro' : 'Reset all'}
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="photo" className="cursor-pointer">
                  <div className="flex items-center gap-3 p-4 border-2 border-dashed rounded-lg hover:border-primary transition-colors">
                    <Camera className="w-6 h-6" />
                    <div>
                      <p className="font-medium">
                        {language === 'fr' ? 'Ajouter une photo' : 'Add a photo'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {language === 'fr' ? 'Optionnel mais recommandé' : 'Optional but recommended'}
                      </p>
                    </div>
                  </div>
                  <input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </Label>
                {photoUrl && (
                  <img src={photoUrl} alt="Preview" className="mt-2 w-24 h-24 rounded-full object-cover" />
                )}
              </div>

              <div>
                <Label htmlFor="name">
                  {language === 'fr' ? 'Nom complet *' : 'Full name *'}
                </Label>
                <Input
                  id="name"
                  value={basicInfo.name}
                  onChange={(e) => setBasicInfo({ ...basicInfo, name: e.target.value })}
                  placeholder={language === 'fr' ? 'Jean Dupont' : 'John Doe'}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={basicInfo.email}
                    onChange={(e) => setBasicInfo({ ...basicInfo, email: e.target.value })}
                    placeholder={language === 'fr' ? 'jean@email.com' : 'john@email.com'}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">
                    {language === 'fr' ? 'Téléphone' : 'Phone'}
                  </Label>
                  <Input
                    id="phone"
                    value={basicInfo.phone}
                    onChange={(e) => setBasicInfo({ ...basicInfo, phone: e.target.value })}
                    placeholder={language === 'fr' ? '+33 6 12 34 56 78' : '+1 555 000 0000'}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="title">
                  {language === 'fr' ? 'Titre / Poste recherché *' : 'Title / Target position *'}
                </Label>
                <Input
                  id="title"
                  value={basicInfo.title}
                  onChange={(e) => setBasicInfo({ ...basicInfo, title: e.target.value })}
                  placeholder={language === 'fr' ? 'Développeur Full Stack' : 'Full Stack Developer'}
                />
              </div>

              <div>
                <Label htmlFor="experience">
                  {language === 'fr' ? 'Expérience (résumé rapide)' : 'Experience (quick summary)'}
                </Label>
                <Input
                  id="experience"
                  value={basicInfo.experience}
                  onChange={(e) => setBasicInfo({ ...basicInfo, experience: e.target.value })}
                  placeholder={language === 'fr' ? '3 ans en développement web' : '3 years in web development'}
                />
              </div>

              <div>
                <Label htmlFor="education">
                  {language === 'fr' ? 'Formation' : 'Education'}
                </Label>
                <Input
                  id="education"
                  value={basicInfo.education}
                  onChange={(e) => setBasicInfo({ ...basicInfo, education: e.target.value })}
                  placeholder={language === 'fr' ? 'Master Informatique' : 'Master in Computer Science'}
                />
              </div>
            </div>

            <Button onClick={generateWithAI} disabled={generating} className="w-full gap-2">
              <Sparkles className="w-4 h-4" />
              {generating 
                ? (language === 'fr' ? 'Génération en cours...' : 'Generating...') 
                : (language === 'fr' ? 'Générer mon CV avec l\'IA' : 'Generate my CV with AI')}
            </Button>
          </div>
        </div>
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

      {step === 'gallery' && (
        <div className="min-h-screen p-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">
                {language === 'fr' ? 'Choisissez votre template' : 'Choose your template'}
              </h2>
              <p className="text-muted-foreground">
                {language === 'fr' ? 'Cliquez sur un design pour le sélectionner' : 'Click on a design to select it'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {templates.map((Template, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedTemplate(idx)}
                  className={`cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                    idx === selectedTemplate 
                      ? 'ring-4 ring-primary shadow-[var(--shadow-glow)] scale-105' 
                      : 'hover:shadow-[var(--shadow-elegant)]'
                  }`}
                >
                  <div className="scale-[0.4] origin-top-left h-[420px] overflow-hidden rounded-lg border-2">
                    <Template data={cvData} accentColor={currentColor} />
                  </div>
                  <p className="text-center mt-2 font-medium">
                    Template {idx + 1}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={() => setStep('form')}>
                {language === 'fr' ? 'Retour' : 'Back'}
              </Button>
              <Button onClick={() => setStep('customize')} className="gap-2">
                {language === 'fr' ? 'Personnaliser' : 'Customize'}
                <Palette className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {step === 'customize' && (
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
          <h2 className="text-3xl font-bold mb-6">
            {language === 'fr' ? 'Personnalisez les couleurs' : 'Customize colors'}
          </h2>
          
          <div className="scale-75 transform mb-8">
            <TemplateComponent data={cvData} accentColor={currentColor} />
          </div>

          <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mb-8 max-w-2xl">
            {colorPalettes.map((palette, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedColor(idx)}
                className={`w-12 h-12 rounded-full transition-all ${
                  idx === selectedColor ? 'ring-4 ring-primary ring-offset-4 scale-110' : 'hover:scale-105'
                }`}
                style={{ backgroundColor: palette.color }}
                title={palette.name}
              />
            ))}
          </div>

          <div className="flex gap-4">
            <Button variant="outline" onClick={() => setStep('gallery')}>
              {language === 'fr' ? 'Retour' : 'Back'}
            </Button>
            <Button onClick={() => setStep('preview')}>
              {language === 'fr' ? 'Voir le résultat' : 'See result'}
            </Button>
          </div>
        </div>
      )}

      {step === 'preview' && (
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <Button variant="ghost" onClick={() => setStep('customize')} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                {language === 'fr' ? 'Retour' : 'Back'}
              </Button>
              <div className="flex gap-2">
                <Button onClick={saveCV} disabled={loading} variant="outline">
                  {loading 
                    ? (language === 'fr' ? 'Enregistrement...' : 'Saving...') 
                    : (language === 'fr' ? 'Enregistrer' : 'Save')}
                </Button>
                <Button onClick={downloadCV} className="gap-2">
                  <Download className="w-4 h-4" />
                  {language === 'fr' ? 'Télécharger PDF' : 'Download PDF'}
                </Button>
              </div>
            </div>

            <div className="bg-card rounded-lg p-8 shadow-elegant">
              <div className="flex justify-center" id="cv-content">
                <TemplateComponent data={cvData} accentColor={currentColor} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CVEditor;
