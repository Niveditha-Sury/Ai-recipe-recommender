const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

async function list() {
    try {
        console.log("Initializing with v1...");
        // In some versions, it's (apiKey, { apiVersion: 'v1' })
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
        
        // Try to get a model with explicit v1 if possible
        // Actually, let's try a different model name: gemini-pro
        const models = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro"];
        for (const mName of models) {
            try {
                console.log(`Probing ${mName}...`);
                const model = genAI.getGenerativeModel({ model: mName });
                const result = await model.generateContent("test");
                console.log(`SUCCESS: ${mName}`);
                return;
            } catch (e) {
                console.log(`FAILED: ${mName} - ${e.message}`);
            }
        }
    } catch (err) {
        console.error("GLOBAL ERROR:", err.message);
    }
}
list();
