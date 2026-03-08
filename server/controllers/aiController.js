const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const User = require("../models/User");
const Recipe = require("../models/Recipe");
const axios = require("axios");

exports.getRecommendation = async (req, res) => {
    try {
        const { cuisine, cookingTime, dietaryType, spiceLevel } = req.body;

        // Fetch the user's saved data from MongoDB
        const user = await User.findById(req.user.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Use saved pantry and allergies
        const finalIngredients =
            user.pantry && user.pantry.length > 0 ? user.pantry : [];
        const finalAllergies =
            user.allergies && user.allergies.length > 0 ? user.allergies : [];

        if (finalIngredients.length === 0) {
            return res.status(400).json({
                message:
                    "Your pantry is empty. Add ingredients to your profile first!",
            });
        }

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
        });

        const prompt = `
            Act as a professional chef. Suggest 3 distinct and creative recipes using: ${finalIngredients.join(", ")}. 
            EXCLUDE these ingredients (Allergies/Dislikes): ${finalAllergies.concat(user.neverShowMe || []).join(", ") || "None"}.
            User Profile - Skill Level: ${user.experience || "beginner"}, Age: ${user.age || "adult"}.
            Preferences - Cuisine: ${cuisine || "Any"}, Max Time: ${cookingTime || "Any"}, Diet: ${dietaryType || "None"}, Spice: ${spiceLevel || "Any"}.
            
            Response Format: Return ONLY a JSON object with a single key 'recipes' which is an array of objects.
            Each recipe object must have the following fields:
            - 'title': String
            - 'emoji': A single relevant emoji String
            - 'description': A short catchy description String (1-2 sentences)
            - 'cuisine': String
            - 'ingredients': Array of Strings
            - 'steps': Array of Strings (the instructions)
            - 'time': String (e.g. '20 min')
            - 'calories': Number (integer)
            - 'difficulty': String ('Easy', 'Medium', or 'Hard')
            - 'servings': Number
            - 'accent': A hex color code String that matches the recipe's vibe (e.g. '#FF5733')
            - 'tags': Array of 3-4 relevant category tags (e.g. ['Quick', 'Healthy', 'Vegan'])
            
            Ensure the instructions are clear and the tone is encouraging.
        `;

        const result = await model.generateContent(prompt);
        const text = result.response
            .text()
            .replace(/```json|```/g, "")
            .trim();

        res.status(200).json({
            message: "Smart recipes generated from your pantry!",
            recipes: JSON.parse(text).recipes,
        });
    } catch (error) {
        console.error("AI Recommendation Error:", error);
        res.status(500).json({
            message: "Error generating recipe",
            error: error.message,
        });
    }
};

exports.identifyIngredientsAndRecommend = async (req, res) => {
    try {
        console.log("Checking API Connection...");

        if (!req.body) {
            return res.status(400).json({
                message:
                    "Request body is missing. Check your middleware order.",
            });
        }

        let imageData;
        const imageUrl = req.body.imageUrl;

        // Image Source Handling
        if (req.file) {
            imageData = {
                inlineData: {
                    data: Buffer.from(fs.readFileSync(req.file.path)).toString(
                        "base64",
                    ),
                    mimeType: req.file.mimetype,
                },
            };
        } else if (imageUrl) {
            const response = await axios.get(imageUrl, {
                responseType: "arraybuffer",
            });
            imageData = {
                inlineData: {
                    data: Buffer.from(response.data).toString("base64"),
                    mimeType: response.headers["content-type"] || "image/jpeg",
                },
            };
        } else {
            return res.status(400).json({
                message: "Please upload an image file or provide an imageUrl",
            });
        }

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
        });

        const prompt = `Analyze this image. List ingredients seen and suggest 3 distinct recipes that can be made with them. 
        Return ONLY a JSON object with two keys: 
        1. 'identifiedIngredients': an array of strings.
        2. 'recipes': an array of recipe objects, each containing:
           {'title': '', 'emoji': '', 'description': '', 'cuisine': '', 'ingredients': [], 'steps': [], 'time': '', 'calories': 0, 'difficulty': '', 'servings': 1, 'accent': '', 'tags': []}`;

        const result = await model.generateContent([prompt, imageData]);
        const text = result.response
            .text()
            .replace(/```json|```/g, "")
            .trim();
        const aiResponse = JSON.parse(text);

        // We only save the first one as a default "primary" discovery, or we could handle multiple.
        // For simplicity and to match the current schema, we'll save the first one but return all to the user.
        const primaryRecipe = aiResponse.recipes[0];

        // Save and Award XP
        const newRecipe = new Recipe({
            userId: req.user.userId,
            ...primaryRecipe,
            recipeImage: req.file ? req.file.path : imageUrl,
            identifiedIngredients: aiResponse.identifiedIngredients,
            isAIGenerated: true,
        });

        const savedRecipe = await newRecipe.save();
        await User.findByIdAndUpdate(
            req.user.userId,
            { $inc: { xp: 30 } },
            { returnDocument: "after" },
        );

        res.status(200).json({
            message: "Ingredients identified and recipes generated!",
            identifiedIngredients: aiResponse.identifiedIngredients,
            recipes: aiResponse.recipes,
            savedRecipeId: savedRecipe._id,
        });
    } catch (error) {
        console.error("Vision Error:", error);
        res.status(500).json({
            message: "Error processing image",
            error: error.message,
        });
    }
};

// saves the recipe to the database
exports.saveRecipe = async (req, res) => {
    try {
        const userId = req.user.userId;
        const {
            title,
            ingredients,
            instructions,
            servings,
            recipeImage,
            cuisine,
            cookingTime,
            dietaryType,
            spiceLevel,
        } = req.body;

        const newRecipe = new Recipe({
            userId,
            title,
            ingredients,
            instructions,
            servings,
            recipeImage,
            cuisine,
            cookingTime,
            dietaryType,
            spiceLevel,
        });
        const savedRecipe = await newRecipe.save();

        const user = await User.findById(userId);
        user.xp += 50;

        const xpRequiredForNextLevel = user.level * 200;
        let hasLeveledUp = false;

        if (user.xp >= xpRequiredForNextLevel) {
            user.level += 1;
            hasLeveledUp = true;
        }

        await user.save();

        res.status(201).json({
            message: "Recipe saved and XP awarded!",
            recipe: savedRecipe,
            xpGained: 50,
            newLevel: user.level,
            leveledUp: hasLeveledUp,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error saving recipe",
            error: error.message,
        });
    }
};

exports.getRecipeById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        const recipe = await Recipe.findById(id);
        if (!recipe)
            return res.status(404).json({ message: "Recipe not found" });

        // Update user's history with the viewed recipe
        await User.findByIdAndUpdate(userId, {
            $push: {
                history: {
                    $each: [{ recipeId: id }],
                    $position: 0,
                    $slice: 5,
                },
            },
        });

        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ message: "Error", error: error.message });
    }
};

// exports.getMyRecipes moved to userController.js
