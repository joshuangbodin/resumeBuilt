import Constants from "expo-constants";
import { GoogleGenerativeAI } from "@google/generative-ai";

// --- Setup Gemini ---
const apiKey =
  Constants.expoConfig?.extra?.geminiApiKey ??
  process.env.EXPO_PUBLIC_GEMINI_API_KEY ??
  "";

if (!apiKey) {
  throw new Error("❌ Gemini API key is missing! Check your .env and app.config.js");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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

// --- Resume Builder Function ---
export async function aICallResume({
  name,
  contact,
  jobRole,
  experience,
  education,
  skills,
}: ResumeInput): Promise<string> {
 
  try {
    // Convert arrays into readable text
    const expText = experience
      .map(
        (exp, i) =>
          `Experience ${i + 1}:\n- Company: ${exp.company}\n- Role: ${exp.role}\n- Duration: ${exp.duration}\n- Responsibilities: ${exp.responsibilities}`
      )
      .join("\n\n");

    const eduText = education
      .map(
        (edu, i) =>
          `Education ${i + 1}:\n- Institution: ${edu.institution}\n- Degree: ${edu.degree}\n- Duration: ${edu.duration}`
      )
      .join("\n\n");

    const skillsText = skills.join(", ");

    // Construct the prompt
    const prompt = `
You are a professional resume writer. Build a modern, ATS-friendly resume based on the following user details:

- Full Name: ${name}
- Contact Information: ${contact}
- Desired Job Role: ${jobRole}
- Work Experience:
${expText}

- Education:
${eduText}

- Key Skills: ${skillsText}

Requirements:
1. Use a clean, professional tone.
2. Format the resume so that it is easy for Applicant Tracking Systems (ATS) to parse.
3. Highlight skills and experience relevant to the job role: ${jobRole}.
4. Do not add fake information. Only use what is provided.
5. Provide the resume in plain text, with clear sections (Summary, Experience, Education, Skills).
`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (err: any) {
    console.error("Gemini Resume Error:", err);
    return "❌ Failed to generate resume. Please try again later.";
  }
}
