const Task = require("../model/taskModel");

const createTask = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;

    if (!title || !description || !dueDate) {
      return res.status(400).json({
        status: "error",
        message: "All fields are required",
      });
    }

    const task = new Task({ title, description, dueDate });
    await task.save();

    res.status(201).json({
      status: "success",
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error creating task",
      error: error.message,
    });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error fetching tasks",
      error: error.message,
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({
        status: "error",
        message: "Task not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Task fetched successfully",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error fetching task",
      error: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, dueDate },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({
        status: "error",
        message: "Task not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error updating task",
      error: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({
        status: "error",
        message: "Task not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error deleting task",
      error: error.message,
    });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
