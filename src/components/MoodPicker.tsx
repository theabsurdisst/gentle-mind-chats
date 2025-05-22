
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
      <Card className="p-4 bg-therapy-gray/50 text-center mb-6 animate-fade-in">
        <p className="mb-2">You already logged your mood today:</p>
        <div className="flex justify-center">
          <span className={`inline-flex items-center px-3 py-1 rounded-full ${moodColors[todaysMood.mood]}`}>
            {moodOptions.find(m => m.type === todaysMood.mood)?.icon}
            <span className="ml-1">{moodOptions.find(m => m.type === todaysMood.mood)?.label}</span>
          </span>
        </div>
        {todaysMood.note && (
          <p className="text-sm mt-2 italic">"{todaysMood.note}"</p>
        )}
      </Card>
    );
  }

  return (
    <Card className="p-4 bg-white mb-6 animate-fade-in">
      {saved ? (
        <div className="text-center py-2">
          <p className="text-green-600">Mood saved! Thank you for checking in.</p>
        </div>
      ) : (
        <>
          <h3 className="text-center mb-4 font-medium">How are you feeling today?</h3>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {moodOptions.map((mood) => (
              <Button
                key={mood.type}
                onClick={() => setSelectedMood(mood.type)}
                variant="outline"
                className={`flex flex-col items-center py-3 ${
                  selectedMood === mood.type ? `ring-2 ring-primary ${moodColors[mood.type]}` : ""
                }`}
              >
                {mood.icon}
                <span className="mt-1 text-xs">{mood.label}</span>
              </Button>
            ))}
          </div>
          
          {selectedMood && (
            <div className="mt-4">
              {showNote ? (
                <>
                  <Textarea
                    placeholder="Add a note about how you're feeling... (optional)"
                    className="min-h-[80px] mb-2"
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
                  >
                    Add a note
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
