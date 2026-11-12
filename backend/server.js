// Responsible for initializing the Express application, mounting middleware and routes, and starting the HTTP server.

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");

const notFound = require("./middleware/notFoundMiddleware");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

// Built-in and external middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/tasks", taskRoutes);

// Error handling middleware (must come after routes)
app.use(notFound);
app.use(errorHandler);

// Start server after database connection
const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
