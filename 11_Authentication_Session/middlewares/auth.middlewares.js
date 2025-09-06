
import jwt from "jsonwebtoken";

export const authenticationMiddleWares = async function(req, res, next) {
    try{
        // const sessionId = req.headers['session-id'];
        const tokenHeader = req.headers['authorization'];
    
        // Header authorization: Bearer <TOKEN>
    
        // if(!sessionId) {
        //     // it is unauthorized beacause we are not logged in 
        //     // return res.status(401).json({error: 'You are not logged in'});
        //     return next()
        // }
        if(!tokenHeader) {
            return next()
        }
    
        if(!tokenHeader.startsWith('Bearer')) {
            return res.status(400).json({error: `authorization header must starts with Bearer`})
        }
    
        const token = tokenHeader.split(' ')[1];
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        next();
    }catch(error){
        next();
    }

/*
    const [data] = await db
        .select(
            {
                sessionId: userSession.id,
                id: usersTable.id,
                userId: userSession.userId,
                name: usersTable.name,
                email: usersTable.email,
            }
        )
        .from(userSession)
        .rightJoin(usersTable, eq(usersTable.id, userSession.userId))
        .where((table) => eq(table.sessionId, sessionId))

    if(!data) {
        // return res.status(401).json({error: 'You are not logged in'})
        return next();
    }
    req.user = data
    next();
*/
};


export const ensuresAuthenticated = async function(req, res, next) {
    if(!req.user) {
        return res.status(401).json({error: `you must be authenticated to access this`})
    }
    next();
};


export const restrictToParticularRole = function(role) {
    return function(req, res, next) {
        if(req.user.role !== role) {
            return res.status(401).json({error : 'You are not authorized to access this resource'})
        }
        return next();
    };
};