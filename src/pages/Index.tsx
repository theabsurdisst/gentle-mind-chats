
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChatProvider } from "@/context/ChatContext";
import { MoodProvider } from "@/context/MoodContext";
import Header from "@/components/Header";
import ChatInterface from "@/components/ChatInterface";
import MoodPicker from "@/components/MoodPicker";
import MoodAnalytics from "@/components/MoodAnalytics";
import ConversationHistory from "@/components/ConversationHistory";
import { HeartHandshake } from "lucide-react";

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
              <div className="max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold mb-6 animate-fade-in text-gray-800">Welcome to Mindful AI</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Chat Section - Takes up more space */}
                  <div className="md:col-span-8 animate-fade-in">
                    <h2 className="text-xl font-medium mb-4">Chat with Mindful AI</h2>
                    <div className="h-[70vh]">
                      <ChatInterface />
                    </div>
                  </div>
                  
                  {/* Mood Section - Takes up less space */}
                  <div className="md:col-span-4 animate-fade-in">
                    <MoodPicker />
                    
                    <div className="mt-6">
                      <Tabs defaultValue="mood">
                        <TabsList className="mb-4 bg-white">
                          <TabsTrigger value="mood" className="flex items-center gap-2 data-[state=active]:bg-therapy-mint/50">
                            <HeartHandshake className="h-4 w-4" />
                            <span>Mood Tracker</span>
                          </TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="mood">
                          <MoodAnalytics />
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ChatProvider>
    </MoodProvider>
  );
};

export default Index;
