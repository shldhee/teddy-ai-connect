export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export const sendMessage = async (message: string, context: string): Promise<ChatMessage> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log('Context sent to AI:', context);

  let responseContent = "I'm ChatGPT2, but I'm just a mock right now! I received your message.";
  
  if (context) {
    responseContent += `\n\nI also see you are looking at: ${context.substring(0, 50)}...`;
  }

  return {
    id: Date.now().toString(),
    role: 'assistant',
    content: responseContent,
    timestamp: Date.now(),
  };
};
