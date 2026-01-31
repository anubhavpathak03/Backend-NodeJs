import express from 'express';
import { RequestShortenCodePostBodySchema } from '../validation/request.validation.js';
import { db } from '../db/index.js';
import usersTable, { urlsTables } from '../models/index.js';
import { nanoid } from 'nanoid';
import { ensureAuthenticated } from '../middleware/auth.middleware.js'
import { eq, and } from 'drizzle-orm';


const router = express.Router();


router.post('/shorten', ensureAuthenticated ,async function(req, res) {
    // first of all make sure that user is authenticated 

    // This check is done by ensureAuthenticated middle ware
    // const userID = req.user.id;
    // if(!userID) {
    //     return res.status(401).json({error: `You Must be logged in to access this resource`});
    // }

    const validationResult = await RequestShortenCodePostBodySchema.safeParseAsync(req.body);

    if(!validationResult.success) {
        return res.status(401).json({error: validationResult.error})
    }

    const { url, code } = validationResult.data;

    const shortcode = code ?? nanoid(6);
    
    const [result] = await db.insert(urlsTables).values({
        shortcode,
        target: url,
        userId: req.user.id
    }).returning({
        id: urlsTables.id, 
        shortcode: urlsTables.shortcode,
        target: urlsTables.target 
    })
    

    return res.status(201).json({
        id: result.id, 
        shortcode: result.shortcode, 
        target: result.target
    });
});

router.get('/all_URLs', ensureAuthenticated, async function(req, res) {
    const code = await db.select().from(urlsTables).where(eq(urlsTables.userId, req.user.id));

    return res.json({ code });
})

router.delete('/:id', ensureAuthenticated, async function(req, res) {
    const id = req.params.id;
    await db.delete(urlsTables).where(and(
        eq(urlsTables.id, id),
        eq(urlsTables.userId, req.user.id)
    ));

    return res.status(200).json({ deleted: true });
});


router.get('/:shortencode', async function(req, res) {
    const code = req.params.shortencode;

    const [result] = await db.select(
        {
            target: urlsTables.target
        }
    ).from(urlsTables).where(eq(urlsTables.shortcode, code));


    if(!result) {
        return res.status(404).json({error: 'Invalid URL'})
    }

    return res.redirect(result.target)
});



export default router;

