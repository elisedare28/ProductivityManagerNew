const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: true 
    },
    task: { 
        type: String, 
        required: true, 
        unique: true 
    },
    status: { 
        type: String,
         required: true 
        },
    deadline: { 
        type: Date, 
        required: true 
    }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;