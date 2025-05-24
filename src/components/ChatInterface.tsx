
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Send, Loader2 } from "lucide-react";
import { useChat } from "@/context/ChatContext";
import TherapyTopics from "./TherapyTopics";

const ChatInterface: React.FC = () => {
  const { messages, sendMessage, isLoading } = useChat();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      const messageToSend = input.trim();
      setInput(""); // Clear input immediately
      await sendMessage(messageToSend);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e as unknown as React.FormEvent);
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      <Card className="flex-1 overflow-hidden flex flex-col bg-white shadow-lg border-therapy-lavender">
        <div className="overflow-y-auto p-6 flex-1 chat-scrollbar" style={{ minHeight: "500px" }}>
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-4 shadow-md animate-fade-in ${
                    message.role === "user" 
                      ? "bg-therapy-lavender text-gray-800 rounded-tr-sm" 
                      : "bg-therapy-blue text-gray-800 rounded-tl-sm"
                  }`}
                >
                  <p className="text-base leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-therapy-blue text-gray-800 p-4 rounded-2xl rounded-tl-sm flex items-center shadow-md">
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  <span>Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        <div className="p-6 border-t bg-gray-50">
          <form onSubmit={handleSendMessage} className="flex items-end gap-4">
            <div className="flex-1">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message here..."
                className="min-h-[120px] resize-none text-lg p-4 border-2 border-gray-200 focus:border-therapy-lavender rounded-xl"
                disabled={isLoading}
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="shrink-0 h-[120px] w-[120px] bg-primary hover:bg-primary/90 rounded-xl"
              disabled={!input.trim() || isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-8 w-8 animate-spin" />
              ) : (
                <Send className="h-8 w-8" />
              )}
            </Button>
          </form>
        </div>
      </Card>
      
      <div className="mt-8">
        <h2 className="text-xl font-medium mb-4 text-gray-700">Conversation Starters</h2>
        <TherapyTopics />
      </div>
    </div>
  );
};

export default ChatInterface;
