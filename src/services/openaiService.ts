
// Replace this with your actual OpenAI API key from https://platform.openai.com/account/api-keys
const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY_HERE";

export interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export class OpenAIService {
  private apiKey: string;
  private baseUrl = 'https://api.openai.com/v1';

  constructor() {
    this.apiKey = OPENAI_API_KEY;
    
    // Check if API key is set
    if (this.apiKey === "YOUR_OPENAI_API_KEY_HERE" || !this.apiKey) {
      console.warn("OpenAI API key not configured. Please set a valid API key.");
    }
  }

  async generateTherapyResponse(messages: OpenAIMessage[]): Promise<string> {
    // Check if API key is configured
    if (this.apiKey === "YOUR_OPENAI_API_KEY_HERE" || !this.apiKey) {
      throw new Error('OpenAI API key not configured. Please check your API key and ensure you have credits in your OpenAI account.');
    }

    const systemPrompt: OpenAIMessage = {
      role: 'system',
      content: `You are Mindful AI, a compassionate and professional AI therapy companion. Your role is to:

1. Provide empathetic, supportive responses
2. Use evidence-based therapeutic techniques (CBT, mindfulness, etc.)
3. Ask thoughtful follow-up questions to help users explore their feelings
4. Validate emotions while gently challenging negative thought patterns
5. Suggest practical coping strategies when appropriate
6. Maintain appropriate therapeutic boundaries
7. Be warm, non-judgmental, and encouraging

Keep responses conversational, supportive, and typically 2-4 sentences. Focus on active listening and helping users gain insights into their emotional experiences.

IMPORTANT: If someone expresses thoughts of self-harm or suicide, acknowledge their pain and gently suggest they reach out to a crisis helpline or mental health professional immediately.`
    };

    const payload = {
      model: 'gpt-4o-mini',
      messages: [systemPrompt, ...messages],
      max_tokens: 300,
      temperature: 0.7,
    };

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('OpenAI API Error Response:', errorData);
        
        if (response.status === 401) {
          throw new Error('Invalid OpenAI API key. Please check your API key and ensure it\'s valid.');
        } else if (response.status === 429) {
          throw new Error('OpenAI API rate limit exceeded. Please try again in a moment.');
        } else if (response.status === 402) {
          throw new Error('OpenAI API quota exceeded. Please check your billing and usage limits.');
        }
        
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || "I'm here to listen. Can you tell me more about what you're experiencing?";
    } catch (error) {
      console.error('OpenAI API Error:', error);
      
      if (error instanceof Error) {
        throw error;
      }
      
      throw new Error('I apologize, but I encountered an issue generating a response. Please try again in a moment.');
    }
  }
}

export const openaiService = new OpenAIService();
