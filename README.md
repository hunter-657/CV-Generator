# 🤖 AI Resume Builder & Career Assistant

An AI-powered resume platform that allows users to **create, upload, enhance, store, download, and interact with their resumes through an AI chatbot**.

The project combines a React frontend, Node.js/Express backend, Google Gemini AI, PDF processing, and Supabase to create an end-to-end intelligent resume management system.

---

## ✨ Features

### 📝 AI Resume Generation

Users can enter their:

* Name
* Email
* Phone
* Education
* Skills
* Experience
* Projects
* LinkedIn
* GitHub

The information is sent to the AI resume engine, which:

* Extracts structured information
* Generates a professional summary
* Improves project descriptions
* Organizes skills
* Produces an ATS-friendly resume structure

---

### 📄 Upload Existing CV

Users can upload an existing PDF resume.

The system:

1. Receives the PDF
2. Extracts its text
3. Stores the extracted information in Supabase
4. Keeps the resume available for future processing

> Currently, uploaded resumes are stored successfully, but the AI chatbot is primarily connected to the generated-resume workflow.

---

### 💾 Resume Storage

Resume information is stored in **Supabase PostgreSQL**.

The database stores:

* Resume name
* Extracted resume data
* Enhanced resume data
* Uploaded PDF text

JSON data is stored using PostgreSQL's `jsonb` fields.

---

### 🤖 AI Resume Chatbot

After generating a resume, users can open the AI assistant and ask questions about their resume.

Example questions:

```text
What are my strongest skills?

Summarize my experience.

What technologies do I know?

What type of developer am I?

What projects have I worked on?

Am I suitable for a frontend developer role?
```

The chatbot uses the user's resume as context when generating answers.

---

### 📥 PDF Resume Download

The generated resume can be downloaded as a PDF directly from the resume page.

The frontend uses:

* `html2canvas`
* `jsPDF`

to convert the rendered resume into a downloadable PDF.

---

## 🏗️ System Architecture

```text
                    ┌──────────────────┐
                    │      User        │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │   React Frontend │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
        Create CV       Upload PDF      AI Chat
              │              │              │
              └──────────────┼──────────────┘
                             ▼
                    ┌──────────────────┐
                    │ Express Backend  │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
        Gemini AI        PDF Parser      Supabase
              │              │              │
              └──────────────┼──────────────┘
                             ▼
                    ┌──────────────────┐
                    │ Resume Database  │
                    └──────────────────┘
```

---

# 🛠️ Technology Stack

## Frontend

| Technology   | Purpose                   |
| ------------ | ------------------------- |
| React.js     | User interface            |
| React Router | Page navigation           |
| html2canvas  | Capture resume as image   |
| jsPDF        | Generate downloadable PDF |

## Backend

| Technology | Purpose               |
| ---------- | --------------------- |
| Node.js    | Backend runtime       |
| Express.js | REST API              |
| Multer     | PDF file uploads      |
| pdf-parse  | PDF text extraction   |
| dotenv     | Environment variables |

## AI

| Technology    | Purpose                       |
| ------------- | ----------------------------- |
| Google Gemini | Resume generation and chatbot |

## Database

| Technology | Purpose                              |
| ---------- | ------------------------------------ |
| Supabase   | PostgreSQL database and data storage |
| JSONB      | Structured resume data               |

---

# 📦 Dependencies

## Frontend

```bash
npm install react react-dom
npm install react-router-dom
npm install jspdf
npm install html2canvas
```

## Backend

```bash
npm install express
npm install cors
npm install dotenv
npm install multer
npm install pdf-parse
npm install @supabase/supabase-js
npm install @google/genai
```

---

# 📁 Project Structure

```text
hackathon/
│
├── frontend/
│   │
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── CreateCV.jsx
│   │   │   ├── UploadCV.jsx
│   │   │   ├── Resume.jsx
│   │   │   └── Chatbot.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── backend/
│   │
│   ├── agents/
│   │   ├── resumeAgent.js
│   │   ├── chatAgent.js
│   │   ├── extractionAgent.js
│   │   └── enhancementAgent.js
│   │
│   ├── routes/
│   │   └── cvRoutes.js
│   │
│   ├── uploads/
│   │
│   ├── supabaseClient.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

---

# 🔌 API Endpoints

## Generate Resume

### `POST /api/cv/extract`

Generates an AI-enhanced resume from user-provided information.

### Request

```json
{
  "text": "Name: John Doe\nSkills: React, Node.js..."
}
```

### Response

```json
{
  "success": true,
  "resume": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "...",
    "linkedin": "...",
    "github": "...",
    "summary": "...",
    "skills": [],
    "education": [],
    "experience": [],
    "projects": []
  }
}
```

---

# 📤 Upload Resume

### `POST /api/cv/upload`

Accepts an existing PDF resume.

### Request

```text
Content-Type: multipart/form-data

resume: resume.pdf
```

The backend extracts the PDF text and stores it in Supabase.

---

# 💬 AI Chat

### `POST /api/cv/chat`

Allows the user to ask questions about their resume.

### Request

```json
{
  "question": "What are my strongest skills?"
}
```

### Response

```json
{
  "success": true,
  "answer": "Your strongest skills are..."
}
```

---

# 🗄️ Database Structure

The primary table is:

```text
resumes
```

Example structure:

| Column         | Type      |
| -------------- | --------- |
| id             | bigint    |
| name           | text      |
| extracted_data | jsonb     |
| enhanced_data  | jsonb     |
| created_at     | timestamp |

### Example Record

```json
{
  "name": "John Doe",
  "extracted_data": {
    "name": "John Doe",
    "skills": ["React", "Node.js"]
  },
  "enhanced_data": {
    "summary": "Software developer...",
    "projects": []
  }
}
```

---

# 🔐 Environment Variables

Create a `.env` file inside the `backend` directory.

```env
GEMINI_API_KEY=your_gemini_api_key

