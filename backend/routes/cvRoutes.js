const express = require("express");
const { extractResumeData } = require("../agents/extractionAgent");
const { enhanceResume } = require("../agents/enhancementAgent");
const supabase = require("../supabaseClient");
const multer = require("multer");
const pdf = require("pdf-parse");
const fs = require("fs");
const { chatWithResume } = require("../agents/chatAgent");

const router = express.Router();
const upload = multer({
  dest: "uploads/",
});

router.get("/extract", (req, res) => {
  res.send("Extract route is working");
});
router.post(
  "/upload",
  upload.single("resume"),
  async (req, res) => {
    try {
      const dataBuffer = fs.readFileSync(req.file.path);

      const pdfData = await pdf(dataBuffer);

      const extractedText = pdfData.text;

      console.log("PDF TEXT:");
      console.log(extractedText);
    
const { data, error } = await supabase
  .from("resumes")
  .insert([
    {
      name: req.file.originalname,
      extracted_data: {
        rawText: extractedText,
      },
      enhanced_data: {
        source: "uploaded_pdf",
      },
    },
  ])
  .select();
    
console.log("Saved to Supabase:", data);

res.json({
  success: true,
  text: extractedText,
  saved: data,
});
} catch (error) {
  console.error(error);

  res.status(500).json({
    success: false,
    error: error.message,
  });
}
});

router.post("/extract", async (req, res) => {
  const { text } = req.body;
  try {


    // Agent 1
    const extractedData = await extractResumeData(text);

    // Agent 2
    const enhancedData = await enhanceResume(extractedData);
    const { error } = await supabase

    .from("resumes")
    .insert([
        {
          name: extractedData.name,
          extracted_data: extractedData,
          enhanced_data: enhancedData,
        },
    ]);
    if (error) {
      console.error("Supabase Error:", error);
    }
    res.json({
      success: true,
      extractedData,
      enhancedData,
    });
  } 
catch (error) {
  console.error("AI ERROR:", error);
router.post("/chat", async (req, res) => {
  try {
    const { resumeData, question } = req.body;

    const answer = await chatWithResume(
      resumeData,
      question
    );

    res.json({
      success: true,
      answer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

const errorText = String(error?.message || error);

if (
  errorText.includes("429") ||
  errorText.includes("RESOURCE_EXHAUSTED") ||
  errorText.toLowerCase().includes("quota")
)
{
    console.log("Using DEMO FALLBACK MODE");

const name =
  text.match(/Name:\s*(.*)/i)?.[1]?.trim() || "Unknown User";

const email =
  text.match(/Email:\s*(.*)/i)?.[1]?.trim() || "";

const phone =
  text.match(/Phone:\s*(.*)/i)?.[1]?.trim() || "";

const educationText =
  text.match(/Education:\s*([\s\S]*?)Skills:/i)?.[1]?.trim() || "";

const skillsText =
  text.match(/Skills:\s*([\s\S]*?)Experience:/i)?.[1]?.trim() || "";

const experienceText =
  text.match(/Experience:\s*([\s\S]*?)Projects:/i)?.[1]?.trim() || "";

const projectsText =
  text.match(/Projects:\s*([\s\S]*?)LinkedIn:/i)?.[1]?.trim() || "";

const linkedin =
  text.match(/LinkedIn:\s*(.*?)\s*GitHub:/is)?.[1]?.trim() || "";

const github =
  text.match(/GitHub:\s*(.*)/i)?.[1]?.trim() || "";

    return res.json({
      success: true,

extractedData: {
  name,
  email,
  phone,
  linkedin,
  github,

  education: educationText
    ? educationText.split("\n").filter(Boolean)
    : [],

  skills: skillsText
    ? skillsText
        .split(/,|\n/)
        .map((s) => s.trim())
        .filter(Boolean)
    : [],

  experience: experienceText
    ? [experienceText]
    : [],

  projects: projectsText
    ? projectsText
        .split(/,|\n/)
        .map((p) => p.trim())
        .filter(Boolean)
    : [],
},

enhancedData: {
  summary: `${name} is a motivated software developer with experience in modern technologies and software development projects.`,

  skills: skillsText
    ? skillsText
        .split(/,|\n/)
        .map((s) => s.trim())
        .filter(Boolean)
    : [],

  projects: (
    projectsText
      ? projectsText
          .split(/,|\n/)
          .map((p) => p.trim())
          .filter(Boolean)
      : []
  ).map((project) => ({
    title: project,
    description: `Developed ${project} using modern software engineering principles and industry best practices.`,
    technologies: skillsText
      ? skillsText
          .split(/,|\n/)
          .map((s) => s.trim())
          .filter(Boolean)
          .slice(0, 4)
      : [],
  })),
},
    });
  }

  res.status(500).json({
    success: false,
    error: error.message,
  });
}
});

module.exports = router;