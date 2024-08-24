const express = require('express');
const router = express.Router();
const Task = require('../task');  

router.post('/route', async (req, res) => {
    const { task, status, deadline } = req.body;
    const email = req.userEmail;  

    const newTask = new Task({
        email,
        task,
        status,
        deadline
    });

    try {
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/route', async (req, res) => {
    const email = req.userEmail; 

    try {
        const tasks = await Task.find({ email });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('route/:taskId', async (req, res) => {
    const email = req.userEmail; 
    const { taskId } = req.params;
    const { task, status, deadline } = req.body;

    try {
        const updatedTask = await Task.findOneAndUpdate(
            { _id: taskId, email },
            { task, status, deadline },
            { new: true, runValidators: true }
        );

        if (!updatedTask) return res.status(404).json({ message: 'Task not found' });

        res.json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/route/:taskId', async (req, res) => {
    const email = req.userEmail;   
    const { taskId } = req.params;

    try {
        const result = await Task.deleteOne({ _id: taskId, email });
        if (result.deletedCount === 0) return res.status(404).json({ message: 'Task not found' });

        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
