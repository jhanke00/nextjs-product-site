import { Recommendation } from '@/src/type/Recommendation';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Replace with your actual Gemini credentials
const apiKey = process.env.GEMINI_API_KEY;

const productRecommendationPrompt = `Given the following user's purchase and viewed product history:

Recent Purchases:
{{recentPurchases}}

Viewed Products:
{{viewedProducts}}

Recommend 5 products that the user might be interested in, based on their preferences. Provide the product ID, title, price, and image URL for each recommendation in JSON format.
`; // Note: using template literals (backticks) for easier variable interpolation

export async function getRecommendations(userId: string): Promise<Recommendation[]> {
    // Fetch user's recent purchases and viewed products (from database or local storage)
    const recentPurchases = await fetchRecentPurchases(userId);
    const viewedProducts = await fetchViewedProducts(userId);

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "models/chat-bison-001" }); // or your preferred model

    const prompt = productRecommendationPrompt
      .replace("{{recentPurchases}}", recentPurchases.join(', '))
      .replace("{{viewedProducts}}", viewedProducts.join(', '));

    const response = await model.generateContent([prompt]);
    const recommendationsText = response.map(part => part.text).join('');

    // Parse recommendations from the generated text
    const recommendations: Recommendation[] = parseGeminiResponse(recommendationsText);
    return recommendations;
}

// Placeholder functions for fetching data (replace with your actual implementation)
async function fetchRecentPurchases(userId: string): Promise<string[]> {
    // Fetch from your database or data source
    // For POC, you might use mock data
    return ["Product A", "Product B"];
}

async function fetchViewedProducts(userId: string): Promise<string[]> {
    // Fetch from your database or data source
    // For POC, you might use local storage
    return ["Product C", "Product D"];
}

// Function to parse Gemini response (you'll need to customize this)
function parseGeminiResponse(response: string): Recommendation[] {
    // Parse the JSON response from Gemini into an array of Recommendation objects
    try {
        return JSON.parse(response) as Recommendation[];
    } catch (error) {
        console.error('Error parsing Gemini response:', error);
        return []; // Return an empty array in case of parsing errors
    }
}
