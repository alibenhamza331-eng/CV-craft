import type { CVTemplateProps } from '@/types/cv';

const CVTemplate20 = ({ data, accentColor = '#84CC16' }: CVTemplateProps) => {
  return (
    <div className="w-[210mm] min-h-[297mm] bg-gray-50 text-gray-900 font-sans" style={{ pageBreakAfter: 'always' }}>
      {/* Header en biais */}
      <div className="relative h-56 overflow-hidden">
        <div className="absolute inset-0 transform -skew-y-3" style={{ backgroundColor: accentColor }}></div>
        <div className="absolute inset-0 flex items-center justify-between px-12">
          <div className="text-white">
            <h1 className="text-6xl font-bold mb-2">{data.name}</h1>
            <h2 className="text-3xl opacity-90">{data.title}</h2>
          </div>
          {data.photo && (
            <img src={data.photo} alt={data.name} className="w-36 h-36 rounded-full object-cover shadow-2xl border-8 border-white" />
          )}
        </div>
      </div>

      <div className="px-12 py-8 space-y-6">
        {/* Contact en ligne */}
        <div className="flex justify-center gap-8 text-sm font-medium p-4 bg-white rounded-full shadow-md">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
            {data.email}
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
            {data.phone}
          </span>
        </div>

        {/* Résumé */}
        {data.summary && (
          <section className="p-6 bg-white rounded-2xl shadow-md">
            <p className="text-gray-700 leading-relaxed text-center">{data.summary}</p>
          </section>
        )}

        {/* Expérience */}
        {data.experience && data.experience.length > 0 && (
          <section className="p-6 bg-white rounded-2xl shadow-md">
            <h3 className="text-2xl font-bold mb-4 uppercase tracking-wide flex items-center gap-3" style={{ color: accentColor }}>
              <span className="w-3 h-8" style={{ backgroundColor: accentColor }}></span>
              Expérience
            </h3>
            <div className="space-y-4">
              {data.experience.map((exp, idx) => (
                <div key={idx} className="p-4 border-l-8 bg-gray-50 rounded-r-xl" style={{ borderColor: accentColor }}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-lg">{exp.position || exp.title}</h4>
                      <p className="font-semibold" style={{ color: accentColor }}>{exp.company}</p>
                    </div>
                    <span className="text-sm font-medium px-3 py-1 rounded-full bg-white" style={{ color: accentColor }}>
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
            <section className="p-6 bg-white rounded-2xl shadow-md">
              <h3 className="text-xl font-bold mb-4 uppercase tracking-wide flex items-center gap-2" style={{ color: accentColor }}>
                <span className="w-2 h-6" style={{ backgroundColor: accentColor }}></span>
                Formation
              </h3>
              <div className="space-y-3">
                {data.education.map((edu, idx) => (
                  <div key={idx} className="p-3 rounded-xl" style={{ backgroundColor: `${accentColor}15` }}>
                    <h4 className="font-bold">{edu.degree}</h4>
                    <p className="text-gray-600 text-sm">{edu.school}</p>
                    <p className="text-xs font-semibold mt-1" style={{ color: accentColor }}>{edu.period || edu.year}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Compétences */}
          {data.skills && data.skills.length > 0 && (
            <section className="p-6 bg-white rounded-2xl shadow-md">
              <h3 className="text-xl font-bold mb-4 uppercase tracking-wide flex items-center gap-2" style={{ color: accentColor }}>
                <span className="w-2 h-6" style={{ backgroundColor: accentColor }}></span>
                Compétences
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-lg text-sm font-medium text-white" style={{ backgroundColor: accentColor }}>
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Langues */}
        {data.languages && data.languages.length > 0 && (
          <section className="p-6 bg-white rounded-2xl shadow-md">
            <h3 className="text-xl font-bold mb-4 uppercase tracking-wide flex items-center gap-2" style={{ color: accentColor }}>
              <span className="w-2 h-6" style={{ backgroundColor: accentColor }}></span>
              Langues
            </h3>
            <div className="grid grid-cols-4 gap-3">
              {data.languages.map((lang, idx) => {
                const name = typeof lang === 'string' ? lang : (lang.name || lang.language);
                const level = typeof lang === 'object' ? lang.level : '';
                return (
                  <div key={idx} className="text-center p-3 rounded-xl" style={{ backgroundColor: `${accentColor}15` }}>
                    <span className="font-bold block mb-1" style={{ color: accentColor }}>{name}</span>
                    {level && <span className="text-xs text-gray-600">{level}</span>}
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

export default CVTemplate20;
