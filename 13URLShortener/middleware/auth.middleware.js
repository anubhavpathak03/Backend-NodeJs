/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */

import {validateUserToken} from '../utils/token.js'

export function authenticationMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'] || req.get('authorization');
    if (!authHeader) {
        return next();
    }

    if (!authHeader.startsWith('Bearer ')) {
        return res
            .status(400)
            .json({ error: 'Authorization header must start with "Bearer "' });
    }

    const [, token] = authHeader.split(' '); // [Bearer, <token>]
    if (!token) return next();

    const payload = validateUserToken(token);
    if (!payload) return next();

    req.user = payload;
    next();
}


/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */

export function ensureAuthenticated(req, res, next) {
    if(!req.user || !req.user.id) {
        return res.status(401).json({error: `You Must be logged in to access this resource`});
    }
    next();
}