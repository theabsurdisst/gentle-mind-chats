
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Send, Loader2, AlertCircle } from "lucide-react";
import { useChat } from "@/context/ChatContext";
import TherapyTopics from "./TherapyTopics";

const ChatInterface: React.FC = () => {
  const { state, sendMessage } = useChat();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const messageToSend = input.trim();
    
    if (messageToSend && !state.isLoading) {
      console.log("Sending message:", messageToSend);
      setInput(""); // Clear input immediately for better UX
      await sendMessage(messageToSend);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e as unknown as React.FormEvent);
    }
  };

  // Auto-resize textarea
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state.currentConversation?.messages]);

  // Focus textarea on mount
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const messages = state.currentConversation?.messages || [];

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto">
      {/* Chat Messages Area */}
      <Card className="flex-1 overflow-hidden flex flex-col bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-2xl">
        <div className="overflow-y-auto p-8 flex-1 space-y-6" style={{ minHeight: "400px" }}>
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <div className="text-2xl font-light text-gray-600">Welcome to Mindful AI</div>
                <div className="text-gray-500">Your personal therapy companion is ready to listen.</div>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  } animate-fade-in`}
                >
                  <div
                    className={`max-w-[80%] rounded-3xl px-6 py-4 shadow-lg ${
                      message.role === "user" 
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-tr-lg" 
                        : "bg-gradient-to-r from-gray-50 to-white text-gray-800 border border-gray-200 rounded-tl-lg"
                    }`}
                  >
                    <p className="text-base leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              
              {state.isLoading && (
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-gradient-to-r from-gray-50 to-white text-gray-800 border border-gray-200 px-6 py-4 rounded-3xl rounded-tl-lg flex items-center shadow-lg">
                    <Loader2 className="h-5 w-5 animate-spin mr-3 text-blue-500" />
                    <span className="text-gray-600">Mindful AI is thinking...</span>
                  </div>
                </div>
              )}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Error Message */}
        {state.error && (
          <div className="mx-8 mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <span className="text-red-700">{state.error}</span>
          </div>
        )}
        
        {/* Message Input Area */}
        <div className="p-8 bg-gradient-to-r from-gray-50 to-white border-t border-gray-100">
          <form onSubmit={handleSendMessage} className="flex items-end gap-4">
            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Share what's on your mind... Press Enter to send, Shift+Enter for new line"
                className="min-h-[60px] max-h-[200px] resize-none text-lg p-6 border-2 border-gray-200 focus:border-blue-400 rounded-2xl bg-white shadow-sm transition-all duration-200"
                disabled={state.isLoading}
                style={{ height: '60px' }}
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="h-[60px] w-[60px] bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl disabled:opacity-50"
              disabled={!input.trim() || state.isLoading}
            >
              {state.isLoading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <Send className="h-6 w-6" />
              )}
            </Button>
          </form>
        </div>
      </Card>
      
      {/* Conversation Starters */}
      {messages.length <= 1 && (
        <div className="mt-8 animate-fade-in">
          <h3 className="text-xl font-medium mb-6 text-gray-700 text-center">
            Not sure where to start? Try one of these:
          </h3>
          <TherapyTopics />
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
