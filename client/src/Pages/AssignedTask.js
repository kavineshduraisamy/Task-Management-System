import React, { useState, useEffect } from 'react';
// import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

const AssignedTask = () => {
  const [assignedTasks, setAssignedTasks] = useState([]);

  useEffect(() => {
    const fetchAssignedTasks = async () => {
      try {
        const response = await fetch('http://localhost:5000/assignedtasks');
        const data = await response.json();
        setAssignedTasks(Array.isArray(data.assignedTasks) ? data.assignedTasks : []);
      } catch (error) {
        console.error('Error fetching assigned tasks:', error);
      }
    };

    fetchAssignedTasks();
  }, []);

  return (
    <div><br/><br/>
      <center>      <h2>Assigned Tasks</h2></center>
      <br/><br/>
      <div className="color">
        <div className="login">
          
            <table style={{width:"100%"}}>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Task Name </th>
                  <th>User Name</th>
                </tr>
              </thead>
              <tbody>
                {assignedTasks.map((task, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{task.taskname}</td>
                    <td>{task.username}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {assignedTasks.length === 0 && <p>No assigned tasks available</p>}
        
        </div>
      </div>
    </div>
  );
};

export default AssignedTask;
