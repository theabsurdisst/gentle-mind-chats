
import React from "react";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import { Heart, Shield, MessageSquare, Sparkles } from "lucide-react";

const About: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <div className="flex-1 p-4 md:p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-2xl font-bold mb-6">About Mindful AI</h1>
          
          <Card className="p-6 mb-6 bg-white">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Heart className="h-5 w-5 text-primary mr-2" />
              Our Mission
            </h2>
            <p className="mb-4">
              Mindful AI was created to make mental wellness support more accessible, 
              personal, and available whenever you need it. We believe everyone 
              deserves a safe space to explore their thoughts and feelings.
            </p>
            <p>
              Our AI companion is designed to listen without judgment, offer 
              thoughtful guidance, and help you develop skills for managing life's 
              challenges. While not a replacement for professional therapy, 
              Mindful AI can be a valuable complement to your mental wellness journey.
            </p>
          </Card>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <Card className="p-4 bg-therapy-lavender/50">
              <div className="flex items-center mb-3">
                <Shield className="h-5 w-5 mr-2 text-indigo-700" />
                <h3 className="font-medium">Private & Secure</h3>
              </div>
              <p className="text-sm">
                Your conversations are private and your data is securely stored. 
                We prioritize your privacy and confidentiality.
              </p>
            </Card>
            
            <Card className="p-4 bg-therapy-mint/50">
              <div className="flex items-center mb-3">
                <MessageSquare className="h-5 w-5 mr-2 text-green-700" />
                <h3 className="font-medium">Always Available</h3>
              </div>
              <p className="text-sm">
                Access supportive conversations 24/7, whenever you need someone 
                to talk to or want to process your thoughts.
              </p>
            </Card>
            
            <Card className="p-4 bg-therapy-peach/50">
              <div className="flex items-center mb-3">
                <Sparkles className="h-5 w-5 mr-2 text-orange-700" />
                <h3 className="font-medium">Personalized Support</h3>
              </div>
              <p className="text-sm">
                Mindful AI learns from your interactions to provide more 
                personalized and relevant guidance over time.
              </p>
            </Card>
          </div>
          
          <Card className="p-6 bg-white">
            <h2 className="text-xl font-semibold mb-4">Important Note</h2>
            <p className="text-muted-foreground">
              Mindful AI is not a substitute for professional mental health care. 
              If you're experiencing a crisis or need immediate help, please 
              contact a mental health professional, visit your local emergency room, 
              or call a crisis helpline immediately.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
