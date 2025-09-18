// Imported required packages
const OpenAI = require("openai");

// Initialize the OpenAI client with API key from environment variables
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Function to get AI-based scoring for a lead against an offer
// Uses GPT model to classify intent (High / Medium / Low) with reasoning
// Returns { aiScore, intent, reasoning }
const scoreAI = async (lead, offer) => {
  try {

    // ------------------------------------
    // 1. Build the prompt for the AI model
    // ------------------------------------
    // The AI is asked to analyze the offer + prospect info
    // and return a JSON response with "intent" and "reason".
    const prompt = `
You are a sales analyst. Given the product and the prospect, classify the buying intent.

Product:
- Name: ${offer.name}
- Value Props: ${offer.value_props.join(", ")}
- Ideal Use Cases: ${offer.ideal_use_cases.join(", ")}

Prospect:
- Name: ${lead.name}
- Role: ${lead.role}
- Company: ${lead.company}
- Industry: ${lead.industry}
- Location: ${lead.location}
- LinkedIn Bio: ${lead.linkedin_bio}

Return JSON only: {"intent":"High/Medium/Low","reason":"short explanation"}
    `;

    // ------------------------------------
    // 2. Call the OpenAI Chat API
    // ------------------------------------
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    // ------------------------------------
    // 3. Parse AI response into JSON
    // ------------------------------------
    let aiResult;
    try {
      // Try parsing the model output (expected to be JSON)
      aiResult = JSON.parse(response.choices[0].message.content);
    } catch {
      // If parsing fails, fallback to "Medium" intent
      aiResult = { intent: "Medium", reason: "Defaulted due to parse error" };
    }

    // ------------------------------------
    // 4. Map intent label → numeric score
    // ------------------------------------
    const intentMap = { High: 50, Medium: 30, Low: 10 };
    const aiScore = intentMap[aiResult.intent] || 30;

    // Return AI scoring result
    return { aiScore, intent: aiResult.intent, reasoning: aiResult.reason };
  } catch (err) {

    // ------------------------------------
    // 5. Error handling (AI call failed)
    // ------------------------------------
    // If AI request completely fails, fallback to "Low" intent
    return { aiScore: 10, intent: "Low", reasoning: "AI error fallback" };
  }
};


module.exports = scoreAI;