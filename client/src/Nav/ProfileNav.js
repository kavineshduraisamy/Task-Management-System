import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './navbar.css'
import {useNavigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './header.css'
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';

export default function ProfileNav() {
  const navigate=useNavigate();

  const logOut= () => {
    localStorage.clear();
    navigate('/')
  }
  return (
    <Navbar collapseOnSelect expand="lg"  variant="light" id='style' >
      <Container>
        <Navbar.Brand href="/" style={{fontSize:'larger'}} onClick={logOut}><b>TMS</b></Navbar.Brand>  
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" >
            <Nav.Link href="/admin" ><b>Admin</b> </Nav.Link>
            <Nav.Link href="/createtask"><b>Createtask</b></Nav.Link>
            <Nav.Link href="/assignedtask"><b>Allusertask</b></Nav.Link>
            {/* <Nav.Link href="/withdraw"><b>ViewAllTask</b></Nav.Link> */}
          </Nav>
          {/* <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form> */}
          &nbsp;&nbsp;&nbsp;
          <Nav>
            <Nav.Link eventKey={2} href="#memes">
            </Nav.Link>
            <Nav.Link href="/" onClick={logOut}>LOGOUT</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

