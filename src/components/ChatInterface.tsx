
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

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage(input.trim());
      setInput("");
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
    <div className="flex flex-col h-full">
      <Card className="flex-1 overflow-hidden flex flex-col bg-white shadow-md border-therapy-lavender">
        <div className="overflow-y-auto p-4 flex-1 chat-scrollbar" style={{ minHeight: "400px" }}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 animate-fade-in ${
                    message.role === "user" 
                      ? "bg-therapy-lavender text-gray-800 rounded-tr-sm shadow-sm" 
                      : "bg-therapy-blue text-gray-800 rounded-tl-sm shadow-sm"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-therapy-blue text-gray-800 p-4 rounded-2xl rounded-tl-sm flex items-center shadow-sm">
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  <span>Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        <div className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex items-end gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message here..."
              className="min-h-[80px] resize-none text-base"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="lg"
              className="shrink-0 h-[80px] w-[80px] bg-primary hover:bg-primary/90"
              disabled={!input.trim() || isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <Send className="h-6 w-6" />
              )}
            </Button>
          </form>
        </div>
      </Card>
      
      <div className="mt-6">
        <h2 className="text-lg font-medium mb-3">Conversation Starters</h2>
        <TherapyTopics />
      </div>
    </div>
  );
};

export default ChatInterface;
