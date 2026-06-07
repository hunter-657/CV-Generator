import { useLocation, useNavigate } from "react-router-dom";

export default function Resume() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;

  if (!data) {
    return (
      <div style={{ padding: "40px" }}>
        <h2>No CV Data Found 😢</h2>
        <button onClick={() => navigate("/create")}>
          Create CV
        </button>
      </div>
    );
  }

  const extractedData = data.extractedData || {};
  const enhancedData = data.enhancedData || {};

  return (
    <div
      style={{
        background: "#0f172a",
        minHeight: "100vh",
        padding: "40px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* CV CONTAINER */}
      <div
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
          <h1 style={{ margin: 0 }}>{extractedData.name}</h1>
          <p>{extractedData.email} | {extractedData.phone}</p>
          <p>{extractedData.linkedin}</p>
          <p>{extractedData.github}</p>
        </div>

        {/* SUMMARY */}
        <h2>Professional Summary</h2>
        <p style={{ lineHeight: "1.6" }}>
          {enhancedData.summary}
        </p>

        {/* SKILLS */}
        <h2>Skills</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {(enhancedData.skills || []).map((skill, i) => (
            <span
              key={i}
              style={{
                background: "#e2e8f0",
                padding: "6px 10px",
                borderRadius: "20px",
                fontSize: "14px",
              }}
            >
              {skill}
            </span>
          ))}
        </div>

        {/* EDUCATION */}
        <h2 style={{ marginTop: "20px" }}>Education</h2>
        <ul>
          {(extractedData.education || []).map((edu, i) => (
            <li key={i}>{edu}</li>
          ))}
        </ul>

        {/* PROJECTS */}
        <h2>Projects</h2>

        {(enhancedData.projects || []).map((project, i) => (
        <div
            key={i}
            style={{
              marginBottom: "15px",
              padding: "10px",
              borderLeft: "4px solid #38bdf8",
            }}
        >
        <h3>{project.title}</h3>

        <p>{project.description}</p>

        {/* SAFE FIX */}
          <div style={{ marginTop: "8px" }}>
          <strong>Tech:</strong>{" "}
            {(project.technologies && project.technologies.length > 0)
            ? project.technologies.join(", ")
            : "Not specified"}
          </div>
        </div>
    ))}

        {/* BUTTON */}
        <div style={{ marginTop: "30px" }}>
          <button
            onClick={() => navigate("/create")}
            style={{
              padding: "10px 20px",
              background: "#38bdf8",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Create New CV
          </button>
        </div>
      </div>
    </div>
  );
}