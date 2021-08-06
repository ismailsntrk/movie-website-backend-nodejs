const mongoose = require('mongoose');

//connect db

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useFindAndModify:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=> console.log('DB connected established')).catch(err => console.log("DB connection Error: " , err))