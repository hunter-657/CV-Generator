const express = require("express");
const { extractResumeData } = require("../agents/extractionAgent");
const { enhanceResume } = require("../agents/enhancementAgent");
const supabase = require("../supabaseClient");
const multer = require("multer");
const pdf = require("pdf-parse");
const fs = require("fs");
const { chatWithResume } = require("../agents/chatAgent");
const { generateResume } = require("../agents/resumeAgent");

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
router.post("/chat", async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { question } = req.body;

    const { data, error } = await supabase
      .from("resumes")
      .select("*")
      .order("id", { ascending: false })
      .limit(1);

    console.log("RESUME:", data);

    if (error) throw error;

    if (!data.length) {
      return res.status(404).json({
        success: false,
        error: "No resume found",
      });
    }

    const resume =
      data[0].enhanced_data ||
      data[0].extracted_data;

    const answer = await chatWithResume(
      resume,
      question
    );

    res.json({
      success: true,
      answer,
    });

  } catch (error) {
    console.error("CHAT ERROR:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

router.post("/extract", async (req, res) => {
  const { text } = req.body;

  try {
    const resume = await generateResume(text);

    const { error } = await supabase
      .from("resumes")
      .insert([
        {
          name: resume.name,
          extracted_data: resume,
          enhanced_data: resume,
        },
      ]);

    if (error) {
      console.error("Supabase Error:", error);
    }

    return res.json({
      success: true,
      resume,
    });

  }
  catch (error) {
  console.error("AI ERROR:", error);

  const errorText = String(error?.message || error);

  if (
    errorText.includes("429") ||
    errorText.includes("503") ||
    errorText.includes("RESOURCE_EXHAUSTED") ||
    errorText.includes("UNAVAILABLE") ||
    errorText.toLowerCase().includes("quota")
  ) {
    console.log("USING DEMO FALLBACK");

    const resume = {
      name: text.match(/Name:\s*(.*)/i)?.[1]?.trim() || "Unknown User",
      email: text.match(/Email:\s*(.*)/i)?.[1]?.trim() || "",
      phone: text.match(/Phone:\s*(.*)/i)?.[1]?.trim() || "",

      summary:
        "Motivated software developer with strong problem-solving abilities and experience building modern applications.",

      skills: text
        .match(/Skills:\s*(.*)/i)?.[1]
        ?.split(",")
        .map((s) => s.trim())
        .filter(Boolean) || [],

      education: [
        text.match(/Education:\s*(.*)/i)?.[1]?.trim() || ""
      ],

      projects: [
        {
          title: "Personal Project",
          description:
            "Built and maintained software solutions using modern technologies.",
          technologies: ["React", "Node.js"],
        },
      ],
    };

    return res.json({
      success: true,
      resume,
    });
  }

  return res.status(500).json({
    success: false,
    error: error.message,
  });
}
});

module.exports = router;