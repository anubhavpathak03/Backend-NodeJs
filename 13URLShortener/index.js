import 'dotenv/config'

import express from 'express';
import userRouter from './routes/user.routes.js'
import { authenticationMiddleware } from './middleware/auth.middleware.js';
import urlRouter from './routes/url.routes.js'

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(express.json()); // this is middleware
app.use(authenticationMiddleware);

app.get('/', (req, res) => {
    return res.json({status: 'Server is Up and Runing'})
});


app.use('/user', userRouter);

app.use(urlRouter);


app.listen(PORT, () => {
   console.log(`Server is listening on PORT ${PORT}`); 
});