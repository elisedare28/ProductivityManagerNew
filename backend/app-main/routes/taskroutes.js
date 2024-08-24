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

router.put('/route/:taskName', async (req, res) => {
    const email = req.userEmail; 
    const { taskName } = req.params;
    const { task, status, deadline } = req.body;

    try {
        const updatedTask = await Task.findOneAndUpdate(
            { task: taskName, email },
            { task, status, deadline },
            { new: true, runValidators: true }
        );

        if (!updatedTask) return res.status(404).json({ message: 'Task not found' });

        res.json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/route/:taskName', async (req, res) => {
    const email = req.userEmail;   
    const { taskName } = req.params;

    try {
        const result = await Task.deleteOne({ task: taskName, email });
        if (result.deletedCount === 0) return res.status(404).json({ message: 'Task not found' });

        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
