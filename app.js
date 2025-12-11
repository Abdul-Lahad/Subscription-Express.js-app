import express from 'express';
import cookieParser from 'cookie-parser';

import { PORT } from './config/env.js';


import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import { connectDB } from './database/mongodb.js';
import errorMiddleware from './middleware/errir.middleware.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);
app.use('/api/users', userRouter);





app.get('/', (req, res) => {
  res.send(`Hello World! Server is running. Port: ${PORT}`);
});


app.use(errorMiddleware);





app.listen(PORT, async () => {
  console.log(`server is running on port ${PORT}`);

  await connectDB();
})


