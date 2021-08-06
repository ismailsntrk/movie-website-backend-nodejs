const express = require("express")
const cors = require("cors")
require("dotenv").config(); //for env
require('./db/connectDB')

const app = express();

// routes 

const authRoutes = require("./routes/auth")
const listRoute = require('./routes/movieList')
const movieRoute = require("./routes/movie")
const lastWatched = require("./routes/lastWatched")

app.use(express.json());
app.use(cors())

//middlewares

app.use('/api', authRoutes)
app.use('/mov', movieRoute)
app.use('/list', listRoute)
app.use('/last', lastWatched)

const port = process.env.PORT;

app.listen(port ,()=>{
    console.log(`Server is running on port: ${port}`);
})