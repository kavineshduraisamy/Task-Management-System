import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/create.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Profile = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const url = "http://localhost:5000";
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      // console.log(localStorage.getItem('token'))
      fetch(`${url}/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((resData) => {
          setData(resData.profileData);
          // console.log(resData.profileData)
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });

      // fetching user task
      fetch(`${url}/readTask`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch tasks");
          }
          return response.json();
        })
        .then((tasksData) => {
          setTasks(tasksData.task);
          console.log(tasksData.task);
        })
        .catch((error) => {
          console.error("Fetch user tasks error:", error);
        });
    }
  }, [navigate]);
  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      <br />
      <br />
      <center>
        <h1 className="h">
          <b>PROFILE</b>
        </h1>
      </center>
      <center>
        <Card className="login">
          <div className="product-details">
            <div className="profile">
              <br />
              <br />
              <h5>DETAILS</h5>
              <hr />
              <table className="profile-table">
                <tbody>
                  <tr>
                    <td className="color">Name:&nbsp;&nbsp;</td>
                    <td>{data.username}</td>
                  </tr>
                  <tr>
                    <td className="color">Email:&nbsp;&nbsp;</td>
                    <td>{data.email}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br />
            <br />
            <center>
              <Button className="glow-on-hover" onClick={logOut}>
                <span className="buy">LogOut</span>
              </Button>
              &nbsp;&nbsp;
            </center>
            <br />
          </div>
        </Card>
        <br /> <br /> <br />
        <Card className="login">
          <div className="profile">
            <br />
            <h5>Tasks</h5>
            <hr />
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Task Name</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{task.taskname}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </center>
    </>
  );
};

export default Profile;
