import jwt from 'jsonwebtoken';
import env from 'dotenv';

env.config();

const jwtService = {
    generateToken: (payload) => {
        return jwt.sign({payload}, process.env.SECRET_KEY, { expiresIn: '1h' });
    },
    verifyToken: (token) => {
        try {
            return jwt.verify(token, process.env.SECRET_KEY);
        } catch (error) {
            throw new Error("Invalid or expired token.");
        }
    }
}

export default jwtService;