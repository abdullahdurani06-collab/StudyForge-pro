import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateNotes(text: string): Promise<string> {
  if (text.length < 50) {
    throw new Error("Insufficient content to generate quality study material.");
  }

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `You are an expert student note-taker. Summarize the following text into professional, structured Markdown notes. 
    
    CRITICAL FORMATTING RULES:
    1. Use # Heading 1 for the main title.
    2. Use ## Heading 2 for major sub-topics.
    3. Use bold text for technical definitions and important keywords.
    4. Use bullet points for lists.
    5. VERY IMPORTANT: Include a "!!! PRO-TIP" callout section for key exam concepts at appropriate points.
    
    TEXT:
    ${text}`,
    config: {
      temperature: 0.7,
    }
  });

  return response.text || "Failed to generate notes.";
}

export async function generateMCQs(text: string, count: number = 3): Promise<any[]> {
  if (text.length < 50) {
    throw new Error("Insufficient content to generate quality study material.");
  }

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate exactly ${count} high-quality multiple choice questions based ONLY on the following text. 
    Format your response as a JSON array of objects. Each object should have:
    - question: The question text
    - options: An array of 4 distinct options
    - correctAnswer: The correct option string from the options array
    
    TEXT:
    ${text}`,
    config: {
      temperature: 0.7,
      responseMimeType: "application/json",
    }
  });

  const rawJson = response.text || "[]";
  try {
    return JSON.parse(rawJson);
  } catch (e) {
    console.error("Failed to parse JSON response from Gemini", e);
    return [];
  }
}
