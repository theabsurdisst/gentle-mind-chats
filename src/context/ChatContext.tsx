
import React, { createContext, useContext, useState, useEffect } from "react";
import { Message, Conversation } from "@/types";
import { v4 as uuidv4 } from "uuid";

interface ChatContextProps {
  currentConversation: Conversation | null;
  conversations: Conversation[];
  messages: Message[];
  isLoading: boolean;
  sendMessage: (content: string) => Promise<void>;
  startNewConversation: () => void;
  loadConversation: (id: string) => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

const INITIAL_GREETING = "Hi there, I'm Mindful AI, your virtual therapy companion. How are you feeling today?";

// Simple responses for MVP demo - in a real app, this would be connected to an AI API
const AI_RESPONSES = [
  "I understand how you feel. Would you like to explore that feeling a bit more?",
  "That sounds challenging. How long have you been feeling this way?",
  "Thank you for sharing that with me. What do you think contributed to these feelings?",
  "I'm here to listen and support you. Is there anything specific you'd like to focus on today?",
  "Your feelings are valid. Would it help to talk about some coping strategies?",
  "I appreciate you opening up. How have you been managing these emotions so far?",
  "It takes courage to express your feelings. Is there anything else on your mind?",
  "Let's explore this together. What would be helpful for you right now?",
];

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize or load from storage
  useEffect(() => {
    const storedConversations = localStorage.getItem("mindful_conversations");
    
    if (storedConversations) {
      const parsedConversations = JSON.parse(storedConversations);
      setConversations(parsedConversations);
      
      // Load the last conversation
      const lastConversation = parsedConversations[0];
      if (lastConversation) {
        setCurrentConversation(lastConversation);
        setMessages(lastConversation.messages);
      } else {
        startNewConversation();
      }
    } else {
      startNewConversation();
    }
  }, []);

  // Save conversations to storage whenever they change
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem("mindful_conversations", JSON.stringify(conversations));
    }
  }, [conversations]);

  const startNewConversation = () => {
    const initialMessage: Message = {
      id: uuidv4(),
      content: INITIAL_GREETING,
      role: "assistant",
      timestamp: Date.now(),
    };

    const newConversation: Conversation = {
      id: uuidv4(),
      title: "New conversation",
      messages: [initialMessage],
      lastUpdated: Date.now(),
    };

    setCurrentConversation(newConversation);
    setMessages(newConversation.messages);
    setConversations(prev => [newConversation, ...prev]);
  };

  const loadConversation = (id: string) => {
    const conversation = conversations.find(conv => conv.id === id);
    if (conversation) {
      setCurrentConversation(conversation);
      setMessages(conversation.messages);
    }
  };

  const sendMessage = async (content: string) => {
    if (!currentConversation) return;

    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      content,
      role: "user",
      timestamp: Date.now(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    
    // Update current conversation
    const updatedConversation = {
      ...currentConversation,
      messages: updatedMessages,
      lastUpdated: Date.now(),
    };
    
    // For the title, use the first user message if this is a new conversation
    if (updatedConversation.title === "New conversation" && userMessage.content.length > 0) {
      updatedConversation.title = userMessage.content.slice(0, 30) + (userMessage.content.length > 30 ? "..." : "");
    }
    
    setCurrentConversation(updatedConversation);
    
    // Update conversations list
    setConversations(prev => {
      const others = prev.filter(c => c.id !== currentConversation.id);
      return [updatedConversation, ...others];
    });

    // Simulate AI thinking
    setIsLoading(true);
    
    // Simulate AI response after a delay (1-2 seconds)
    setTimeout(async () => {
      const randomResponse = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
      
      const aiMessage: Message = {
        id: uuidv4(),
        content: randomResponse,
        role: "assistant",
        timestamp: Date.now(),
      };

      const messagesWithAiResponse = [...updatedMessages, aiMessage];
      setMessages(messagesWithAiResponse);
      
      // Update current conversation with AI response
      const conversationWithAiResponse = {
        ...updatedConversation,
        messages: messagesWithAiResponse,
        lastUpdated: Date.now(),
      };
      
      setCurrentConversation(conversationWithAiResponse);
      
      // Update conversations list
      setConversations(prev => {
        const others = prev.filter(c => c.id !== currentConversation.id);
        return [conversationWithAiResponse, ...others];
      });
      
      setIsLoading(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  return (
    <ChatContext.Provider
      value={{
        currentConversation,
        conversations,
        messages,
        isLoading,
        sendMessage,
        startNewConversation,
        loadConversation,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
