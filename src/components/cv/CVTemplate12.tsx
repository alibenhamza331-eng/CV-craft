import type { CVTemplateProps } from '@/types/cv';

const CVTemplate12 = ({ data, accentColor = '#10B981' }: CVTemplateProps) => {
  return (
    <div className="w-[210mm] min-h-[297mm] bg-gray-50 text-gray-900 font-sans" style={{ pageBreakAfter: 'always' }}>
      {/* Header minimaliste */}
      <div className="bg-white px-12 py-8 border-b-4" style={{ borderColor: accentColor }}>
        <div className="flex items-center gap-6">
          {data.photo && (
            <img src={data.photo} alt={data.name} className="w-24 h-24 rounded-lg object-cover shadow-lg" />
          )}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-1" style={{ color: accentColor }}>{data.name}</h1>
            <h2 className="text-xl text-gray-600 mb-2">{data.title}</h2>
            <div className="flex gap-4 text-sm text-gray-500">
              <span>{data.email}</span>
              <span>|</span>
              <span>{data.phone}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-12 py-8 space-y-8">
        {/* À propos */}
        {data.summary && (
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-3 uppercase tracking-wide" style={{ color: accentColor }}>
              À propos
            </h3>
            <p className="text-gray-700 leading-relaxed">{data.summary}</p>
          </section>
        )}

        {/* Expérience */}
        {data.experience && data.experience.length > 0 && (
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-4 uppercase tracking-wide" style={{ color: accentColor }}>
              Parcours professionnel
            </h3>
            <div className="space-y-4">
              {data.experience.map((exp, idx) => (
                <div key={idx} className="border-l-4 pl-4" style={{ borderColor: accentColor }}>
                  <h4 className="font-bold text-lg">{exp.position || exp.title}</h4>
                  <p className="text-gray-600">{exp.company} • {exp.period}</p>
                  <p className="text-gray-700 mt-1 text-sm">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-8">
          {/* Formation */}
          {data.education && data.education.length > 0 && (
            <section className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 uppercase tracking-wide" style={{ color: accentColor }}>
                Formation
              </h3>
              <div className="space-y-3">
                {data.education.map((edu, idx) => (
                  <div key={idx}>
                    <h4 className="font-bold">{edu.degree}</h4>
                    <p className="text-gray-600 text-sm">{edu.school}</p>
                    <p className="text-gray-500 text-xs">{edu.period || edu.year}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Compétences */}
          {data.skills && data.skills.length > 0 && (
            <section className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 uppercase tracking-wide" style={{ color: accentColor }}>
                Compétences
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 bg-gray-100 rounded text-sm font-medium" style={{ color: accentColor }}>
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Langues */}
        {data.languages && data.languages.length > 0 && (
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-3 uppercase tracking-wide" style={{ color: accentColor }}>
              Langues
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {data.languages.map((lang, idx) => {
                const name = typeof lang === 'string' ? lang : (lang.name || lang.language);
                const level = typeof lang === 'object' ? lang.level : '';
                return (
                  <div key={idx} className="text-center p-2 bg-gray-50 rounded">
                    <p className="font-medium">{name}</p>
                    {level && <p className="text-xs text-gray-500">{level}</p>}
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

export default CVTemplate12;
