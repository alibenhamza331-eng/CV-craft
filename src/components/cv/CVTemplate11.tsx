import type { CVTemplateProps } from '@/types/cv';

const CVTemplate11 = ({ data, accentColor = '#3B82F6' }: CVTemplateProps) => {
  return (
    <div className="w-[210mm] min-h-[297mm] bg-white text-gray-900 p-0 font-sans" style={{ pageBreakAfter: 'always' }}>
      {/* Header avec photo circulaire centrale */}
      <div className="text-center py-12 px-8" style={{ backgroundColor: accentColor }}>
        {data.photo && (
          <img src={data.photo} alt={data.name} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white object-cover shadow-xl" />
        )}
        <h1 className="text-4xl font-bold text-white mb-2">{data.name}</h1>
        <h2 className="text-2xl text-white/90 mb-4">{data.title}</h2>
        <div className="flex justify-center gap-6 text-white/80 text-sm">
          <span>{data.email}</span>
          <span>•</span>
          <span>{data.phone}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 px-12 py-8 gap-8">
        {/* Résumé */}
        {data.summary && (
          <section>
            <h3 className="text-2xl font-bold mb-4 pb-2 border-b-2" style={{ borderColor: accentColor, color: accentColor }}>
              PROFIL
            </h3>
            <p className="text-gray-700 leading-relaxed">{data.summary}</p>
          </section>
        )}

        {/* Expérience */}
        {data.experience && data.experience.length > 0 && (
          <section>
            <h3 className="text-2xl font-bold mb-4 pb-2 border-b-2" style={{ borderColor: accentColor, color: accentColor }}>
              EXPÉRIENCE PROFESSIONNELLE
            </h3>
            <div className="space-y-4">
              {data.experience.map((exp, idx) => (
                <div key={idx} className="relative pl-6 border-l-2" style={{ borderColor: accentColor }}>
                  <div className="absolute -left-2 top-1 w-3 h-3 rounded-full" style={{ backgroundColor: accentColor }}></div>
                  <h4 className="font-bold text-lg">{exp.position || exp.title}</h4>
                  <p className="text-gray-600 font-semibold">{exp.company}</p>
                  <p className="text-sm text-gray-500 mb-2">{exp.period}</p>
                  <p className="text-gray-700 text-sm">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Formation */}
        {data.education && data.education.length > 0 && (
          <section>
            <h3 className="text-2xl font-bold mb-4 pb-2 border-b-2" style={{ borderColor: accentColor, color: accentColor }}>
              FORMATION
            </h3>
            <div className="space-y-3">
              {data.education.map((edu, idx) => (
                <div key={idx} className="relative pl-6 border-l-2" style={{ borderColor: accentColor }}>
                  <div className="absolute -left-2 top-1 w-3 h-3 rounded-full" style={{ backgroundColor: accentColor }}></div>
                  <h4 className="font-bold">{edu.degree}</h4>
                  <p className="text-gray-600">{edu.school}</p>
                  <p className="text-sm text-gray-500">{edu.period || edu.year}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Compétences et Langues en 2 colonnes */}
        <div className="grid grid-cols-2 gap-8">
          {data.skills && data.skills.length > 0 && (
            <section>
              <h3 className="text-xl font-bold mb-3 pb-2 border-b-2" style={{ borderColor: accentColor, color: accentColor }}>
                COMPÉTENCES
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full text-sm font-medium text-white" style={{ backgroundColor: accentColor }}>
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {data.languages && data.languages.length > 0 && (
            <section>
              <h3 className="text-xl font-bold mb-3 pb-2 border-b-2" style={{ borderColor: accentColor, color: accentColor }}>
                LANGUES
              </h3>
              <ul className="space-y-1">
                {data.languages.map((lang, idx) => {
                  const name = typeof lang === 'string' ? lang : (lang.name || lang.language);
                  const level = typeof lang === 'object' ? lang.level : '';
                  return (
                    <li key={idx} className="text-gray-700 flex justify-between">
                      <span className="font-medium">{name}</span>
                      {level && <span className="text-gray-500 text-sm">{level}</span>}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default CVTemplate11;
