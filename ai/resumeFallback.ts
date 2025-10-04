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
  name?: string;
  contact?: string;
  jobRole?: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
};

// --- Synonyms and dynamic templates ---
const synonyms: Record<string, string[]> = {
  experienced: ["skilled", "proficient", "seasoned", "accomplished"],
  developed: ["built", "implemented", "crafted", "engineered", "designed"],
  led: ["managed", "oversaw", "coordinated", "directed", "headed"],
  responsible: ["handled", "supervised", "oversaw", "in charge of"],
  improved: ["enhanced", "optimized", "upgraded", "refined"],
  innovative: ["creative", "visionary", "strategic", "forward-thinking"],
};

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickSynonym(word: string): string {
  const options = synonyms[word.toLowerCase()];
  return options ? pickRandom(options) : word;
}

// --- Helpers to build HTML sections ---
function buildList(items: string[]): string {
  return `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;
}

function buildSection(title: string, content: string): string {
  return `<section><h3>${title}</h3>${content}</section>`;
}

function buildExperienceHTML(experience: Experience[]): string {
  if (!experience.length) return `<p>No professional experience provided.</p>`;

  return experience
    .map((e, i) => {
      const templates = [
        `${pickSynonym("led")} ${e.responsibilities} at ${e.company} (${e.duration})`,
        `Spearheaded ${e.responsibilities} during tenure at ${e.company} (${e.duration})`,
        `Oversaw ${e.responsibilities} for ${e.company} (${e.duration})`,
      ];
      return `
        <h4>Experience ${i + 1}</h4>
        <ul>
          <li><strong>Company:</strong> ${e.company}</li>
          <li><strong>Role:</strong> ${e.role}</li>
          <li><strong>Duration:</strong> ${e.duration}</li>
          <li><strong>Achievements:</strong> ${pickRandom(templates)}</li>
        </ul>`;
    })
    .join("");
}

function buildEducationHTML(education: Education[]): string {
  if (!education.length) return `<p>No education provided.</p>`;

  return education
    .map((e, i) => {
      const templates = [
        `Graduated with ${e.degree} from ${e.institution} (${e.duration})`,
        `Earned ${e.degree} at ${e.institution} (${e.duration})`,
      ];
      return `
        <h4>Education ${i + 1}</h4>
        <ul>
          <li><strong>Institution:</strong> ${e.institution}</li>
          <li><strong>Degree:</strong> ${e.degree}</li>
          <li><strong>Duration:</strong> ${e.duration}</li>
          <li><strong>Highlight:</strong> ${pickRandom(templates)}</li>
        </ul>`;
    })
    .join("");
}

function buildSkillsHTML(skills: string[]): string {
  return skills.length > 0
    ? `<p><strong>Core Skills:</strong> ${skills.join(", ")}.</p>`
    : `<p>No specific skills provided.</p>`;
}

// --- Generate rich professional summary ---
export function generateRichSummary(input: ResumeInput): string {
  const { jobRole, experience, education, skills } = input;

  const roleIntros = [
    `${pickSynonym("experienced")} ${jobRole || "professional"}`,
    `Highly ${pickSynonym("innovative")} ${jobRole || "specialist"}`,
    `${jobRole || "Dynamic professional"} with a proven track record of excellence`,
  ];

  const expText =
    experience.length === 0
      ? "with the ability to adapt quickly and make impactful contributions across diverse roles."
      : experience
          .map((e) => `${pickSynonym("led")} ${e.responsibilities} at ${e.company} (${e.duration})`)
          .join(" ");

  const eduText =
    education.length === 0
      ? "Holds relevant academic qualifications."
      : `Earned ${education.map((e) => e.degree).join(", ")} from ${education
          .map((e) => e.institution)
          .join(", ")}.`;

  const skillText =
    skills.length > 0
      ? `Proficient in ${skills.join(", ")}.`
      : "Skilled in leadership, problem-solving, and adaptability.";

  return `${pickRandom(roleIntros)} ${expText} ${eduText} ${skillText}`;
}

// --- Full fallback resume ---
export function buildFallbackResume(input: ResumeInput): string {
  const { name, contact, jobRole, experience, education, skills } = input;
  const summary = generateRichSummary(input);

  const headerHTML = `
    <section>
      <h2>${name || "John Doe"}</h2>
      <p>${contact || "johndoe@email.com | (123) 456-7890"}</p>
      <p><strong>Role:</strong> ${jobRole || "Software Engineer"}</p>
    </section>
  `;

  return [
    headerHTML,
    buildSection("Professional Summary", `<p>${summary}</p>`),
    buildSection("Experience", buildExperienceHTML(experience)),
    buildSection("Education", buildEducationHTML(education)),
    buildSection("Skills", buildSkillsHTML(skills)),
  ].join("\n");
}
