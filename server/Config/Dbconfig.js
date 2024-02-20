const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.USERNAME,
    password: process.env.PASS,
    database: "taskmanagement_db"
});
db.connect((err) => {
    if (err) {
        console.error("Error connecting to database");
    } else {
        console.log("Database connected");
    }
});
module.exports=db