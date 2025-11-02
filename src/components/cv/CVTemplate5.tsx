import type { CVData } from '@/types/cv';

interface CVTemplate5Props {
  data: CVData;
  accentColor?: string;
}

const CVTemplate5 = ({ data, accentColor = '#10B981' }: CVTemplate5Props) => {
  return (
    <div className="w-[210mm] min-h-[297mm] bg-white text-gray-900 font-sans shadow-lg p-12">
      <div className="border-4 p-8 h-full" style={{ borderColor: accentColor }}>
        <div className="text-center mb-8">
          {data.photo && (
            <img src={data.photo} alt={data.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
          )}
          <h1 className="text-4xl font-bold mb-2" style={{ color: accentColor }}>{data.name}</h1>
          <p className="text-xl text-gray-600 mb-3">{data.title}</p>
          <div className="flex justify-center gap-4 text-sm text-gray-600">
            <span>{data.email}</span>
            <span>•</span>
            <span>{data.phone}</span>
          </div>
        </div>

        {data.summary && (
          <div className="mb-8 text-center">
            <p className="text-sm text-gray-700 leading-relaxed max-w-3xl mx-auto">{data.summary}</p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 space-y-6">
            {data.experience && data.experience.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4 pb-2 border-b-2" style={{ borderColor: accentColor, color: accentColor }}>
                  EXPÉRIENCE PROFESSIONNELLE
                </h2>
                {data.experience.map((exp, index) => (
                  <div key={index} className="mb-5">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-base">{exp.position || exp.title}</h3>
                    <span className="text-xs text-gray-500">{exp.period}</span>
                  </div>
                    <p className="text-sm font-semibold mb-1" style={{ color: accentColor }}>{exp.company}</p>
                    <p className="text-sm text-gray-700">{exp.description}</p>
                  </div>
                ))}
              </div>
            )}

            {data.education && data.education.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4 pb-2 border-b-2" style={{ borderColor: accentColor, color: accentColor }}>
                  FORMATION
                </h2>
                {data.education.map((edu, index) => (
                  <div key={index} className="mb-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-base">{edu.degree}</h3>
                    <span className="text-xs text-gray-500">{edu.period || edu.year}</span>
                  </div>
                  <p className="text-sm font-semibold" style={{ color: accentColor }}>{edu.school}</p>
                  {edu.description && <p className="text-sm text-gray-700 mt-1">{edu.description}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            {data.skills && data.skills.length > 0 && (
              <div>
                <h2 className="text-lg font-bold mb-3 pb-2 border-b-2" style={{ borderColor: accentColor, color: accentColor }}>
                  COMPÉTENCES
                </h2>
                <div className="space-y-2">
                  {data.skills.map((skill, index) => (
                    <div key={index} className="text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></div>
                        <span>{skill}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.languages && data.languages.length > 0 && (
              <div>
                <h2 className="text-lg font-bold mb-3 pb-2 border-b-2" style={{ borderColor: accentColor, color: accentColor }}>
                  LANGUES
                </h2>
                <ul className="space-y-2 text-sm">
                  {Array.isArray(data.languages) && data.languages.map((lang, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-xs mt-1" style={{ color: accentColor }}>▸</span>
                      <span>{typeof lang === 'string' ? lang : `${lang.name || lang.language} - ${lang.level}`}</span>
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

export default CVTemplate5;