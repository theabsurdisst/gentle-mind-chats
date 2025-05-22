
import React from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="py-4 px-4 sm:px-6 flex items-center justify-between border-b animate-fade-in">
      <div className="flex items-center">
        <Heart className="h-6 w-6 text-primary mr-2" />
        <h1 className="text-xl font-bold text-foreground">Mindful AI</h1>
      </div>
      <div>
        <Button variant="ghost" className="text-muted-foreground">
          About
        </Button>
        <Button variant="ghost" className="text-muted-foreground">
          Resources
        </Button>
      </div>
    </header>
  );
};

export default Header;
