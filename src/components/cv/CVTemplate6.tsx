import type { CVData } from '@/types/cv';

interface CVTemplate6Props {
  data: CVData;
  accentColor?: string;
}

const CVTemplate6 = ({ data, accentColor = '#EF4444' }: CVTemplate6Props) => {
  return (
    <div className="w-[210mm] min-h-[297mm] bg-gray-50 text-gray-900 font-sans shadow-lg">
      <div className="h-3" style={{ backgroundColor: accentColor }}></div>
      
      <div className="p-10">
        <div className="flex items-start gap-6 mb-8">
          {data.photo && (
            <img src={data.photo} alt={data.name} className="w-28 h-28 rounded-lg object-cover shadow-md" />
          )}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-1">{data.name}</h1>
            <p className="text-xl mb-3" style={{ color: accentColor }}>{data.title}</p>
            <div className="flex gap-4 text-sm text-gray-600">
              <span>{data.email}</span>
              <span>|</span>
              <span>{data.phone}</span>
            </div>
          </div>
        </div>

        {data.summary && (
          <div className="mb-8 bg-white p-5 rounded-lg shadow-sm">
            <h2 className="text-lg font-bold mb-3 uppercase" style={{ color: accentColor }}>Profil</h2>
            <p className="text-sm text-gray-700 leading-relaxed">{data.summary}</p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            {data.experience && data.experience.length > 0 && (
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h2 className="text-lg font-bold mb-4 uppercase" style={{ color: accentColor }}>Expérience</h2>
                {data.experience.map((exp, index) => (
                  <div key={index} className="mb-5 last:mb-0 pb-5 last:pb-0 border-b last:border-0 border-gray-200">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-base">{exp.position || exp.title}</h3>
                        <p className="font-semibold text-sm" style={{ color: accentColor }}>{exp.company}</p>
                      </div>
                      <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600">{exp.period}</span>
                    </div>
                    <p className="text-sm text-gray-700">{exp.description}</p>
                  </div>
                ))}
              </div>
            )}

            {data.education && data.education.length > 0 && (
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h2 className="text-lg font-bold mb-4 uppercase" style={{ color: accentColor }}>Formation</h2>
                {data.education.map((edu, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-bold text-base">{edu.degree}</h3>
                      <p className="font-semibold text-sm" style={{ color: accentColor }}>{edu.school}</p>
                    </div>
                    <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600">{edu.period || edu.year}</span>
                  </div>
                  {edu.description && <p className="text-sm text-gray-700">{edu.description}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            {data.skills && data.skills.length > 0 && (
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h2 className="text-base font-bold mb-3 uppercase" style={{ color: accentColor }}>Compétences</h2>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 rounded-full text-xs text-white font-medium"
                      style={{ backgroundColor: accentColor }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {data.languages && data.languages.length > 0 && (
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h2 className="text-base font-bold mb-3 uppercase" style={{ color: accentColor }}>Langues</h2>
                <ul className="space-y-2 text-sm">
                  {Array.isArray(data.languages) && data.languages.map((lang, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }}></div>
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

export default CVTemplate6;