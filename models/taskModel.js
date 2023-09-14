const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    taskdesc: {
        type: String,
        required: [true, "Please add the task"],
    },
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("Task", taskSchema);