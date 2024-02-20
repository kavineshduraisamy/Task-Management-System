const express = require("express");
const router = express.Router();
const controller = require("../Controller/controller");
const taskcontroller = require("../Controller/taskcontroller");
const validatetoken = require("../Middleware/auth");

//usercontroller  sections
router.post("/register", controller.registerData);
router.post("/login", controller.loginData);
router.get("/profile", validatetoken, controller.getProfile);
router.put("/update/:id", controller.updateDataRoute);
// router.get('/check',validatetoken,controller.check)
// router.get('/login', controller.loginData);


// taskcontroller sections
router.post("/assigntask", taskcontroller.assignTask);
router.get("/gettasks", taskcontroller.getTasks);
router.post("/assignTaskToUser", taskcontroller.assignTaskToUser);
router.get("/getusers", taskcontroller.getusers);
router.get("/assignedtasks", taskcontroller.assignedTask);
router.get("/readTask", validatetoken, taskcontroller.readTask);

module.exports = router;
