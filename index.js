const express=require("express");
const DBconnect = require("./config/DBconfig");
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
DBconnect();
app.listen(PORT,()=>{
    console.log("Server is Listing ")
})
app.use("/api/auth",require("./Routes/authRoutes"))
app.use("/api/v1/",require("./Routes/blogRoutes"))