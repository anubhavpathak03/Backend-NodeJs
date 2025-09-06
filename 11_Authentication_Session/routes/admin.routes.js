import express from "express";
import { usersTable } from "../db/schema.js";
import db from '../db/index.js';
import {ensuresAuthenticated, restrictToParticularRole} from "../middlewares/auth.middlewares.js"
const router = express.Router();

const adminRestictMiddleWare = restrictToParticularRole('ADMIN')

router.use(ensuresAuthenticated)
router.use(adminRestictMiddleWare)

router.get('/users', async (req, res) => {
    // if(!req.user) {
    //     return res.status(401).json({error: `You must be authenticated to access this `})
    // }
    const users = await db.select(
        {
            id: usersTable.id,
            name: usersTable.name,
            email: usersTable.email
        }
    ).from(usersTable);
    return res.json({users});
})

export default router;
