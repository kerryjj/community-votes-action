
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ProjectProps, validateProjectType } from "@/components/ProjectCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Trash, Scissors, LeafyGreen, Paintbrush, MapPin, Calendar, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import ProjectActions from "@/components/ProjectActions";

// Update the ProjectProps interface to include creator_id
interface ExtendedProjectProps extends ProjectProps {
  creator_id?: string;
}

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ExtendedProjectProps | null>(null);
  const [voteCount, setVoteCount] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [creatorId, setCreatorId] = useState<string | undefined>(undefined);

  const { user } = useAuth();

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) {
          console.error("Error fetching project:", error);
          return;
        }
        
        if (data) {
          // Transform and validate the data before setting state
          const validatedProject = {
            ...data,
            type: validateProjectType(data.type)
          };
          
          setProject(validatedProject);
          setVoteCount(data.votes);
          
          // Store creator ID if available
          if (data.creator_id) {
            setCreatorId(data.creator_id);
          }
        }
      } catch (error) {
        console.error("Failed to fetch project:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const getTypeIcon = (type: "cleanup" | "weeds" | "graffiti" | "other") => {
    switch (type) {
      case "cleanup":
        return <Trash className="h-5 w-5" />;
      case "weeds":
        return <LeafyGreen className="h-5 w-5" />;
      case "graffiti":
        return <Paintbrush className="h-5 w-5" />;
      default:
        return <Scissors className="h-5 w-5" />;
    }
  };

  const getTypeBadgeClass = (type: "cleanup" | "weeds" | "graffiti" | "other") => {
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

  const getTypeLabel = (type: "cleanup" | "weeds" | "graffiti" | "other") => {
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse w-full max-w-4xl h-96 bg-gray-200 rounded-lg"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <p className="text-xl text-gray-500">Project not found</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link to="/projects" className="flex items-center text-community-purple hover:text-community-dark-purple">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Projects
            </Link>
          </div>

          <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-2 sm:mb-0">{project?.title}</h1>
                <Badge className={`${getTypeBadgeClass(project?.type || 'other')} flex items-center`}>
                  {getTypeIcon(project?.type || 'other')}
                  <span className="ml-1">{getTypeLabel(project?.type || 'other')}</span>
                </Badge>
              </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-700">{project?.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-700">Proposed for Summer 2025</span>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Project Description</h3>
              <p className="text-gray-700 whitespace-pre-line">{project?.description}</p>
            </div>

            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Project Updates</h3>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-gray-700">No updates yet. Be the first to volunteer and help get this project started!</p>
                </CardContent>
              </Card>
            </div>

            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              {project && (
                <ProjectActions 
                  projectId={project.id}
                  creatorId={creatorId}
                  user={user}
                  voteCount={voteCount}
                  hasVoted={hasVoted}
                  setHasVoted={setHasVoted}
                  setVoteCount={setVoteCount}
                />
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
