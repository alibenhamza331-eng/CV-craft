import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { FileText, Plus, LogOut, Eye, Trash2 } from "lucide-react";
import { User, Session } from "@supabase/supabase-js";

interface CV {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [cvs, setCvs] = useState<CV[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session) {
          navigate("/auth");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session) {
        navigate("/auth");
      } else {
        setTimeout(() => {
          fetchCVs();
        }, 0);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchCVs = async () => {
    try {
      const { data, error } = await supabase
        .from("cvs")
        .select("id, title, created_at, updated_at")
        .order("updated_at", { ascending: false });

      if (error) throw error;
      setCvs(data || []);
    } catch (error: any) {
      toast.error("Erreur lors du chargement des CVs");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Déconnexion réussie");
    navigate("/auth");
  };

  const createNewCV = async () => {
    try {
      const { data, error } = await supabase
        .from("cvs")
        .insert([
          {
            user_id: user?.id,
            title: "Nouveau CV",
            full_name: user?.user_metadata?.full_name || "",
            email: user?.email || "",
          },
        ])
        .select()
        .single();

      if (error) throw error;
      toast.success("CV créé avec succès");
      navigate(`/editor/${data.id}`);
    } catch (error: any) {
      toast.error("Erreur lors de la création du CV");
    }
  };

  const deleteCV = async (id: string) => {
    try {
      const { error } = await supabase.from("cvs").delete().eq("id", id);
      if (error) throw error;
      toast.success("CV supprimé");
      fetchCVs();
    } catch (error: any) {
      toast.error("Erreur lors de la suppression");
    }
  };

  return (
    <div className="min-h-screen p-6 animate-fade-in" style={{ background: 'var(--gradient-soft)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
              Mes CVs
            </h1>
            <p className="text-muted-foreground">
              Bienvenue, {user?.user_metadata?.full_name || user?.email}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="gap-2 hover:bg-destructive hover:text-destructive-foreground transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            onClick={createNewCV}
            className="cursor-pointer hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:scale-[1.02] border-dashed border-2 border-primary/30 bg-gradient-to-br from-secondary/50 to-accent/10 animate-scale-in"
          >
            <CardContent className="flex flex-col items-center justify-center h-48 gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[var(--shadow-glow)]">
                <Plus className="w-8 h-8 text-primary-foreground" />
              </div>
              <p className="text-lg font-semibold text-primary">Créer un nouveau CV</p>
            </CardContent>
          </Card>

          {isLoading ? (
            <Card className="animate-pulse">
              <CardContent className="h-48" />
            </Card>
          ) : (
            cvs.map((cv) => (
              <Card
                key={cv.id}
                className="hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:scale-[1.02] animate-scale-in"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <FileText className="w-6 h-6 text-primary flex-shrink-0" />
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => navigate(`/editor/${cv.id}`)}
                        className="hover:bg-primary hover:text-primary-foreground transition-all"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => deleteCV(cv.id)}
                        className="hover:bg-destructive hover:text-destructive-foreground transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <CardTitle className="line-clamp-2">{cv.title}</CardTitle>
                  <CardDescription>
                    Modifié le {new Date(cv.updated_at).toLocaleDateString("fr-FR")}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
