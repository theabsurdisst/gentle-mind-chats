
import React from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="py-4 px-4 sm:px-6 flex items-center justify-between border-b animate-fade-in">
      <Link to="/" className="flex items-center">
        <Heart className="h-6 w-6 text-primary mr-2" />
        <h1 className="text-xl font-bold text-foreground">Mindful AI</h1>
      </Link>
      <div>
        <Button variant="ghost" className="text-muted-foreground" asChild>
          <Link to="/about">About</Link>
        </Button>
        <Button variant="ghost" className="text-muted-foreground" asChild>
          <Link to="/resources">Resources</Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
