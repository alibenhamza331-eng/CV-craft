import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { ArrowLeft, Save, Download, Plus, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface CVData {
  title: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  website: string;
  summary: string;
  experience: Array<{
    company: string;
    position: string;
    start: string;
    end: string;
    description: string;
  }>;
  education: Array<{
    school: string;
    degree: string;
    start: string;
    end: string;
  }>;
  skills: Array<{ name: string; level: string }>;
  languages: Array<{ name: string; level: string }>;
  certifications: Array<{ name: string; date: string }>;
}

const CVEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [cvData, setCvData] = useState<CVData>({
    title: "",
    full_name: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    website: "",
    summary: "",
    experience: [],
    education: [],
    skills: [],
    languages: [],
    certifications: [],
  });

  useEffect(() => {
    if (id) {
      fetchCV();
    }
  }, [id]);

  const fetchCV = async () => {
    try {
      const { data, error } = await supabase
        .from("cvs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      
      setCvData({
        title: data.title || "",
        full_name: data.full_name || "",
        email: data.email || "",
        phone: data.phone || "",
        address: data.address || "",
        linkedin: data.linkedin || "",
        website: data.website || "",
        summary: data.summary || "",
        experience: (data.experience as any) || [],
        education: (data.education as any) || [],
        skills: (data.skills as any) || [],
        languages: (data.languages as any) || [],
        certifications: (data.certifications as any) || [],
      });
    } catch (error: any) {
      toast.error("Erreur lors du chargement du CV");
      navigate("/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  const saveCV = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("cvs")
        .update({
          title: cvData.title,
          full_name: cvData.full_name,
          email: cvData.email,
          phone: cvData.phone,
          address: cvData.address,
          linkedin: cvData.linkedin,
          website: cvData.website,
          summary: cvData.summary,
          experience: cvData.experience,
          education: cvData.education,
          skills: cvData.skills,
          languages: cvData.languages,
          certifications: cvData.certifications,
        })
        .eq("id", id);

      if (error) throw error;
      toast.success("CV sauvegardé avec succès");
    } catch (error: any) {
      toast.error("Erreur lors de la sauvegarde");
    } finally {
      setIsSaving(false);
    }
  };

  const exportHTML = () => {
    const html = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${cvData.full_name} - CV</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 850px; margin: 0 auto; padding: 40px 20px; background: linear-gradient(135deg, #f5f3ff 0%, #faf5ff 100%); }
        .header { text-align: center; padding: 30px; background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%); color: white; border-radius: 12px; margin-bottom: 30px; box-shadow: 0 10px 40px -10px rgba(139, 92, 246, 0.3); }
        h1 { font-size: 2.5em; margin-bottom: 10px; text-shadow: 2px 2px 4px rgba(0,0,0,0.1); }
        .contact { display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; margin-top: 15px; font-size: 0.95em; }
        .contact-item { display: flex; align-items: center; gap: 5px; }
        .section { background: white; padding: 25px; margin-bottom: 20px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); border-left: 4px solid #8b5cf6; }
        h2 { color: #8b5cf6; font-size: 1.8em; margin-bottom: 20px; border-bottom: 2px solid #f3e8ff; padding-bottom: 10px; }
        .summary { font-size: 1.05em; line-height: 1.8; color: #555; }
        .experience-item, .education-item, .cert-item { margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #f3e8ff; }
        .experience-item:last-child, .education-item:last-child, .cert-item:last-child { border-bottom: none; }
        .item-title { font-size: 1.2em; font-weight: 600; color: #6d28d9; margin-bottom: 5px; }
        .item-subtitle { color: #8b5cf6; font-weight: 500; margin-bottom: 5px; }
        .item-date { color: #a855f7; font-size: 0.9em; margin-bottom: 10px; font-style: italic; }
        .item-description { color: #555; line-height: 1.7; margin-top: 8px; }
        .skills-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; }
        .skill-item, .lang-item { background: linear-gradient(135deg, #f3e8ff 0%, #faf5ff 100%); padding: 12px 16px; border-radius: 8px; border-left: 3px solid #8b5cf6; display: flex; justify-content: space-between; align-items: center; transition: transform 0.2s; }
        .skill-item:hover, .lang-item:hover { transform: translateX(5px); }
        .skill-name, .lang-name { font-weight: 500; color: #6d28d9; }
        .skill-level, .lang-level { background: #8b5cf6; color: white; padding: 2px 10px; border-radius: 12px; font-size: 0.85em; }
        @media print { body { background: white; } .section { box-shadow: none; } }
        @media (max-width: 600px) { h1 { font-size: 2em; } .contact { flex-direction: column; gap: 10px; } .skills-grid { grid-template-columns: 1fr; } }
    </style>
</head>
<body>
    <div class="header">
        <h1>${cvData.full_name || "Votre Nom"}</h1>
        <div class="contact">
            ${cvData.email ? `<div class="contact-item">📧 ${cvData.email}</div>` : ""}
            ${cvData.phone ? `<div class="contact-item">📱 ${cvData.phone}</div>` : ""}
            ${cvData.address ? `<div class="contact-item">📍 ${cvData.address}</div>` : ""}
            ${cvData.linkedin ? `<div class="contact-item">💼 ${cvData.linkedin}</div>` : ""}
            ${cvData.website ? `<div class="contact-item">🌐 ${cvData.website}</div>` : ""}
        </div>
    </div>
    
    ${cvData.summary ? `
    <div class="section">
        <h2>Profil Professionnel</h2>
        <p class="summary">${cvData.summary}</p>
    </div>` : ""}
    
    ${cvData.experience.length > 0 ? `
    <div class="section">
        <h2>Expérience Professionnelle</h2>
        ${cvData.experience.map(exp => `
            <div class="experience-item">
                <div class="item-title">${exp.position}</div>
                <div class="item-subtitle">${exp.company}</div>
                <div class="item-date">${exp.start} - ${exp.end}</div>
                ${exp.description ? `<div class="item-description">${exp.description}</div>` : ""}
            </div>
        `).join("")}
    </div>` : ""}
    
    ${cvData.education.length > 0 ? `
    <div class="section">
        <h2>Formation</h2>
        ${cvData.education.map(edu => `
            <div class="education-item">
                <div class="item-title">${edu.degree}</div>
                <div class="item-subtitle">${edu.school}</div>
                <div class="item-date">${edu.start} - ${edu.end}</div>
            </div>
        `).join("")}
    </div>` : ""}
    
    ${cvData.skills.length > 0 ? `
    <div class="section">
        <h2>Compétences</h2>
        <div class="skills-grid">
            ${cvData.skills.map(skill => `
                <div class="skill-item">
                    <span class="skill-name">${skill.name}</span>
                    <span class="skill-level">${skill.level}</span>
                </div>
            `).join("")}
        </div>
    </div>` : ""}
    
    ${cvData.languages.length > 0 ? `
    <div class="section">
        <h2>Langues</h2>
        <div class="skills-grid">
            ${cvData.languages.map(lang => `
                <div class="lang-item">
                    <span class="lang-name">${lang.name}</span>
                    <span class="lang-level">${lang.level}</span>
                </div>
            `).join("")}
        </div>
    </div>` : ""}
    
    ${cvData.certifications.length > 0 ? `
    <div class="section">
        <h2>Certifications</h2>
        ${cvData.certifications.map(cert => `
            <div class="cert-item">
                <div class="item-title">${cert.name}</div>
                <div class="item-date">${cert.date}</div>
            </div>
        `).join("")}
    </div>` : ""}
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${cvData.full_name || "cv"}.html`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CV exporté en HTML");
  };

  const addExperience = () => {
    setCvData({
      ...cvData,
      experience: [
        ...cvData.experience,
        { company: "", position: "", start: "", end: "", description: "" },
      ],
    });
  };

  const removeExperience = (index: number) => {
    setCvData({
      ...cvData,
      experience: cvData.experience.filter((_, i) => i !== index),
    });
  };

  const updateExperience = (index: number, field: string, value: string) => {
    const updated = [...cvData.experience];
    updated[index] = { ...updated[index], [field]: value };
    setCvData({ ...cvData, experience: updated });
  };

  const addEducation = () => {
    setCvData({
      ...cvData,
      education: [...cvData.education, { school: "", degree: "", start: "", end: "" }],
    });
  };

  const removeEducation = (index: number) => {
    setCvData({
      ...cvData,
      education: cvData.education.filter((_, i) => i !== index),
    });
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const updated = [...cvData.education];
    updated[index] = { ...updated[index], [field]: value };
    setCvData({ ...cvData, education: updated });
  };

  const addSkill = () => {
    setCvData({
      ...cvData,
      skills: [...cvData.skills, { name: "", level: "" }],
    });
  };

  const removeSkill = (index: number) => {
    setCvData({
      ...cvData,
      skills: cvData.skills.filter((_, i) => i !== index),
    });
  };

  const updateSkill = (index: number, field: string, value: string) => {
    const updated = [...cvData.skills];
    updated[index] = { ...updated[index], [field]: value };
    setCvData({ ...cvData, skills: updated });
  };

  const addLanguage = () => {
    setCvData({
      ...cvData,
      languages: [...cvData.languages, { name: "", level: "" }],
    });
  };

  const removeLanguage = (index: number) => {
    setCvData({
      ...cvData,
      languages: cvData.languages.filter((_, i) => i !== index),
    });
  };

  const updateLanguage = (index: number, field: string, value: string) => {
    const updated = [...cvData.languages];
    updated[index] = { ...updated[index], [field]: value };
    setCvData({ ...cvData, languages: updated });
  };

  const addCertification = () => {
    setCvData({
      ...cvData,
      certifications: [...cvData.certifications, { name: "", date: "" }],
    });
  };

  const removeCertification = (index: number) => {
    setCvData({
      ...cvData,
      certifications: cvData.certifications.filter((_, i) => i !== index),
    });
  };

  const updateCertification = (index: number, field: string, value: string) => {
    const updated = [...cvData.certifications];
    updated[index] = { ...updated[index], [field]: value };
    setCvData({ ...cvData, certifications: updated });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl text-primary">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 animate-fade-in" style={{ background: 'var(--gradient-soft)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard")}
            className="gap-2 hover:scale-105 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </Button>
          <div className="flex gap-3">
            <Button
              onClick={saveCV}
              disabled={isSaving}
              className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all shadow-[var(--shadow-elegant)] hover:scale-105"
            >
              <Save className="w-4 h-4" />
              {isSaving ? "Sauvegarde..." : "Sauvegarder"}
            </Button>
            <Button
              onClick={exportHTML}
              variant="outline"
              className="gap-2 hover:scale-105 transition-all"
            >
              <Download className="w-4 h-4" />
              Exporter HTML
            </Button>
          </div>
        </div>

        <Card className="shadow-[var(--shadow-elegant)] animate-scale-in">
          <CardHeader>
            <Input
              value={cvData.title}
              onChange={(e) => setCvData({ ...cvData, title: e.target.value })}
              className="text-2xl font-bold border-none focus-visible:ring-primary text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
              placeholder="Titre du CV"
            />
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-6 mb-6">
                <TabsTrigger value="info">Infos</TabsTrigger>
                <TabsTrigger value="experience">Expérience</TabsTrigger>
                <TabsTrigger value="education">Formation</TabsTrigger>
                <TabsTrigger value="skills">Compétences</TabsTrigger>
                <TabsTrigger value="languages">Langues</TabsTrigger>
                <TabsTrigger value="certs">Certifications</TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nom complet</Label>
                    <Input
                      value={cvData.full_name}
                      onChange={(e) => setCvData({ ...cvData, full_name: e.target.value })}
                      placeholder="Jean Dupont"
                      className="transition-all focus:shadow-[var(--shadow-elegant)]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={cvData.email}
                      onChange={(e) => setCvData({ ...cvData, email: e.target.value })}
                      placeholder="jean@email.com"
                      className="transition-all focus:shadow-[var(--shadow-elegant)]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Téléphone</Label>
                    <Input
                      value={cvData.phone}
                      onChange={(e) => setCvData({ ...cvData, phone: e.target.value })}
                      placeholder="+33 6 12 34 56 78"
                      className="transition-all focus:shadow-[var(--shadow-elegant)]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Adresse</Label>
                    <Input
                      value={cvData.address}
                      onChange={(e) => setCvData({ ...cvData, address: e.target.value })}
                      placeholder="Paris, France"
                      className="transition-all focus:shadow-[var(--shadow-elegant)]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>LinkedIn</Label>
                    <Input
                      value={cvData.linkedin}
                      onChange={(e) => setCvData({ ...cvData, linkedin: e.target.value })}
                      placeholder="linkedin.com/in/..."
                      className="transition-all focus:shadow-[var(--shadow-elegant)]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Site Web</Label>
                    <Input
                      value={cvData.website}
                      onChange={(e) => setCvData({ ...cvData, website: e.target.value })}
                      placeholder="monsite.com"
                      className="transition-all focus:shadow-[var(--shadow-elegant)]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Résumé professionnel</Label>
                  <Textarea
                    value={cvData.summary}
                    onChange={(e) => setCvData({ ...cvData, summary: e.target.value })}
                    placeholder="Décrivez votre profil professionnel..."
                    rows={5}
                    className="transition-all focus:shadow-[var(--shadow-elegant)]"
                  />
                </div>
              </TabsContent>

              <TabsContent value="experience" className="space-y-4">
                <Button onClick={addExperience} className="gap-2 hover:scale-105 transition-all">
                  <Plus className="w-4 h-4" />
                  Ajouter une expérience
                </Button>
                {cvData.experience.map((exp, index) => (
                  <Card key={index} className="p-4 animate-scale-in">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-semibold text-primary">Expérience #{index + 1}</h3>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeExperience(index)}
                        className="hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Poste</Label>
                        <Input
                          value={exp.position}
                          onChange={(e) => updateExperience(index, "position", e.target.value)}
                          placeholder="Développeur Full-Stack"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Entreprise</Label>
                        <Input
                          value={exp.company}
                          onChange={(e) => updateExperience(index, "company", e.target.value)}
                          placeholder="ABC Tech"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Début</Label>
                        <Input
                          value={exp.start}
                          onChange={(e) => updateExperience(index, "start", e.target.value)}
                          placeholder="Janvier 2020"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Fin</Label>
                        <Input
                          value={exp.end}
                          onChange={(e) => updateExperience(index, "end", e.target.value)}
                          placeholder="Présent"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>Description</Label>
                        <Textarea
                          value={exp.description}
                          onChange={(e) => updateExperience(index, "description", e.target.value)}
                          placeholder="Décrivez vos missions et réalisations..."
                          rows={3}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="education" className="space-y-4">
                <Button onClick={addEducation} className="gap-2 hover:scale-105 transition-all">
                  <Plus className="w-4 h-4" />
                  Ajouter une formation
                </Button>
                {cvData.education.map((edu, index) => (
                  <Card key={index} className="p-4 animate-scale-in">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-semibold text-primary">Formation #{index + 1}</h3>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeEducation(index)}
                        className="hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Diplôme</Label>
                        <Input
                          value={edu.degree}
                          onChange={(e) => updateEducation(index, "degree", e.target.value)}
                          placeholder="Master en Informatique"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>École</Label>
                        <Input
                          value={edu.school}
                          onChange={(e) => updateEducation(index, "school", e.target.value)}
                          placeholder="Université de Paris"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Début</Label>
                        <Input
                          value={edu.start}
                          onChange={(e) => updateEducation(index, "start", e.target.value)}
                          placeholder="2018"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Fin</Label>
                        <Input
                          value={edu.end}
                          onChange={(e) => updateEducation(index, "end", e.target.value)}
                          placeholder="2020"
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="skills" className="space-y-4">
                <Button onClick={addSkill} className="gap-2 hover:scale-105 transition-all">
                  <Plus className="w-4 h-4" />
                  Ajouter une compétence
                </Button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cvData.skills.map((skill, index) => (
                    <Card key={index} className="p-4 animate-scale-in">
                      <div className="flex items-center gap-4">
                        <div className="flex-1 space-y-2">
                          <Input
                            value={skill.name}
                            onChange={(e) => updateSkill(index, "name", e.target.value)}
                            placeholder="React"
                          />
                          <Input
                            value={skill.level}
                            onChange={(e) => updateSkill(index, "level", e.target.value)}
                            placeholder="Expert"
                          />
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => removeSkill(index)}
                          className="hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="languages" className="space-y-4">
                <Button onClick={addLanguage} className="gap-2 hover:scale-105 transition-all">
                  <Plus className="w-4 h-4" />
                  Ajouter une langue
                </Button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cvData.languages.map((lang, index) => (
                    <Card key={index} className="p-4 animate-scale-in">
                      <div className="flex items-center gap-4">
                        <div className="flex-1 space-y-2">
                          <Input
                            value={lang.name}
                            onChange={(e) => updateLanguage(index, "name", e.target.value)}
                            placeholder="Français"
                          />
                          <Input
                            value={lang.level}
                            onChange={(e) => updateLanguage(index, "level", e.target.value)}
                            placeholder="Natif"
                          />
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => removeLanguage(index)}
                          className="hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="certs" className="space-y-4">
                <Button onClick={addCertification} className="gap-2 hover:scale-105 transition-all">
                  <Plus className="w-4 h-4" />
                  Ajouter une certification
                </Button>
                {cvData.certifications.map((cert, index) => (
                  <Card key={index} className="p-4 animate-scale-in">
                    <div className="flex items-center gap-4">
                      <div className="flex-1 grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Nom</Label>
                          <Input
                            value={cert.name}
                            onChange={(e) => updateCertification(index, "name", e.target.value)}
                            placeholder="AWS Certified"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Date</Label>
                          <Input
                            value={cert.date}
                            onChange={(e) => updateCertification(index, "date", e.target.value)}
                            placeholder="2023"
                          />
                        </div>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeCertification(index)}
                        className="hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CVEditor;
