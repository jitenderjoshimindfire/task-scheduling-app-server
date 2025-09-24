const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dueDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  isOverdue: { type: Boolean, default: false },
  dueSoon: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ["complete", "inprogress"],
    required: true,
    default: "inprogress",
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
