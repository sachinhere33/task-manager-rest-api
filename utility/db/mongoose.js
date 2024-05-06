const mongoose = require("mongoose");
    (async () => {
        try {
            await mongoose.connect("mongodb://localhost:27017/taskmanager")
            console.log("database connected")
        } catch (error) { console.log(error) }
    }


    )()