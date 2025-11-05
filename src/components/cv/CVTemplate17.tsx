import type { CVTemplateProps } from '@/types/cv';

const CVTemplate17 = ({ data, accentColor = '#EF4444' }: CVTemplateProps) => {
  return (
    <div className="w-[210mm] min-h-[297mm] bg-gray-900 text-white font-sans p-10" style={{ pageBreakAfter: 'always' }}>
      {/* Header avec gradient */}
      <div className="mb-8 p-8 rounded-2xl relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}50)` }}>
        <div className="flex items-center gap-6 relative z-10">
          {data.photo && (
            <img src={data.photo} alt={data.name} className="w-32 h-32 rounded-full object-cover shadow-2xl border-4 border-white/20" />
          )}
          <div>
            <h1 className="text-5xl font-bold mb-2">{data.name}</h1>
            <h2 className="text-2xl opacity-90 mb-3">{data.title}</h2>
            <div className="flex gap-4 text-sm">
              <span>{data.email}</span>
              <span>•</span>
              <span>{data.phone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Résumé */}
      {data.summary && (
        <section className="mb-8 p-6 bg-gray-800 rounded-xl border-l-4" style={{ borderColor: accentColor }}>
          <p className="text-gray-200 leading-relaxed">{data.summary}</p>
        </section>
      )}

      {/* Expérience */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-8">
          <h3 className="text-2xl font-bold mb-4 pb-2 border-b-2" style={{ color: accentColor, borderColor: accentColor }}>
            EXPÉRIENCE PROFESSIONNELLE
          </h3>
          <div className="space-y-5">
            {data.experience.map((exp, idx) => (
              <div key={idx} className="p-5 bg-gray-800 rounded-xl">
                <h4 className="font-bold text-xl mb-1">{exp.position || exp.title}</h4>
                <p className="font-semibold mb-2" style={{ color: accentColor }}>{exp.company} • {exp.period}</p>
                <p className="text-gray-300 text-sm">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-8">
        {/* Formation */}
        {data.education && data.education.length > 0 && (
          <section>
            <h3 className="text-xl font-bold mb-4 pb-2 border-b-2" style={{ color: accentColor, borderColor: accentColor }}>
              FORMATION
            </h3>
            <div className="space-y-4">
              {data.education.map((edu, idx) => (
                <div key={idx} className="p-4 bg-gray-800 rounded-xl">
                  <h4 className="font-bold">{edu.degree}</h4>
                  <p className="text-gray-400 text-sm">{edu.school}</p>
                  <p className="text-xs font-medium mt-1" style={{ color: accentColor }}>{edu.period || edu.year}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="space-y-6">
          {/* Compétences */}
          {data.skills && data.skills.length > 0 && (
            <section>
              <h3 className="text-xl font-bold mb-3 pb-2 border-b-2" style={{ color: accentColor, borderColor: accentColor }}>
                COMPÉTENCES
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-lg text-sm font-medium bg-gray-800 border-2" style={{ borderColor: accentColor, color: accentColor }}>
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Langues */}
          {data.languages && data.languages.length > 0 && (
            <section>
              <h3 className="text-xl font-bold mb-3 pb-2 border-b-2" style={{ color: accentColor, borderColor: accentColor }}>
                LANGUES
              </h3>
              <ul className="space-y-2">
                {data.languages.map((lang, idx) => {
                  const name = typeof lang === 'string' ? lang : (lang.name || lang.language);
                  const level = typeof lang === 'object' ? lang.level : '';
                  return (
                    <li key={idx} className="flex justify-between items-center p-2 bg-gray-800 rounded-lg">
                      <span className="font-medium">{name}</span>
                      {level && <span className="text-sm px-2 py-1 rounded" style={{ backgroundColor: `${accentColor}40`, color: accentColor }}>{level}</span>}
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

export default CVTemplate17;
