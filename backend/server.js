import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js'
const port = process.env.PORT || 5001;

connectDB();

const app = express();

app.get('/', (req, res) => {
  res.send("api is running bitches")
});

app.use('/api/products', productRoutes);
app.use("/api/categories", categoryRoutes);

app.use(notFound);
app.use(errorHandler)

app.listen(port, () => console.log(`server runnning on port ${port}`))