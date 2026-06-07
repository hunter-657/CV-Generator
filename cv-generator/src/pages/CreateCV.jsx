import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateCV() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    skills: "",
    experience: "",
    projects: "",
    likedin: "",
    github: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const rawText = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Education: ${formData.education}
Skills: ${formData.skills}
Experience: ${formData.experience}
Projects: ${formData.projects}
LinkedIn: ${formData.linkedin}
GitHub: ${formData.github}
`;

      const response = await fetch(
        "http://localhost:5000/api/cv/extract",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: rawText,
          }),
        }
      );

      const data = await response.json();

      console.log("API RESPONSE:", data);

      if (!response.ok) {
        throw new Error(data.error || "Backend Error");
      }

      navigate("/resume", {
        state: data,
      });
    } catch (error) {
      console.error("ERROR:", error);

      alert(
        "Failed to generate CV.\n\nCheck:\n1. Backend is running\n2. Gemini key is valid\n3. Look at the browser console (F12)"
      );

      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        color: "white",
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>Create Your CV</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          width: "500px",
        }}
      >
        <input
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          style={inputStyle}
        />

        <textarea
          name="education"
          placeholder="Education"
          value={formData.education}
          onChange={handleChange}
          style={textareaStyle}
        />

        <textarea
          name="skills"
          placeholder="Skills (React, Python, Java...)"
          value={formData.skills}
          onChange={handleChange}
          style={textareaStyle}
        />

        <textarea
          name="experience"
          placeholder="Experience"
          value={formData.experience}
          onChange={handleChange}
          style={textareaStyle}
        />

        <textarea
          name="projects"
          placeholder="Projects"
          value={formData.projects}
          onChange={handleChange}
          style={textareaStyle}
        />
        <textarea
          name="linkedin"
          placeholder="linkedin"
          value={formData.linkedin}
          onChange={handleChange}
          style={textareaStyle}
        />
        <textarea
          name="github"
          placeholder="github"
          value={formData.github}
          onChange={handleChange}
          style={textareaStyle}
        />
        
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "12px",
            backgroundColor: "#38bdf8",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          {loading ? "AI Generating CV..." : "Generate CV"}
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "none",
};

const textareaStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "none",
  minHeight: "80px",
  resize: "vertical",
};