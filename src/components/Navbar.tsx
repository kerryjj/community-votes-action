
import { Button } from "@/components/ui/button";
import { Plus, Home, Sparkles, LogOut, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user, signOut } = useAuth();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

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
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Button asChild className="bg-community-purple hover:bg-community-dark-purple">
                  <Link to="/new-project">
                    <Plus className="h-4 w-4 mr-1" />
                    New Project
                  </Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-8 w-8 cursor-pointer">
                      <AvatarImage src={user.user_metadata.avatar_url} />
                      <AvatarFallback>{user.email ? getInitials(user.email) : "U"}</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="cursor-pointer" onClick={signOut}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button asChild variant="outline" className="flex items-center">
                <Link to="/auth">
                  <LogIn className="h-4 w-4 mr-1" />
                  Sign in
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
