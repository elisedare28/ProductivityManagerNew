import React, { useState, useEffect } from 'react';
//import axios from 'axios';
/*import { tasklist,
    toggleEditable,
    addTask,
    saveEditedTask,
    deleteTask,
    editableTask,
    editedTask,
    setEditedTask,
    editedStatus,
    setEditedStatus,
    editedDeadline,
    setEditedDeadline,
    newTask,
    setNewTask,
    newStatus,
    setNewStatus,
    newDeadline,
    setNewDeadline } from '../App';
*/
const Taskboard = ({tasklist,
    toggleEditable,
    addTask,
    saveEditedTask,
    deleteTask,
    editableTask,
    editedTask,
    setEditedTask,
    editedStatus,
    setEditedStatus,
    editedDeadline,
    setEditedDeadline,
    newTask,
    setNewTask,
    newStatus,
    setNewStatus,
    newDeadline,
    setNewDeadline}) => {
    
   /* const [tasklist, setTaskList] = useState([]);
    const [editableTask, setEditableTask] = useState(null);
    const [editedTask, setEditedTask] = useState("");
    const [editedStatus, setEditedStatus] = useState("");
    const [newTask, setNewTask] = useState("");
    const [newStatus, setNewStatus] = useState("");
    const [newDeadline, setNewDeadline] = useState("");
    const [editedDeadline, setEditedDeadline] = useState("");

        
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/tasks');
                setTaskList(response.data);
            } catch (error) {
                console.error('Error fetching tasks ', error);
            }
        };
        fetchTasks();
    }, []);


    const toggleEditable = (taskName) => {
        const rowData = tasklist.find((data) => data.task === taskName);
        if (rowData) {
            setEditableTask(taskName);
            setEditedTask(rowData.task);
            setEditedStatus(rowData.status);
            setEditedDeadline(rowData.deadline || "");
        } else {
            setEditableTask(null);
            setEditedTask("");
            setEditedStatus("");
            setEditedDeadline("");
        }
    };

    const addTask = (e) => {
        e.preventDefault();
        if (!newTask || !newStatus || !newDeadline) {
            alert("All fields must be filled out.");
            return;
        }

        axios.post('http://localhost:5000/api/tasks', { task: newTask, status: newStatus, deadline: newDeadline })
            .then(res => {
                setTaskList([...tasklist, res.data]);
                setNewTask("");
                setNewStatus("");
                setNewDeadline("");
            })
            .catch(err => console.log(err));
    };

    const saveEditedTask = (taskName) => {
        const editedData = {
            task: editedTask,
            status: editedStatus,
            deadline: editedDeadline,
        };

        if (!editedTask || !editedStatus || !editedDeadline) {
            alert("All fields must be filled out.");
            return;
        }

        axios.put(`http://localhost:5000/api/tasks/${taskName}`, editedData)
            .then(result => {
                setTaskList(tasklist.map(task =>
                    task.task === taskName ? { ...task, ...editedData } : task
                ));
                setEditableTask(null);
                setEditedTask("");
                setEditedStatus("");
                setEditedDeadline("");
            })
            .catch(err => console.log(err));
    };

    const deleteTask = (taskName) => {
        axios.delete(`http://localhost:5000/api/tasks/${taskName}`)
            .then(result => {
                setTaskList(tasklist.filter(task => task.task !== taskName));
            })
            .catch(err => console.log(err));
    };*/

    return (
        <>
            <div className="taskboard">
                <h3>Tasks</h3>
                <div className="container">
                    <table>
                        <thead>
                            <tr>
                                <th>Task</th>
                                <th>Status</th>
                                <th>Deadline</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        {Array.isArray(tasklist) ? (
                            <tbody>
                                {tasklist.map((data) => (
                                    <tr key={data.task}>
                                        <td>
                                            {editableTask === data.task ? (
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={editedTask}
                                                    onChange={(e) => setEditedTask(e.target.value)}
                                                />
                                            ) : data.task}
                                        </td>
                                        <td>
                                            {editableTask === data.task ? (
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={editedStatus}
                                                    onChange={(e) => setEditedStatus(e.target.value)}
                                                />
                                            ) : data.status}
                                        </td>
                                        <td>
                                            {editableTask === data.task ? (
                                                <input
                                                    type="datetime-local"
                                                    className="form-control"
                                                    value={editedDeadline}
                                                    onChange={(e) => setEditedDeadline(e.target.value)}
                                                />
                                            ) : data.deadline ? new Date(data.deadline).toLocaleString() : ''}
                                        </td>
                                        <td>
                                            {editableTask === data.task ? (
                                                <>
                                                    <button className="save"
                                                        onClick={() => saveEditedTask(data.task)}>
                                                        Save
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button className="edit"
                                                        onClick={() => toggleEditable(data.task)}>
                                                        Edit
                                                    </button>
                                                    <button className="delete"
                                                        onClick={() => deleteTask(data.task)}>
                                                        Delete
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        ) :
                            <tbody>
                                <tr>
                                    <td colSpan="4">No tasks pending!</td>
                                </tr>
                            </tbody>
                        }
                    </table>
                </div>
            </div>

            <div className="addtask">
                <h3>Add Task</h3>
                <div className="sign-up-modal">
                    <form className="details" onSubmit={addTask}>
                        <div className="input-container">
                            <input className="col-sm-12 email-input with-placeholder"
                                id="email" type="text"
                                placeholder="Task"
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                            />
                        </div>
                        <div className="input-container">
                            <input className="col-sm-5 username-input with-placeholder"
                                id="username"
                                type="text"
                                placeholder="Status"
                                value={newStatus}
                                onChange={(e) => setNewStatus(e.target.value)}
                            />
                        </div>
                        <div className="input-container">
                            <input className="col-sm-5 col-sm-push-2 password-input with-placeholder"
                                id="password"
                                type="datetime-local"
                                value={newDeadline}
                                placeholder="Deadline"
                                onChange={(e) => setNewDeadline(e.target.value)}
                            />
                        </div>
                        <input id="sign-up-button" type="submit" value="Save" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default Taskboard;
