import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import './css/home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import homelogo2 from './images/homelogo2.png'
import Button from 'react-bootstrap/Button';
const Home = () => {
    const navigate = useNavigate();
    const log = () => {
        navigate('/login');
    };
    return (
        <>
            <div className="container">
                <div className="card-container">
                    <Card className="card">
                        <Card.Body>
                            <Card.Title>Task Management</Card.Title><br/>
                            <Card.Text>
                                <br/><br/>  <center>
                                    <Button className='glow-on-hover' onClick={log}>LOGIN</Button>&nbsp;&nbsp;&nbsp;
                                </center>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="image-container">
                {/* <img className="side-image" src="https://flexa-react.envytheme.com/images/banner/banner-img-five.png" alt='bankimage' /> */}
                    
                    <img className="side-image" src={homelogo2} alt='bankimage' />
                </div>
            </div>
        </>
    );
}

export default Home;
