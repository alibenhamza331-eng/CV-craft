import type { CVTemplateProps } from '@/types/cv';

const CVTemplate15 = ({ data, accentColor = '#8B5CF6' }: CVTemplateProps) => {
  return (
    <div className="w-[210mm] min-h-[297mm] bg-gradient-to-br from-white to-gray-100 text-gray-900 font-sans p-8" style={{ pageBreakAfter: 'always' }}>
      {/* Header moderne avec effet */}
      <div className="mb-8 relative overflow-hidden rounded-2xl p-8 text-white shadow-2xl" style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)` }}>
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20" style={{ backgroundColor: 'white', transform: 'translate(30%, -30%)' }}></div>
        <div className="relative z-10 flex items-center gap-6">
          {data.photo && (
            <img src={data.photo} alt={data.name} className="w-28 h-28 rounded-2xl object-cover shadow-xl border-4 border-white/30" />
          )}
          <div>
            <h1 className="text-4xl font-bold mb-1">{data.name}</h1>
            <h2 className="text-xl opacity-90 mb-3">{data.title}</h2>
            <div className="flex gap-4 text-sm opacity-80">
              <span>{data.email}</span>
              <span>•</span>
              <span>{data.phone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Résumé */}
      {data.summary && (
        <section className="mb-6 p-6 bg-white rounded-xl shadow-md">
          <h3 className="text-lg font-bold mb-3 uppercase tracking-wider" style={{ color: accentColor }}>
            À propos
          </h3>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </section>
      )}

      {/* Expérience */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-bold mb-4 uppercase tracking-wider" style={{ color: accentColor }}>
            Expérience
          </h3>
          <div className="space-y-4">
            {data.experience.map((exp, idx) => (
              <div key={idx} className="p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-lg">{exp.position || exp.title}</h4>
                    <p className="font-semibold" style={{ color: accentColor }}>{exp.company}</p>
                  </div>
                  <span className="text-sm font-medium px-3 py-1 rounded-lg bg-gray-100 text-gray-600">
                    {exp.period}
                  </span>
                </div>
                <p className="text-gray-700 text-sm">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-6">
        {/* Formation */}
        {data.education && data.education.length > 0 && (
          <section>
            <h3 className="text-lg font-bold mb-4 uppercase tracking-wider" style={{ color: accentColor }}>
              Formation
            </h3>
            <div className="space-y-3">
              {data.education.map((edu, idx) => (
                <div key={idx} className="p-4 bg-white rounded-xl shadow-md">
                  <h4 className="font-bold">{edu.degree}</h4>
                  <p className="text-gray-600 text-sm">{edu.school}</p>
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
              <h3 className="text-lg font-bold mb-3 uppercase tracking-wider" style={{ color: accentColor }}>
                Compétences
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-lg text-sm font-medium text-white shadow-sm" style={{ backgroundColor: accentColor }}>
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Langues */}
          {data.languages && data.languages.length > 0 && (
            <section>
              <h3 className="text-lg font-bold mb-3 uppercase tracking-wider" style={{ color: accentColor }}>
                Langues
              </h3>
              <ul className="space-y-2">
                {data.languages.map((lang, idx) => {
                  const name = typeof lang === 'string' ? lang : (lang.name || lang.language);
                  const level = typeof lang === 'object' ? lang.level : '';
                  return (
                    <li key={idx} className="flex justify-between p-2 bg-white rounded-lg shadow-sm">
                      <span className="font-medium">{name}</span>
                      {level && <span className="text-sm text-gray-500">{level}</span>}
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

export default CVTemplate15;
