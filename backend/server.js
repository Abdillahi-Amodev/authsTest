import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import {route} from './router.js'
import Pusher from 'pusher'
const app =express();
import dotenv from 'dotenv';
import path from 'path'
dotenv.config()

let port =process.env.PORT || 8080

app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())

const url = process.env.MONGO_URI
mongoose.connect(url,{useCreateIndex:true,useFindAndModify:false,useUnifiedTopology:true,useNewUrlParser:true});

const pusher = new Pusher({
    appId: "1152008",
    key: "2c69971a8b4b25de0222",
    secret: "7cce530b16c5c1435ef7",
    cluster: "us2",
    useTLS: true
});

const db = mongoose.connection;
db.once('open', () => {
    console.log('db connected');
    const todoCollection = db.collection('todos');
    const changeStream = todoCollection.watch();

    changeStream.on('change', (change) => {
        console.log('A change occured ', change);
        if (change.operationType==='insert') {
           pusher.trigger('todo', 'inserted', change.fullDocument)
            
        }else{
              console.log('error in the pusher');
        }
    })
})

app.use(route)
if (process.env.NODE_ENV==='production') {
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
res.sendFile(path.resolve(__dirname,'./client','build','index.html'))
    })
}

app.listen(8000,()=>{
    console.log(`server is running `)
})