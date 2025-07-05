import { geminiApiCall } from './pathToGeminiApiCall'; // Adjust the import based on your project structure

async function solveEquation(equation: string) {
  // ...existing code...
  const aiResponse = await geminiApiCall(equation);
  let data;
  try {
    let responseStr = aiResponse;
    if (typeof aiResponse === 'string') {
      // Clean up common Gemini JSON issues (e.g., stray characters)
      // Remove any non-JSON trailing characters after the last closing brace
      const lastBrace = responseStr.lastIndexOf('}');
      if (lastBrace !== -1) {
        responseStr = responseStr.slice(0, lastBrace + 1);
      }
      // Optionally, remove any invalid characters (e.g., stray Unicode in arrays)
      responseStr = responseStr.replace(/[\u2000-\uFFFF]/g, '');
      data = JSON.parse(responseStr);
    } else {
      data = aiResponse;
    }
  } catch (err) {
    throw new Error('The AI returned an invalid response format. Please try again.');
  }
  // ...existing code...
  return data;
}

// ...existing code...