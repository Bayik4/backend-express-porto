import jwtService from "../services/jwt.service.js";

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.get("Authorization");
    
        if(!authHeader) return res.status(401).json({ message: "Token required to access this endpoint." });
        if(!authHeader.startsWith("Bearer ")) return res.status(401).json({ message: "Invalid token." });
    
        const token = authHeader.split(" ")[1];
        const decodedToken = jwtService.verifyToken(token);

        req.user = decodedToken;
    
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token error.", error: error.message });
    }
}

export default authMiddleware;