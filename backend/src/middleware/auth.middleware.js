import jwt from 'jsonwebtoken'

export function authmiddleware(req, res, next) {
    try {
        const token = req.cookies.logintoken; // Fixed: should be req.cookies, not res.cookies

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized access - No token provided"
            });
        }

        console.log('JWT Secret Key:', process.env.JWT_SECRET_KEY ? 'Present' : 'Missing');

        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

        console.log('Decoded token:', decode);

        // Attach user data to request object for use in next middleware/routes
        req.user = decode;

        // Continue to next middleware/route handler
        next();

    } catch (error) {
        console.error('Auth middleware error:', error.message);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: "Token expired"
            });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                message: "Invalid token"
            });
        } else {
            return res.status(500).json({
                message: "Internal server error"
            });
        }
    }
}