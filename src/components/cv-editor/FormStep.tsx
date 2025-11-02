import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Camera, Sparkles } from "lucide-react";

interface BasicInfo {
  name: string;
  email: string;
  phone: string;
  title: string;
  experience: string;
  education: string;
}

interface FormStepProps {
  language: 'fr' | 'en';
  setLanguage: (lang: 'fr' | 'en') => void;
  basicInfo: BasicInfo;
  setBasicInfo: (info: BasicInfo) => void;
  photoUrl: string;
  onPhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGenerate: () => void;
  onReset: () => void;
  generating: boolean;
}

export const FormStep = ({
  language,
  setLanguage,
  basicInfo,
  setBasicInfo,
  photoUrl,
  onPhotoUpload,
  onGenerate,
  onReset,
  generating
}: FormStepProps) => {
  return (
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
          <Button variant="outline" onClick={onReset}>
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
                onChange={onPhotoUpload}
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
            <Textarea
              id="experience"
              value={basicInfo.experience}
              onChange={(e) => setBasicInfo({ ...basicInfo, experience: e.target.value })}
              placeholder={language === 'fr' ? '3 ans en développement web, React, Node.js...' : '3 years in web development, React, Node.js...'}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="education">
              {language === 'fr' ? 'Formation' : 'Education'}
            </Label>
            <Textarea
              id="education"
              value={basicInfo.education}
              onChange={(e) => setBasicInfo({ ...basicInfo, education: e.target.value })}
              placeholder={language === 'fr' ? 'Master Informatique, Licence...' : 'Master in Computer Science, Bachelor...'}
              rows={2}
            />
          </div>
        </div>

        <Button onClick={onGenerate} disabled={generating} className="w-full gap-2">
          <Sparkles className="w-4 h-4" />
          {generating 
            ? (language === 'fr' ? 'Génération en cours...' : 'Generating...') 
            : (language === 'fr' ? 'Générer mon CV avec l\'IA' : 'Generate my CV with AI')}
        </Button>
      </div>
    </div>
  );
};