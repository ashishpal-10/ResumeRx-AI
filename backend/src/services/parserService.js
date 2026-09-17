import fs from "fs";
import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";

export const extractResumeText = async(file)=>{
    try {
        let extractedText ="";

        if(file.mimetype === "application/pdf"){
            const dataBuffer = fs.readFileSync(file.path);

            const parser = new PDFParse({ data: dataBuffer });
            const pdfData = await parser.getText();
            extractedText = pdfData.text;
            await parser.destroy();
        }

        else if(file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ){
            const result = await mammoth.extractRawText({path:file.path,});

            extractedText =result.value;

        }

        return extractedText.trim();
        
    } catch (error) {
        throw new Error(`Failed to extract text from resume: ${error.message}`)
    }
};