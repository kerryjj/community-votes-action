
import { Button } from "@/components/ui/button";
import { Plus, Home, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Sparkles className="h-8 w-8 text-community-purple mr-2" />
              <span className="text-xl font-bold text-gray-900">CommunityAction</span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="flex items-center text-gray-700 hover:text-community-purple px-3 py-2 rounded-md text-sm font-medium">
              <Home className="h-4 w-4 mr-1" />
              Home
            </Link>
            <Link to="/projects" className="text-gray-700 hover:text-community-purple px-3 py-2 rounded-md text-sm font-medium">
              Projects
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-community-purple px-3 py-2 rounded-md text-sm font-medium">
              About
            </Link>
          </nav>
          <div>
            <Button asChild className="bg-community-purple hover:bg-community-dark-purple">
              <Link to="/new-project">
                <Plus className="h-4 w-4 mr-1" />
                New Project
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
