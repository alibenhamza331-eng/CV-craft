import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { z } from "zod";
import { FileText, Sparkles } from "lucide-react";

const usernameSchema = z.string().min(3, { message: "Minimum 3 caractères" });
const passwordSchema = z.string().min(6, { message: "Minimum 6 caractères" });

const Auth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/dashboard");
      }
    });
  }, [navigate]);

  // Convertit le username en email pour Supabase
  const usernameToEmail = (user: string) => {
    return `${user.toLowerCase()}@cvcraft.local`;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      usernameSchema.parse(username);
      passwordSchema.parse(password);
      
      if (!fullName.trim()) {
        toast.error("Le nom complet est requis");
        setIsLoading(false);
        return;
      }

      const email = usernameToEmail(username);

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { 
            full_name: fullName,
            username: username 
          },
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (error) {
        if (error.message.includes("already registered")) {
          toast.error("Ce nom d'utilisateur est déjà pris");
        } else {
          toast.error(error.message);
        }
      } else {
        toast.success("Compte créé avec succès !");
        navigate("/dashboard");
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast.error(err.errors[0].message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      usernameSchema.parse(username);
      passwordSchema.parse(password);

      const email = usernameToEmail(username);

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          toast.error("Nom d'utilisateur ou mot de passe incorrect");
        } else {
          toast.error(error.message);
        }
      } else {
        toast.success("Connexion réussie !");
        navigate("/dashboard");
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast.error(err.errors[0].message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 animate-fade-in" 
         style={{ background: 'var(--gradient-soft)' }}>
      <Card className="w-full max-w-md shadow-[var(--shadow-elegant)] animate-scale-in">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-2 shadow-[var(--shadow-glow)] animate-pulse">
            <FileText className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            CVCraft Pro
          </CardTitle>
          <CardDescription className="flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-accent" />
            Créez des CV professionnels en quelques clics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signin" className="transition-all duration-200">
                Connexion
              </TabsTrigger>
              <TabsTrigger value="signup" className="transition-all duration-200">
                Inscription
              </TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-username">Nom d'utilisateur</Label>
                  <Input
                    id="signin-username"
                    type="text"
                    placeholder="Admin"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="transition-all duration-200 focus:shadow-[var(--shadow-elegant)]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Mot de passe</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder="••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="transition-all duration-200 focus:shadow-[var(--shadow-elegant)]"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 shadow-[var(--shadow-elegant)] hover:shadow-[var(--shadow-glow)] hover:scale-[1.02]"
                  disabled={isLoading}
                >
                  {isLoading ? "Connexion..." : "Se connecter"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Nom complet</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="Jean Dupont"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="transition-all duration-200 focus:shadow-[var(--shadow-elegant)]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-username">Nom d'utilisateur</Label>
                  <Input
                    id="signup-username"
                    type="text"
                    placeholder="Admin"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="transition-all duration-200 focus:shadow-[var(--shadow-elegant)]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Mot de passe</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="transition-all duration-200 focus:shadow-[var(--shadow-elegant)]"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 shadow-[var(--shadow-elegant)] hover:shadow-[var(--shadow-glow)] hover:scale-[1.02]"
                  disabled={isLoading}
                >
                  {isLoading ? "Création..." : "Créer un compte"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;