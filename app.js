import express from 'express';

import { PORT } from './config/env.js';

import { connectDB } from './database/mongodb.js';

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';

const app = express();

app.use('/api/users', userRouter);





app.get('/', (req, res) => {
    res.send(`Hello World! Server is running. Port: ${PORT}`);
});







app.listen(PORT, async () => {
  console.log(`server is running on port ${PORT}`);

  await connectDB();
})


