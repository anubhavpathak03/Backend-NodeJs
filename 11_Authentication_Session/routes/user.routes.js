import express from "express";

/*********************************** */
import db from "../db/index.js";
import {usersTable, userSession} from "../db/schema.js";
import { eq } from "drizzle-orm";
import {randomBytes, createHmac} from "node:crypto";
import { authenticationMiddleWares, ensuresAuthenticated } from "../middlewares/auth.middlewares.js"
/*********************************** */

import 'dotenv/config';
import jwt from "jsonwebtoken";

const router = express.Router();

router.patch('/', ensuresAuthenticated, async (req, res) => {
    const user = req.user;
    // if(!user) {
    //     return res.status(401).json({error: 'You are Not logged In'});
    // }
    const {name} = req.body;
    await db.update(usersTable).set({name}).where(eq(usersTable.id, user.userId));
    return res.json({status: 'Success', user});
})


// to check who is the currect logged in user we have to write middleware
// return current logged in customer 
router.get('/', ensuresAuthenticated, async (req, res) => {
    const user = req.user;
    // if(!user) {
    //     // it is unauthorized beacause we are not logged in 
    //     return res.status(401).json({error: 'You are not logged in'});
    // }
    return res.json({ user });
});

 // signup
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body; 

    // check that user exist or not
    const [existingUser] = await db
        .select(
            {
                email: usersTable.email,
            }
        )
        .from(usersTable)
        .where((table) => eq(table.email, email));

    if(existingUser) {
        return res.status(400).json({error: `user with email: ${email} already exist`});
    }

    const salt = randomBytes(256).toString('hex')
    const hashedPassword = createHmac('sha256', salt).update(password).digest('hex')

    const [insertedUser] = await db.insert(usersTable).values( {
        name,
        email,
        password: hashedPassword,
        salt,
    }).returning({id : usersTable.id});


    return res.status(201).json({status: 'success', data: {userID: insertedUser.id}});

});



router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const [existingUser] = await db
        .select(
            {   
                id: usersTable.id,
                email: usersTable.email,
                name: usersTable.name,
                role: usersTable.role,
                password: usersTable.password,
                salt: usersTable.salt
            }
        )
        .from(usersTable)
        .where((table) => eq(table.email, email));

    if(!existingUser) {
        return res.status(404).json({error: `user with email: ${email} does not exist`});
    }

    const salt = existingUser.salt;
    const existingHash = existingUser.password;

    const newHash = createHmac('sha256', salt).update(password).digest('hex');

    if(newHash != existingHash) {
        return res.status(400).json({error: `Incorrect Password!`});
    }

    // login is generating a session from user for database
/**
 *.     Here we create a Session in 
 *  
    const [session] = await db
        .insert(userSession)
        .values({
            userId: existingUser.id,
        }).returning({id: userSession.id});
    return res.status(201).json({status: 'success', sessionId: session.id});
*/

// we create a Token
    const payload = {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
        role: existingUser.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1m'});
    return res.json({status: 'Success', token})

}); // login


export default router;