
import React from "react";
import { Card } from "@/components/ui/card";
import { useMood } from "@/context/MoodContext";
import { MoodType } from "@/types";
import {
  Smile,
  HeartHandshake,
  CircleDot,
  Cloud,
  AlertCircle,
  FlameKindling,
} from "lucide-react";

const moodIcons: Record<MoodType, React.ReactNode> = {
  happy: <Smile className="h-5 w-5" />,
  calm: <HeartHandshake className="h-5 w-5" />,
  okay: <CircleDot className="h-5 w-5" />,
  sad: <Cloud className="h-5 w-5" />,
  anxious: <AlertCircle className="h-5 w-5" />,
  stressed: <FlameKindling className="h-5 w-5" />,
};

const moodColors: Record<MoodType, string> = {
  happy: "bg-therapy-mint text-green-700",
  calm: "bg-therapy-blue text-blue-700",
  okay: "bg-therapy-gray text-gray-700",
  sad: "bg-therapy-lavender text-indigo-700",
  anxious: "bg-therapy-peach text-orange-700",
  stressed: "bg-therapy-pink text-rose-700",
};

const MoodAnalytics: React.FC = () => {
  const { moods, getMoodTrend } = useMood();
  
  const moodTrend = getMoodTrend();
  
  const getRecentMoods = () => {
    return moods.slice(0, 5);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  };

  if (moods.length === 0) {
    return (
      <Card className="p-4 bg-therapy-gray/50 text-center animate-fade-in">
        <p className="text-muted-foreground">
          Your mood analytics will appear here once you start tracking your moods.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-4 bg-white animate-fade-in">
      <h3 className="text-lg font-medium mb-4">Mood Insights</h3>
      
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-2">Most Common Moods</h4>
        <div className="flex flex-wrap gap-2">
          {moodTrend.filter(m => m.count > 0).map(({ mood, count }) => (
            <div
              key={mood}
              className={`flex items-center gap-1 px-2 py-1 rounded-full ${moodColors[mood]}`}
            >
              {moodIcons[mood]}
              <span className="text-xs">{count}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Recent Mood Entries</h4>
        <div className="space-y-2">
          {getRecentMoods().map((entry) => (
            <div
              key={entry.id}
              className="flex items-center justify-between p-2 rounded bg-therapy-gray/30"
            >
              <div className="flex items-center gap-2">
                <div className={`p-1 rounded-full ${moodColors[entry.mood]}`}>
                  {moodIcons[entry.mood]}
                </div>
                <span className="text-sm">
                  {entry.note ? (
                    <span className="italic">"{entry.note}"</span>
                  ) : (
                    "No note added"
                  )}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                {formatDate(entry.timestamp)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default MoodAnalytics;
