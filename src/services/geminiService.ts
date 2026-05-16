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

export async function generateFlashcards(text: string): Promise<any[]> {
  if (text.length < 20) {
    throw new Error("Insufficient content to generate flashcards.");
  }

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `You are a study assistant. Generate exactly 5-8 short, effective flashcards from the following text. 
    Format your response as a JSON array of objects. 
    Each object MUST have:
    - front: A concise term or short question.
    - back: A clear, 1-sentence definition or answer.
    
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

export async function explainCode(code: string, language?: string): Promise<string> {
  if (code.length < 10) {
    throw new Error("Please provide a bit more code to explain.");
  }

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `You are an expert software engineer and teacher. Explain the following code snippet clearly and concisely.
    
    Break down:
    1. The overall purpose of the code.
    2. Key logic and functions used.
    3. Potential improvements or common pitfalls.
    
    ${language ? `LANGUAGE: ${language}` : ""}
    CODE:
    ${code}
    
    Use Markdown formatting for your response. Keep it clear and academic.`,
    config: {
      temperature: 0.5,
    }
  });

  return response.text || "Could not generate explanation.";
}
