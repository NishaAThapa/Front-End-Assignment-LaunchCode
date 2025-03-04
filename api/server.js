const express = require("express");
const cors = require("cors"); // Import the CORS middleware
const app = express();
const port = 3000;
const apiRoutes = require("./routes"); // Import routes (assuming your routes are in the routes.js file)

// Enable CORS for all routes
app.use(cors()); // This will allow all domains to access the API (you can configure it further for specific domains if needed)

// Root route
app.get("/", (req, res, next) => {
  res.json({
    message: "Welcome to the API",
  });
});

// Use the routes defined in routes.js
app.use("/api", apiRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
