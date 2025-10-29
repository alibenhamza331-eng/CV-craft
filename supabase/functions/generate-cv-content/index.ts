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
    const { basicInfo, language = 'fr' } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const promptFr = `Tu es un expert en rédaction de CV. Génère uniquement les SECTIONS demandées sans inventer d'informations personnelles. Utilise le français.

Nom: ${basicInfo.name || ''}
Email: ${basicInfo.email || ''}
Téléphone: ${basicInfo.phone || ''}
Titre/Poste: ${basicInfo.title || ''}
Expérience (indice libre): ${basicInfo.experience || ''}
Formation (indice libre): ${basicInfo.education || ''}

Règles STRICTES:
- N'invente JAMAIS d'entreprises, de dates, d'écoles ou de diplômes
- Si une info n'est pas fournie, laisse les tableaux vides et n'ajoute pas d'éléments fictifs
- Le résumé doit rester générique et lié au titre (sans détails inventés)

Retourne UNIQUEMENT un JSON valide au format:
{
  "summary": "string",
  "experience": [],
  "education": [],
  "skills": [],
  "languages": [],
  "interests": []
}`;

    const promptEn = `You are a resume expert. Generate ONLY the REQUESTED SECTIONS without fabricating any personal details. Use English.

Name: ${basicInfo.name || ''}
Email: ${basicInfo.email || ''}
Phone: ${basicInfo.phone || ''}
Title: ${basicInfo.title || ''}
Experience (free hint): ${basicInfo.experience || ''}
Education (free hint): ${basicInfo.education || ''}

STRICT Rules:
- NEVER invent companies, dates, schools, or degrees
- If info is missing, keep arrays empty and do NOT add made-up items
- Summary must be generic and tied to the title (no fabricated specifics)

Return ONLY valid JSON in this shape:
{
  "summary": "string",
  "experience": [],
  "education": [],
  "skills": [],
  "languages": [],
  "interests": []
}`;

    const prompt = language === 'en' ? promptEn : promptFr;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: language === 'en' ? 'You are a resume writing expert. Respond ONLY with valid JSON, no markdown.' : 'Tu es un expert en rédaction de CV. Réponds UNIQUEMENT avec du JSON valide, sans markdown.' },
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
