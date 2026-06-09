const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function generateResume(text) {
  const prompt = `
You are an expert AI resume engine.

You MUST:
1. Extract structured resume data
2. Enhance it professionally
3. Optimize for ATS systems

Return ONLY valid JSON.

Schema:
{
  "name": "",
  "email": "",
  "phone": "",
  "linkedin": "",
  "github": "",
  "summary": "",
  "skills": [],
  "education": [],
  "experience": [],
  "projects": [
    {
      "title": "",
      "description": "",
      "technologies": []
    }
  ]
}

INPUT:
${text}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const cleaned = response.text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
}

module.exports = { generateResume };