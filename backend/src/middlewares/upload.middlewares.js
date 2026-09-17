import fs from "fs";
import multer, { diskStorage } from "multer";

fs.mkdirSync("uploads", { recursive: true });

const storage =diskStorage({
    destination:(req,file,cb) =>{
        cb(null,"uploads/")
    },

    filename:(req,file,cb)=>{
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null,uniqueName);
    }
});

const fileFilter = (req,file,cb)=>{
    const allowedTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

    if(allowedTypes.includes(file.mimetype)){
        cb(null,true);
    }else{
        cb(new Error("Only PDF or DOCX files are allowed"),false);
    }
}


const upload = multer({
    storage,
    fileFilter,
    limits:{
        fileSize:5*1024*1024 
    },
});


export default upload;