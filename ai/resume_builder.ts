import Constants from "expo-constants";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ResumeInput, buildFallbackResume } from "./resumeFallback";

// --- Setup Gemini ---
const apiKey =
  Constants.expoConfig?.extra?.geminiApiKey ??
  process.env.EXPO_PUBLIC_GEMINI_API_KEY ??
  "";

if (!apiKey) {
  console.warn("⚠️ Gemini API key is missing! Using fallback resume.");
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
const model = genAI?.getGenerativeModel({ model: "gemini-2.5-flash" });

/**
 * Generate a resume using Gemini AI if available, otherwise fallback.
 */
export async function aICallResume(input: ResumeInput): Promise<string> {
  // If AI model is not available, use fallback
  if (!model) return buildFallbackResume(input);

  try {
    const { name, contact, jobRole, experience, education, skills } = input;

    const expText =
      experience.length > 0
        ? experience
            .map(
              (e, i) => `
          <h4>Experience ${i + 1}</h4>
          <ul>
            <li><strong>Company:</strong> ${e.company}</li>
            <li><strong>Role:</strong> ${e.role}</li>
            <li><strong>Duration:</strong> ${e.duration}</li>
            <li><strong>Responsibilities:</strong> ${e.responsibilities}</li>
          </ul>
        `
            )
            .join("")
        : "None";

    const eduText =
      education.length > 0
        ? education
            .map(
              (e, i) => `
          <h4>Education ${i + 1}</h4>
          <ul>
            <li><strong>Institution:</strong> ${e.institution}</li>
            <li><strong>Degree:</strong> ${e.degree}</li>
            <li><strong>Duration:</strong> ${e.duration}</li>
          </ul>
        `
            )
            .join("")
        : "None";

    const skillsText =
      skills.length > 0
        ? `<ul>${skills.map((s) => `<li>${s}</li>`).join("")}</ul>`
        : "None";

    // Prompt for Gemini AI
   const prompt = `
You are an expert professional resume writer with extensive experience creating high-impact, ATS-friendly resumes for competitive roles in the tech industry. 

Requirements:
1. Generate a clean, professional HTML snippet (no <html>/<body> tags, styling should be plain and black).
2. Output must be **succinct, highly readable, and persuasive**, highlighting achievements and measurable results.
3. Always include the following sections:
   - Name and contact information
   - Professional summary (2-3 lines max, strong impact)
   - Work experience (list each position with company, role, duration, and key accomplishments in bullet points)
   - Education (list degrees, institutions, and years)
   - Skills (key technical and professional skills)
4. Use strong action verbs and quantify results whenever possible.
5. Keep formatting semantic and simple (<h2>, <h3>, <h4>, <p>, <ul><li>).

Candidate Information:
- Name: ${name || "John Doe"}
- Contact: ${contact || "johndoe@email.com"}
- Desired Job Role: ${jobRole || "Software Engineer"}
- Experience: ${expText}
- Education: ${eduText}
- Skills: ${skillsText}

Generate the resume in the most compelling way possible, emphasizing achievements, impact, and professionalism. Ensure it is succinct, visually clean, and outstanding for recruiters.
`;


    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (err: any) {
    console.error("⚠️ Gemini Resume Error:", err);
    // Fallback if AI fails
    return buildFallbackResume(input);
  }
}
