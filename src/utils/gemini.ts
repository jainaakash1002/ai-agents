import { GoogleGenerativeAI } from "@google/generative-ai";
import { GenerationConfig, Model } from "../types";

export const createGeminiClient = (apiKey: string) => {
	return new GoogleGenerativeAI(apiKey);
};

export const generateText = async (
	apiKey: string,
	prompt: string,
	model: Model = "gemini-2.0-flash-lite",
	config: GenerationConfig,
) => {
	try {
		const genAI = createGeminiClient(apiKey);
		const geminiModel = genAI.getGenerativeModel({ model });

		const result = await geminiModel.generateContent({
			contents: [{ role: "user", parts: [{ text: prompt }] }],
			generationConfig: {
				temperature: config.temperature,
				topK: config.topK,
				topP: config.topP,
				maxOutputTokens: config.maxOutputTokens,
			},
		});

		const response = result.response;
		return response.text();
	} catch (error) {
		console.error("Error generating text:", error);
		throw error;
	}
};

export const generateTextWithHistory = async (
	apiKey: string,
	history: { role: "user" | "model"; parts: Array<{ text: string }> }[],
	model: Model = "gemini-2.0-flash-lite",
	config: GenerationConfig,
) => {
	try {
		const genAI = createGeminiClient(apiKey);
		const geminiModel = genAI.getGenerativeModel({ model });

		const chat = geminiModel.startChat({
			history,
			generationConfig: {
				temperature: config.temperature,
				topK: config.topK,
				topP: config.topP,
				maxOutputTokens: config.maxOutputTokens,
			},
		});

		const lastMessage = history[history.length - 1];
		const lastUserMessage = lastMessage.parts[0].text;

		const result = await chat.sendMessage(lastUserMessage);
		return result.response.text();
	} catch (error) {
		console.error("Error generating text with history:", error);
		throw error;
	}
};
