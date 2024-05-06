const express = require("express")
const auth = require("../middleware/auth.js")
const createtask = require("../controllers/CreateTask.js")
const getalltask = require("../controllers/GetAllTasks.js")
const getsingletask = require("../controllers/getsingletask.js")
const deletetask = require("../controllers/Delete.task.js")
const updatetask = require("../controllers/updateTask.js")
const router = express.Router();
router.use(auth)
router.post('/tasks', createtask  );

router.route("/tasks").get(getalltask)
router.route("/tasks/:id").get(getsingletask)
router.route("/tasks/:id").put(updatetask)
router.route("/tasks/:id").delete(deletetask)
module.exports = router