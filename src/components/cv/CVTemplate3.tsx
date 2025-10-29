import React from 'react';
import type { CVTemplateProps } from '@/types/cv';

const CVTemplate3: React.FC<CVTemplateProps> = ({ data, accentColor = '#8B5CF6' }) => {
  return (
    <div className="bg-white w-[210mm] h-[297mm] shadow-lg mx-auto" id="cv-content">
      <div className="h-48 p-8 flex items-center gap-6 text-white" style={{ backgroundColor: accentColor }}>
        {data.photo && (
          <img 
            src={data.photo} 
            alt="Photo" 
            className="w-32 h-32 rounded-full object-cover border-4 border-white"
          />
        )}
        <div>
          <h1 className="text-4xl font-bold mb-2">{data.name}</h1>
          <p className="text-xl mb-3">{data.title}</p>
          <div className="text-sm space-x-4">
            <span>{data.email}</span>
            <span>•</span>
            <span>{data.phone}</span>
          </div>
        </div>
      </div>

      <div className="p-12">
        {data.summary && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border-l-4" style={{ borderColor: accentColor }}>
            <p className="text-gray-700 text-sm leading-relaxed italic">{data.summary}</p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            {data.experience?.length > 0 && (
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-2 h-8 rounded" style={{ backgroundColor: accentColor }}></span>
                  Expérience Professionnelle
                </h2>
                {data.experience.map((exp, idx) => (
                  <div key={idx} className="mb-4 pl-4">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-gray-900">{exp.title}</h3>
                      <span className="text-sm text-gray-600">{exp.period}</span>
                    </div>
                    <p className="text-gray-700 font-medium mb-1">{exp.company}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            )}

            {data.education?.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-2 h-8 rounded" style={{ backgroundColor: accentColor }}></span>
                  Formation
                </h2>
                {data.education.map((edu, idx) => (
                  <div key={idx} className="mb-3 pl-4">
                    <h3 className="font-bold text-gray-900 text-sm">{edu.degree}</h3>
                    <p className="text-sm text-gray-700">{edu.school}</p>
                    <p className="text-sm text-gray-600">{edu.year}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            {data.skills?.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-3" style={{ color: accentColor }}>
                  Compétences
                </h2>
                <div className="space-y-2">
                  {data.skills.map((skill, idx) => (
                    <div key={idx} className="text-sm bg-gray-50 px-3 py-2 rounded">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.languages?.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-3" style={{ color: accentColor }}>
                  Langues
                </h2>
                {data.languages.map((lang, idx) => (
                  <div key={idx} className="mb-2">
                    <p className="font-medium text-sm text-gray-900">{lang.language}</p>
                    <p className="text-xs text-gray-600">{lang.level}</p>
                  </div>
                ))}
              </div>
            )}

            {data.interests?.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-3" style={{ color: accentColor }}>
                  Centres d'intérêt
                </h2>
                <ul className="text-sm text-gray-700 space-y-1">
                  {data.interests.map((interest, idx) => (
                    <li key={idx}>• {interest}</li>
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

export default CVTemplate3;
