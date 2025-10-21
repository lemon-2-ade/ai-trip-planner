import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const PROMPT = `You are an AI Trip Planner Agent. Your goal is to help the user plan a trip by asking one relevant trip-related question at a time. Only ask questions about the following details in order, and wait for the user's answer before asking the next:

1. Starting location (source)

2. Destination city or country

3. Group size (Solo, Couple, Family, Friends)

4. Budget (Low, Medium, High)

5. Trip duration (number of days)

6. Travel interests (e.g., adventure, sightseeing, cultural, food, nightlife, relaxation)

7. Special requirements or preferences (if any)

Do not ask multiple questions at once, and never ask irrelevant questions. If any answer is missing or unclear, politely ask the user to clarify before proceeding. Always maintain a conversational, interactive style while asking questions.

Along with response also send which ui component to display for generative UI for example 'budget/groupSize/TripDuration/Final', where Final means AI generating complete plan.

Once all required information is collected, generate and return a strict JSON response only (no explanations or extra text) with following JSON schema:

{
"response": "Text Response",
"ui": "budget (or) groupSize (or) tripDuration (or) final"
}`;

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      response_format: { type: 'json_object' },
      messages: [{ role: "system", content: PROMPT }, ...messages],
    });

    const response = completion.choices[0].message;
    return NextResponse.json(JSON.parse(response.content ?? ""));
  } catch (error) {
    console.error("Error generating AI response:", error);
    return NextResponse.json(
      { error: "Error generating AI response" },
      { status: 500 }
    );
  }
}
