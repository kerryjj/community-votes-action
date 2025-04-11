
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Trash2, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { User } from "@supabase/supabase-js";

interface ProjectActionsProps {
  projectId: string;
  creatorId?: string;
  user: User | null;
  voteCount: number;
  hasVoted: boolean;
  setHasVoted: (value: boolean) => void;
  setVoteCount: (value: number) => void;
}

const ProjectActions = ({
  projectId,
  creatorId,
  user,
  voteCount,
  hasVoted,
  setHasVoted,
  setVoteCount,
}: ProjectActionsProps) => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const isCreator = user && creatorId === user.id;

  const handleVote = async () => {
    if (!user) {
      // Redirect to auth page
      window.location.href = `/auth?redirect=${encodeURIComponent(window.location.pathname)}`;
      return;
    }
    
    try {
      const newVoteCount = hasVoted ? voteCount - 1 : voteCount + 1;
      
      const { error } = await supabase
        .from('projects')
        .update({ votes: newVoteCount })
        .eq('id', projectId);
      
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
    }
  };

  const handleEdit = () => {
    navigate(`/edit-project/${projectId}`);
  };

  const handleDelete = async () => {
    if (!user) return;
    
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);
        
      if (error) {
        throw error;
      }
      
      toast.success("Project deleted successfully");
      navigate('/projects');
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <Button 
        variant={hasVoted ? "default" : "outline"} 
        className={`w-full sm:w-auto ${hasVoted ? "bg-community-purple hover:bg-community-dark-purple" : ""}`}
        onClick={handleVote}
      >
        <ThumbsUp className="h-5 w-5 mr-2" />
        <span>{voteCount} Votes</span>
      </Button>
      
      <div className="flex gap-2 w-full sm:w-auto">
        {isCreator && (
          <>
            <Button 
              variant="outline" 
              className="flex-1 sm:flex-none"
              onClick={handleEdit}
            >
              <Edit className="h-5 w-5 mr-2" />
              Edit
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="destructive" 
                  className="flex-1 sm:flex-none"
                  disabled={isDeleting}
                >
                  <Trash2 className="h-5 w-5 mr-2" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete this community project.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                    {isDeleting ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}
        
        {!isCreator && (
          <Button 
            className="w-full sm:w-auto bg-community-green hover:bg-community-green/80"
            onClick={() => {
              if (!user) {
                window.location.href = `/auth?redirect=${encodeURIComponent(window.location.pathname)}`;
                return;
              }
              toast.success("Thanks for volunteering! We'll be in touch with details.");
            }}
          >
            Volunteer for This Project
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProjectActions;
