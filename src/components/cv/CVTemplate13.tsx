import type { CVTemplateProps } from '@/types/cv';

const CVTemplate13 = ({ data, accentColor = '#EC4899' }: CVTemplateProps) => {
  return (
    <div className="w-[210mm] min-h-[297mm] bg-white text-gray-900 font-sans grid grid-cols-[35%_65%]" style={{ pageBreakAfter: 'always' }}>
      {/* Sidebar gauche */}
      <div className="p-8 text-white" style={{ backgroundColor: accentColor }}>
        {data.photo && (
          <img src={data.photo} alt={data.name} className="w-full aspect-square rounded-lg object-cover mb-6 shadow-xl" />
        )}
        
        <div className="mb-6">
          <h3 className="text-sm font-bold mb-2 uppercase tracking-wider opacity-80">Contact</h3>
          <div className="space-y-2 text-sm">
            <p className="break-words">{data.email}</p>
            <p>{data.phone}</p>
          </div>
        </div>

        {data.skills && data.skills.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-bold mb-3 uppercase tracking-wider opacity-80">Compétences</h3>
            <div className="space-y-2">
              {data.skills.map((skill, idx) => (
                <div key={idx} className="bg-white/20 px-3 py-1 rounded text-sm">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}

        {data.languages && data.languages.length > 0 && (
          <div>
            <h3 className="text-sm font-bold mb-3 uppercase tracking-wider opacity-80">Langues</h3>
            <ul className="space-y-2 text-sm">
              {data.languages.map((lang, idx) => {
                const name = typeof lang === 'string' ? lang : (lang.name || lang.language);
                const level = typeof lang === 'object' ? lang.level : '';
                return (
                  <li key={idx}>
                    <span className="font-medium">{name}</span>
                    {level && <span className="block text-xs opacity-75">{level}</span>}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      {/* Contenu principal */}
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-1">{data.name}</h1>
          <h2 className="text-2xl mb-4" style={{ color: accentColor }}>{data.title}</h2>
          {data.summary && (
            <p className="text-gray-600 leading-relaxed">{data.summary}</p>
          )}
        </div>

        {data.experience && data.experience.length > 0 && (
          <section className="mb-8">
            <h3 className="text-xl font-bold mb-4 pb-2 border-b-2" style={{ borderColor: accentColor }}>
              EXPÉRIENCE
            </h3>
            <div className="space-y-5">
              {data.experience.map((exp, idx) => (
                <div key={idx}>
                  <h4 className="font-bold text-lg">{exp.position || exp.title}</h4>
                  <p className="font-semibold" style={{ color: accentColor }}>{exp.company}</p>
                  <p className="text-sm text-gray-500 mb-2">{exp.period}</p>
                  <p className="text-gray-700 text-sm">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.education && data.education.length > 0 && (
          <section>
            <h3 className="text-xl font-bold mb-4 pb-2 border-b-2" style={{ borderColor: accentColor }}>
              FORMATION
            </h3>
            <div className="space-y-4">
              {data.education.map((edu, idx) => (
                <div key={idx}>
                  <h4 className="font-bold">{edu.degree}</h4>
                  <p className="text-gray-600">{edu.school}</p>
                  <p className="text-sm text-gray-500">{edu.period || edu.year}</p>
                  {edu.description && <p className="text-sm text-gray-700 mt-1">{edu.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CVTemplate13;
