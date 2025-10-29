import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { basicInfo } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const prompt = `Tu es un expert en rédaction de CV. Génère un CV professionnel complet basé sur ces informations minimales:
    
Nom: ${basicInfo.name || 'Non spécifié'}
Email: ${basicInfo.email || 'Non spécifié'}
Téléphone: ${basicInfo.phone || 'Non spécifié'}
Titre/Poste: ${basicInfo.title || 'Non spécifié'}
Expérience: ${basicInfo.experience || 'Non spécifié'}
Formation: ${basicInfo.education || 'Non spécifié'}

Développe ce CV avec:
- Un résumé professionnel engageant (2-3 phrases)
- 3-4 expériences professionnelles détaillées avec responsabilités et réalisations
- 2-3 formations avec détails
- 6-8 compétences clés pertinentes
- 2-3 langues avec niveaux
- 2-3 centres d'intérêt professionnels

Retourne UNIQUEMENT un JSON valide au format suivant (sans markdown ni texte supplémentaire):
{
  "summary": "string",
  "experience": [{"title": "string", "company": "string", "period": "string", "description": "string"}],
  "education": [{"degree": "string", "school": "string", "year": "string"}],
  "skills": ["string"],
  "languages": [{"language": "string", "level": "string"}],
  "interests": ["string"]
}`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: 'Tu es un expert en rédaction de CV. Réponds UNIQUEMENT avec du JSON valide, sans markdown.' },
          { role: 'user', content: prompt }
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('AI API error:', response.status, error);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Trop de requêtes, réessayez dans un moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Crédits insuffisants.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error('AI generation failed');
    }

    const data = await response.json();
    let content = data.choices[0].message.content.trim();
    
    // Remove markdown code blocks if present
    content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    const cvData = JSON.parse(content);

    return new Response(
      JSON.stringify({ cvData }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
