
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChatProvider } from "@/context/ChatContext";
import { MoodProvider } from "@/context/MoodContext";
import Header from "@/components/Header";
import ChatInterface from "@/components/ChatInterface";
import MoodPicker from "@/components/MoodPicker";
import MoodAnalytics from "@/components/MoodAnalytics";
import ConversationHistory from "@/components/ConversationHistory";
import { MessageCircle, HeartHandshake } from "lucide-react";

const Index = () => {
  return (
    <MoodProvider>
      <ChatProvider>
        <div className="flex flex-col min-h-screen bg-background">
          <Header />
          
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <div className="w-[280px] border-r p-4 hidden md:block">
              <ConversationHistory />
            </div>
            
            {/* Main Content */}
            <div className="flex-1 p-4 md:p-6 overflow-y-auto">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-6 animate-fade-in">Welcome to Mindful AI</h1>
                
                <MoodPicker />
                
                <Tabs defaultValue="chat" className="animate-fade-in">
                  <TabsList className="mb-6">
                    <TabsTrigger value="chat" className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>Chat</span>
                    </TabsTrigger>
                    <TabsTrigger value="mood" className="flex items-center gap-1">
                      <HeartHandshake className="h-4 w-4" />
                      <span>Mood Tracker</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="chat" className="space-y-6">
                    <div className="h-[60vh]">
                      <ChatInterface />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="mood">
                    <MoodAnalytics />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </ChatProvider>
    </MoodProvider>
  );
};

export default Index;
