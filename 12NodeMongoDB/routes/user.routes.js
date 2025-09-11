import express from "express";
import { User } from "../models/user.model.js";
import { randomBytes, createHmac } from "crypto";
import jwt from "jsonwebtoken";
import {authmiddleware, ensuresAuthenticated} from "../middlewares/auth.middlewares.js"
const router = express.Router();

// pipeline in mongodb
const result = User.aggregate([
  {
    $project:
      /**
       * specifications: The fields to
       *   include or exclude.
       */
      {
        _id: "$_id",
        title: "$title",
      },
  },
  {
    $lookup:
      /**
       * from: The target collection.
       * localField: The local join field.
       * foreignField: The target join field.
       * as: The name for the results.
       * pipeline: Optional pipeline to run on the foreign collection.
       * let: Optional variables to use in the pipeline field stages.
       */
      {
        from: "comments",
        localField: "_id",
        foreignField: "movie_id",
        as: "comments",
      },
  },
])



router.patch('/', ensuresAuthenticated, async (req, res) => {
    const {name} = req.body;
    await User.findByIdAndUpdate(req.user._id, {
        name,
    });
    return res.json({status : "success"});
})


router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({
        email,
    })
    if(existingUser) {
        // it means user of this email exist already 
        return res.status(400).json({error : `user with this email ${email} does not exist`})
    }

    // if user does not exist so first we do hash the password
    const salt = randomBytes(256).toString('hex');
    const hashedPassword = createHmac('sha256', salt).update(password).digest('hex');

    const user = await User.insertOne({
        name,
        email,
        password: hashedPassword,
        salt,
    });
    return res.status(201).json({status: 'success', data: {id : user._id}});
});

router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    const existingUser = await User.findOne({
        email,
    })
    if(!existingUser) {
        // it means user of this email does not exist already 
        return res.status(404).json({error : `user with this email ${email} does not exist`})
    }

    // check is password enter at login time is correct or not
    const salt = existingUser.salt;
    const existingHash = existingUser.password;
    const newHash = createHmac('sha256', salt).update(password).digest('hex');
    if(newHash !== existingHash) {
        return res.status(404).json({error: 'Invalid Password'});
    }

    // now every thing ok when email and password enter at login time is correct 
    const payload = {
        name: existingUser.name,
        _id: existingUser.password,
        email: existingUser.email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET)

    return res.json({status: 'success', token})
})

export default router;