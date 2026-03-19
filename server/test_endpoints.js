const axios = require('axios');

async function test() {
    const baseURL = 'http://localhost:5000/api';
    const email = `test_${Date.now()}@example.com`;
    try {
        console.log("0. Testing Signup...");
        await axios.post(`${baseURL}/auth/signup`, {
            username: 'TestUser',
            email: email,
            password: 'password123'
        });
        console.log("Signup Success.");

        console.log("1. Testing Login...");
        const loginRes = await axios.post(`${baseURL}/auth/login`, {
            email: email,
            password: 'password123'
        });
        const token = loginRes.data.token;
        console.log("Login Success, Token obtained.");

        const config = { headers: { Authorization: `Bearer ${token}` } };

        console.log("2. Testing Profile Fetch...");
        const profileRes = await axios.get(`${baseURL}/user/profile`, config);
        console.log("Profile Fetch Success:", profileRes.data.email);

        console.log("3. Testing Add XP...");
        const xpRes = await axios.post(`${baseURL}/user/add-xp`, { amount: 100 }, config);
        console.log("Add XP Success:", xpRes.data.xp);

        console.log("4. Testing AI Recommendation...");
        const aiRes = await axios.post(`${baseURL}/ai/recommend`, {
            ingredients: ['Tomato', 'Basil'],
            cuisine: 'Italian'
        }, config);
        console.log("AI Recommendation Success. Recipes count:", aiRes.data.recipes?.length);

        console.log("5. Testing Record Cook...");
        const cookRes = await axios.post(`${baseURL}/user/record-cook`, {
            recipeId: 'ai-test-123',
            title: 'Test Pasta',
            emoji: '🍝',
            cuisine: 'Italian'
        }, config);
        console.log("Record Cook Success. History count:", cookRes.data.history?.length);

        console.log("6. Testing Saved Recipes Sync...");
        const syncRes = await axios.post(`${baseURL}/user/sync-saved`, {
            savedRecipes: [
                { id: "saved_1", title: "Saved Recipe 1", emoji: "🍕" }
            ]
        }, config);
        console.log("Saved Recipes Sync Success.");

        console.log("\nALL TESTS PASSED!");

    } catch (err) {
        console.error("TEST FAILED!");
        if (err.response) {
            console.error(`Status: ${err.response.status}`);
            console.error(`Route: ${err.config.url}`);
            console.error(`Data:`, JSON.stringify(err.response.data, null, 2));
        } else {
            console.error(err.message);
        }
    }
}

test();
