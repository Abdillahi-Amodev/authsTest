import mongoose from 'mongoose'

let signupSchema=new mongoose.Schema({
username:{
type:String,
required:true,
unique:true,
lowercase:true,
},
email:{
    type: String,
    required: true,
    unique: true,
    lowercase: true,
},
password:{
    type: String,
    required: true,
    unique: true,
}


},{timestamps:true}) 

signupSchema.methods.getUsername=function(){
    return this.username
}

signupSchema.virtual('task',{
    ref:'Todo',
    localField:'_id',
    foreignField:'owner'
})


let todosSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: true,
  
        trim: true,
        lowercase: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Signup',
    },
    likes:{
        type:Number,
        default:0
    }




}, { timestamps: true })


export const Todo = mongoose.model("Todo", todosSchema);
export let User = mongoose.model("Signup",signupSchema)

  