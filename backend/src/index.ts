import mongoose from 'mongoose';
import express, { RequestHandler } from 'express';
import { authRoutes } from './routes/auth';
import { userRoutes } from './routes/user';
import { auth } from './middleware/auth';
import { bookRouterPrivate } from './routes/book-private';
import { bookRouterPublic } from './routes/book-public';
import cors, { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
	origin: 'http://localhost:3000',
	credentials: true,
	allowedHeaders: ['Content-Type', 'Authorization'],
	exposedHeaders: ['Content-Type', 'Authorization'],
	methods: ['GET', 'PUT', 'POST', 'DELETE'],
};

mongoose
	.connect('mongodb://root:root@db:27017')
	.then(() => {
		console.log('Connected to MongoDB');
		const app = express();
		app.use(express.json());
		app.use(cors(corsOptions));
		app.use('/auth', authRoutes);
		app.use('/user', auth, userRoutes);
		app.use('/book', bookRouterPublic);
		app.use('/book', auth, bookRouterPrivate);
		app.listen(8080);
	})
	.catch((err) => console.log(err));
