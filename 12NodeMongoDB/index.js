import "dotenv/config";
import express from "express";
import { connectMongoDB } from "./connection.js";
import userRouter from "./routes/user.routes.js";
import {authmiddleware} from "./middlewares/auth.middlewares.js";

const app = express();
const PORT = process.env.PORT ?? 8000;

connectMongoDB(process.env.MONGODB_URL).then(() => console.log(`MongoDB Connected`));

app.use(express.json()) // this will parse the incomming JS data
app.use(authmiddleware);
app.use('/user', userRouter);
app.listen(PORT, () => console.log(`Server is runing on PORT ${PORT}`))