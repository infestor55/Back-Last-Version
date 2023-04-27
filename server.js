import express from 'express';
import  colors from 'colors';
import dotenv from "dotenv";
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoute.js';
import subCategoryRoutes from './routes/subCategoryRoute.js';
import cors from 'cors';
import blogRoute from './routes/blogRoute.js';
import authorRoutes from './routes/authorRoutes.js';
import productRoutes from './routes/productRoute.js';
import userRoutes from './routes/userRoutes.js';
import adminRoute from './routes/adminRoute.js';
//configure env
dotenv.config();

//database config
connectDB();

//rest object 
const app = express();

//app.use('/images', express.static('images'))

//middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(cors());



//routes
app.use('/api', authRoutes);
app.use('/api/category', categoryRoutes );
app.use('/api/subCategories', subCategoryRoutes);
app.use('/blog', blogRoute);
app.use('/author', authorRoutes);
app.use('/products', productRoutes)
app.use('/users', userRoutes)
app.use('/admin', adminRoute)



//get Image 
app.use('/getimage', express.static('./uploads'))


//rest api
app.get('/',(req,res)=>{
    res.send(
         '<h1>Welcome to BEM ecommerce app</h1>'
    )
})
//PORT
const PORT = process.env.PORT || 8080 

//run listen 
app.listen(PORT,()=>{
    console.log(`Server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white)
})