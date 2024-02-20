import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './css/login.css'
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate()
    // React.useEffect(()=>{
    //     if(localStorage.getItem('token')){
    //         navigate('/profile')
    //     }
    // })
    const hom = () => {
        navigate('/')
    }
    const userLog = async () => {
        const response = await axios.post('http://localhost:5000/login',
            {
                email: email,
                password: password
            })
            .then(async res => {
                console.log(await res);
                if (await res.data) {
                    localStorage.setItem('token', res.data.token);
                    console.log(await res.data)
                    console.log(localStorage.token)
                    if (await res.data.role === 'admin') {
                        window.location = "/admin"
                    } else {
                        window.location = '/profile';
                    }
                }
            })
            .catch(err => {
                console.log(err.message);
                alert("Email & password not matching");
            });
        console.log(response)
    }
    return (
        <>
            <br /><br />
            <center> <h1>LOGIN</h1>  </center>
            <div className="color">
                <div className="login">
                    <Card className="form">
                        <div className="login100-form validate-form">
                            <span className="login100-form-title">
                            </span>
                            <center>
                                <div className="form_first2">
                                    <div className="input-field" data-validate="Valid email is required: ex@abc.xyz">
                                        <label>Email </label><br />
                                        <input className="input100" type="text" name="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
                                        <span className="focus-input100"></span>
                                        <span className="symbol-input100">
                                        </span>
                                    </div>

                                    <div className="input-field" data-validate="Password is required">
                                        <label>Password </label><br />
                                        <input className="input100" type="password" name="pass" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
                                    </div>
                                    <br />
                                    <div className="container-login100-form-btn">
                                        <Button type="button" className='glow-on-hover' onClick={userLog} >
                                            Login
                                        </Button>
                                    </div>
                                    <br />
                                    <br />
                                    <div className="container-login100-form-btn">
                                        <Button className='glow-on-hover' onClick={hom}>
                                            Back to Home
                                        </Button>
                                    </div>

                                </div>
                            </center>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
}

export default Login;