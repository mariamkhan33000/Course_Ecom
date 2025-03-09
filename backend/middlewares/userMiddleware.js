import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
    try {
        // Get token from cookies
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // Attach user ID to request
        req.user = decoded;

        next(); // Proceed to the next middleware or controller
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
};
