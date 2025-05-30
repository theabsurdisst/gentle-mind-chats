
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { Message, Conversation } from "@/types";
import { v4 as uuidv4 } from "uuid";

interface ChatState {
  currentConversation: Conversation | null;
  conversations: Conversation[];
  isLoading: boolean;
  error: string | null;
}

type ChatAction =
  | { type: 'SET_CONVERSATIONS'; payload: Conversation[] }
  | { type: 'SET_CURRENT_CONVERSATION'; payload: Conversation }
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'START_NEW_CONVERSATION'; payload: Conversation }
  | { type: 'UPDATE_CONVERSATION'; payload: Conversation };

interface ChatContextProps {
  state: ChatState;
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

const INITIAL_GREETING = "Hello! I'm Mindful AI, your personal therapy companion. I'm here to listen and support you. How are you feeling today?";

const AI_RESPONSES = [
  "I hear you, and I want you to know that your feelings are completely valid. Can you tell me more about what's been on your mind?",
  "That sounds really challenging. You're being so brave by sharing this with me. How long have you been carrying these feelings?",
  "Thank you for trusting me with this. It takes courage to open up. What do you think might help you feel a little lighter right now?",
  "I'm here with you through this. Sometimes just being heard can make a difference. Is there anything specific you'd like to explore together?",
  "Your emotional experience matters, and I'm grateful you're sharing it with me. What would feel most supportive for you in this moment?",
  "I can sense this is important to you. You're taking such a positive step by talking about it. What insights have you had about this situation?",
  "It sounds like you're going through a lot. Remember, you don't have to carry this alone. What kind of support feels most helpful to you?",
  "I appreciate your openness. Every feeling you're experiencing is part of your human experience. What would you like to focus on together today?",
];

const initialState: ChatState = {
  currentConversation: null,
  conversations: [],
  isLoading: false,
  error: null,
};

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'SET_CONVERSATIONS':
      return { ...state, conversations: action.payload };
    case 'SET_CURRENT_CONVERSATION':
      return { ...state, currentConversation: action.payload };
    case 'ADD_MESSAGE':
      if (!state.currentConversation) return state;
      const updatedConversation = {
        ...state.currentConversation,
        messages: [...state.currentConversation.messages, action.payload],
        lastUpdated: Date.now(),
      };
      return {
        ...state,
        currentConversation: updatedConversation,
        conversations: state.conversations.map(conv =>
          conv.id === updatedConversation.id ? updatedConversation : conv
        ),
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'START_NEW_CONVERSATION':
      return {
        ...state,
        currentConversation: action.payload,
        conversations: [action.payload, ...state.conversations],
      };
    case 'UPDATE_CONVERSATION':
      return {
        ...state,
        currentConversation: action.payload,
        conversations: [action.payload, ...state.conversations.filter(c => c.id !== action.payload.id)],
      };
    default:
      return state;
  }
}

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  // Initialize conversations from localStorage
  useEffect(() => {
    console.log("ChatProvider: Initializing...");
    const storedConversations = localStorage.getItem("mindful_conversations");
    
    if (storedConversations) {
      try {
        const parsedConversations = JSON.parse(storedConversations);
        console.log("ChatProvider: Loaded conversations from storage:", parsedConversations.length);
        dispatch({ type: 'SET_CONVERSATIONS', payload: parsedConversations });
        
        if (parsedConversations.length > 0) {
          const lastConversation = parsedConversations[0];
          dispatch({ type: 'SET_CURRENT_CONVERSATION', payload: lastConversation });
          console.log("ChatProvider: Set current conversation:", lastConversation.title);
        } else {
          startNewConversation();
        }
      } catch (error) {
        console.error("ChatProvider: Error parsing stored conversations:", error);
        startNewConversation();
      }
    } else {
      console.log("ChatProvider: No stored conversations, starting new one");
      startNewConversation();
    }
  }, []);

  // Save to localStorage whenever conversations change
  useEffect(() => {
    if (state.conversations.length > 0) {
      localStorage.setItem("mindful_conversations", JSON.stringify(state.conversations));
      console.log("ChatProvider: Saved conversations to storage");
    }
  }, [state.conversations]);

  const startNewConversation = () => {
    console.log("ChatProvider: Starting new conversation");
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

    dispatch({ type: 'START_NEW_CONVERSATION', payload: newConversation });
  };

  const loadConversation = (id: string) => {
    console.log("ChatProvider: Loading conversation:", id);
    const conversation = state.conversations.find(conv => conv.id === id);
    if (conversation) {
      dispatch({ type: 'SET_CURRENT_CONVERSATION', payload: conversation });
    }
  };

  const sendMessage = async (content: string) => {
    if (!state.currentConversation || state.isLoading) {
      console.log("ChatProvider: Cannot send message - no conversation or loading");
      return;
    }

    console.log("ChatProvider: Sending message:", content);
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      // Add user message
      const userMessage: Message = {
        id: uuidv4(),
        content,
        role: "user",
        timestamp: Date.now(),
      };

      dispatch({ type: 'ADD_MESSAGE', payload: userMessage });

      // Update conversation title if it's a new conversation
      let updatedConversation = state.currentConversation;
      if (updatedConversation.title === "New conversation") {
        updatedConversation = {
          ...updatedConversation,
          title: content.slice(0, 40) + (content.length > 40 ? "..." : ""),
          lastUpdated: Date.now(),
        };
        dispatch({ type: 'UPDATE_CONVERSATION', payload: updatedConversation });
      }

      // Simulate AI thinking time
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1500));

      // Generate AI response
      const randomResponse = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
      const aiMessage: Message = {
        id: uuidv4(),
        content: randomResponse,
        role: "assistant",
        timestamp: Date.now(),
      };

      dispatch({ type: 'ADD_MESSAGE', payload: aiMessage });
      console.log("ChatProvider: AI response sent");

    } catch (error) {
      console.error("ChatProvider: Error sending message:", error);
      dispatch({ type: 'SET_ERROR', payload: "Failed to send message. Please try again." });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return (
    <ChatContext.Provider
      value={{
        state,
        sendMessage,
        startNewConversation,
        loadConversation,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
