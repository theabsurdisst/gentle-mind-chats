
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useMood } from "@/context/MoodContext";
import { MoodType } from "@/types";
import { 
  Smile, 
  HeartHandshake, 
  CircleDot, 
  Cloud, 
  AlertCircle, 
  FlameKindling 
} from "lucide-react";

const moodOptions: Array<{ type: MoodType; icon: React.ReactNode; label: string }> = [
  { type: "happy", icon: <Smile className="h-6 w-6" />, label: "Happy" },
  { type: "calm", icon: <HeartHandshake className="h-6 w-6" />, label: "Calm" },
  { type: "okay", icon: <CircleDot className="h-6 w-6" />, label: "Okay" },
  { type: "sad", icon: <Cloud className="h-6 w-6" />, label: "Sad" },
  { type: "anxious", icon: <AlertCircle className="h-6 w-6" />, label: "Anxious" },
  { type: "stressed", icon: <FlameKindling className="h-6 w-6" />, label: "Stressed" },
];

const moodColors: Record<MoodType, string> = {
  happy: "bg-therapy-mint text-green-700",
  calm: "bg-therapy-blue text-blue-700",
  okay: "bg-therapy-gray text-gray-700",
  sad: "bg-therapy-lavender text-indigo-700",
  anxious: "bg-therapy-peach text-orange-700",
  stressed: "bg-therapy-pink text-rose-700",
};

const MoodPicker: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [note, setNote] = useState("");
  const [showNote, setShowNote] = useState(false);
  const [saved, setSaved] = useState(false);
  
  const { addMoodEntry, getTodaysMood } = useMood();
  
  const todaysMood = getTodaysMood();
  
  const handleSaveMood = () => {
    if (selectedMood) {
      addMoodEntry(selectedMood, note.trim() || undefined);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      setNote("");
      setShowNote(false);
    }
  };

  if (todaysMood && !saved) {
    return (
      <Card className="p-5 bg-white shadow-sm mb-8 animate-fade-in rounded-lg border-therapy-lavender/30">
        <p className="mb-3 text-gray-700 font-medium">You've shared how you're feeling today:</p>
        <div className="flex justify-center">
          <span className={`inline-flex items-center px-4 py-2 rounded-full ${moodColors[todaysMood.mood]}`}>
            {moodOptions.find(m => m.type === todaysMood.mood)?.icon}
            <span className="ml-2 font-medium">{moodOptions.find(m => m.type === todaysMood.mood)?.label}</span>
          </span>
        </div>
        {todaysMood.note && (
          <p className="text-sm mt-3 italic text-gray-600 px-4">"{todaysMood.note}"</p>
        )}
      </Card>
    );
  }

  return (
    <Card className="p-5 bg-white shadow-sm mb-8 animate-fade-in rounded-lg border-therapy-lavender/30">
      {saved ? (
        <div className="text-center py-4">
          <p className="text-green-600 font-medium">Thank you for sharing how you feel today.</p>
          <p className="text-sm text-gray-600 mt-2">We're here to support you on your journey.</p>
        </div>
      ) : (
        <>
          <h3 className="text-center mb-5 font-medium text-gray-800">How are you feeling today?</h3>
          <div className="grid grid-cols-3 gap-3 mb-5">
            {moodOptions.map((mood) => (
              <Button
                key={mood.type}
                onClick={() => setSelectedMood(mood.type)}
                variant="outline"
                className={`flex flex-col items-center py-4 h-auto transition-all ${
                  selectedMood === mood.type ? `ring-2 ring-primary ${moodColors[mood.type]}` : "hover:bg-gray-50"
                }`}
              >
                {mood.icon}
                <span className="mt-2 text-sm">{mood.label}</span>
              </Button>
            ))}
          </div>
          
          {selectedMood && (
            <div className="mt-4">
              {showNote ? (
                <>
                  <Textarea
                    placeholder="What's on your mind today? (optional)"
                    className="min-h-[80px] mb-3 resize-none"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                  <div className="flex justify-between">
                    <Button 
                      variant="ghost" 
                      onClick={() => setShowNote(false)}
                      size="sm"
                    >
                      Skip
                    </Button>
                    <Button 
                      onClick={handleSaveMood}
                      size="sm"
                    >
                      Save
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowNote(true)}
                    size="sm"
                    className="border-therapy-lavender/50 hover:border-therapy-lavender text-gray-700"
                  >
                    Add a personal note
                  </Button>
                  <Button 
                    onClick={handleSaveMood}
                    size="sm"
                  >
                    Save
                  </Button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </Card>
  );
};

export default MoodPicker;
