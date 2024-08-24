import React, { useState, useEffect } from "react";
import Titlebar from "./components/titlebar";
import Taskboard from "./components/taskboard";
import Calendar from "./components/calendar";
import axios from "axios";

function Home({ user, token }) {
  const [tasklist, setTaskList] = useState([]);
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
        const response = await axios.get('https://productivity-manager-new-api.vercel.app/api/tasks/routes/route', {
          headers: {
            Authorization: token
          }
        });
        setTaskList(response.data);
      } catch (error) {
        console.error('Error fetching tasks', error);
      }
    };

    if (token) {
      fetchTasks();
    }
  }, [token]);

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

    axios.post('https://productivity-manager-new-api.vercel.app/api/tasks/route', 
      { task: newTask, status: newStatus, deadline: newDeadline },
      { headers: { Authorization: token } }
    )
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

    axios.put(`https://productivity-manager-new-api.vercel.app/api/tasks/${taskName}/route`, editedData,
      { headers: { Authorization: token } }
    )
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
    axios.delete(`https://productivity-manager-new-api.vercel.app/api/tasks/${taskName}/route`,
      { headers: { Authorization: token } }
    )
      .then(result => {
        setTaskList(tasklist.filter(task => task.task !== taskName));
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="App">
      <Titlebar />
      <div className="first-section">
        <div className="first-left">
          <Taskboard 
            tasklist={tasklist}
            toggleEditable={toggleEditable}
            addTask={addTask}
            saveEditedTask={saveEditedTask}
            deleteTask={deleteTask}
            editableTask={editableTask}
            editedTask={editedTask}
            setEditedTask={setEditedTask}
            editedStatus={editedStatus}
            setEditedStatus={setEditedStatus}
            editedDeadline={editedDeadline}
            setEditedDeadline={setEditedDeadline}
            newTask={newTask}
            setNewTask={setNewTask}
            newStatus={newStatus}
            setNewStatus={setNewStatus}
            newDeadline={newDeadline}
            setNewDeadline={setNewDeadline}            
          />
        </div>
        <div className="first-right">
          <Calendar tasklist={tasklist} />
        </div>
      </div>
    </div>
  );
}

export default Home;