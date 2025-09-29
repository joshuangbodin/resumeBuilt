import Constants from "expo-constants";
import { GoogleGenerativeAI } from "@google/generative-ai";

// --- Setup Gemini ---
const apiKey =
  Constants.expoConfig?.extra?.geminiApiKey ??
  process.env.EXPO_PUBLIC_GEMINI_API_KEY ??
  "";

if (!apiKey) {
  console.warn("⚠️ Gemini API key is missing! Fallback resume generator will be used.");
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
const model = genAI?.getGenerativeModel({ model: "gemini-2.5-flash" });

// --- Resume Input Types ---
type Experience = {
  company: string;
  role: string;
  duration: string;
  responsibilities: string;
};

type Education = {
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

// --- Helper: Fallback professional summary ---
function buildFallbackSummary(jobRole: string, skills: string[]): string {
  const role = jobRole || "dynamic professional";
  const skillsList =
    skills.length > 0
      ? skills.join(", ")
      : "leadership, problem-solving, and adaptability";

  return `
    <p>
      ${role[0].toUpperCase() + role.slice(1)} with a strong background in ${skillsList}.
      Adept at delivering measurable results, driving innovation, and excelling in fast-paced environments.
      Seeking opportunities to contribute expertise and grow within a forward-thinking organization.
    </p>
  `;
}

// --- Helper: Build detailed fallback resume in HTML ---
function buildFallbackResume({
  name,
  contact,
  jobRole,
  experience,
  education,
  skills,
}: ResumeInput): string {
  const exp = experience.length > 0 ? experience : [
    {
      company: "Tech Solutions Inc.",
      role: jobRole || "Software Developer",
      duration: "2020 – 2023",
      responsibilities:
        "Designed and implemented scalable applications, collaborated with cross-functional teams, and optimized system performance.",
    },
    {
      company: "Global Corp",
      role: "Intern",
      duration: "2019 – 2020",
      responsibilities:
        "Assisted in project management, supported software testing, and contributed to technical documentation.",
    },
  ];

  const edu = education.length > 0 ? education : [
    {
      institution: "State University",
      degree: "B.Sc. in Computer Science",
      duration: "2015 – 2019",
    },
  ];

  const skillset =
    skills.length > 0
      ? skills
      : ["JavaScript", "React", "Node.js", "Problem Solving", "Team Collaboration"];

  const expText = exp
    .map(
      (ex, i) => `
        <h6>Experience ${i + 1}</h6>
        <ul>
          <li><strong>Company:</strong> ${ex.company}</li>
          <li><strong>Role:</strong> ${ex.role}</li>
          <li><strong>Duration:</strong> ${ex.duration}</li>
          <li><strong>Responsibilities:</strong> ${ex.responsibilities}</li>
        </ul>
      `
    )
    .join("\n");

  const eduText = edu
    .map(
      (ed, i) => `
        <h6>Education ${i + 1}</h6>
        <ul>
          <li><strong>Institution:</strong> ${ed.institution}</li>
          <li><strong>Degree:</strong> ${ed.degree}</li>
          <li><strong>Duration:</strong> ${ed.duration}</li>
        </ul>
      `
    )
    .join("\n");

  const skillsText = `<ul>${skillset.map((s) => `<li>${s}</li>`).join("")}</ul>`;

  return `
    <section>
      <h3>${name || "John Doe"}</h3>
      <p>${contact || "johndoe@email.com | (123) 456-7890 | LinkedIn: linkedin.com/in/johndoe"}</p>
    </section>

    <section>
      <h4>Professional Summary</h4>
      ${buildFallbackSummary(jobRole, skillset)}
    </section>

    <section>
      <h4>Experience</h4>
      ${expText}
    </section>

    <section>
      <h4>Education</h4>
      ${eduText}
    </section>

    <section>
      <h4>Skills</h4>
      ${skillsText}
    </section>
  `;
}

// --- Resume Builder Function ---
export async function aICallResume(input: ResumeInput): Promise<string> {
  if (!model) {
    return buildFallbackResume(input);
  }

  try {
    const { name, contact, jobRole, experience, education, skills } = input;

    const expText =
      experience
        .map(
          (exp, i) =>
            `<h6>Experience ${i + 1}</h6>
             <ul>
               <li><strong>Company:</strong> ${exp.company}</li>
               <li><strong>Role:</strong> ${exp.role}</li>
               <li><strong>Duration:</strong> ${exp.duration}</li>
               <li><strong>Responsibilities:</strong> ${exp.responsibilities}</li>
             </ul>`
        )
        .join("\n") || "None";

    const eduText =
      education
        .map(
          (edu, i) =>
            `<h6>Education ${i + 1}</h6>
             <ul>
               <li><strong>Institution:</strong> ${edu.institution}</li>
               <li><strong>Degree:</strong> ${edu.degree}</li>
               <li><strong>Duration:</strong> ${edu.duration}</li>
             </ul>`
        )
        .join("\n") || "None";

    const skillsText =
      skills.length > 0
        ? `<ul>${skills.map((s) => `<li>${s}</li>`).join("")}</ul>`
        : "None";

    const prompt = `
You are a professional resume writer. Build a modern, ATS-friendly resume in **semantic HTML** format.

Details:
- Full Name: ${name || "John Doe"}
- Contact Information: ${contact || "johndoe@email.com | (123) 456-7890"}
- Desired Job Role: ${jobRole || "Software Engineer"}
- Work Experience: ${expText}
- Education: ${eduText}
- Key Skills: ${skillsText}

Requirements:
1. Always output a detailed resume, filling in missing data with professional placeholders.
2. Use <h2> for name, <p> for contact, and semantic headings for sections (<h3>, <h4>).
3. Use lists (<ul><li>) for responsibilities and skills.
4. Only return valid HTML snippet, no <html>/<body> wrappers.
`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (err: any) {
    console.error("⚠️ Gemini Resume Error:", err);
    return buildFallbackResume(input);
  }
}
