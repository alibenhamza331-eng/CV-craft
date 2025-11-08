import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Sparkles, Shield, Download, Palette, Zap, Crown } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 max-w-4xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Crown className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Créateur de CV Professionnel</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
            CVCraft Pro
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Créez des CVs professionnels ultra-modernes en quelques minutes avec l'IA
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button 
              size="lg" 
              onClick={() => navigate("/auth")}
              className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Commencer maintenant
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate("/auth")}
              className="text-lg px-8 py-6 border-2 border-primary hover:bg-primary hover:text-primary-foreground"
            >
              Se connecter
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-20 max-w-5xl mx-auto">
          <Card className="p-6 hover:shadow-lg transition-all duration-300 border-primary/20 hover:scale-105">
            <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Assistant IA Avancé</h3>
            <p className="text-muted-foreground">
              Générez du contenu professionnel et personnalisé automatiquement
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all duration-300 border-primary/20 hover:scale-105">
            <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Palette className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">20+ Templates Premium</h3>
            <p className="text-muted-foreground">
              Choisissez parmi une vaste collection de designs modernes
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all duration-300 border-primary/20 hover:scale-105">
            <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Download className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Export Multi-Format</h3>
            <p className="text-muted-foreground">
              PDF haute qualité, HTML, ou partage en ligne instantané
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all duration-300 border-primary/20 hover:scale-105">
            <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">100% Sécurisé</h3>
            <p className="text-muted-foreground">
              Vos données sont chiffrées et stockées en toute sécurité
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all duration-300 border-primary/20 hover:scale-105">
            <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Édition en Temps Réel</h3>
            <p className="text-muted-foreground">
              Visualisez vos modifications instantanément
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all duration-300 border-primary/20 hover:scale-105">
            <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Crown className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Fonctionnalités Pro</h3>
            <p className="text-muted-foreground">
              Accès aux templates premium et fonctionnalités avancées
            </p>
          </Card>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-20">
          <Card className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <h2 className="text-3xl font-bold mb-4">Prêt à créer votre CV professionnel ?</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Rejoignez des milliers d'utilisateurs qui ont déjà créé leur CV parfait
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate("/auth")}
              className="text-lg px-12 py-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg hover:scale-105"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Créer mon CV
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;