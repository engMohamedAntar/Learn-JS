const mongoose= require('mongoose');

const dbConnection= ()=>{
    mongoose.connect(process.env.DB_URI).then((conn)=>{
        console.log(`Database connected: ${conn.connection.host} `); 
    })
    // .catch((err)=>{
    //     console.error(`Database Error: ${err}`);
    //     process.exit(1);
    // })
};

module.exports= dbConnection;

//notices
//In this file the error will be handled by the unhandledRejection error handler in server.js file.