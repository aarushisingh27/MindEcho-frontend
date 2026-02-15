
import { GoogleGenAI, Type } from "@google/genai";
import { PeriodMode, InsightResult, Interest } from "../types";

const API_KEY = process.env.API_KEY || "";

export const analyzeThinkingPattern = async (
  reflection: string,
  periodMode: PeriodMode | null,
  interests: Interest[]
): Promise<InsightResult> => {
  if (!API_KEY) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          pattern: "Rumination",
          reflectionInsight: "You appear to revisit distressing thoughts frequently, which may indicate a pattern of rumination where the mind circles back to unsolved problems.",
          suggestion: "Try the '5-4-3-2-1' grounding technique to pull your focus back to the present moment.",
          moodIndicator: "Contemplative",
          echoScore: 68,
          activitySuggestion: interests.includes('Music') 
            ? "Listen to a calming instrumental track to help shift your mental frequency." 
            : `Engage in some ${interests[0]} for 10 minutes to break the thought loop.`
        });
      }, 1500);
    });
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const context = periodMode 
    ? `The user is currently in the '${periodMode}' phase of their menstrual cycle.` 
    : "This is a general reflection (user has opted out of cycle tracking).";

  const interestContext = `The user's personal interest areas are: ${interests.join(', ')}.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
        Analyze the following journal reflection from a cognitive-behavioral perspective. 
        ${context}
        ${interestContext}
        
        Journal Entry: "${reflection}"
        
        Tasks:
        1. Identify the primary 'pattern' (e.g., Rumination, Catastrophizing, Black-and-White Thinking, Positive Reframing).
        2. Provide a 'reflectionInsight' which is a short reflective explanation of why this pattern was detected.
        3. Provide a gentle wellness 'suggestion'.
        4. Determine a 'moodIndicator' (one word).
        5. Calculate an 'echoScore' (0-100) representing emotional flexibility and balance.
        6. Generate a 'activitySuggestion' based specifically on the user's provided interests as a secondary support layer.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            pattern: { type: Type.STRING, description: "Name of the thinking pattern" },
            reflectionInsight: { type: Type.STRING, description: "A reflective explanation of the detected pattern" },
            suggestion: { type: Type.STRING, description: "A gentle wellness advice" },
            moodIndicator: { type: Type.STRING, description: "A single word describing the tone" },
            echoScore: { type: Type.NUMBER, description: "Emotional flexibility score 0-100" },
            activitySuggestion: { type: Type.STRING, description: "Personalized activity based on user interests" }
          },
          required: ["pattern", "reflectionInsight", "suggestion", "moodIndicator", "echoScore", "activitySuggestion"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    return result as InsightResult;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw new Error("Failed to analyze pattern. Please try again.");
  }
};
