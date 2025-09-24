const express = require("express");
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controller/taskController");
const protectedRoutes = require('../middleware/protectedRoutes')


const router = express.Router();

router.use(protectedRoutes)  //protected routes for signed in users

router.post("/tasks", createTask);

router.get("/tasks", getAllTasks);

router.get("/tasks/:id", getTaskById);

router.put("/tasks/:id", updateTask);

router.delete("/tasks/:id", deleteTask);

module.exports = router;
