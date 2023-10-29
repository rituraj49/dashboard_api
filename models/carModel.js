import mongoose from "mongoose";

const apiSchema = new mongoose.Schema({
   brand:{
    type:String,
    required:true,
    unique:true
   },
   sales:{
    type:Number,
    required:true
   }
});

export default mongoose.model('car', apiSchema);