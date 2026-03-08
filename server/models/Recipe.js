const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: { type: String, required: true },
    description: { type: String },
    ingredients: { type: [String], required: true },
    instructions: { type: String }, // Keep for legacy if needed
    steps: { type: [String], required: true },
    servings: { type: Number, default: 1 },
    calories: { type: Number },
    time: { type: String },
    difficulty: { type: String },
    cuisine: { type: String },
    emoji: { type: String },
    accent: { type: String },
    tags: { type: [String] },

    // To store the local path or URL of the uploaded fridge/ingredient photo
    recipeImage: { type: String },

    // To track the raw ingredients identified by Gemini Vision
    identifiedIngredients: { type: [String] },

    // Boolean to flag if this was a Vision-based discovery
    isAIGenerated: { type: Boolean, default: false },

    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Recipe", recipeSchema);
