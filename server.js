// server.js
const app = require("./app");
const http = require("http");
const { Server } = require("socket.io");
const PORT = process.env.PORT || 5000;
const connectMongoDB = require("./src/config/db/mongoDB");

// Create HTTP server from Express app
const server = http.createServer(app);

// Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

// Pass io to cron jobs
require("./src/jobs/cron/cronJobs")(io);

connectMongoDB()
  .then(() => {
    server.listen(PORT, "localhost", () => {
      console.log("✅ Server running on port: " + PORT);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed", err);
    process.exit(1);
  });

// Handle client connections
io.on("connection", (socket) => {
  console.log("🔗 Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});
