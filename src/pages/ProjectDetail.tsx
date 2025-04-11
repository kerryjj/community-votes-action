
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ProjectProps } from "@/components/ProjectCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Trash, Scissors, LeafyGreen, Paintbrush, ThumbsUp, MapPin, Calendar, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const allProjects: ProjectProps[] = [
  {
    id: "1",
    title: "Riverbank Cleanup",
    description: "Help clean up trash along the riverside park. We'll provide gloves and bags. Join us for a cleaner community! This area has become polluted over time with various types of litter, including plastic bottles, food wrappers, and other debris that are harmful to the local ecosystem. The cleanup will focus on the main pathway and the areas directly adjacent to the water. This is a great opportunity for families, as children can participate under adult supervision.",
    location: "Riverside Park, Main Street",
    type: "cleanup",
    votes: 24,
  },
  {
    id: "2",
    title: "Community Garden Weeding",
    description: "The community garden needs help with removing invasive weeds. Bring gardening tools if you have them! The garden has several invasive species that are threatening the growth of our vegetables and flowers. We'll be focusing on removing these weeds without disturbing the surrounding plants. Basic gardening knowledge is helpful but not required as we'll have experienced gardeners on site to provide guidance. Please bring gloves, small gardening tools if you have them, and a water bottle.",
    location: "Community Garden, Oak Avenue",
    type: "weeds",
    votes: 18,
  },
  {
    id: "3",
    title: "Playground Graffiti Removal",
    description: "The children's playground has been vandalized with graffiti. Help us restore it to a family-friendly space. The graffiti is primarily on the main play structure and surrounding walls. We'll be using environmentally-friendly cleaning solutions that are safe for both children and the environment. Experience with graffiti removal is a plus, but not necessary. We'll have all the supplies needed, including cleaning solutions, brushes, and protective gear.",
    location: "Central Park Playground",
    type: "graffiti",
    votes: 32,
  },
  {
    id: "4",
    title: "Park Bench Restoration",
    description: "Several benches in the central park need repainting and minor repairs. Help us make them beautiful and safe again. The benches have been weathered over time and some have minor damage like loose boards or chipped paint. We'll be sanding down the rough areas, replacing any damaged parts, and applying fresh paint. Basic carpentry skills are helpful but not required. We'll have all necessary tools and materials, including sandpaper, hammers, nails, and paint.",
    location: "Central Park, East Entrance",
    type: "other",
    votes: 15,
  },
  {
    id: "5",
    title: "Highway Entrance Cleanup",
    description: "The entrance to our community from the highway is littered with trash. Let's clean it up to make a better first impression. This area gets a lot of windblown trash and litter from passing vehicles. We'll be focusing on both sides of the entrance road, collecting trash in bags for proper disposal. This project requires participants to be at least 16 years old due to proximity to traffic. High-visibility vests will be provided for safety. Please bring sturdy gloves and wear closed-toe shoes.",
    location: "Highway 101 Entrance",
    type: "cleanup",
    votes: 29,
  },
  {
    id: "6",
    title: "Elementary School Garden",
    description: "Help maintain the garden at the local elementary school. We need to remove weeds and plant new seasonal flowers. The school garden is an educational resource for students, and we want to keep it looking beautiful and functioning well. We'll be weeding the existing beds, adding fresh soil, and planting new seasonal flowers that will bloom throughout the school year. This is a family-friendly activity, and children are welcome to participate with their parents. Basic gardening knowledge is helpful but not required.",
    location: "Lincoln Elementary School",
    type: "weeds",
    votes: 22,
  }
];

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectProps | null>(null);
  const [voteCount, setVoteCount] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const foundProject = allProjects.find(p => p.id === id);
    if (foundProject) {
      setProject(foundProject);
      setVoteCount(foundProject.votes);
    }
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

  const handleVote = () => {
    if (!hasVoted) {
      setVoteCount(voteCount + 1);
      setHasVoted(true);
      toast.success("Your vote has been counted!");
    } else {
      setVoteCount(voteCount - 1);
      setHasVoted(false);
      toast.info("Your vote has been removed");
    }
  };

  const handleVolunteer = () => {
    toast.success("Thanks for volunteering! We'll be in touch with details.");
  };

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
                <h1 className="text-2xl font-bold text-gray-900 mb-2 sm:mb-0">{project.title}</h1>
                <Badge className={`${getTypeBadgeClass(project.type)} flex items-center`}>
                  {getTypeIcon(project.type)}
                  <span className="ml-1">{getTypeLabel(project.type)}</span>
                </Badge>
              </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-700">{project.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-700">Proposed for Summer 2025</span>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Project Description</h3>
              <p className="text-gray-700 whitespace-pre-line">{project.description}</p>
            </div>

            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Project Updates</h3>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-gray-700">No updates yet. Be the first to volunteer and help get this project started!</p>
                </CardContent>
              </Card>
            </div>

            <div className="border-t border-gray-200 px-4 py-5 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Button 
                variant={hasVoted ? "default" : "outline"} 
                className={`w-full sm:w-auto ${hasVoted ? "bg-community-purple hover:bg-community-dark-purple" : ""}`}
                onClick={handleVote}
              >
                <ThumbsUp className="h-5 w-5 mr-2" />
                <span>{voteCount} Votes</span>
              </Button>
              <Button 
                className="w-full sm:w-auto bg-community-green hover:bg-community-green/80" 
                onClick={handleVolunteer}
              >
                Volunteer for This Project
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
