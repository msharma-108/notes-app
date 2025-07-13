import mongoose from "mongoose"

const taskSchema=new mongoose.Schema({
    title:{type:String,required:true},
    completed:{type:Boolean,default:false}
},{timestamps:true})


const notesSchema=new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
},{timestamps:true})

const userSchema=new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    username:{type:String,required:true},
    password:{type:String,required:true},
    notes:{type:[notesSchema],default:[]},
    tasks:{type:[taskSchema],default:[]}
})

const users= mongoose.models.user || new mongoose.model("user",userSchema)
// await users.collection.dropIndex("notes.title_1")
// await users.collection.dropIndex("tasks.title_1")
export default users

