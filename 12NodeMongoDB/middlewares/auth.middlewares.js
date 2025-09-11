import 'dotenv/config';
import jwt from "jsonwebtoken";
/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */

export const authmiddleware = async (req, res, next) => {
    try {
        const tokenHeader = req.headers["authorization"];
        if(!tokenHeader) {
            return next();
        }
        if(!tokenHeader.startsWith('Bearer')) {
            return res.status(400).json({error: 'Authorization Header must begin with Bearer'});
        }

        const token = tokenHeader.split(' ')[1];
        if(!token) {
            return res.status(404).json({error: 'token is not there'});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        return next();
    } catch (error) {
        next();
    }
}

export const ensuresAuthenticated = async (req, res, next) => {
    if(!req.user) {
        return res.status(401).json({error: `You must Authenticated to access this`});
    }
    next();
}