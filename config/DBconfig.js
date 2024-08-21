const mongoose = require("mongoose");

const DBconnect = async () => {
  try {
    const connect = await mongoose.connect("mongodb+srv://rajputprakash9399:Prakash9399@cluster0.xfvwbp3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("DB connected:", connect.connection.host);
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = DBconnect;
