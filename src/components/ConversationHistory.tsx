
import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "@/context/ChatContext";
import { MessageCircle, Plus } from "lucide-react";

const ConversationHistory: React.FC = () => {
  const { state, loadConversation, startNewConversation } = useChat();

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
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Conversations</h2>
        <Button 
          onClick={startNewConversation} 
          variant="outline" 
          size="sm"
          className="flex items-center gap-2 bg-white/80 hover:bg-white border-gray-200 hover:border-gray-300 shadow-sm"
        >
          <Plus className="h-4 w-4" />
          <span>New</span>
        </Button>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="space-y-3 pr-2">
          {state.conversations.map((conversation) => (
            <Button
              key={conversation.id}
              variant="ghost"
              className={`w-full justify-start text-left p-4 h-auto rounded-xl transition-all duration-200 ${
                state.currentConversation?.id === conversation.id
                  ? "bg-blue-100 hover:bg-blue-150 border border-blue-200 shadow-sm"
                  : "hover:bg-white/80 hover:shadow-sm"
              }`}
              onClick={() => loadConversation(conversation.id)}
            >
              <div className="flex gap-3 items-start w-full">
                <MessageCircle className="h-5 w-5 mt-1 shrink-0 text-blue-500" />
                <div className="overflow-hidden flex-1">
                  <div className="truncate font-medium text-sm text-gray-800">
                    {conversation.title}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {formatDate(conversation.lastUpdated)}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {conversation.messages.length} messages
                  </div>
                </div>
              </div>
            </Button>
          ))}
          
          {state.conversations.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-sm">No conversations yet.</p>
              <p className="text-xs mt-1">Start chatting to see your history here.</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ConversationHistory;
