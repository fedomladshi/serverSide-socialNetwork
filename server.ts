import express from 'express'
import path from "path";
import {startDB} from './config/db'
import config from 'config'

const app = express();

// Connect to DB
startDB();

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")))
console.log(path.join(__dirname, "uploads"))

// Define Routes
app.use('/api/users', require('./routes/api/user.routes'));
app.use('/api/auth', require('./routes/api/auth.routes'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/music', require('./routes/api/music'));



const POST = config.get('POST') || 5000;

app.listen(POST, () => {
     console.log((`server is running on ${POST} port`))
})



