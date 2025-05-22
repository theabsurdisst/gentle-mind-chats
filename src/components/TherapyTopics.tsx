
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useChat } from "@/context/ChatContext";
import { TherapyTopic } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Heart,
  Cloud,
  Sun,
  MessageCircle,
  Smile,
} from "lucide-react";

const therapyTopics: TherapyTopic[] = [
  {
    id: "anxiety",
    title: "Anxiety",
    description: "Explore strategies to manage anxious feelings",
    icon: "Cloud",
    prompts: [
      "I've been feeling anxious lately, especially at work.",
      "My anxiety keeps me up at night, what can I do?",
      "I worry about things I can't control. How can I stop this?",
    ],
  },
  {
    id: "stress",
    title: "Stress Management",
    description: "Techniques for managing daily stress",
    icon: "Cloud",
    prompts: [
      "I'm feeling overwhelmed with work and personal responsibilities.",
      "I need some effective stress management techniques.",
      "How can I reduce stress in my daily routine?",
    ],
  },
  {
    id: "depression",
    title: "Low Mood",
    description: "Support for when you're feeling down",
    icon: "Cloud",
    prompts: [
      "I've been feeling down and unmotivated lately.",
      "What are some ways to boost my mood when feeling depressed?",
      "I don't enjoy things like I used to. What might help?",
    ],
  },
  {
    id: "self-esteem",
    title: "Self-Esteem",
    description: "Building confidence and self-worth",
    icon: "Heart",
    prompts: [
      "I struggle with negative self-talk and low self-esteem.",
      "How can I improve my confidence and self-image?",
      "I'm always comparing myself to others and feeling inadequate.",
    ],
  },
  {
    id: "relationships",
    title: "Relationships",
    description: "Navigate social connections and conflicts",
    icon: "MessageCircle",
    prompts: [
      "I'm having difficulty communicating with my partner.",
      "How can I set better boundaries with family members?",
      "I feel lonely and want to improve my social connections.",
    ],
  },
];

const iconMap: Record<string, React.ReactNode> = {
  Heart: <Heart className="h-5 w-5" />,
  Cloud: <Cloud className="h-5 w-5" />,
  Sun: <Sun className="h-5 w-5" />,
  MessageCircle: <MessageCircle className="h-5 w-5" />,
  Smile: <Smile className="h-5 w-5" />,
};

const TherapyTopics: React.FC = () => {
  const { sendMessage } = useChat();

  const handlePromptClick = (prompt: string) => {
    sendMessage(prompt);
  };

  return (
    <ScrollArea className="pb-2">
      <div className="flex space-x-3 pr-2">
        {therapyTopics.map((topic) => (
          <Card
            key={topic.id}
            className="p-4 min-w-[280px] card-highlight bg-white"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-full bg-therapy-gray">
                {iconMap[topic.icon] || <Cloud className="h-5 w-5" />}
              </div>
              <h3 className="font-medium">{topic.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              {topic.description}
            </p>
            <div className="space-y-2">
              {topic.prompts.map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-left h-auto"
                  onClick={() => handlePromptClick(prompt)}
                >
                  <span className="truncate">{prompt}</span>
                </Button>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default TherapyTopics;
