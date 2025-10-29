export interface CVData {
  name: string;
  email: string;
  phone: string;
  title: string;
  photo?: string;
  summary: string;
  experience: Array<{
    title: string;
    company: string;
    period: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    school: string;
    year: string;
  }>;
  skills: string[];
  languages: Array<{
    language: string;
    level: string;
  }>;
  interests: string[];
}

export interface CVTemplateProps {
  data: CVData;
  accentColor?: string;
}
