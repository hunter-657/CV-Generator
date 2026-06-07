const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function extractResumeData(rawText) {
  const prompt = `
You are an expert resume parsing agent.

Extract information from the text below.

Return ONLY valid JSON.

DO NOT:
- Use markdown
- Use \`\`\`json
- Add explanations
- Add extra text

The JSON MUST follow EXACTLY this schema:

{
  "name": "",
  "email": "",
  "phone": "",
  "linkedin": "",
  "github": "",
  "skills": [],
  "education": [],
  "experience": [],
  "projects": []
}

Rules:

1. Always return valid JSON.
2. Never omit fields.
3. Arrays must always be arrays.
4. Unknown values should be "" or [].
5. Return JSON only.

TEXT:

${rawText}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  let cleaned = response.text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  console.log("\n===== RAW EXTRACTION RESPONSE =====");
  console.log(cleaned);
  console.log("===================================\n");

  let result;

  try {
    result = JSON.parse(cleaned);
  } catch (error) {
    console.error("Extraction Parse Error:", error);

    result = {
      name: "",
      email: "",
      phone: "",
      linkedin: "",
      github: "",
      skills: [],
      education: [],
      experience: [],
      projects: [],
    };
  }

  // Schema enforcement
  result.name = result.name || "";
  result.email = result.email || "";
  result.phone = result.phone || "";
  result.linkedin = result.linkedin || "";
  result.github = result.github || "";

  result.skills = Array.isArray(result.skills)
    ? result.skills
    : [];

  result.education = Array.isArray(result.education)
    ? result.education
    : [];

  result.experience = Array.isArray(result.experience)
    ? result.experience
    : [];

  result.projects = Array.isArray(result.projects)
    ? result.projects
    : [];

  return result;
}

module.exports = {
  extractResumeData,
};