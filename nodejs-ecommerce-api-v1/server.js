//server.js
const express= require('express');
const dotenv= require('dotenv');

dotenv.config();
const morgan= require('morgan');
const dbConnection= require('./config/database');
//Routes
const categoryRoute= require('./routes/categoryRoute');
const subCategoryRoute= require('./routes/subCategoryRoute');
const brandRoute= require('./routes/brandRoute');

const ApiError= require('./utils/ApiError');
const golbalError= require('./middlewares/errorMiddleware');
//connect to database
dbConnection();

//express app
const app= express();

//middelwares
if(process.env.NODE_ENV==='development'){ //apply the morgan middleware only in devlelopment modes
    app.use(morgan('dev'));
}

app.use(express.json());    //parse the req.body content

//Mount Routes
app.use('/api/v1/categories', categoryRoute);// http://localhost:8000/api/v1/categories/66e1351096a827871476a6f6/subcategories
app.use('/api/v1/subcategories',subCategoryRoute)
app.use('/api/v1/brands',brandRoute);

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