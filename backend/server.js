require("dotenv").config();

const express = require("express");
const cors = require("cors");

const cvRoutes = require("./routes/cvRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Connect CV routes
app.use("/api/cv", cvRoutes);

app.get("/", (req, res) => {
  res.json({
    status: "Backend Running",
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});