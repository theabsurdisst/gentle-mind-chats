
import React, { createContext, useContext, useState, useEffect } from "react";
import { MoodEntry, MoodType } from "@/types";
import { v4 as uuidv4 } from "uuid";

interface MoodContextProps {
  moods: MoodEntry[];
  addMoodEntry: (mood: MoodType, note?: string) => void;
  getTodaysMood: () => MoodEntry | undefined;
  getMoodTrend: () => { mood: MoodType; count: number }[];
}

const MoodContext = createContext<MoodContextProps | undefined>(undefined);

export const useMood = () => {
  const context = useContext(MoodContext);
  if (context === undefined) {
    throw new Error("useMood must be used within a MoodProvider");
  }
  return context;
};

export const MoodProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [moods, setMoods] = useState<MoodEntry[]>([]);

  // Load moods from localStorage
  useEffect(() => {
    const storedMoods = localStorage.getItem("mindful_moods");
    if (storedMoods) {
      setMoods(JSON.parse(storedMoods));
    }
  }, []);

  // Save moods to localStorage whenever they change
  useEffect(() => {
    if (moods.length > 0) {
      localStorage.setItem("mindful_moods", JSON.stringify(moods));
    }
  }, [moods]);

  const addMoodEntry = (mood: MoodType, note?: string) => {
    const newEntry: MoodEntry = {
      id: uuidv4(),
      mood,
      note,
      timestamp: Date.now(),
    };

    setMoods(prev => [newEntry, ...prev]);
  };

  const getTodaysMood = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = today.getTime();

    return moods.find(entry => {
      const entryDate = new Date(entry.timestamp);
      entryDate.setHours(0, 0, 0, 0);
      return entryDate.getTime() === todayTimestamp;
    });
  };

  const getMoodTrend = () => {
    const moodCounts: Record<MoodType, number> = {
      happy: 0,
      calm: 0,
      okay: 0,
      sad: 0,
      anxious: 0,
      stressed: 0,
    };

    // Only count the last 7 entries for the trend
    const recentMoods = moods.slice(0, 7);
    
    recentMoods.forEach(entry => {
      moodCounts[entry.mood]++;
    });

    return Object.entries(moodCounts).map(([mood, count]) => ({
      mood: mood as MoodType,
      count,
    })).sort((a, b) => b.count - a.count);
  };

  return (
    <MoodContext.Provider
      value={{
        moods,
        addMoodEntry,
        getTodaysMood,
        getMoodTrend,
      }}
    >
      {children}
    </MoodContext.Provider>
  );
};
