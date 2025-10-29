import React from 'react';
import type { CVTemplateProps } from '@/types/cv';

const CVTemplate2: React.FC<CVTemplateProps> = ({ data, accentColor = '#8B5CF6' }) => {
  return (
    <div className="bg-white w-[210mm] h-[297mm] flex shadow-lg mx-auto" id="cv-content">
      <div className="w-1/3 p-8 text-white" style={{ backgroundColor: accentColor }}>
        {data.photo && (
          <img 
            src={data.photo} 
            alt="Photo" 
            className="w-full aspect-square rounded-lg object-cover mb-6 border-4 border-white"
          />
        )}
        
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 pb-2 border-b-2 border-white/30">
            Contact
          </h2>
          <div className="text-sm space-y-2">
            <p className="break-words">{data.email}</p>
            <p>{data.phone}</p>
          </div>
        </div>

        {data.skills?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 pb-2 border-b-2 border-white/30">
              Compétences
            </h2>
            <ul className="text-sm space-y-2">
              {data.skills.map((skill, idx) => (
                <li key={idx}>• {skill}</li>
              ))}
            </ul>
          </div>
        )}

        {data.languages?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 pb-2 border-b-2 border-white/30">
              Langues
            </h2>
            {data.languages.map((lang, idx) => (
              <div key={idx} className="text-sm mb-2">
                <p className="font-medium">{lang.language}</p>
                <p className="text-white/80 text-xs">{lang.level}</p>
              </div>
            ))}
          </div>
        )}

        {data.interests?.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-3 pb-2 border-b-2 border-white/30">
              Centres d'intérêt
            </h2>
            <ul className="text-sm space-y-1">
              {data.interests.map((interest, idx) => (
                <li key={idx}>• {interest}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex-1 p-8">
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2" style={{ color: accentColor }}>
            {data.name}
          </h1>
          <p className="text-xl text-gray-700">{data.title}</p>
        </div>

        {data.summary && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3" style={{ color: accentColor }}>
              Profil
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">{data.summary}</p>
          </div>
        )}

        {data.experience?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3" style={{ color: accentColor }}>
              Expérience
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

        {data.education?.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-3" style={{ color: accentColor }}>
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
    </div>
  );
};

export default CVTemplate2;
