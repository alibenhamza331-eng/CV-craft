import type { CVData } from '@/types/cv';

interface CVTemplate10Props {
  data: CVData;
  accentColor?: string;
}

const CVTemplate10 = ({ data, accentColor = '#6366F1' }: CVTemplate10Props) => {
  return (
    <div className="w-[210mm] min-h-[297mm] bg-white text-gray-900 font-sans shadow-lg p-12">
      <div className="flex gap-8 mb-8">
        <div className="flex-1">
          <h1 className="text-6xl font-black mb-2 leading-tight">{data.name}</h1>
          <p className="text-2xl font-light mb-4" style={{ color: accentColor }}>{data.title}</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <span className="px-4 py-2 bg-gray-100 rounded-lg">{data.email}</span>
            <span className="px-4 py-2 bg-gray-100 rounded-lg">{data.phone}</span>
          </div>
        </div>
        {data.photo && (
          <img src={data.photo} alt={data.name} className="w-36 h-36 rounded-3xl object-cover shadow-2xl transform rotate-3" />
        )}
      </div>

      <div className="h-1 mb-8 rounded-full" style={{ background: `linear-gradient(90deg, ${accentColor} 0%, transparent 100%)` }}></div>

      {data.summary && (
        <div className="mb-8 p-6 rounded-2xl" style={{ backgroundColor: `${accentColor}10` }}>
          <p className="text-sm text-gray-700 leading-relaxed">{data.summary}</p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-8">
          {data.experience && data.experience.length > 0 && (
            <div>
              <h2 className="text-2xl font-black mb-6 uppercase tracking-tight" style={{ color: accentColor }}>
                Parcours Professionnel
              </h2>
              {data.experience.map((exp, index) => (
                <div key={index} className="mb-6 p-5 rounded-xl hover:shadow-lg transition-shadow bg-gradient-to-br from-gray-50 to-white">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-black text-lg">{exp.position || exp.title}</h3>
                      <p className="font-bold text-sm" style={{ color: accentColor }}>{exp.company}</p>
                    </div>
                    <span className="text-xs font-bold px-3 py-1.5 rounded-full text-white" style={{ backgroundColor: accentColor }}>
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {data.education && data.education.length > 0 && (
            <div>
              <h2 className="text-2xl font-black mb-6 uppercase tracking-tight" style={{ color: accentColor }}>
                Formation Académique
              </h2>
              {data.education.map((edu, index) => (
                <div key={index} className="mb-5 p-5 rounded-xl bg-gradient-to-br from-gray-50 to-white">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-black text-base">{edu.degree}</h3>
                      <p className="font-bold text-sm" style={{ color: accentColor }}>{edu.school}</p>
                    </div>
                    <span className="text-xs text-gray-500 font-semibold">{edu.period || edu.year}</span>
                  </div>
                  {edu.description && <p className="text-sm text-gray-700 mt-2">{edu.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-8">
          {data.skills && data.skills.length > 0 && (
            <div>
              <h2 className="text-xl font-black mb-4 uppercase tracking-tight" style={{ color: accentColor }}>
                Expertise
              </h2>
              <div className="flex flex-col gap-2">
                {data.skills.map((skill, index) => (
                  <div 
                    key={index} 
                    className="px-4 py-2.5 rounded-xl font-semibold text-sm text-center transform hover:scale-105 transition-transform"
                    style={{ 
                      background: `linear-gradient(135deg, ${accentColor}20, ${accentColor}10)`,
                      borderLeft: `4px solid ${accentColor}`
                    }}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.languages && data.languages.length > 0 && (
            <div>
              <h2 className="text-xl font-black mb-4 uppercase tracking-tight" style={{ color: accentColor }}>
                Langues
              </h2>
                <ul className="space-y-3">
                {Array.isArray(data.languages) && data.languages.map((lang, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm font-semibold">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: accentColor }}></div>
                    {typeof lang === 'string' ? lang : `${lang.name || lang.language} - ${lang.level}`}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CVTemplate10;