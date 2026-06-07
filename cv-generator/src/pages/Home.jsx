import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "2rem"
      }}
    >
      <div>
        <h1
          style={{
            fontSize: "4rem",
            marginBottom: "1rem"
          }}
        >
          AI CV Generator
        </h1>

        <p
          style={{
            fontSize: "1.3rem",
            color: "#cbd5e1",
            marginBottom: "2rem"
          }}
        >
          Build professional resumes using intelligent AI agents.
        </p>

      <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
          }}
      >
      <button
          onClick={() => navigate("/create")}
          style={{
            padding: "1rem 2rem",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
      >
      Create New CV
      </button>

      <button
          onClick={() => navigate("/upload")}
          style={{
            padding: "1rem 2rem",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
      >
      Upload Existing CV
      </button>
      </div>
      </div>
    </div>
  );
}