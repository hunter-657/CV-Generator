import { useLocation, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";

export default function Resume() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;
  const resume = data?.resume;

  const resumeRef = useRef(null);

  console.log("RESUME DATA:", data);

  // proper guard
  if (!resume) {
    return (
      <div style={{ padding: "40px", color: "white" }}>
        <h2>No CV Data Found 😢</h2>
        <button onClick={() => navigate("/create")}>
          Create CV
        </button>
      </div>
    );
  }

  const downloadPDF = async () => {
    const element = resumeRef.current;

    const canvas = await html2canvas(element, { scale: 2 });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${resume.name || "resume"}.pdf`);
  };

  return (
    <div style={{ background: "#0f172a", minHeight: "100vh", padding: "40px", display: "flex", justifyContent: "center" }}>

      {/* THIS is the ONLY captured area */}
      <div
        ref={resumeRef}
        style={{
          background: "white",
          color: "black",
          width: "800px",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        }}
      >

        {/* HEADER */}
        <div style={{ borderBottom: "2px solid #eee", marginBottom: "20px" }}>
          <h1>{resume.name}</h1>
          <p>{resume.email} | {resume.phone}</p>
          <p>{resume.linkedin}</p>
          <p>{resume.github}</p>
        </div>

        {/* SUMMARY */}
        <h2>Professional Summary</h2>
        <p>{resume.summary}</p>

        {/* SKILLS */}
        <h2>Skills</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {(resume.skills || []).map((skill, i) => (
            <span key={i} style={{ background: "#e2e8f0", padding: "6px 10px", borderRadius: "20px" }}>
              {skill}
            </span>
          ))}
        </div>

        <h2>Education</h2>

        {(resume.education || []).map((edu, i) => (
        <div
          key={i}
          style={{
          marginBottom: "15px",
          borderLeft: "4px solid #38bdf8",
          paddingLeft: "10px",
        }}
        >
        <h3>{edu.institution}</h3>

        <p>
          {edu.degree} in {edu.field_of_study}
        </p>

        <p>
          {edu.start_date} - {edu.end_date}
        </p>

        <p>
          GPA: {edu.gpa}
        </p>
        </div>
))}

        {/* PROJECTS */}
        <h2>Projects</h2>
        {(resume.projects || []).map((project, i) => (
          <div 
          key={i} style={{ marginBottom: "15px", borderLeft: "4px solid #38bdf8", paddingLeft: "10px" }}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p><strong>Tech:</strong> {project.technologies?.join(", ") || "Not specified"}</p>
          </div>
        ))}

        {/* BUTTONS */}
        <div>
          <button 
            onClick={() => navigate("/create")}
            style={{ 
              marginTop: "30px",
              padding: "10px 20px", 
              background: "#38bdf8", 
              border: "none", 
              borderRadius: "8px", 
              cursor: "pointer", 
            }}
          >
            Create New CV
          </button>
          <p></p>
          <button 
            onClick={() => navigate("/chat" )}
            style={{ 
              marginTop: "30px", 
              padding: "10px 20px", 
              background: "#38bdf8", 
              border: "none", 
              borderRadius: "8px", 
              cursor: "pointer",
            }}
          >
            Chat with AI 🤖
          </button>
          <p></p>
          <button 
            onClick={downloadPDF} 
            style={{ 
              marginTop: "30px",
              padding: "10px 20px", 
              background: "#38bdf8", 
              border: "none", 
              borderRadius: "8px", 
              cursor: "pointer",
            }}
          >
            Download PDF 📄
          </button>
        </div>

      </div>
    </div>
  );
}