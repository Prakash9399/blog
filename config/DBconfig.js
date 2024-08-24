require('dotenv').config(); 

const mongoose = require('mongoose');

const DBconnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('DB connected:', connect.connection.host);
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
    process.exit(1); 
  }
};

module.exports = DBconnect;
