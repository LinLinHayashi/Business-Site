import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js'; // We import the router from the specified file but change its name.
import authRouter from './routes/auth.route.js';

dotenv.config(); // Validate the .env file.
mongoose.connect(process.env.MONGO).then(() => console.log('Connect to MongoDB!')).catch(err => console.log(err)); // Connect the server to MongoDB.

const app = express();

app.use(express.json()); // This allows the server to accept requests with a JSON body.

// Run the server.
app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});

// This is how we call an API router.
app.use('/api/user', userRouter);

app.use('/api/auth', authRouter);