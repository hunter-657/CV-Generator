import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateCV from "./pages/CreateCV";
import Resume from "./pages/Resume";
import Processing from "./pages/Processing";
import UploadCV from "./pages/UploadCV";
import Chatbot from "./pages/Chatbot";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/create" element={<CreateCV />} />

        <Route path="/resume" element={<Resume />} />
        
        <Route path="/processing" element={<Processing />} />
        
        <Route path="/upload" element={<UploadCV />} />      
 []       <Route path="/chat" element={<Chatbot />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;