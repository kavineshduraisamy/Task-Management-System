import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/create.css'
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';



const Adminpage = () => {
  const navigate = useNavigate();
      const hom = () => {
        localStorage.clear();
        navigate('/');
      };

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [role, setRole] = useState();
 
  
 var url = "http://localhost:5000";


  const Reg = () => {
    if (!username ||  !email  ||  !role ) {
      alert("Fill the required fields");
    } else {
      axios
        .post(url + '/register', {
          username: username,
          email: email,
          role: role,
        })
        .then((res) => {
          alert("Thank you for registering");
          setUsername('');
          setEmail('');
          setRole('');
                 })
        .catch((err) => {
          console.log(err.message);
          alert(err.message);
        });
    }
  };
  return (
    <>
    <br/><br/>
      <form action="#">
        <center><h5>Admin Dashboard</h5></center>
        
        <br/><br/>
        <center>
          <h1>User Registeration</h1>
          <br/><br/>
        </center>
        <center>
        <div className="color">
        <div className="login">
          <Card className="form">
              <div className="input-field">
                <label>Full Name</label>
                <input type="text" placeholder="Enter your name" required onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="input-field">
                <label>Email</label>
                <input type="email" placeholder="Enter your email" required onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="input-field">
                <label>Role</label><br></br><br></br>
                <select onChange={(e) => setRole(e.target.value)} required>
                  <option>Select Role</option>
                  <option value="admin">admin</option>
                  <option value="user">user</option>
                </select>
              </div>
              <br/> <br/> 
              <Button  disabled={!username || !email } onClick={Reg}  className='glow-on-hover'>
                Register
              </Button><br/>
              <Button onClick={hom}  className='glow-on-hover'>
               Logout
              </Button>
              </Card>
            </div>
          </div>
        </center>
      </form>
    </>
  );
};

export default Adminpage;
