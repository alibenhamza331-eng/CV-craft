import React from 'react';
import type { CVTemplateProps } from '@/types/cv';

const CVTemplate1: React.FC<CVTemplateProps> = ({ data, accentColor = '#8B5CF6' }) => {
  return (
    <div className="bg-white w-[210mm] h-[297mm] p-12 shadow-lg mx-auto" id="cv-content">
      <div className="flex gap-8 mb-8">
        {data.photo && (
          <img 
            src={data.photo} 
            alt="Photo" 
            className="w-32 h-32 rounded-full object-cover border-4"
            style={{ borderColor: accentColor }}
          />
        )}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2" style={{ color: accentColor }}>
            {data.name}
          </h1>
          <p className="text-xl text-gray-700 mb-2">{data.title}</p>
          <div className="text-sm text-gray-600 space-y-1">
            <p>{data.email}</p>
            <p>{data.phone}</p>
          </div>
        </div>
      </div>

      {data.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 pb-2 border-b-2" style={{ borderColor: accentColor }}>
            Profil
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">{data.summary}</p>
        </div>
      )}

      {data.experience?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 pb-2 border-b-2" style={{ borderColor: accentColor }}>
            Expérience Professionnelle
          </h2>
          {data.experience.map((exp, idx) => (
            <div key={idx} className="mb-4">
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

      <div className="grid grid-cols-2 gap-6">
        <div>
          {data.education?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-3 pb-2 border-b-2" style={{ borderColor: accentColor }}>
                Formation
              </h2>
              {data.education.map((edu, idx) => (
                <div key={idx} className="mb-3">
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
              <h2 className="text-xl font-bold mb-3 pb-2 border-b-2" style={{ borderColor: accentColor }}>
                Compétences
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-sm text-white"
                    style={{ backgroundColor: accentColor }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {data.languages?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-3 pb-2 border-b-2" style={{ borderColor: accentColor }}>
                Langues
              </h2>
              {data.languages.map((lang, idx) => (
                <div key={idx} className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{lang.language}</span>
                  <span className="text-gray-600">{lang.level}</span>
                </div>
              ))}
            </div>
          )}

          {data.interests?.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-3 pb-2 border-b-2" style={{ borderColor: accentColor }}>
                Centres d'intérêt
              </h2>
              <p className="text-sm text-gray-700">{data.interests.join(' • ')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CVTemplate1;
