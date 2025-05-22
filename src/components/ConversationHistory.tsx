
import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "@/context/ChatContext";
import { MessageCircle, Plus } from "lucide-react";

const ConversationHistory: React.FC = () => {
  const { conversations, loadConversation, startNewConversation, currentConversation } = useChat();

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(undefined, { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Conversations</h2>
        <Button 
          onClick={startNewConversation} 
          variant="outline" 
          size="sm"
          className="flex items-center gap-1"
        >
          <Plus className="h-4 w-4" />
          <span>New</span>
        </Button>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="space-y-2 pr-2">
          {conversations.map((conversation) => (
            <Button
              key={conversation.id}
              variant="ghost"
              className={`w-full justify-start text-left p-2 h-auto ${
                currentConversation?.id === conversation.id
                  ? "bg-therapy-lavender/50"
                  : ""
              }`}
              onClick={() => loadConversation(conversation.id)}
            >
              <div className="flex gap-2 items-start">
                <MessageCircle className="h-4 w-4 mt-1 shrink-0" />
                <div className="overflow-hidden">
                  <div className="truncate font-medium text-sm">
                    {conversation.title}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatDate(conversation.lastUpdated)}
                  </div>
                </div>
              </div>
            </Button>
          ))}
          
          {conversations.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No conversation history yet.</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ConversationHistory;
