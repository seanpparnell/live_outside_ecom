import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import userRoutes from './routes/userRoutes.js'
const port = process.env.PORT || 5001;

connectDB();

const app = express();

// Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// Cookie-parser Middleware
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send("api is running bitches")
});

app.use('/api/products', productRoutes);
app.use("/api/categories", categoryRoutes);
app.use('/api/users', userRoutes)

app.use(notFound);
app.use(errorHandler)

app.listen(port, () => console.log(`server runnning on port ${port}`))