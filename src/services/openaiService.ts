
export interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export class OpenAIService {
  private apiKey: string;
  private organizationId: string;

  constructor() {
    // For now, we'll use localStorage to store the API key
    // In production, this should be handled via Supabase Edge Functions
    this.apiKey = localStorage.getItem('openai_api_key') || '';
    this.organizationId = 'org-iDR2G0Le9ddQ8wWyunFA3u9o';
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
    localStorage.setItem('openai_api_key', apiKey);
  }

  hasApiKey(): boolean {
    return !!this.apiKey;
  }

  async generateTherapyResponse(messages: OpenAIMessage[]): Promise<string> {
    if (!this.apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const systemPrompt: OpenAIMessage = {
      role: 'system',
      content: `You are Mindful AI, a compassionate and professional AI therapy companion. Your role is to:

1. Provide empathetic, supportive responses
2. Use active listening techniques
3. Ask thoughtful follow-up questions
4. Offer gentle guidance and coping strategies
5. Validate emotions and experiences
6. Never provide medical advice or diagnose conditions
7. Encourage professional help when appropriate
8. Keep responses conversational and warm
9. Use therapeutic techniques like CBT, mindfulness, and emotional validation

Always respond with empathy, understanding, and professional therapeutic support. Keep responses between 50-150 words unless the situation requires more detail.`
    };

    const apiMessages = [systemPrompt, ...messages];

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'OpenAI-Organization': this.organizationId,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: apiMessages,
          temperature: 0.7,
          max_tokens: 200,
          presence_penalty: 0.1,
          frequency_penalty: 0.1,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to generate response');
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || 'I apologize, but I\'m having trouble responding right now. Please try again.';
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw error;
    }
  }
}

export const openaiService = new OpenAIService();
