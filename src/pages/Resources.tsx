
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Header from "@/components/Header";
import { BookOpen, ExternalLink, Phone, Heart, Lightbulb, BookMarked } from "lucide-react";

const Resource = ({ 
  title, 
  description, 
  link, 
  icon: Icon, 
  color 
}: { 
  title: string; 
  description: string; 
  link: string; 
  icon: React.ElementType;
  color: string;
}) => (
  <Card className="p-4 mb-4">
    <div className="flex items-start">
      <div className={`p-2 rounded-full ${color} mr-3 shrink-0`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="font-medium mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-2">{description}</p>
        <Button variant="outline" size="sm" asChild>
          <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center">
            <span>Visit</span>
            <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </Button>
      </div>
    </div>
  </Card>
);

const ResourceSection = ({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) => (
  <div className="mb-6">
    <div className="flex items-center mb-3">
      <Icon className="h-5 w-5 mr-2 text-primary" />
      <h2 className="text-lg font-medium">{title}</h2>
    </div>
    {children}
  </div>
);

const Resources: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <div className="flex-1 p-4 md:p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-2xl font-bold mb-6">Helpful Resources</h1>
          
          <Card className="p-4 mb-6 bg-therapy-blue/30">
            <div className="flex items-start">
              <Phone className="h-5 w-5 text-blue-700 mr-3 shrink-0" />
              <div>
                <h2 className="font-medium">Need immediate help?</h2>
                <p className="text-sm">
                  If you're in crisis, reach out to these helplines available 24/7:
                </p>
                <div className="mt-2 space-y-1 text-sm">
                  <p><strong>National Suicide Prevention Lifeline:</strong> 988 or 1-800-273-8255</p>
                  <p><strong>Crisis Text Line:</strong> Text HOME to 741741</p>
                </div>
              </div>
            </div>
          </Card>
          
          <ScrollArea className="h-[calc(100vh-250px)] pr-4">
            <ResourceSection title="Mental Health Organizations" icon={Heart}>
              <Resource
                title="National Alliance on Mental Illness (NAMI)"
                description="The nation's largest grassroots mental health organization dedicated to building better lives for Americans affected by mental illness."
                link="https://www.nami.org/"
                icon={Heart}
                color="bg-therapy-pink/50"
              />
              
              <Resource
                title="Mental Health America"
                description="The nation's leading community-based nonprofit dedicated to addressing the needs of those living with mental illness."
                link="https://www.mhanational.org/"
                icon={Heart}
                color="bg-therapy-lavender/50"
              />
              
              <Resource
                title="Anxiety and Depression Association of America"
                description="Provides resources and support for anxiety, depression, and related disorders."
                link="https://adaa.org/"
                icon={Heart}
                color="bg-therapy-blue/50"
              />
            </ResourceSection>
            
            <ResourceSection title="Self-Help Resources" icon={Lightbulb}>
              <Resource
                title="Mindfulness-Based Stress Reduction"
                description="Learn about evidence-based mindfulness practices to reduce stress and improve wellbeing."
                link="https://www.mindful.org/"
                icon={Lightbulb}
                color="bg-therapy-mint/50"
              />
              
              <Resource
                title="Psychology Today Self-Help Resources"
                description="Articles, resources and exercises for improving mental wellbeing."
                link="https://www.psychologytoday.com/us/self-help"
                icon={Lightbulb}
                color="bg-therapy-peach/50"
              />
              
              <Resource
                title="Calm App"
                description="Tools to help you sleep better, reduce stress and anxiety, and improve focus."
                link="https://www.calm.com/"
                icon={Lightbulb}
                color="bg-therapy-gray/50"
              />
            </ResourceSection>
            
            <ResourceSection title="Educational Materials" icon={BookMarked}>
              <Resource
                title="National Institute of Mental Health"
                description="Science-based information about mental health conditions and treatments."
                link="https://www.nimh.nih.gov/"
                icon={BookOpen}
                color="bg-therapy-lavender/50"
              />
              
              <Resource
                title="Mental Health First Aid"
                description="Learn how to identify, understand and respond to signs of mental health challenges."
                link="https://www.mentalhealthfirstaid.org/"
                icon={BookOpen}
                color="bg-therapy-mint/50"
              />
              
              <Resource
                title="HelpGuide"
                description="Expert, evidence-based information to understand and improve mental health."
                link="https://www.helpguide.org/"
                icon={BookOpen}
                color="bg-therapy-blue/50"
              />
            </ResourceSection>
            
            <div className="mt-6 mb-4 text-sm text-center text-muted-foreground">
              <p>
                These resources are provided for informational purposes only and 
                do not constitute professional advice, diagnosis or treatment.
              </p>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default Resources;
