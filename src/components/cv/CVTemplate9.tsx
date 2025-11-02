import type { CVData } from '@/types/cv';

interface CVTemplate9Props {
  data: CVData;
  accentColor?: string;
}

const CVTemplate9 = ({ data, accentColor = '#06B6D4' }: CVTemplate9Props) => {
  return (
    <div className="w-[210mm] min-h-[297mm] bg-white text-gray-900 font-sans shadow-lg">
      <div className="h-32 relative overflow-hidden" style={{ backgroundColor: accentColor }}>
        <div className="absolute inset-0 opacity-20" style={{ 
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.1) 10px, rgba(255,255,255,.1) 20px)'
        }}></div>
      </div>

      <div className="px-10 -mt-16 relative z-10">
        <div className="flex items-end gap-6 mb-8">
          {data.photo && (
            <img src={data.photo} alt={data.name} className="w-32 h-32 rounded-2xl object-cover shadow-xl ring-4 ring-white" />
          )}
          <div className="flex-1 pb-2">
            <h1 className="text-4xl font-bold text-white mb-1 drop-shadow-lg">{data.name}</h1>
            <p className="text-xl text-white/90 drop-shadow">{data.title}</p>
          </div>
        </div>

        <div className="flex gap-6 mb-8 text-sm text-gray-600">
          <span className="flex items-center gap-2">
            📧 {data.email}
          </span>
          <span className="flex items-center gap-2">
            📞 {data.phone}
          </span>
        </div>

        {data.summary && (
          <div className="mb-8 p-5 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-700 leading-relaxed">{data.summary}</p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 space-y-8">
            {data.experience && data.experience.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-5 flex items-center gap-3">
                  <span className="w-2 h-8 rounded-full" style={{ backgroundColor: accentColor }}></span>
                  Expérience Professionnelle
                </h2>
                {data.experience.map((exp, index) => (
                  <div key={index} className="mb-6 relative pl-8 before:absolute before:left-0 before:top-2 before:w-4 before:h-4 before:rounded-full before:border-4" style={{ 
                    borderColor: accentColor,
                    '--tw-border-opacity': 0.3
                  } as any}>
                    <div className="mb-2">
                      <h3 className="font-bold text-lg">{exp.position || exp.title}</h3>
                      <div className="flex justify-between items-center">
                        <p className="font-semibold" style={{ color: accentColor }}>{exp.company}</p>
                        <span className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
                          {exp.period}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">{exp.description}</p>
                  </div>
                ))}
              </div>
            )}

            {data.education && data.education.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-5 flex items-center gap-3">
                  <span className="w-2 h-8 rounded-full" style={{ backgroundColor: accentColor }}></span>
                  Formation
                </h2>
                {data.education.map((edu, index) => (
                <div key={index} className="mb-5 pl-8 relative before:absolute before:left-0 before:top-2 before:w-4 before:h-4 before:rounded-full before:border-4" style={{ borderColor: accentColor }}>
                  <div className="mb-1">
                    <h3 className="font-bold text-base">{edu.degree}</h3>
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-sm" style={{ color: accentColor }}>{edu.school}</p>
                      <span className="text-xs text-gray-500">{edu.period || edu.year}</span>
                    </div>
                  </div>
                  {edu.description && <p className="text-sm text-gray-700">{edu.description}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-8">
            {data.skills && data.skills.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-6 rounded-full" style={{ backgroundColor: accentColor }}></span>
                  Compétences
                </h2>
                <div className="space-y-3">
                  {data.skills.map((skill, index) => (
                    <div key={index} className="group">
                      <p className="text-sm mb-1">{skill}</p>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-300 group-hover:w-full" style={{ backgroundColor: accentColor, width: '80%' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.languages && data.languages.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-6 rounded-full" style={{ backgroundColor: accentColor }}></span>
                  Langues
                </h2>
                <ul className="space-y-2">
                  {Array.isArray(data.languages) && data.languages.map((lang, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
                      {typeof lang === 'string' ? lang : `${lang.name || lang.language} - ${lang.level}`}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVTemplate9;