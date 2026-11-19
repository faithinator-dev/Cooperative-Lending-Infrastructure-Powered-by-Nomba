import app from "../src/app.js";
import connectDB from "../src/config/database.js";

// Health checks do not need a database connection. All data routes do.
export default async function handler(req, res) {
  if (req.url?.startsWith("/api/health")) {
    return app(req, res);
  }

  try {
    await connectDB();
    return app(req, res);
  } catch (error) {
    console.error("API database connection failed:", error.message);
    return res.status(503).json({
      success: false,
      message: "Service temporarily unavailable. Database connection is not ready.",
    });
  }
}
