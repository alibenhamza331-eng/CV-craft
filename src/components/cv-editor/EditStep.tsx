import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Plus, Trash2, ArrowRight } from "lucide-react";
import type { CVData } from '@/types/cv';

interface EditStepProps {
  language: 'fr' | 'en';
  cvData: CVData;
  onCvDataChange: (data: CVData) => void;
  onNext: () => void;
  onSave: () => Promise<void>;
  loading: boolean;
}

export const EditStep = ({ language, cvData, onCvDataChange, onNext, onSave, loading }: EditStepProps) => {
  const [localData, setLocalData] = useState<CVData>(cvData);

  const updateField = (field: keyof CVData, value: any) => {
    const updated = { ...localData, [field]: value };
    setLocalData(updated);
    onCvDataChange(updated);
  };

  const addExperience = () => {
    updateField('experience', [...localData.experience, {
      company: '',
      position: '',
      title: '',
      period: '',
      description: ''
    }]);
  };

  const removeExperience = (index: number) => {
    updateField('experience', localData.experience.filter((_, i) => i !== index));
  };

  const updateExperience = (index: number, field: string, value: string) => {
    const updated = [...localData.experience];
    updated[index] = { ...updated[index], [field]: value };
    updateField('experience', updated);
  };

  const addEducation = () => {
    updateField('education', [...localData.education, {
      school: '',
      degree: '',
      year: '',
      period: '',
      description: ''
    }]);
  };

  const removeEducation = (index: number) => {
    updateField('education', localData.education.filter((_, i) => i !== index));
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const updated = [...localData.education];
    updated[index] = { ...updated[index], [field]: value };
    updateField('education', updated);
  };

  const updateSkills = (value: string) => {
    updateField('skills', value.split(',').map(s => s.trim()).filter(Boolean));
  };

  const updateLanguages = (value: string) => {
    const langs = value.split(',').map(s => s.trim()).filter(Boolean);
    updateField('languages', langs.map(lang => {
      if (Array.isArray(localData.languages)) {
        const existing = localData.languages.find(l => typeof l === 'object' && (l.name === lang || l.language === lang));
        return existing || { name: lang, language: lang, level: 'Intermédiaire' };
      }
      return { name: lang, language: lang, level: 'Intermédiaire' };
    }));
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">
            {language === 'fr' ? 'Personnalisez votre CV' : 'Customize your CV'}
          </h2>
          <p className="text-muted-foreground">
            {language === 'fr' ? 'Modifiez chaque section selon vos besoins' : 'Edit each section as needed'}
          </p>
        </div>

        <Card className="p-6 space-y-4">
          <h3 className="text-xl font-semibold">{language === 'fr' ? 'Informations personnelles' : 'Personal Information'}</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>{language === 'fr' ? 'Nom' : 'Name'}</Label>
              <Input value={localData.name} onChange={(e) => updateField('name', e.target.value)} />
            </div>
            <div>
              <Label>{language === 'fr' ? 'Titre' : 'Title'}</Label>
              <Input value={localData.title} onChange={(e) => updateField('title', e.target.value)} />
            </div>
            <div>
              <Label>Email</Label>
              <Input value={localData.email} onChange={(e) => updateField('email', e.target.value)} />
            </div>
            <div>
              <Label>{language === 'fr' ? 'Téléphone' : 'Phone'}</Label>
              <Input value={localData.phone} onChange={(e) => updateField('phone', e.target.value)} />
            </div>
          </div>

          <div>
            <Label>{language === 'fr' ? 'Résumé professionnel' : 'Professional Summary'}</Label>
            <Textarea 
              value={localData.summary} 
              onChange={(e) => updateField('summary', e.target.value)}
              rows={4}
            />
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">{language === 'fr' ? 'Expériences' : 'Experience'}</h3>
            <Button onClick={addExperience} size="sm" variant="outline" className="gap-2">
              <Plus className="w-4 h-4" />
              {language === 'fr' ? 'Ajouter' : 'Add'}
            </Button>
          </div>

          {localData.experience.map((exp, idx) => (
            <Card key={idx} className="p-4 space-y-3 border-2">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">{language === 'fr' ? 'Expérience' : 'Experience'} #{idx + 1}</h4>
                <Button onClick={() => removeExperience(idx)} size="sm" variant="ghost">
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>{language === 'fr' ? 'Entreprise' : 'Company'}</Label>
                  <Input 
                    value={exp.company} 
                    onChange={(e) => updateExperience(idx, 'company', e.target.value)}
                  />
                </div>
                <div>
                  <Label>{language === 'fr' ? 'Poste' : 'Position'}</Label>
                  <Input 
                    value={exp.position || exp.title || ''} 
                    onChange={(e) => {
                      updateExperience(idx, 'position', e.target.value);
                      updateExperience(idx, 'title', e.target.value);
                    }}
                  />
                </div>
              </div>
              
              <div>
                <Label>{language === 'fr' ? 'Période' : 'Period'}</Label>
                <Input 
                  value={exp.period} 
                  onChange={(e) => updateExperience(idx, 'period', e.target.value)}
                  placeholder="2020 - 2023"
                />
              </div>
              
              <div>
                <Label>Description</Label>
                <Textarea 
                  value={exp.description} 
                  onChange={(e) => updateExperience(idx, 'description', e.target.value)}
                  rows={3}
                />
              </div>
            </Card>
          ))}
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">{language === 'fr' ? 'Formation' : 'Education'}</h3>
            <Button onClick={addEducation} size="sm" variant="outline" className="gap-2">
              <Plus className="w-4 h-4" />
              {language === 'fr' ? 'Ajouter' : 'Add'}
            </Button>
          </div>

          {localData.education.map((edu, idx) => (
            <Card key={idx} className="p-4 space-y-3 border-2">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">{language === 'fr' ? 'Formation' : 'Education'} #{idx + 1}</h4>
                <Button onClick={() => removeEducation(idx)} size="sm" variant="ghost">
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>{language === 'fr' ? 'École' : 'School'}</Label>
                  <Input 
                    value={edu.school} 
                    onChange={(e) => updateEducation(idx, 'school', e.target.value)}
                  />
                </div>
                <div>
                  <Label>{language === 'fr' ? 'Diplôme' : 'Degree'}</Label>
                  <Input 
                    value={edu.degree} 
                    onChange={(e) => updateEducation(idx, 'degree', e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Label>{language === 'fr' ? 'Période' : 'Period'}</Label>
                <Input 
                  value={edu.period || edu.year || ''} 
                  onChange={(e) => {
                    updateEducation(idx, 'period', e.target.value);
                    updateEducation(idx, 'year', e.target.value);
                  }}
                  placeholder="2016 - 2020"
                />
              </div>

              <div>
                <Label>Description</Label>
                <Textarea 
                  value={edu.description || ''} 
                  onChange={(e) => updateEducation(idx, 'description', e.target.value)}
                  rows={2}
                />
              </div>
            </Card>
          ))}
        </Card>

        <Card className="p-6 space-y-4">
          <h3 className="text-xl font-semibold">{language === 'fr' ? 'Compétences & Langues' : 'Skills & Languages'}</h3>
          
          <div>
            <Label>{language === 'fr' ? 'Compétences (séparées par des virgules)' : 'Skills (comma separated)'}</Label>
            <Textarea 
              value={localData.skills.join(', ')}
              onChange={(e) => updateSkills(e.target.value)}
              placeholder="React, TypeScript, Node.js, Python..."
              rows={3}
            />
          </div>

          <div>
            <Label>{language === 'fr' ? 'Langues (séparées par des virgules)' : 'Languages (comma separated)'}</Label>
            <Input 
              value={Array.isArray(localData.languages) ? localData.languages.map(l => typeof l === 'string' ? l : (l.name || l.language || '')).join(', ') : ''}
              onChange={(e) => updateLanguages(e.target.value)}
              placeholder="Français, Anglais, Espagnol..."
            />
          </div>
        </Card>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onSave} disabled={loading}>
            {loading 
              ? (language === 'fr' ? 'Enregistrement...' : 'Saving...') 
              : (language === 'fr' ? 'Enregistrer' : 'Save')}
          </Button>
          <Button onClick={onNext} className="gap-2">
            {language === 'fr' ? 'Choisir le design' : 'Choose design'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};