import express from 'express'
import {User} from './base/signupSchema.js'
import jwt from 'jsonwebtoken'
import {verified} from './auth.js'
import bcrypt from 'bcrypt'
import { Todo } from './base/signupSchema.js'
import mongoose from 'mongoose'
const route =express.Router();

// 
route.get('/', verified, async (req, res) => {
      let {page,size}=req.query
    try {
        // if(!page){
        //     page=1;
        // }
        // if(!size){
        //     size=2;
        // }
        // const limit=parseInt(size);
        // const skip=(page-1)*size;
        let todos = await Todo.find().populate('owner');
        let userConnected = await User.findById(req.decoded.id)
        const username = await userConnected.getUsername()
        res.send({ todos,userConnected,username })
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

route.patch('/:id/like',verified,async(req,res)=>{
    
try {
    let findit = await Todo.findById(req.params.id)
    let updateLike = await Todo.findByIdAndUpdate(req.params.id, { likes: findit.likes+1})
    console.log(updateLike);
    res.json(updateLike)
} catch (error) {
    console.log(error.message);
}
})


route.post('/',verified,async(req,res)=>{
    let news = new Todo({
        todo:req.body.todo,
        owner: req.decoded.id
        
    });
try {
    let response=await news.save();
    // console.log(response);
    res.send(response)
} catch (error) {
    console.log(error.message);
}
})

route.delete('/:id',async(req,res)=>{
try {
    const findAndDelet= await Todo.findByIdAndDelete(req.params.id)
    res.json(findAndDelet)
} catch (error) {
    console.log(error.message);
}
})
route.patch('/:id',async(req,res)=>{
try {
   
    const findAndupdate= await Todo.findByIdAndUpdate(req.params.id,{$set:{todo:req.body.todo}})
    res.send(findAndupdate)
} catch (error) {
    console.log(error.message);
}
})
///
route.get('/posts',async(req,res)=>{
    let search=req.query.search
try {
    let searchByTodo = await Todo.find({todo:search});
   
    // console.log(searchFinder);
    res.send(searchByTodo)
} catch (error) {
    console.log(error);
}

})


//sign Up page

route.post('/signup',async(req,res)=>{
    
    try {
        let hashedpwd=await bcrypt.hash(req.body.password,10)
        let user = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedpwd,
        });
        let docs= await user.save();
        res.json(docs)
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

//login page

route.post('/login',async(req,res)=>{
  
    try {
        const user = await User.findOne({username:req.body.username})
        if(!user) return res.status(400).json({msg:'This username not exist'});

        const isMatch = await bcrypt.compare(req.body.password,user.password);
        if(!isMatch) return res.status(400).json({msg:' Wrong password'});
           
       
            const token=jwt.sign({id:user._id},'secretkey');
            res.send({token,user});
        

    } catch (error) {
      
       return res.status(400).json({msg:error})
    }
})



export {route};