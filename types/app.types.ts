export type Experience = {
  company: string;
  role: string;
  duration: string;
  responsibilities: string;
};

export type Education = {
  institution: string;
  degree: string;
  duration: string;
};

export type ResumeInput = {
  name: string;
  contact: string;
  jobRole: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
};