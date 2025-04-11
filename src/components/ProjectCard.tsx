
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Trash, Scissors, LeafyGreen, Paintbrush, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export type ProjectType = "cleanup" | "weeds" | "graffiti" | "other";

export interface ProjectProps {
  id: string;
  title: string;
  description: string;
  location: string;
  type: ProjectType;
  votes: number;
  image?: string;
  created_at?: string;
  updated_at?: string;
}

// Helper function to validate project type
export const validateProjectType = (type: string): ProjectType => {
  if (["cleanup", "weeds", "graffiti", "other"].includes(type)) {
    return type as ProjectType;
  }
  return "other";
};

const ProjectCard = ({ id, title, description, location, type, votes, image }: ProjectProps) => {
  const [voteCount, setVoteCount] = useState(votes);
  const [hasVoted, setHasVoted] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const getTypeIcon = (type: ProjectType) => {
    switch (type) {
      case "cleanup":
        return <Trash className="h-4 w-4" />;
      case "weeds":
        return <LeafyGreen className="h-4 w-4" />;
      case "graffiti":
        return <Paintbrush className="h-4 w-4" />;
      default:
        return <Scissors className="h-4 w-4" />;
    }
  };

  const getTypeBadgeClass = (type: ProjectType) => {
    switch (type) {
      case "cleanup":
        return "badge-cleanup";
      case "weeds":
        return "badge-weeds";
      case "graffiti":
        return "badge-graffiti";
      default:
        return "badge-other";
    }
  };

  const getTypeLabel = (type: ProjectType) => {
    switch (type) {
      case "cleanup":
        return "Litter Cleanup";
      case "weeds":
        return "Weed Removal";
      case "graffiti":
        return "Graffiti Removal";
      default:
        return "Other";
    }
  };

  const handleVote = async () => {
    if (isUpdating) return;
    setIsUpdating(true);
    
    try {
      const newVoteCount = hasVoted ? voteCount - 1 : voteCount + 1;
      
      const { error } = await supabase
        .from('projects')
        .update({ votes: newVoteCount })
        .eq('id', id);
      
      if (error) {
        console.error("Error updating vote:", error);
        toast.error("Failed to update vote. Please try again.");
        return;
      }
      
      if (!hasVoted) {
        setVoteCount(voteCount + 1);
        setHasVoted(true);
        toast.success("Your vote has been counted!");
      } else {
        setVoteCount(voteCount - 1);
        setHasVoted(false);
        toast.info("Your vote has been removed");
      }
    } catch (error) {
      console.error("Failed to update vote:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Link to={`/project/${id}`} className="text-xl font-bold hover:text-community-purple">{title}</Link>
          <Badge className={getTypeBadgeClass(type)}>
            <span className="flex items-center">
              {getTypeIcon(type)}
              <span className="ml-1">{getTypeLabel(type)}</span>
            </span>
          </Badge>
        </div>
        <p className="text-sm text-gray-500">{location}</p>
      </CardHeader>
      <CardContent>
        {image && (
          <div className="mb-4 overflow-hidden rounded-md">
            <img src={image} alt={title} className="w-full h-40 object-cover" />
          </div>
        )}
        <p className="text-gray-700 line-clamp-3">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant={hasVoted ? "default" : "outline"} 
          className={hasVoted ? "bg-community-purple hover:bg-community-dark-purple" : ""}
          onClick={handleVote}
          disabled={isUpdating}
        >
          <ThumbsUp className="h-4 w-4 mr-1" />
          <span>{voteCount}</span>
        </Button>
        <Button variant="outline" asChild>
          <Link to={`/project/${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
