const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function chatWithResume(resumeData, question) {
  const prompt = `
You are an AI career assistant.

Use ONLY the resume information below.

Resume:
${JSON.stringify(resumeData)}

Question:
${question}

Answer professionally.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}

module.exports = {
  chatWithResume,
};