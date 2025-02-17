//Api key
import dotenv from "dotenv";

import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
});

const generationConfig = {

    temperature: 0.5, // Lower temperature for faster response
    topP: 0.6, // Adjust topP for faster response
    topK: 15, // Adjust topK for faster response
    maxOutputTokens: 512, // Reduce maxOutputTokens for faster response
    responseMimeType: "text/plain",

};

async function run(prompt) {

    const chatSession = model.startChat({
        generationConfig,
        history: [
        ],
    });

    const result = await chatSession.sendMessage(prompt);
    console.log(result.response.text());

    return result.response.text();

}

export default run; 
