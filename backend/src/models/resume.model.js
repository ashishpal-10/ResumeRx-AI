
import mongoose from 'mongoose';

const resumeSchema = mongoose.Schema({

user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
},

    originalName:{
        type:String,
        required:true,
    },

    filePath:{
        type:String,
        required:true,
    },

    fileType:{
        type:String,
        required:true,
    },

    extractedText:{
        type:String,
        required:true,
    },

},{timestamps:true}


);

const Resume = mongoose.model("Resume",resumeSchema);

export default Resume;