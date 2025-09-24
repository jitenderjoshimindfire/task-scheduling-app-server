const Task = require("../model/taskModel");
const calculateTaskFlags = require("../utils/calculateTaskFlag");

const allowedStatuses = ["complete", "inprogress"];

const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, status } = req.body;

    if (!title || !description || !dueDate) {
      return res.status(400).json({
        status: "error",
        message: "All fields except status are required",
      });
    }

    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({
        status: "error",
        message: `Invalid status. Allowed values are ${allowedStatuses.join(
          ", "
        )}`,
      });
    }

    const creator = req.user.id;
    const { isOverdue, dueSoon } = calculateTaskFlags(dueDate);

    const task = new Task({
      title,
      description,
      dueDate,
      creator,
      isOverdue,
      dueSoon,
      status,
    });

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
    const userId = req.user.id;
    const tasks = await Task.find({ creator: userId }).sort({ dueDate: -1 });

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
    const task = await Task.findOne({
      _id: req.params.id,
      creator: req.user.id,
    });

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
    const { title, description, dueDate, status } = req.body;

    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({
        status: "error",
        message: `Invalid status. Allowed values are ${allowedStatuses.join(
          ", "
        )}`,
      });
    }

    const { isOverdue, dueSoon } = calculateTaskFlags(dueDate);

    const updateData = { title, description, dueDate, isOverdue, dueSoon };

    if (status) {
      updateData.status = status;
    }

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, creator: req.user.id },
      updateData,
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
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      creator: req.user.id,
    });
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
