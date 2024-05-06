const Task = require("../models/Task");

module.exports = async (req, res) => {
    try {
        const taskId = req.body.id; // Assuming your request body has the task ID to delete
        const task = await Task.findByIdAndDelete(taskId);

        if (!task) {
            return res.status(404).json({ status: "fail", error: "Task not found" });
        }

        res.status(200).json({ status: "success", message: "Task deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "fail", error: "Task deletion failed", err });
    }
};
