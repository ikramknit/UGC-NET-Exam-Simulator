import { GoogleGenAI, Type } from "@google/genai";
import { Question } from '../types';

const generateQuestions = async (syllabus: string, count: number, subject: string): Promise<Question[]> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `Based on the provided UGC NET syllabus for ${subject}, generate ${count} multiple-choice questions (MCQs). For each question and its four options, provide the text in BOTH English (en) and Hindi (hi). There should be only one correct answer per question. The difficulty should be appropriate for a national eligibility test. Do not repeat questions.
    
    Syllabus:
    ---
    ${syllabus}
    ---
    
    Return the output as a JSON array of objects, following the specified schema. Ensure the Hindi translations are accurate and natural.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: {
                type: Type.OBJECT,
                properties: {
                  en: { type: Type.STRING, description: "The question text in English." },
                  hi: { type: Type.STRING, description: "The question text in Hindi." }
                },
                required: ["en", "hi"]
              },
              options: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    en: { type: Type.STRING, description: "An option in English." },
                    hi: { type: Type.STRING, description: "The same option in Hindi." }
                  },
                  required: ["en", "hi"]
                },
                description: "An array of four possible answer objects, each with 'en' and 'hi' text."
              },
              answer: {
                type: Type.INTEGER,
                description: "The zero-based index of the correct option in the 'options' array."
              }
            },
            required: ["question", "options", "answer"]
          }
        },
      }
    });

    const jsonText = response.text.trim();
    const generatedQuestions = JSON.parse(jsonText);

    if (!Array.isArray(generatedQuestions) || generatedQuestions.length === 0) {
        throw new Error("API did not return a valid question array.");
    }
    
    return generatedQuestions.map((q: any) => ({
        question: { en: q.question.en, hi: q.question.hi },
        options: q.options.map((opt: any) => ({ en: opt.en, hi: opt.hi })),
        answer: q.answer
    }));

  } catch (error) {
    console.error("Error generating questions:", error);
    throw new Error("Failed to generate questions. Please check your API key and connection.");
  }
};

export { generateQuestions };
