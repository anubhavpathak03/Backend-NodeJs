import express from 'express';
import db from '../db/index.js';
import usersTable from '../models/index.js';
// import { randomBytes, createHmac } from 'crypto';
import { signupPostRequestBodySchema, loginPostRequestBodySchema } from '../validation/request.validation.js';
// import { eq } from 'drizzle-orm';
import {hashPasswordWithSalt} from '../utils/hash.js'
import {getUserByEmail} from '../services/user.service.js'
// import jwt from 'jsonwebtoken'; 
import { createUserToken } from '../utils/token.js'

const router = express.Router();



router.post('/signup', async (req, res) => {
    const validationResult = await signupPostRequestBodySchema.safeParseAsync(req.body);

    if(validationResult.error) {
        return res.status(400).json({ error: validationResult.error.format() });
    }

    const { firstname, lastname, email, password  } = validationResult.data;

    // const {firstname, lastname, email, password} = req.body;

    // validation manual way we use zod for this
    /** 
        if(!firstname) {
            return res.status(400).json({error: 'firstname is required'});
        }
    */

    /*

    -- what we do na we checking this again and again by so that's why we put in anaother file and refactored -- 

    const [existingUser] = await db.select({ id: usersTable.id }).from(usersTable).where(eq(usersTable.email, email));

    */

    const existingUser = await getUserByEmail(email);    

    if(existingUser) return res
        .status(400)
        .json({ error: `User with email ${email} already exist`});

/*
    what we do na we refactored our code because this thing required at the time of login also 😊

    const salt = randomBytes(256).toString('hex'); // this line generate salt for me
    // to hash the password
    const hashedPassword = createHmac('sha256', salt).update(password).digest('hex');
*/

    const {salt, password: hashedPassword} = hashPasswordWithSalt(password)
 
    const [user] = await db.insert(usersTable).values({
        firstname,
        lastname,
        email,
        salt,
        password: hashedPassword,
    }).returning({ id: usersTable.id });

    return res.status(201).json({ data: { userId: user.id } })
});

router.post('/login', async(req, res) => {
    const validationResult = await loginPostRequestBodySchema.safeParseAsync(req.body);
    
    if(validationResult.error) {
        return res.status(400).json({ error: validationResult.error });
    }

    const { email, password } = validationResult.data;
    
    const existingUser = await getUserByEmail(email);
    if(!existingUser) {
        return res
            .status(404)
            .json({ error: `User with email ${email} does not exists` });
    }

    const {password: hashedPassword} = hashPasswordWithSalt(password, existingUser.salt);

    if(existingUser.password !== hashedPassword) {
        return res.status(400).json({ error: 'Invalid Password' });
    }

    // now password correct hai tho token generate karunga
    // json web token 
    // const token = jwt.sign({ id:existingUser.id }, process.env.JWT_SECRET);
    const token = await createUserToken({ id:existingUser.id })
    return res.json({ token });

});




export default router; 