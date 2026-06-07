import { useState } from "react";

export default function Chatbot() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const askQuestion = async () => {
    if (!question.trim()) return;

    const userMessage = {
      role: "user",
      text: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch(
        "http://localhost:5000/api/cv/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            question,
          }),
        }
      );

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.answer,
        },
      ]);

      setQuestion("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "30px",
      }}
    >
      <h1>AI Career Assistant 🤖</h1>

      <div
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <button onClick={() => setQuestion("Analyze my CV")}>
          Analyze my CV
        </button>

        <button
          onClick={() =>
            setQuestion("What are my strongest skills?")
          }
        >
          Strongest Skills
        </button>

        <button
          onClick={() =>
            setQuestion("What jobs fit my profile?")
          }
        >
          Job Recommendations
        </button>
      </div>

      <div
        style={{
          border: "1px solid gray",
          padding: "20px",
          minHeight: "400px",
          marginBottom: "20px",
        }}
      >
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>
              {msg.role === "user" ? "You" : "AI"}:
            </strong>{" "}
            {msg.text}
          </div>
        ))}
      </div>

      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask about your CV..."
        style={{
          width: "80%",
          padding: "10px",
        }}
      />

      <button
        onClick={askQuestion}
        style={{
          marginLeft: "10px",
          padding: "10px 20px",
        }}
      >
        Send
      </button>
    </div>
  );
}