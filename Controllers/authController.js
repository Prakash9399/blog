const User = require("../Models/userModel");

const registerUser = async (req, res) => {
    const {name, email, password } = req.body;

    if (!name ||!email || !password) {
        return res.status(400).json({ message: "All fields are mandatory" });
    }

    try {
        const validate = await User.findOne({ email });

        if (validate) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const user = await User.create({
            name,
            email,
            password
        });

        if (user) {
            return res.status(201).json({ message: "User created successfully" });
        } else {
            return res.status(400).json({ message: "Request Forbidden" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

  // login User

 const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are mandatory" });
    }
    try {
        const user=await User.findOne({email})
        if(user){
            if(user.password==password){
                return res.status(200).json({message:"Login Successful"})
            }else{
                return res.status(400).json({message:"Incorrect Password"})
            }
        }else{
            return res.status(400).json({message:"User Not found"})
        }
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
        
    }
  };
  module.exports={registerUser,loginUser}
  