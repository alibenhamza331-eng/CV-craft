import type { CVData } from '@/types/cv';

interface CVTemplate4Props {
  data: CVData;
  accentColor?: string;
}

const CVTemplate4 = ({ data, accentColor = '#3B82F6' }: CVTemplate4Props) => {
  return (
    <div className="w-[210mm] min-h-[297mm] bg-white text-gray-900 font-sans shadow-lg">
      <div className="grid grid-cols-3 h-full">
        <div className="col-span-1 p-8" style={{ backgroundColor: accentColor }}>
          {data.photo && (
            <div className="mb-6">
              <img src={data.photo} alt={data.name} className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white" />
            </div>
          )}
          
          <div className="mb-8 text-white">
            <h2 className="text-xl font-bold mb-4 uppercase tracking-wide">Contact</h2>
            <div className="space-y-2 text-sm">
              <p className="break-words">{data.email}</p>
              <p>{data.phone}</p>
            </div>
          </div>

          {data.skills && data.skills.length > 0 && (
            <div className="mb-8 text-white">
              <h2 className="text-xl font-bold mb-4 uppercase tracking-wide">Compétences</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span key={index} className="bg-white/20 px-3 py-1 rounded-full text-xs backdrop-blur-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {data.languages && data.languages.length > 0 && (
            <div className="text-white">
              <h2 className="text-xl font-bold mb-4 uppercase tracking-wide">Langues</h2>
              <ul className="space-y-2 text-sm">
                {Array.isArray(data.languages) && data.languages.map((lang, index) => (
                  <li key={index}>
                    {typeof lang === 'string' ? lang : `${lang.name || lang.language} - ${lang.level}`}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="col-span-2 p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2" style={{ color: accentColor }}>{data.name}</h1>
            <p className="text-xl text-gray-600 mb-4">{data.title}</p>
            {data.summary && <p className="text-sm text-gray-700 leading-relaxed">{data.summary}</p>}
          </div>

          {data.experience && data.experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide" style={{ color: accentColor }}>Expérience</h2>
              {data.experience.map((exp, index) => (
                <div key={index} className="mb-6 pb-6 border-b border-gray-200 last:border-0">
                  <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold">{exp.position || exp.title}</h3>
                    <p className="font-semibold" style={{ color: accentColor }}>{exp.company}</p>
                  </div>
                    <span className="text-sm text-gray-500">{exp.period}</span>
                  </div>
                  <p className="text-sm text-gray-700">{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {data.education && data.education.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide" style={{ color: accentColor }}>Formation</h2>
              {data.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold">{edu.degree}</h3>
                      <p className="font-semibold" style={{ color: accentColor }}>{edu.school}</p>
                    </div>
                    <span className="text-sm text-gray-500">{edu.period || edu.year}</span>
                  </div>
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

export default CVTemplate4;