import { createOpenAI } from '@ai-sdk/openai';
import { StreamingTextResponse, streamText } from 'ai';

export async function POST(request: Request) {
  const { messages = [] }: Partial<{ messages: Array<any> }> = await request.json();

  const PickMessages = messages.map((message) => {
    return {
      role: message.role,
      content: message.content,
    };
  });

  const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    // baseUrl: 'https://api.bianxie.ai/v1',
    baseURL: 'https://proxy-openai-ldziyoppio.ap-southeast-1.fcapp.run/v1',
    compatibility: 'compatible',
  });
  const stream = await streamText({
    model: openai('gpt-3.5-turbo'),
    messages: [...PickMessages],
  });
  return new StreamingTextResponse(stream.textStream);
}
