import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Processing() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  useEffect(() => {
    const steps = [
      "Extracting user data...",
      "Chunking experience...",
      "Analyzing skills...",
      "Generating CV...",
      "Finalizing resume..."
    ];

    let i = 0;

    const interval = setInterval(() => {
      console.log(steps[i]);
      i++;

      if (i === steps.length) {
        clearInterval(interval);

        setTimeout(() => {
          navigate("/resume", { state: data });
        }, 1000);
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        background: "#0f172a",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        fontSize: "20px"
      }}
    >
      <h2>AI Agent Processing...</h2>
      <p>Generating your professional CV</p>
    </div>
  );
}