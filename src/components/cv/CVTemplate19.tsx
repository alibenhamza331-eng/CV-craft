import type { CVTemplateProps } from '@/types/cv';

const CVTemplate19 = ({ data, accentColor = '#D946EF' }: CVTemplateProps) => {
  return (
    <div className="w-[210mm] min-h-[297mm] bg-white text-gray-900 font-sans p-12" style={{ pageBreakAfter: 'always' }}>
      {/* Header circulaire centré */}
      <div className="text-center mb-10">
        {data.photo && (
          <div className="relative inline-block mb-4">
            <img src={data.photo} alt={data.name} className="w-40 h-40 rounded-full object-cover shadow-xl border-8" style={{ borderColor: accentColor }} />
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-white text-sm font-bold" style={{ backgroundColor: accentColor }}>
              {data.title}
            </div>
          </div>
        )}
        <h1 className="text-4xl font-bold mb-2">{data.name}</h1>
        <div className="flex justify-center gap-6 text-sm text-gray-600">
          <span>{data.email}</span>
          <span>•</span>
          <span>{data.phone}</span>
        </div>
      </div>

      {/* Résumé avec bordure */}
      {data.summary && (
        <section className="mb-8 text-center">
          <p className="text-gray-700 leading-relaxed italic max-w-3xl mx-auto p-4 border-t-4 border-b-4" style={{ borderColor: accentColor }}>
            {data.summary}
          </p>
        </section>
      )}

      {/* Expérience */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-8">
          <h3 className="text-2xl font-bold mb-4 text-center pb-2 border-b-4 inline-block w-full" style={{ color: accentColor, borderColor: accentColor }}>
            EXPÉRIENCE
          </h3>
          <div className="space-y-5">
            {data.experience.map((exp, idx) => (
              <div key={idx} className="p-5 border-2 rounded-2xl hover:shadow-lg transition-shadow" style={{ borderColor: `${accentColor}40` }}>
                <div className="text-center mb-3">
                  <h4 className="font-bold text-xl" style={{ color: accentColor }}>{exp.position || exp.title}</h4>
                  <p className="font-semibold text-gray-700">{exp.company}</p>
                  <p className="text-sm text-gray-500">{exp.period}</p>
                </div>
                <p className="text-gray-700 text-center">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Formation */}
      {data.education && data.education.length > 0 && (
        <section className="mb-8">
          <h3 className="text-2xl font-bold mb-4 text-center pb-2 border-b-4 inline-block w-full" style={{ color: accentColor, borderColor: accentColor }}>
            FORMATION
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {data.education.map((edu, idx) => (
              <div key={idx} className="text-center p-4 rounded-xl" style={{ backgroundColor: `${accentColor}15` }}>
                <h4 className="font-bold mb-1">{edu.degree}</h4>
                <p className="text-gray-600 text-sm">{edu.school}</p>
                <p className="text-xs font-semibold mt-2" style={{ color: accentColor }}>{edu.period || edu.year}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-8">
        {/* Compétences */}
        {data.skills && data.skills.length > 0 && (
          <section>
            <h3 className="text-xl font-bold mb-3 text-center" style={{ color: accentColor }}>
              COMPÉTENCES
            </h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {data.skills.map((skill, idx) => (
                <span key={idx} className="px-3 py-1 rounded-full text-sm font-medium border-2" style={{ borderColor: accentColor, color: accentColor }}>
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Langues */}
        {data.languages && data.languages.length > 0 && (
          <section>
            <h3 className="text-xl font-bold mb-3 text-center" style={{ color: accentColor }}>
              LANGUES
            </h3>
            <div className="space-y-2">
              {data.languages.map((lang, idx) => {
                const name = typeof lang === 'string' ? lang : (lang.name || lang.language);
                const level = typeof lang === 'object' ? lang.level : '';
                return (
                  <div key={idx} className="text-center p-2 rounded-lg" style={{ backgroundColor: `${accentColor}15` }}>
                    <span className="font-medium block">{name}</span>
                    {level && <span className="text-xs" style={{ color: accentColor }}>{level}</span>}
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CVTemplate19;
