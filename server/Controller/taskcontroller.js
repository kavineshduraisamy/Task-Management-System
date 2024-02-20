const db = require("../Config/Dbconfig");
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const {
  generateHTMLRows,
  htmlTemplate,
  htmlRows,
} = require("../Utils/emailTemplate/emailTemplate");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const generateUUID = require("../Utils/uuidgeneration/uuidgeneration");
const assignTask = (req, res) => {
  const { taskname, description, deadline } = req.body;
  const taskid = generateUUID();
  const createdby = "admin";
  const createdat = new Date().toISOString();
  const updateby = "admin";
  const updateat = createdat;
  const active = 1;
  const insertQuery = `
      INSERT INTO assigntask (taskid, taskname, description, deadline, createdby, createdat, updateby, updateat, active)
      VALUES ('${taskid} ','${taskname}','${description}', '${deadline}', '${createdby} ','${createdat} ','${updateby} ','${updateat} ','${active} ')
    `;
  const insertData = [
    taskid,
    taskname,
    description,
    deadline,
    createdby,
    createdat,
    updateby,
    updateat,
    active,
  ];
  db.query(insertQuery, insertData, (error, results) => {
    if (error) {
      console.error("Error inserting data:", error);
      res.status(500).json({ error: "Error inserting data" });
      return;
    }
    res.status(200).json({ message: "Data inserted successfully", results });
  });
};
const getTasks = (req, res) => {
  const selectQuery = `SELECT * FROM assigntask WHERE active = 1`;
  db.query(selectQuery, (error, results) => {
    if (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ error: "Error fetching tasks" });
      return;
    }
    res.status(200).json({ tasks: results });
  });
};
const assignTaskToUser = (req, res) => {
  const { userid, taskid, taskname, username } = req.body;
  const tableid = generateUUID();
  const createdby = "admin";
  const createdat = new Date().toISOString();
  const updateby = "admin";
  const updateat = createdat;
  const active = 1;
  const assignTaskQuery = `
      INSERT INTO usertasks (tableid, userid, taskid, taskname, username, createdby, createdat, updateby, updateat, active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  const getuserEmail = `
      SELECT email FROM userlist WHERE userid = ?
    `;
  db.query(
    assignTaskQuery,
    [
      tableid,
      userid,
      taskid,
      taskname,
      username,
      createdby,
      createdat,
      updateby,
      updateat,
      active,
    ],
    async (error, results) => {
      if (error) {
        console.error("Error assigning task:", error);
        res.status(500).json({ error: "Error assigning task" });
        return;
      }
      db.query(getuserEmail, [userid], async (emailError, emailResults) => {
        if (emailError || emailResults.length === 0) {
          console.error(
            "Error fetching user email:",
            emailError || "User not found"
          );
          res.status(500).json({ error: "Error fetching user email" });
          return;
        }
        const email = emailResults[0].email;
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "kavineshduraisamy@gmail.com",
            pass: "aecd hiue moyo lhcw",
          },
        });
        const mailConfig = {
          from: "kavineshduraisamy@gmail.com",
          to: email,
          subject: "Task Assigned",
          text: `Hello ${username},\n\nYou have been assigned a new task: ${taskname}.`,
        };
        try {
          await transporter.sendMail(mailConfig);
          res.status(200).json({
            message: "Task assigned successfully and email sent",
            results,
          });
        } catch (emailError) {
          console.error("Error sending email:", emailError);
          res
            .status(500)
            .json({ error: "Error assigning task and sending email" });
        }
      });
    }
  );
};

const getusers = (req, res) => {
  const role = "user";
  const selectQuery = `SELECT * FROM userlist WHERE role = ?`;
  db.query(selectQuery, [role], (error, results) => {
    if (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Error fetching users" });
      return;
    }
    res.status(200).json({ users: results });
  });
};
const assignedTask = (req, res) => {
  const fetchAssignedTasksQuery = "SELECT * FROM usertasks";
  db.query(fetchAssignedTasksQuery, (error, results) => {
    if (error) {
      console.error("Error fetching assigned tasks:", error);
      res.status(500).json({ error: "Error fetching assigned tasks" });
      return;
    }
    res.status(200).json({ assignedTasks: results });
  });
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kavineshduraisamy@gmail.com",
    pass: "aecd hiue moyo lhcw",
  },
});
const sendEmailWithTable = () => {
  const fetchAssignedTasksQuery = "SELECT * FROM usertasks";
  db.query(fetchAssignedTasksQuery, (error, results) => {
    if (error) {
      console.error("Error fetching assigned tasks:", error);
      return;
    }
    const htmlRows = htmlTemplate(results);
    const mailOptions = {
      from: "kavineshduraisamy@gmail.com",
      to: "kavineshd21@gmail.com",
      subject: "TABLE ALERT",
      html: htmlRows,
    };
    transporter.sendMail(mailOptions, (mailError, info) => {
      if (mailError) {
        console.error("Error sending email:", mailError);
      } else {
        console.log("Email sent to admin:", info.response);
      }
    });
  });
};
const createCSVFile = (data) => {
  const csvWriter = createCsvWriter({
    path: "./Utils/csvFiles/assignedTasks.csv",
    header: [
      { id: "taskname", title: "Task Name" },
      { id: "username", title: "Task Name" },
    ],
  });
  return csvWriter.writeRecords(data);
};

const sendExcelfile = () => {
  const fetchAssignedTasksQuery = "SELECT * FROM usertasks";
  db.query(fetchAssignedTasksQuery, (error, results) => {
    if (error) {
      console.error("Error fetching assigned tasks:", error);
      return;
    }
    createCSVFile(results)
      .then(() => {
        const mailOptions = {
          from: "kavineshduraisamy@gmail.com",
          to: "kavineshd21@gmail.com",
          subject: "View All Reports ",
          text: "Please find the attached CSV file.",
          attachments: [
            {
              filename: "assignedTasks.csv",
              path: "./Utils/csvFiles/assignedTasks.csv",
            },
          ],
        };
        transporter.sendMail(mailOptions, (mailError, info) => {
          if (mailError) {
            console.error("Error sending email:", mailError);
          } else {
            console.log("Email sent to admin:", info.response);
          }
        });
      })
      .catch((csvError) => {
        console.error("Error creating CSV file:", csvError);
      });
  });
};

const cronschedule = cron.schedule("*/300 * * * *", () => {
  sendExcelfile();
});

const readTask = (req, res) => {
  const userid = req.user.userid;
  const readQuery = `
  SELECT taskname FROM usertasks WHERE userid = ?`;
  db.query(readQuery, [userid], (error, task) => {
    if (error) {
      console.error("Error reading data:", error);
      res.status(500).json({ error: "Error reading data" });
      return;
    }
    if (task.length === 0) {
      // console.log(userid);
      res.status(404).json({ message: "Task not found" });
      return;
    }
    // console.log(task);
    res.status(200).json({ message: "Task retrieved successfully", task });
  });
};

// const assignTaskToUser = (req, res) => {
//   const {userid,taskid,taskname,username,} = req.body;
//   const tableid = generateUUID();
//   const createdby = 'admin';
//   const createdat = new Date().toISOString();
//   const updateby = 'admin';
//   const updateat = createdat;
//   const active = 1;

//   const assignTaskQuery = `
//     INSERT INTO usertasks (tableid, userid, taskid,taskname,username,createdby,createdat,updateby,updateat,active)
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?)
//   `;

//   db.query(
//     assignTaskQuery,
//     [tableid, userid, taskid,taskname,username, createdby, createdat, updateby, updateat, active],
//     (error, results) => {
//       if (error) {
//         console.error('Error assigning task:', error);
//         res.status(500).json({ error: 'Error assigning task' });
//         return;
//       }
//       res.status(200).json({ message: 'Task assigned successfully', results });
//     }
//   );
// };

module.exports = {
  assignTask,
  readTask,
  getTasks,
  assignTaskToUser,
  getusers,
  assignedTask,
  sendEmailWithTable,
  cronschedule,
  sendExcelfile,
};
