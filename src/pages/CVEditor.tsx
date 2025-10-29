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
];

const CVEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState<'form' | 'generate' | 'template' | 'customize' | 'preview'>('form');
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
        setStep('preview');
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
        body: { basicInfo }
      });

      if (error) throw error;

      setCvData({
        name: basicInfo.name,
        email: basicInfo.email,
        phone: basicInfo.phone,
        title: basicInfo.title,
        photo: photoUrl,
        ...data.cvData
      });

      toast({
        title: "CV généré!",
        description: "Votre CV a été créé avec l'IA",
      });
      
      setStep('template');
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
      } else {
        const { error } = await supabase.from("cvs").insert(cvToSave);
        if (error) throw error;
      }

      toast({
        title: "CV sauvegardé",
        description: "Votre CV a été enregistré avec succès",
      });

      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Erreur",
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
                Créez votre CV professionnel
              </h1>
              <p className="text-muted-foreground">Quelques infos, et l'IA fait le reste ✨</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="photo" className="cursor-pointer">
                  <div className="flex items-center gap-3 p-4 border-2 border-dashed rounded-lg hover:border-primary transition-colors">
                    <Camera className="w-6 h-6" />
                    <div>
                      <p className="font-medium">Ajouter une photo</p>
                      <p className="text-sm text-muted-foreground">Optionnel mais recommandé</p>
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
                <Label htmlFor="name">Nom complet *</Label>
                <Input
                  id="name"
                  value={basicInfo.name}
                  onChange={(e) => setBasicInfo({ ...basicInfo, name: e.target.value })}
                  placeholder="Jean Dupont"
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
                    placeholder="jean@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    value={basicInfo.phone}
                    onChange={(e) => setBasicInfo({ ...basicInfo, phone: e.target.value })}
                    placeholder="+33 6 12 34 56 78"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="title">Titre / Poste recherché *</Label>
                <Input
                  id="title"
                  value={basicInfo.title}
                  onChange={(e) => setBasicInfo({ ...basicInfo, title: e.target.value })}
                  placeholder="Développeur Full Stack"
                />
              </div>

              <div>
                <Label htmlFor="experience">Expérience (résumé rapide)</Label>
                <Input
                  id="experience"
                  value={basicInfo.experience}
                  onChange={(e) => setBasicInfo({ ...basicInfo, experience: e.target.value })}
                  placeholder="3 ans en développement web"
                />
              </div>

              <div>
                <Label htmlFor="education">Formation</Label>
                <Input
                  id="education"
                  value={basicInfo.education}
                  onChange={(e) => setBasicInfo({ ...basicInfo, education: e.target.value })}
                  placeholder="Master Informatique"
                />
              </div>
            </div>

            <Button onClick={generateWithAI} disabled={generating} className="w-full gap-2">
              <Sparkles className="w-4 h-4" />
              {generating ? "Génération en cours..." : "Générer mon CV avec l'IA"}
            </Button>
          </div>
        </div>
      )}

      {step === 'generate' && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Sparkles className="w-16 h-16 animate-pulse text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">L'IA crée votre CV...</h2>
            <p className="text-muted-foreground">Cela prend quelques secondes</p>
          </div>
        </div>
      )}

      {step === 'template' && (
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
          <h2 className="text-3xl font-bold mb-6">Choisissez votre template</h2>
          <p className="text-muted-foreground mb-8">Swipez pour explorer les designs</p>
          
          <div className="relative">
            <div className="scale-75 transform">
              <TemplateComponent data={cvData} accentColor={currentColor} />
            </div>
            
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2"
              onClick={() => setSelectedTemplate((prev) => (prev - 1 + templates.length) % templates.length)}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2"
              onClick={() => setSelectedTemplate((prev) => (prev + 1) % templates.length)}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>

          <div className="flex gap-2 mt-8">
            {templates.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === selectedTemplate ? 'bg-primary w-6' : 'bg-muted'
                }`}
              />
            ))}
          </div>

          <div className="flex gap-4 mt-8">
            <Button variant="outline" onClick={() => setStep('form')}>
              Retour
            </Button>
            <Button onClick={() => setStep('customize')} className="gap-2">
              Personnaliser
              <Palette className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {step === 'customize' && (
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
          <h2 className="text-3xl font-bold mb-6">Personnalisez les couleurs</h2>
          
          <div className="scale-75 transform mb-8">
            <TemplateComponent data={cvData} accentColor={currentColor} />
          </div>

          <div className="flex gap-4 mb-8">
            {colorPalettes.map((palette, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedColor(idx)}
                className={`w-12 h-12 rounded-full transition-all ${
                  idx === selectedColor ? 'ring-4 ring-primary ring-offset-4' : ''
                }`}
                style={{ backgroundColor: palette.color }}
              />
            ))}
          </div>

          <div className="flex gap-4">
            <Button variant="outline" onClick={() => setStep('template')}>
              Retour
            </Button>
            <Button onClick={() => setStep('preview')}>
              Voir le résultat
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
                Retour
              </Button>
              <div className="flex gap-2">
                <Button onClick={saveCV} disabled={loading} variant="outline">
                  {loading ? "Enregistrement..." : "Enregistrer"}
                </Button>
                <Button onClick={downloadCV} className="gap-2">
                  <Download className="w-4 h-4" />
                  Télécharger PDF
                </Button>
              </div>
            </div>

            <div className="flex justify-center">
              <TemplateComponent data={cvData} accentColor={currentColor} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CVEditor;
