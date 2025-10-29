import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Sparkles, Shield, Download } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 animate-fade-in"
         style={{ background: 'var(--gradient-soft)' }}>
      <div className="text-center max-w-4xl mx-auto space-y-8">
        <div className="mx-auto w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 shadow-[var(--shadow-glow)] animate-pulse">
          <FileText className="w-12 h-12 text-primary-foreground" />
        </div>
        
        <h1 className="text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4 animate-scale-in">
          CV Pro Generator
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8 animate-fade-in">
          Créez des CVs professionnels ultra-modernes en quelques minutes
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-scale-in">
          <div className="p-6 rounded-xl bg-card border border-border hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:scale-105">
            <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Assistant IA</h3>
            <p className="text-sm text-muted-foreground">Générez votre CV à l'aide de l'IA, simplement</p>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:scale-105">
            <Shield className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">100% Sécurisé</h3>
            <p className="text-sm text-muted-foreground">Vos données sont chiffrées et protégées</p>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:scale-105">
            <Download className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Export HTML</h3>
            <p className="text-sm text-muted-foreground">Un seul fichier HTML prêt à l'emploi</p>
          </div>
        </div>

        <div className="flex gap-4 justify-center animate-fade-in">
          <Button
            size="lg"
            onClick={() => navigate("/auth")}
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 shadow-[var(--shadow-elegant)] hover:shadow-[var(--shadow-glow)] hover:scale-105 text-lg px-8"
          >
            Commencer maintenant
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate("/auth")}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 text-lg px-8"
          >
            Se connecter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
