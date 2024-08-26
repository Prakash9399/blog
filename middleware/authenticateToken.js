const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    // Extract token from the Authorization header
    const token = req.headers['authorization']?.split(' ')[1]; // Expecting "Bearer token"

    if (!token) {
        return res.status(401).json({ message: "Token required" });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }
        req.user = user; // Attach user info to request object
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = authenticateToken;