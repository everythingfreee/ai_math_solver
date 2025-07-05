
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Solution } from "../types";

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const PROMPT = `
You are an expert mathematics tutor AI. Your task is to solve the provided mathematical problem.

The user might provide a text input, an image of a handwritten equation, or both. 
- If an image is provided, it is the primary source of truth for the equation.
- If only text is provided, use the text.

Your response MUST be a single JSON object. Do not include any text, notes, or explanations outside of this JSON object.
The JSON object must conform to the following TypeScript interface:

interface Solution {
  // A concise summary of the final answer.
  solution: string;

  // A detailed, step-by-step explanation of how the solution was reached. Each step should be a string in an array.
  steps: string[];

  // The original equation you interpreted from the user's input, formatted nicely (e.g., using LaTeX style for powers like x^2).
  interpretedEquation: string;

  // A boolean indicating if the equation can be represented as a 2D graph (e.g., a function of x).
  isGraphable: boolean;

  // If isGraphable is true, provide the data points to plot the graph.
  // The data should cover a representative range of the function, especially around interesting points like intercepts, maxima, or minima.
  // Generate at least 50 points for a smooth curve.
  // If isGraphable is false, this field must be null.
  graphData: {
    points: Array<{ x: number; y: number }>;
    xAxisLabel: string;
    yAxisLabel: string;
  } | null;
}

Now, solve the problem.
`;


export const solveEquation = async (equation: string, drawingDataUrl: string | null): Promise<Solution> => {
  const model = "gemini-2.5-flash-preview-04-17";
  
  const contents = [];
  contents.push({ text: PROMPT });
  contents.push({ text: `Text Input: "${equation}"` });

  if (drawingDataUrl) {
    const base64Data = drawingDataUrl.split(',')[1];
    contents.push({
      inlineData: {
        mimeType: 'image/png',
        data: base64Data,
      },
    });
     contents.push({ text: "Use the image provided as the primary source for the equation." });
  }

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: model,
        contents: { parts: contents },
        config: {
            responseMimeType: "application/json",
            temperature: 0.2,
        }
    });

    let jsonStr = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
        jsonStr = match[2].trim();
    }

    try {
        const parsedData: Solution = JSON.parse(jsonStr);
        // Basic validation
        if (!parsedData.solution || !parsedData.steps || !parsedData.interpretedEquation) {
            throw new Error("AI response is missing required fields.");
        }
        return parsedData;
    } catch (e) {
        console.error("Failed to parse JSON response:", jsonStr);
        throw new Error("The AI returned an invalid response format. Please try again.");
    }
  } catch (error) {
      console.error("Error calling Gemini API:", error);
      throw new Error("Failed to communicate with the AI service. Please check your connection and API key.");
  }
};
