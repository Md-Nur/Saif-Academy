import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText } from "ai";

export const POST = async (req: Request) => {
  const { messages } = await req.json();

  console.log("message", messages);

  const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  });
  const result = streamText({
    model: openrouter("gpt-3.5-turbo"),
    system: "You are a helpful English tutor.",
    messages,
  });
  return result.toDataStreamResponse();
};
