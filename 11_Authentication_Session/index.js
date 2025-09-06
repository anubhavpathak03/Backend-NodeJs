// const express = require("express");
import express from "express";
import userRouter from "./routes/user.routes.js"
import adminRouter from "./routes/admin.routes.js"
import { authenticationMiddleWares } from "./middlewares/auth.middlewares.js";

const app = express();
const PORT = process.env.PORT ?? 8000;

// middlewares
app.use(express.json());
app.use(authenticationMiddleWares);


// route user
app.use('/user', userRouter);
app.use('/admin', adminRouter);

app.get('/', (req, res) => {
return res.status(200).json({status: `Server is UP and Runing`})
})

app.listen(PORT, () => console.log(`Server Is Ready To Listen at Port: ${PORT}`))