
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Key, Eye, EyeOff } from "lucide-react";
import { openaiService } from "@/services/openaiService";

interface ApiKeyInputProps {
  onApiKeySet: () => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onApiKeySet }) => {
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) return;

    setIsLoading(true);
    try {
      openaiService.setApiKey(apiKey.trim());
      onApiKeySet();
    } catch (error) {
      console.error('Error setting API key:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto p-6 bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-2xl">
      <div className="text-center mb-6">
        <Key className="h-12 w-12 mx-auto mb-4 text-blue-500" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">OpenAI API Key Required</h2>
        <p className="text-gray-600">
          To enable intelligent AI responses, please enter your OpenAI API key.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Input
            type={showKey ? "text" : "password"}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-..."
            className="pr-12 text-lg"
            disabled={isLoading}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={() => setShowKey(!showKey)}
          >
            {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
          disabled={!apiKey.trim() || isLoading}
        >
          {isLoading ? "Setting up..." : "Start Chatting"}
        </Button>
      </form>

      <div className="mt-4 text-xs text-gray-500 text-center">
        Your API key is stored locally in your browser and never shared.
      </div>
    </Card>
  );
};

export default ApiKeyInput;
