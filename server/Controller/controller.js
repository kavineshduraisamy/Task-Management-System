const db = require("../Config/Dbconfig");
const jwt = require("jsonwebtoken");
const generateUUID = require("../Utils/uuidgeneration/uuidgeneration");
const { hashpassword } = require('../Middleware/hashing');
const { hashValidater } = require('../Middleware/hashing');
const {transporter} =require('../Utils/emailConfig/emailConfig')

// Function to generate a random alphanumeric password
const generateRandomPassword = (length) => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};
const registerData = async (req, res) => {
  const { username, email, role } = req.body;
  const userid = generateUUID();
  const createdby = "admin";
  const createdat = new Date().toISOString();
  const updateby = "admin";
  const updateat = createdat;
  const active = 1;

  try {
    const randomPassword = generateRandomPassword(8);
    const hashedPassword = await hashpassword(randomPassword); 

    const insertQuery = `
      INSERT INTO userlist (userid, username, email, password, role, createdby, createdat, updateby, updateat, active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const insertData = [
      userid,
      username,
      email,
      hashedPassword,
      role,
      createdby,
      createdat,
      updateby,
      updateat,
      active,
    ];
    db.query(insertQuery, insertData, async (error, results) => {
      if (error) {
        console.error("Error inserting data:", error);
        res.status(500).json({ error: "Error inserting data" });
        return;
      }
      try {
        const mailOptions = {
          from: 'kavineshduraisamy@gmail.com',
          to: email,
          subject: 'Account Creation Notification',
          text: `Dear ${username}, Your account has been successfully created! Your temporary password is: ${randomPassword}`
        };
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
      } catch (emailError) {
        console.error('Error sending email:', emailError);
      }
      res.status(200).json({ message: "Data inserted successfully", results });
    });
  } catch (error) {
    console.error("Error hashing password:", error);
    res.status(500).json({ error: "Error hashing password" });
  }
};


const loginData = (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)
  const selectQuery = `SELECT * FROM taskmanagement_db.userlist WHERE email = '${email}'`;
  db.query(selectQuery, async (selectError, selectResult) => {
    if (selectError) {
      console.error("Error querying user:", selectError);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    if (selectResult.length === 0) {
      res.status(401).json({ error: "Invalid email or password" });
    } else {
      const user = selectResult[0];
      const hashedPasswordFromDB = user.password;
      const passwordMatch = await hashValidater(password, hashedPasswordFromDB);
      if (passwordMatch) {
        const token = jwt.sign(
          { email: user.email, role: user.role, userid: user.userid },
          process.env.JWT_SECRET
        );
        res.status(200).json({ message: "Login successful", token, role: user.role });
      } else {
        res.status(401).json({ error: "Invalid email or password" });
      }
    }
  });
};

const getProfile = (req, res) => {
  // console.log(req.user);
  const email = req.user.email;
  const selectQuery = `
    SELECT * FROM userlist WHERE email = ? 
  `;
  db.query(selectQuery, [email], (error, results) => {
    if (error) {
      console.error("Error retrieving profile data:", error);
      res.status(500).json({ error: "Error retrieving profile data" });
      return;
    }
    // console.log(results)
    if (results.length === 0) {
      res.status(404).json({ error: "User not found or not a user role" });
      return;
    }
    const profileData = results[0];
    res.status(200).json({ profileData });
  });
};

const updateDataRoute = (req, res) => {
  const { username, email, mobile, sampleid } = req.body;
  const updateQuery = `UPDATE userlist SET username='${username}', email='${email}', mobile='${mobile}', sampleid='${sampleid}' WHERE id='${id}'`;
  db.query(updateQuery, (error, results) => {
    if (error) {
      console.error("Error updating data:", error);
      res.status(500).json({ error: "Error updating data" });
      return;
    }
    res.status(200).json({ message: "Data updated successfully", results });
  });
};

module.exports = {
  registerData,
  loginData,
  getProfile,
  updateDataRoute,
};
