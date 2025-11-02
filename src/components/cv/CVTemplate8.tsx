import type { CVData } from '@/types/cv';

interface CVTemplate8Props {
  data: CVData;
  accentColor?: string;
}

const CVTemplate8 = ({ data, accentColor = '#EC4899' }: CVTemplate8Props) => {
  return (
    <div className="w-[210mm] min-h-[297mm] bg-gradient-to-br from-gray-50 to-white text-gray-900 font-sans shadow-lg p-10">
      <div className="mb-8 text-center">
        {data.photo && (
          <div className="w-28 h-28 rounded-full mx-auto mb-4 ring-4 ring-offset-4" style={{ borderColor: accentColor }}>
            <img src={data.photo} alt={data.name} className="w-full h-full rounded-full object-cover" />
          </div>
        )}
        <h1 className="text-5xl font-bold mb-2">{data.name}</h1>
        <div className="inline-block px-6 py-2 rounded-full text-white text-lg font-semibold mb-3" style={{ backgroundColor: accentColor }}>
          {data.title}
        </div>
        <div className="flex justify-center gap-6 text-sm text-gray-600">
          <span>{data.email}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 self-center"></span>
          <span>{data.phone}</span>
        </div>
      </div>

      {data.summary && (
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <p className="text-sm text-gray-700 leading-relaxed italic">{data.summary}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-6">
          {data.experience && data.experience.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold" style={{ backgroundColor: accentColor }}>
                  💼
                </div>
                <h2 className="text-xl font-bold uppercase">Expérience</h2>
              </div>
              {data.experience.map((exp, index) => (
                <div key={index} className="mb-5 pl-4 border-l-2 border-gray-200">
                  <div className="mb-1">
                    <h3 className="font-bold text-base">{exp.position || exp.title}</h3>
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-semibold" style={{ color: accentColor }}>{exp.company}</p>
                      <span className="text-xs text-gray-500">{exp.period}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {data.education && data.education.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold" style={{ backgroundColor: accentColor }}>
                  🎓
                </div>
                <h2 className="text-xl font-bold uppercase">Formation</h2>
              </div>
              {data.education.map((edu, index) => (
                <div key={index} className="mb-4 pl-4 border-l-2 border-gray-200">
                  <div className="mb-1">
                    <h3 className="font-bold text-base">{edu.degree}</h3>
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-semibold" style={{ color: accentColor }}>{edu.school}</p>
                      <span className="text-xs text-gray-500">{edu.period || edu.year}</span>
                    </div>
                  </div>
                  {edu.description && <p className="text-sm text-gray-700">{edu.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          {data.skills && data.skills.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold" style={{ backgroundColor: accentColor }}>
                  ⚡
                </div>
                <h2 className="text-xl font-bold uppercase">Compétences</h2>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {data.skills.map((skill, index) => (
                  <div key={index} className="px-3 py-2 bg-gray-100 rounded-lg text-sm text-center hover:shadow-md transition-shadow">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.languages && data.languages.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold" style={{ backgroundColor: accentColor }}>
                  🌍
                </div>
                <h2 className="text-xl font-bold uppercase">Langues</h2>
              </div>
              <ul className="space-y-2">
                {Array.isArray(data.languages) && data.languages.map((lang, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></div>
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

export default CVTemplate8;