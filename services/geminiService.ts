import { GoogleGenAI, Type } from "@google/genai";
import { LoadEstimate } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getLoadEstimate = async (
  material: string,
  weight: string,
  distance: string
): Promise<LoadEstimate> => {
  try {
    const model = "gemini-3-flash-preview"; 
    
    const prompt = `
      As an expert Indian Logistics Manager, provide a structured estimate for transporting goods.
      
      Details:
      - Material: ${material}
      - Weight: ${weight}
      - Distance: ${distance} km
      - Region: India
      
      Provide a JSON response with:
      1. recommendedTruck (e.g., Tata Ace, Eicher 19ft, 32ft MXL, etc.)
      2. estimatedCost (Range in INR, e.g. "₹5,000 - ₹6,000")
      3. fuelEstimate (Approximate Litres of Diesel)
      4. tollEstimate (Approximate Toll charges in INR)
      5. explanation (A very brief 1-sentence explanation)
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedTruck: { type: Type.STRING },
            estimatedCost: { type: Type.STRING },
            fuelEstimate: { type: Type.STRING },
            tollEstimate: { type: Type.STRING },
            explanation: { type: Type.STRING },
          },
          required: ["recommendedTruck", "estimatedCost", "fuelEstimate", "tollEstimate", "explanation"]
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("No data returned");
    
    return JSON.parse(jsonText) as LoadEstimate;

  } catch (error) {
    console.error("Gemini Estimate Error:", error);
    // Fallback for demo purposes if API fails
    return {
      recommendedTruck: "Standard 14ft Truck (Fallback)",
      estimatedCost: "₹4,000 - ₹5,000",
      fuelEstimate: "30-35 Litres",
      tollEstimate: "₹400",
      explanation: "Unable to connect to AI. Showing rough standard estimates."
    };
  }
};