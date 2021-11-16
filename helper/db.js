const mongoose = require("mongoose");

module.exports = () => {
    const uri =
        "mongodb+srv://Jamoliddin:keTiXg8SYHGSh0s7@cluster0.dktr4.mongodb.net/Instagram";
    const db = mongoose.connection;

    mongoose.connect(uri, {
        useNewUrlParser: true,
    });

    db.on("open", () => {
        console.log("server running");
    });

    db.on("error", () => {
        console.log("server error");
    });
};