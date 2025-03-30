const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const apiRoutes = require("./routes"); // Import routes

// Enable CORS for all routes (you can restrict it to specific origins if needed)
app.use(cors()); 

// Root route
app.get("/", (req, res, next) => {
  res.json({
    message: "Welcome to the API",
  });
});

// Use the routes defined in routes.js
app.use("/api", apiRoutes);

// Error handling for invalid routes
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// General error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
