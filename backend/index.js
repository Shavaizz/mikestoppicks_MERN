import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRoutes from './routes/productRoutes.js' 
import authRoutes from './routes/authRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Allow credentials (optional)
}));

// Main Page
app.get("/", async (req,res)=>{
    try {
        res.status(200).send("This is working fine!")
    } catch (error) {
        console.log(error)
        res.status(500).send({message:error.message})
    }
})

// Handles all requests to /api/products
app.use('/api/products', productRoutes);
app.use('/api/user', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);
// Mongo DB Connection
mongoose
  .connect(MONGO_URL)
  .then(()=>{
    console.log("App connected to database")
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error)=>{
    console.log(error)
  });