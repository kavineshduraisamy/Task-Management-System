import React, { useState, useEffect } from 'react';
import './css/login.css';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateTask = () => {

   
  const navigate = useNavigate();
  const [taskname, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [tasks, setTasks] = useState([]);
  const [user, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState({});

  
 
 

const handleSubmit = async () => {
  const requestData = { taskname, description, deadline };
  
  try {
    const response = await axios.post('http://localhost:5000/assigntask', requestData, {

      headers: { 'Content-Type': 'application/json' }
    });
    
    const data = response.data;
    console.log(data);
    setTasks([...tasks, data]);
  } catch (error) {
    console.error('Error:', error);
  }
};
useEffect(() => {
  const fetchTasks = async () => {
    try {
      const tasksResponse = await fetch('http://localhost:5000/gettasks');
      const tasksData = await tasksResponse.json();
      setTasks(Array.isArray(tasksData.tasks) ? tasksData.tasks : []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const usersResponse = await fetch('http://localhost:5000/getusers');
      const usersData = await usersResponse.json();
      setUsers(Array.isArray(usersData.users) ? usersData.users : []);
      console.log(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  fetchTasks();
  fetchUsers();
}, [handleSubmit]);

  const handleAssignTask = async (taskid, taskname) => {
    const username = user.find((u) => u.userid === selectedUsers[taskid])?.username;
    try {
      const response = await fetch('http://localhost:5000/assignTaskToUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskid,
          userid: selectedUsers[taskid],
          taskname,
          username,
        }),
      });
      const data = await response.json();
      console.log(data);
      alert('Task Assigned to the user')
      navigate("/assignedTask");
      
    } catch (error) {
      console.error('Error assigning task:', error);
    }
  };

  const handleUserSelection = (taskid, userid) => {
    setSelectedUsers({
      ...selectedUsers,
      [taskid]: userid,
    });
  };

  return (
    <div>
      <br />
      <br />
      <center>
        <h2>Create Task</h2>
      </center>
      <br />
      <br />
      <div className="color">
        <div className="login">
          <Card className="form">
            <form  >
              <label>
                Task Name:
                <input
                  type="text"
                  value={taskname}
                  onChange={(e) => setTaskName(e.target.value)}
                  required
                />
              </label>
              <br />
              <label>
                Description:
                <input
                  value={description}
                  maxLength={200}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </label>
              <br/>
              <label>
                Deadline:
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  required
                />
              </label>
              <br />
              <Button  onClick={() => handleSubmit()}>Create Task</Button>
            </form>
          </Card>
        </div>
      </div>
      <div>
        <br />
        <br />
        <center>
          <h2>Tasks List</h2>
        </center>
        <br />
        <br />
        <table style={{ width: '99%', marginLeft: '.5%' }}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Task Name</th>
              <th>Description</th>
              <th>Deadline</th>
              <th>Assign Task</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{task.taskname}</td>
                <td>{task.description}</td>
                <td>{task.deadline}</td>
                <td>
                  <select
                    value={selectedUsers[task.taskid] || ''}
                    onChange={(e) => handleUserSelection(task.taskid, e.target.value)}
                  >
                    <option value="">Select User</option>
                    {user.map((user) => (
                      <option key={user.userid} value={user.userid}>
                        {user.username}
                      </option>
                    ))}
                  </select>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Button onClick={() => handleAssignTask(task.taskid, task.taskname)}>
                    Assign Task
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {tasks.length === 0 && <p>No tasks available</p>}
      </div>
    </div>
  );
};

export default CreateTask;
