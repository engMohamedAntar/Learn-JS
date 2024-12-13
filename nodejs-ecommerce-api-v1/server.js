//server.js
const path= require('path');
const express= require('express');
const dotenv= require('dotenv');
const morgan= require('morgan');

dotenv.config();
const dbConnection= require('./config/database');

//Routes
const categoryRoute= require('./routes/categoryRoute');
const subCategoryRoute= require('./routes/subCategoryRoute');
const brandRoute= require('./routes/brandRoute');
const productRoute= require('./routes/productRoute');
const userRoute= require('./routes/userRoute');
const authRoute= require('./routes/authRoute');
const reviewRoute= require('./routes/reviewRoute');
const wishlistRoute= require('./routes/wishlistRoute');
const addressRoute= require('./routes/addressRoute');

const ApiError= require('./utils/ApiError');
const golbalError= require('./middlewares/errorMiddleware');
//connect to database
dbConnection();

//express app
const app= express();

//middelwares
if(process.env.NODE_ENV==='development'){               //apply the morgan middleware only in devlelopment modes
    app.use(morgan('dev'));
}

app.use(express.json());                                //parse the req.body content
app.use(express.static(path.join(__dirname,'uploads')));

//Mount Routes
app.use('/api/v1/categories', categoryRoute);           // http://localhost:8000/api/v1/categories/66e1351096a827871476a6f6/subcategories
app.use('/api/v1/subcategories',subCategoryRoute)
app.use('/api/v1/brands', brandRoute);
app.use('/api/v1/products', productRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/reviews',reviewRoute);
app.use('/api/v1/wishlist', wishlistRoute);
app.use('/api/v1/addresses', addressRoute);

//handling incorrect routes  
app.all('*', (req,res,next)=>{
    next( new ApiError(`Can't find this route: ${req.originalUrl}`, 400) );
});

//Global error handling middleware for express
app.use(golbalError);


const PORT= process.env.PORT|| 8000 ;
const server= app.listen(PORT,()=>{
    console.log(`App running on port ${PORT}`);
})

// Handle errors outside express
process.on('unhandledRejection',(err)=>{
    console.log(`UnhandledRejection Error: ${err.name} | ${err.message}`);
    server.close(()=>{
        console.log('Shutting down...');
        process.exit(1); 
    });
});



//notices
// server.close() --> stops the server from accepting new connections but allows existing connections to finish processing before fully shutting down.
// The callback function passed to server.close() is executed once all active requests are completed and the server is ready to shut down.
// process.exit(1)--> This command terminates the Node.js process


// app.use(express.static(path.join(__dirname,'uploads')));--> enables you to access
// this route-> http://localhost:8000/categories/category-c9dcad34-92cc-4ee0-a302-1189bb7b7b5a-1728220346093.jpeg
// and you can change categories to brands or whatever
