import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

    resume:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Resume",
        required:true,
    },
    atsScore:{
        type:Number,
        required:true,
        min:0,
    },
    summary:{
        type:String,
    },

    strengths:[String],

    weaknesses:[String],

    missingSkills:[String],

    suggestions:[String],

    resumeRoast:{
        type:String,
    },

},{timestamps:true})


const Report = mongoose.model("Report",reportSchema);

export default Report;