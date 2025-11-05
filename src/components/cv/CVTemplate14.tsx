import type { CVTemplateProps } from '@/types/cv';

const CVTemplate14 = ({ data, accentColor = '#F59E0B' }: CVTemplateProps) => {
  return (
    <div className="w-[210mm] min-h-[297mm] bg-white text-gray-900 font-sans" style={{ pageBreakAfter: 'always' }}>
      {/* Header horizontal avec photo */}
      <div className="flex items-center gap-6 p-8 border-b-8" style={{ borderColor: accentColor }}>
        {data.photo && (
          <img src={data.photo} alt={data.name} className="w-32 h-32 rounded-full object-cover shadow-lg border-4" style={{ borderColor: accentColor }} />
        )}
        <div className="flex-1">
          <h1 className="text-5xl font-bold mb-2" style={{ color: accentColor }}>{data.name}</h1>
          <h2 className="text-2xl text-gray-600 mb-3">{data.title}</h2>
          <div className="flex gap-6 text-sm text-gray-600">
            <span>📧 {data.email}</span>
            <span>📱 {data.phone}</span>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-6">
        {/* Résumé avec fond */}
        {data.summary && (
          <section className="p-6 rounded-lg" style={{ backgroundColor: `${accentColor}15` }}>
            <p className="text-gray-800 leading-relaxed text-center italic">{data.summary}</p>
          </section>
        )}

        {/* Expérience */}
        {data.experience && data.experience.length > 0 && (
          <section>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3" style={{ color: accentColor }}>
              <span className="w-2 h-8 rounded" style={{ backgroundColor: accentColor }}></span>
              EXPÉRIENCE PROFESSIONNELLE
            </h3>
            <div className="space-y-4">
              {data.experience.map((exp, idx) => (
                <div key={idx} className="p-4 border-l-4 bg-gray-50 rounded-r-lg" style={{ borderColor: accentColor }}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-lg">{exp.position || exp.title}</h4>
                      <p className="text-gray-600 font-semibold">{exp.company}</p>
                    </div>
                    <span className="text-sm font-medium px-3 py-1 rounded-full text-white" style={{ backgroundColor: accentColor }}>
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-gray-700">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Formation */}
        {data.education && data.education.length > 0 && (
          <section>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3" style={{ color: accentColor }}>
              <span className="w-2 h-8 rounded" style={{ backgroundColor: accentColor }}></span>
              FORMATION
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {data.education.map((edu, idx) => (
                <div key={idx} className="p-4 border-2 rounded-lg" style={{ borderColor: `${accentColor}50` }}>
                  <h4 className="font-bold mb-1">{edu.degree}</h4>
                  <p className="text-gray-600 text-sm">{edu.school}</p>
                  <p className="text-xs font-medium mt-2" style={{ color: accentColor }}>{edu.period || edu.year}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-6">
          {/* Compétences */}
          {data.skills && data.skills.length > 0 && (
            <section>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ color: accentColor }}>
                <span className="w-2 h-6 rounded" style={{ backgroundColor: accentColor }}></span>
                COMPÉTENCES
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 border-2 rounded-full text-sm font-medium" style={{ borderColor: accentColor, color: accentColor }}>
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Langues */}
          {data.languages && data.languages.length > 0 && (
            <section>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ color: accentColor }}>
                <span className="w-2 h-6 rounded" style={{ backgroundColor: accentColor }}></span>
                LANGUES
              </h3>
              <ul className="space-y-2">
                {data.languages.map((lang, idx) => {
                  const name = typeof lang === 'string' ? lang : (lang.name || lang.language);
                  const level = typeof lang === 'object' ? lang.level : '';
                  return (
                    <li key={idx} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="font-medium">{name}</span>
                      {level && <span className="text-sm px-2 py-1 rounded" style={{ backgroundColor: `${accentColor}30`, color: accentColor }}>{level}</span>}
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

export default CVTemplate14;
