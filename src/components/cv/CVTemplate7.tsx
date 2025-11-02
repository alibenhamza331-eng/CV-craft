import type { CVData } from '@/types/cv';

interface CVTemplate7Props {
  data: CVData;
  accentColor?: string;
}

const CVTemplate7 = ({ data, accentColor = '#F59E0B' }: CVTemplate7Props) => {
  return (
    <div className="w-[210mm] min-h-[297mm] bg-white text-gray-900 font-sans shadow-lg p-10">
      <div className="flex items-center gap-6 mb-8 pb-6 border-b-4" style={{ borderColor: accentColor }}>
        {data.photo && (
          <img src={data.photo} alt={data.name} className="w-32 h-32 object-cover" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
        )}
        <div className="flex-1">
          <h1 className="text-5xl font-black mb-2" style={{ color: accentColor }}>{data.name}</h1>
          <p className="text-2xl text-gray-700 font-light">{data.title}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-1 space-y-6">
          <div>
            <h2 className="text-sm font-bold mb-3 uppercase tracking-wider" style={{ color: accentColor }}>Contact</h2>
            <div className="space-y-2 text-sm text-gray-700">
              <p className="break-words">{data.email}</p>
              <p>{data.phone}</p>
            </div>
          </div>

          {data.skills && data.skills.length > 0 && (
            <div>
              <h2 className="text-sm font-bold mb-3 uppercase tracking-wider" style={{ color: accentColor }}>Compétences</h2>
              <div className="space-y-2">
                {data.skills.map((skill, index) => (
                  <div key={index} className="text-sm">
                    <p className="mb-1">{skill}</p>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ backgroundColor: accentColor, width: '85%' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.languages && data.languages.length > 0 && (
            <div>
              <h2 className="text-sm font-bold mb-3 uppercase tracking-wider" style={{ color: accentColor }}>Langues</h2>
              <ul className="space-y-1 text-sm text-gray-700">
                {Array.isArray(data.languages) && data.languages.map((lang, index) => (
                  <li key={index}>
                    {typeof lang === 'string' ? lang : `${lang.name || lang.language} - ${lang.level}`}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="col-span-2 space-y-8">
          {data.summary && (
            <div>
              <h2 className="text-lg font-bold mb-3 uppercase tracking-wider" style={{ color: accentColor }}>À propos</h2>
              <p className="text-sm text-gray-700 leading-relaxed">{data.summary}</p>
            </div>
          )}

          {data.experience && data.experience.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-4 uppercase tracking-wider" style={{ color: accentColor }}>Expérience</h2>
              {data.experience.map((exp, index) => (
                <div key={index} className="mb-6 pl-4 border-l-4" style={{ borderColor: accentColor }}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-base">{exp.position || exp.title}</h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-4">{exp.period}</span>
                  </div>
                  <p className="font-semibold text-sm mb-2" style={{ color: accentColor }}>{exp.company}</p>
                  <p className="text-sm text-gray-700">{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {data.education && data.education.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-4 uppercase tracking-wider" style={{ color: accentColor }}>Formation</h2>
              {data.education.map((edu, index) => (
                <div key={index} className="mb-4 pl-4 border-l-4" style={{ borderColor: accentColor }}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-base">{edu.degree}</h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-4">{edu.period || edu.year}</span>
                  </div>
                  <p className="font-semibold text-sm" style={{ color: accentColor }}>{edu.school}</p>
                  {edu.description && <p className="text-sm text-gray-700 mt-1">{edu.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CVTemplate7;