import type { CVTemplateProps } from '@/types/cv';

const CVTemplate18 = ({ data, accentColor = '#14B8A6' }: CVTemplateProps) => {
  return (
    <div className="w-[210mm] min-h-[297mm] bg-white text-gray-900 font-sans" style={{ pageBreakAfter: 'always' }}>
      {/* Header diagonal */}
      <div className="relative h-48 mb-8" style={{ background: `linear-gradient(165deg, ${accentColor} 60%, transparent 60%)` }}>
        <div className="absolute inset-0 flex items-center px-12 gap-6">
          {data.photo && (
            <img src={data.photo} alt={data.name} className="w-32 h-32 rounded-2xl object-cover shadow-2xl border-4 border-white" />
          )}
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-2">{data.name}</h1>
            <h2 className="text-2xl opacity-95 mb-2">{data.title}</h2>
            <div className="flex gap-4 text-sm opacity-90">
              <span>{data.email}</span>
              <span>|</span>
              <span>{data.phone}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-12 space-y-6">
        {/* Résumé */}
        {data.summary && (
          <section className="p-5 border-l-8 bg-gray-50" style={{ borderColor: accentColor }}>
            <p className="text-gray-700 leading-relaxed italic">{data.summary}</p>
          </section>
        )}

        {/* Expérience */}
        {data.experience && data.experience.length > 0 && (
          <section>
            <h3 className="text-2xl font-bold mb-4 uppercase" style={{ color: accentColor }}>
              Parcours Professionnel
            </h3>
            <div className="space-y-5">
              {data.experience.map((exp, idx) => (
                <div key={idx} className="relative pl-8">
                  <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full" style={{ backgroundColor: `${accentColor}30` }}></div>
                  <div className="absolute left-0 top-2 w-4 h-4 rounded-full border-4 bg-white" style={{ borderColor: accentColor }}></div>
                  <h4 className="font-bold text-lg mb-1">{exp.position || exp.title}</h4>
                  <p className="font-semibold mb-1" style={{ color: accentColor }}>{exp.company}</p>
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
            <h3 className="text-2xl font-bold mb-4 uppercase" style={{ color: accentColor }}>
              Formation
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {data.education.map((edu, idx) => (
                <div key={idx} className="p-4 border-2 rounded-lg hover:shadow-md transition-shadow" style={{ borderColor: `${accentColor}50` }}>
                  <h4 className="font-bold mb-1">{edu.degree}</h4>
                  <p className="text-gray-600 text-sm">{edu.school}</p>
                  <p className="text-xs font-semibold mt-2 px-2 py-1 inline-block rounded" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
                    {edu.period || edu.year}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-6">
          {/* Compétences */}
          {data.skills && data.skills.length > 0 && (
            <section>
              <h3 className="text-xl font-bold mb-3 uppercase" style={{ color: accentColor }}>
                Compétences
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, idx) => (
                  <span key={idx} className="px-4 py-2 rounded-full text-sm font-medium text-white" style={{ backgroundColor: accentColor }}>
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Langues */}
          {data.languages && data.languages.length > 0 && (
            <section>
              <h3 className="text-xl font-bold mb-3 uppercase" style={{ color: accentColor }}>
                Langues
              </h3>
              <div className="space-y-2">
                {data.languages.map((lang, idx) => {
                  const name = typeof lang === 'string' ? lang : (lang.name || lang.language);
                  const level = typeof lang === 'object' ? lang.level : '';
                  return (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-semibold">{name}</span>
                      {level && (
                        <span className="text-xs px-3 py-1 rounded-full font-medium text-white" style={{ backgroundColor: accentColor }}>
                          {level}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default CVTemplate18;
