import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export const analyseResume = async (resumeText) => {
    const prompt = `
    You are an expert ATS resume reviewer and career advisor.

Analyze the following resume.

Return ONLY valid JSON. Do not include markdown or \`\`\`json.

Use exactly this structure:

{
  "atsScore": number,
  "summary": "string",
  "strengths": ["string"],
  "weaknesses": ["string"],
  "missingSkills": ["string"],
  "suggestions": ["string"],
  "resumeRoast": "string"
} Roast in hinglish language

Resume:
${resumeText}
    `;

    let text;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.6-flash",
            contents: prompt,
        });
        text = response.text;
    } catch (error) {
        console.log("Gemini API error:", error.message);
        throw new Error(`Gemini API request failed: ${error.message}`);
    }

    if (!text) {
        throw new Error("Gemini returned no text content");
    }

    try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        const analysis = JSON.parse(jsonMatch ? jsonMatch[0] : text);
        return analysis;
    } catch (error) {
        console.log("AI returned invalid JSON:", text);
        throw new Error("Failed to parse AI response");
    }
}