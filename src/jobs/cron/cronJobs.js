// src/jobs/cron/cronJobs.js
const cron = require("node-cron");
const Task = require("../../model/taskModel");

module.exports = (io) => {
  // Run every hour
  cron.schedule("0 * * * *", async () => {
     console.log("Cron job triggered");
    const now = new Date();
    const next24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    try {
      // Mark tasks due soon
      const dueSoonTasks = await Task.updateMany(
        { dueDate: { $lte: next24h, $gte: now }, isOverdue: false },
        { $set: { dueSoon: true } }
      );

      // Mark overdue tasks
      const overdueTasks = await Task.updateMany(
        { dueDate: { $lt: now }, isOverdue: false },
        { $set: { isOverdue: true, dueSoon: false } }
      );

      // If any tasks were updated, notify clients
      if (dueSoonTasks.modifiedCount || overdueTasks.modifiedCount) {
        const updatedTasks = await Task.find();
        io.emit("taskUpdate", updatedTasks);
        console.log("📢 Sent task updates to clients");
      }
    } catch (err) {
      console.error("❌ Cron job error:", err.message);
    }
  });
};
