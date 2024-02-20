import React from 'react';
import './css/footer.css';
// import "@fortawesome/fontawesome-free/css/all.min.css";
<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
const Footer = () => {
  return (
    <>
   <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <p className='foot'>Contact Us</p >
          <p>Email: contact@tms.com</p>
          <p>Phone: 123-456-7890</p>
        </div>
        <div className="footer-section">
          <p className='foot'>Links</p>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/create">Create User</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
       
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 TMS, Inc. All rights reserved.</p>
      </div>
    </footer>
    </>
  );
};
export default Footer;
