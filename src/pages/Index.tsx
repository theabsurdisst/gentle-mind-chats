import React, { useState, useEffect } from "react";
import { ChatProvider } from "@/context/ChatContext";
import { MoodProvider } from "@/context/MoodContext";
import Header from "@/components/Header";
import ChatInterface from "@/components/ChatInterface";
import ConversationHistory from "@/components/ConversationHistory";
import MoodPicker from "@/components/MoodPicker";
import ApiKeyInput from "@/components/ApiKeyInput";
import { openaiService } from "@/services/openaiService";

const Index = () => {
  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    setHasApiKey(openaiService.hasApiKey());
  }, []);

  const handleApiKeySet = () => {
    setHasApiKey(true);
  };

  if (!hasApiKey) {
    return (
      <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header />
        <div className="flex-1 flex items-center justify-center p-6">
          <ApiKeyInput onApiKeySet={handleApiKeySet} />
        </div>
      </div>
    );
  }

  return (
    <MoodProvider>
      <ChatProvider>
        <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <Header />
          
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar - Conversation History */}
            <div className="w-[300px] border-r border-white/50 bg-white/30 backdrop-blur-sm hidden lg:block">
              <div className="p-4 h-full">
                <ConversationHistory />
              </div>
            </div>
            
            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
              {/* Quick Mood Picker */}
              <div className="border-b border-white/50 bg-white/20 backdrop-blur-sm p-4">
                <MoodPicker />
              </div>
              
              {/* Chat Interface */}
              <div className="flex-1 p-6">
                <ChatInterface />
              </div>
            </div>
          </div>
        </div>
      </ChatProvider>
    </MoodProvider>
  );
};

export default Index;
