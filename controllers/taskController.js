const asyncHandler = require("express-async-handler");
const Task = require("../models/taskModel");

// @desc Get all tasks
// @route GET api/tasks
// @access private
const getTasks = asyncHandler(async (req,resp)=> {
    const tasks = await Task.find({user_id: req.user.id});
    resp.status(200).json(tasks);
});

// @desc Get a task
// @route GET api/tasks
// @access private
const getTask = asyncHandler(async (req,resp)=> {
    const task = await Task.findById(req.params.id);
    if(!task){
        resp.status(404);
        throw new Error("Task not found!")
    }
    resp.status(200).json(task);
});


// @desc Create a task
// @route POST api/tasks
// @access private
const createTask = asyncHandler(async (req,resp)=> {
    // console.log(req.body);
    const {taskdesc} = req.body;
    if(!taskdesc){
        resp.status(404);
        throw new Error("Please add the task!");
    }

    const addedTask = await Task.create({
        user_id: req.user.id,
        taskdesc
    });

    resp.status(201).json(addedTask);
});


// @desc Update a task
// @route PUT api/tasks/id
// @access private
const updateTask = asyncHandler(async (req,resp)=> {
    const task = await Task.findById(req.params.id);
    if(!task){
        resp.status(404);
        throw new Error("Task not found!")
    }

    if(task.user_id.toString() != req.user.id){
        resp.status(403);
        throw new Error("User don't have permission to update other user");
    }

    const updatedContact = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    resp.status(200).json(updatedContact);
});


// @desc Delete a tasks
// @route GET api/items
// @access private
const deleteTask = asyncHandler(async (req,resp)=> {
    const task = await Task.findById(req.params.id);
    if(!task){
        resp.status(404);
        throw new Error("Task not found!")
    }

    if(task.user_id.toString() != req.user.id){
        resp.status(403);
        throw new Error("User don't have permission to delete other user");
    }
    await Task.findByIdAndRemove(req.params.id);
    resp.status(200).json(task);
});


module.exports = {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}
