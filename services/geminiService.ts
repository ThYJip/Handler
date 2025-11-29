import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client
// Note: process.env.API_KEY is assumed to be available in the build environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const askCampGuide = async (question: string, context: string): Promise<string> => {
    try {
        if (!process.env.API_KEY) {
            return "🔥 [SYSTEM]: API Key missing. Please configure process.env.API_KEY to speak with the Camp Guide.";
        }

        const model = 'gemini-2.5-flash';
        const systemInstruction = `
            You are Rin Shima from Yuru Camp (Laid-Back Camp). 
            You are also an expert Android Systems Engineer.
            
            Your goal is to explain Android's Handler/Looper/MessageQueue mechanism using camping metaphors.
            - Looper = The camper tending the fire (usually you, Rin).
            - MessageQueue = The pile of firewood/pinecones waiting to be burnt.
            - Handler = The person bringing the firewood (like Nadeshiko).
            - Message = The firewood or pinecone.
            - Thread = The specific campsite.
            
            Keep your responses concise, cozy, and helpful. Use emojis like 🏕️, 🔥, 🪵.
            Explain the technical concept clearly but wrap it in the camping theme.
            
            Current Context: ${context}
        `;

        const response = await ai.models.generateContent({
            model: model,
            contents: question,
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.7,
            }
        });

        return response.text || "I'm just staring at the fire... (No response)";

    } catch (error) {
        console.error("Gemini Error:", error);
        return "The wind is too loud... I couldn't hear you. (API Error)";
    }
};