const { PORT, MONGO_URI, CLIENT_ORIGIN } = require("./config/config");
const { connectDB } = require("./config/mongoose");
const { createApp } = require("./config/express");

async function main() {
  await connectDB(MONGO_URI);

  const app = createApp({ clientOrigin: CLIENT_ORIGIN });

  app.get("/", (req, res) => res.send("COMP308 Lab 1 API running"));

  app.use("/auth", require("./routes/authRoutes"));
  app.use("/api/students", require("./routes/studentRoutes"));
  app.use("/api/courses", require("./routes/courseRoutes"));
  app.use("/api/enroll", require("./routes/enrollRoutes"));

  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}

main().catch((err) => {
  console.error("Server startup error:", err);
  process.exit(1);
});
