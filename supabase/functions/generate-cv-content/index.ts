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

    const promptFr = `Tu es un expert en rédaction de CV professionnels. Crée un CV COMPLET et RICHE en contenu.

INFORMATIONS FOURNIES:
Nom: ${basicInfo.name || ''}
Email: ${basicInfo.email || ''}
Téléphone: ${basicInfo.phone || ''}
Titre/Poste: ${basicInfo.title || ''}
Expérience mentionnée: ${basicInfo.experience || 'À déduire du poste'}
Formation mentionnée: ${basicInfo.education || 'À déduire du poste'}

RÈGLES DE GÉNÉRATION:
- Génère un résumé professionnel percutant de 3-4 phrases
- Crée 3-4 expériences professionnelles DÉTAILLÉES et COHÉRENTES avec le poste
- Ajoute 2-3 formations pertinentes pour le profil
- Liste 8-12 compétences (techniques + soft skills) appropriées au poste
- Inclus 2-3 langues avec niveaux réalistes (Natif, Courant, Intermédiaire, Notions)
- Ajoute 3-5 centres d'intérêt professionnels
- Base-toi sur le titre du poste pour créer un profil COHÉRENT
- Sois créatif mais LOGIQUE et PROFESSIONNEL

Retourne UNIQUEMENT un JSON valide au format:
{
  "summary": "Résumé professionnel détaillé de 3-4 phrases",
  "experience": [
    {"title": "Poste", "company": "Entreprise", "period": "2021-2024", "description": "Description détaillée des responsabilités et réalisations"},
    {"title": "Poste précédent", "company": "Autre entreprise", "period": "2018-2021", "description": "Description détaillée"}
  ],
  "education": [
    {"degree": "Diplôme principal", "school": "École/Université", "year": "2018"},
    {"degree": "Formation complémentaire", "school": "Institution", "year": "2016"}
  ],
  "skills": ["Compétence 1", "Compétence 2", "Compétence 3", "Compétence 4", "Compétence 5", "Compétence 6", "Compétence 7", "Compétence 8"],
  "languages": [
    {"language": "Français", "level": "Natif"},
    {"language": "Anglais", "level": "Courant"}
  ],
  "interests": ["Intérêt 1", "Intérêt 2", "Intérêt 3"]
}`;

    const promptEn = `You are a professional resume writing expert. Create a COMPLETE and CONTENT-RICH CV.

PROVIDED INFORMATION:
Name: ${basicInfo.name || ''}
Email: ${basicInfo.email || ''}
Phone: ${basicInfo.phone || ''}
Title: ${basicInfo.title || ''}
Mentioned experience: ${basicInfo.experience || 'To infer from position'}
Mentioned education: ${basicInfo.education || 'To infer from position'}

GENERATION RULES:
- Generate an impactful professional summary of 3-4 sentences
- Create 3-4 DETAILED professional experiences COHERENT with the position
- Add 2-3 relevant education entries for the profile
- List 8-12 skills (technical + soft skills) appropriate for the position
- Include 2-3 languages with realistic levels (Native, Fluent, Intermediate, Basic)
- Add 3-5 professional interests
- Base on the job title to create a COHERENT profile
- Be creative but LOGICAL and PROFESSIONAL

Return ONLY valid JSON in this format:
{
  "summary": "Detailed professional summary of 3-4 sentences",
  "experience": [
    {"title": "Position", "company": "Company", "period": "2021-2024", "description": "Detailed description of responsibilities and achievements"},
    {"title": "Previous position", "company": "Other company", "period": "2018-2021", "description": "Detailed description"}
  ],
  "education": [
    {"degree": "Main degree", "school": "School/University", "year": "2018"},
    {"degree": "Additional training", "school": "Institution", "year": "2016"}
  ],
  "skills": ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5", "Skill 6", "Skill 7", "Skill 8"],
  "languages": [
    {"language": "English", "level": "Native"},
    {"language": "Spanish", "level": "Fluent"}
  ],
  "interests": ["Interest 1", "Interest 2", "Interest 3"]
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
