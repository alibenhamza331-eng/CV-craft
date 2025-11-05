import type { CVTemplateProps } from '@/types/cv';

const CVTemplate16 = ({ data, accentColor = '#06B6D4' }: CVTemplateProps) => {
  return (
    <div className="w-[210mm] min-h-[297mm] bg-white text-gray-900 font-sans" style={{ pageBreakAfter: 'always' }}>
      <div className="grid grid-cols-[40%_60%] h-full">
        {/* Sidebar colorée à gauche */}
        <div className="p-8 text-white flex flex-col" style={{ background: `linear-gradient(180deg, ${accentColor}, ${accentColor}dd)` }}>
          {data.photo && (
            <img src={data.photo} alt={data.name} className="w-full aspect-square rounded-xl object-cover mb-6 shadow-2xl" />
          )}
          
          <div className="space-y-6 flex-1">
            <div>
              <h3 className="text-xs font-bold mb-3 uppercase tracking-widest opacity-70">Contact</h3>
              <div className="space-y-2 text-sm">
                <p className="break-words">{data.email}</p>
                <p>{data.phone}</p>
              </div>
            </div>

            {data.skills && data.skills.length > 0 && (
              <div>
                <h3 className="text-xs font-bold mb-3 uppercase tracking-widest opacity-70">Compétences</h3>
                <div className="space-y-2">
                  {data.skills.map((skill, idx) => (
                    <div key={idx} className="bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg text-sm font-medium">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.languages && data.languages.length > 0 && (
              <div>
                <h3 className="text-xs font-bold mb-3 uppercase tracking-widest opacity-70">Langues</h3>
                <ul className="space-y-2 text-sm">
                  {data.languages.map((lang, idx) => {
                    const name = typeof lang === 'string' ? lang : (lang.name || lang.language);
                    const level = typeof lang === 'object' ? lang.level : '';
                    return (
                      <li key={idx} className="bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
                        <span className="font-medium block">{name}</span>
                        {level && <span className="text-xs opacity-75">{level}</span>}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Contenu principal à droite */}
        <div className="p-8 bg-white">
          <div className="mb-8">
            <h1 className="text-5xl font-bold mb-2" style={{ color: accentColor }}>{data.name}</h1>
            <h2 className="text-2xl text-gray-600 mb-4">{data.title}</h2>
            {data.summary && (
              <p className="text-gray-700 leading-relaxed border-l-4 pl-4 italic" style={{ borderColor: accentColor }}>
                {data.summary}
              </p>
            )}
          </div>

          {data.experience && data.experience.length > 0 && (
            <section className="mb-8">
              <h3 className="text-xl font-bold mb-4 uppercase tracking-wide" style={{ color: accentColor }}>
                Expérience
              </h3>
              <div className="space-y-5">
                {data.experience.map((exp, idx) => (
                  <div key={idx} className="relative pl-6">
                    <div className="absolute left-0 top-2 w-3 h-3 rounded-full" style={{ backgroundColor: accentColor }}></div>
                    <div className="absolute left-1.5 top-5 bottom-0 w-px bg-gray-300"></div>
                    <h4 className="font-bold text-lg">{exp.position || exp.title}</h4>
                    <p className="text-gray-600 font-semibold">{exp.company}</p>
                    <p className="text-sm text-gray-500 mb-1">{exp.period}</p>
                    <p className="text-gray-700 text-sm">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.education && data.education.length > 0 && (
            <section>
              <h3 className="text-xl font-bold mb-4 uppercase tracking-wide" style={{ color: accentColor }}>
                Formation
              </h3>
              <div className="space-y-4">
                {data.education.map((edu, idx) => (
                  <div key={idx} className="relative pl-6">
                    <div className="absolute left-0 top-2 w-3 h-3 rounded-full" style={{ backgroundColor: accentColor }}></div>
                    <h4 className="font-bold">{edu.degree}</h4>
                    <p className="text-gray-600">{edu.school}</p>
                    <p className="text-sm text-gray-500">{edu.period || edu.year}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default CVTemplate16;
