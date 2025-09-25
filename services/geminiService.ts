import { GoogleGenAI, Type } from "@google/genai";
import { Question } from '../types';

/**
 * Selects a random unit from the syllabus to reduce prompt size.
 * This helps prevent API errors due to overly large prompts.
 * @param syllabus The full syllabus string.
 * @returns A string containing a single random unit from the syllabus.
 */
const getRandomSyllabusUnit = (syllabus: string): string => {
    // This regex splits the syllabus by units, like "Unit-I" or "Unit - 1".
    const units = syllabus.split(/Unit[ -]/);
    
    // The first element of the split is an empty string because the syllabus starts with "Unit".
    const actualUnits = units.slice(1);

    if (actualUnits.length > 0) {
        const randomIndex = Math.floor(Math.random() * actualUnits.length);
        // We add "Unit -" back for context for the model. The unit content starts with its number/numeral.
        return 'Unit - ' + actualUnits[randomIndex].trim();
    }

    return syllabus; // Fallback to the full syllabus if splitting fails.
};


const generateQuestions = async (syllabus: string, count: number, subject: string): Promise<Question[]> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const syllabusSnippet = getRandomSyllabusUnit(syllabus);
    
    const pluralizedQuestion = count === 1 ? "question (MCQ)" : "questions (MCQs)";
    const prompt = `Based on the provided UGC NET syllabus unit for ${subject}, generate ${count} multiple-choice ${pluralizedQuestion}. For each question and its four options, provide the text in BOTH English (en) and Hindi (hi). There should be only one correct answer per question. The difficulty should be appropriate for a national eligibility test. Do not repeat questions.
    
    Syllabus Unit:
    ---
    ${syllabusSnippet}
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