SUPABASE_URL=your_supabase_url

SUPABASE_KEY=your_supabase_key
```

Do **not** commit `.env` to GitHub.

Add it to `.gitignore`:

```gitignore
.env
node_modules/
uploads/
```

---

# 🚀 Running the Project

The project consists of two separate applications, so run the backend and frontend in separate terminals.

## 1. Start Backend

```bash
cd backend
npm install
node server.js
```

The backend runs on:

```text
http://localhost:5000
```

---

## 2. Start Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

Open the displayed Vite URL in your browser.

---

# 🔄 Typical User Flow

```text
                    START
                      │
                      ▼
                  Home Page
                      │
             ┌────────┴────────┐
             │                 │
             ▼                 ▼
          Create CV        Upload CV
             │                 │
             ▼                 ▼
          Gemini          PDF Parser
             │                 │
             ▼                 ▼
       Enhanced Resume    Stored Resume
             │
             ▼
        Resume Page
             │
       ┌─────┴─────┐
       │           │
       ▼           ▼
  Download PDF   AI Chat
       │           │
       ▼           ▼
     PDF File   AI Answers
```

---

# 🧠 AI Resume Pipeline

For a newly created resume, the current system uses a single AI generation call.

```text
User Information
       │
       ▼
  Raw Resume Text
       │
       ▼
  Gemini AI
       │
       ├── Extract Information
       │
       ├── Enhance Content
       │
       └── Optimize Structure
       │
       ▼
 Structured Resume JSON
       │
       ├───────────────┐
       ▼               ▼
   Supabase       Resume Page
                       │
                       ├── Download PDF
                       │
                       └── AI Chat
```

This reduces unnecessary AI calls compared with using separate extraction and enhancement calls.

---

# ⚠️ Current Limitations

### Uploaded Resume Chat

Uploaded PDFs are currently extracted and stored successfully, but the chatbot workflow is not yet fully connected to uploaded resume data.

### Vector Database

A vector database has not yet been integrated.

### Job Search

Live job searching and semantic job matching are planned but are not currently part of the implemented system.

### API Availability

Gemini may occasionally return errors such as:

```text
429 RESOURCE_EXHAUSTED
```

or

```text
503 UNAVAILABLE
```

These indicate API quota/rate-limit or temporary service availability issues rather than frontend errors.

---

# 🔮 Future Development

## 1. Vector Database

Resume information will be converted into embeddings and stored in a vector database.

```text
Resume
  │
  ▼
Embedding Model
  │
  ▼
Vector Database
```

This will allow semantic retrieval instead of simple text matching.

---

## 2. AI Job Search

The planned system will retrieve relevant job opportunities and compare them with the user's resume.

```text
User Resume
     │
     ▼
Vector Search
     │
     ▼
Relevant Jobs
     │
     ▼
AI Comparison
     │
     ├── Recommend
     ├── Maybe
     └── Discourage
```

---

## 3. Skill Gap Analysis

The system will identify missing skills between the user's resume and a target job.

Example:

```text
Job Requirements
        │
        ▼
Compare with Resume
        │
        ▼
Missing Skills
        │
        ▼
Learning Recommendations
```

---

## 4. ATS Score

Future versions can provide:

* ATS compatibility score
* Keyword matching
* Missing keywords
* Formatting recommendations
* Job-specific resume optimization

---

# 🎯 Project Goal

The ultimate goal is to build an intelligent **AI Career Assistant**, rather than simply an AI resume generator.

The planned system will understand a user's professional profile, answer questions about their career, analyze job opportunities, identify skill gaps, and provide personalized recommendations.

```text
              ┌────────────────────┐
              │    User Profile    │
              └─────────┬──────────┘
                        │
                        ▼
              ┌────────────────────┐
              │  Resume Knowledge  │
              │   Vector Store     │
              └─────────┬──────────┘
                        │
          ┌─────────────┼─────────────┐
          │             │             │
          ▼             ▼             ▼
       Resume        Job Search    AI Chat
       Analysis          │             │
          │              ▼             │
          │         Job Matching       │
          │              │             │
          └──────────────┼─────────────┘
                         ▼
                 Career Recommendations
```

---

# 👥 Project Status

### Currently Implemented

* [x] React frontend
* [x] Resume creation form
* [x] AI resume generation
* [x] Single-call AI resume pipeline
* [x] Supabase storage
* [x] Existing PDF upload
* [x] PDF text extraction
* [x] Resume preview
* [x] AI-enhanced resume display
* [x] Resume PDF download
* [x] AI resume chatbot
* [x] Backend REST APIs

### Planned

* [ ] Uploaded resume → AI chatbot integration
* [ ] Vector database
* [ ] Resume embeddings
* [ ] Job offer search
* [ ] Semantic job matching
* [ ] Job recommendation/discouragement
* [ ] Skill gap analysis
* [ ] ATS scoring

---

# 📜 License

This project was developed as part of an AI/Software Development Hackathon.

---

## 👨‍💻 Development

Built with:

**React + Node.js + Express + Gemini AI + Supabase**

The project is designed to evolve from an AI resume generator into a complete AI-powered career assistant.
