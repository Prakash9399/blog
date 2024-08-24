const express=require("express");
const DBconnect = require("./config/DBconfig");
require('dotenv').config();
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
DBconnect();
app.listen(PORT,()=>{
    console.log("Server is Listing ")
})

app.use(cors({
    origin: '*', // Replace with your frontend's URL or use '*' to allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Specify allowed headers
  }));

app.use("/api/auth",require("./Routes/authRoutes"))
app.use("/api/v1/",require("./Routes/blogRoutes"))