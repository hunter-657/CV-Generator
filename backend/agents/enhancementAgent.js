const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function enhanceResume(resumeData) {
  const prompt = `
You are an expert resume writer and career coach.

Using the following resume data:

${JSON.stringify(resumeData)}

Return ONLY valid JSON.

DO NOT:
- Use markdown
- Use \`\`\`json
- Add explanations
- Add extra text

The response MUST follow EXACTLY this schema:

{
  "summary": "string",
  "skills": ["string"],
  "projects": [
    {
      "title": "string",
      "description": "string",
      "technologies": ["string"]
    }
  ]
}

Rules:

1. Create a strong professional summary.
2. Improve project descriptions to sound professional.
3. For each project, infer likely technologies from the user's skills.
4. technologies must ALWAYS be an array.
5. Never omit any field.
6. If a value is unknown, use an empty array [] or empty string "".
7. Return JSON only.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  let cleaned = response.text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  console.log("\n===== RAW GEMINI RESPONSE =====");
  console.log(cleaned);
  console.log("===============================\n");

  let result;

  try {
    result = JSON.parse(cleaned);
  } catch (error) {
    console.error("JSON Parse Error:", error);

    result = {
      summary: "",
      skills: [],
      projects: [],
    };
  }

  // Schema enforcement
  result.summary = result.summary || "";

  result.skills = Array.isArray(result.skills)
    ? result.skills
    : [];

  result.projects = Array.isArray(result.projects)
    ? result.projects
    : [];

  // Gold Medal Hackathon Upgrade™
  result.projects = result.projects.map((project) => {
    let technologies = Array.isArray(project.technologies)
      ? project.technologies
      : [];

    // If Gemini didn't provide technologies,
    // automatically infer them from skills
    if (technologies.length === 0) {
      technologies = result.skills.slice(0, 4);
    }

    return {
      title: project.title || "",
      description: project.description || "",
      technologies,
    };
  });

  return result;
}

module.exports = {
  enhanceResume,
};