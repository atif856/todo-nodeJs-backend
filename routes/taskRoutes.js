const express = require("express");
const { 
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
 } = require("../controllers/taskController");
const validateToken = require("../middleware/validateAccessToken");

const router = express.Router();


router.use(validateToken);
router.get("/", getTasks).post("/", createTask);
router.get("/:id",getTask).put("/:id",updateTask).delete("/:id",deleteTask);


module.exports = router;