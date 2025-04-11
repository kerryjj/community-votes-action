
import { useState } from "react";
import ProjectCard, { ProjectProps } from "@/components/ProjectCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, ArrowUpDown } from "lucide-react";

const allProjects: ProjectProps[] = [
  {
    id: "1",
    title: "Riverbank Cleanup",
    description: "Help clean up trash along the riverside park. We'll provide gloves and bags. Join us for a cleaner community!",
    location: "Riverside Park, Main Street",
    type: "cleanup",
    votes: 24,
  },
  {
    id: "2",
    title: "Community Garden Weeding",
    description: "The community garden needs help with removing invasive weeds. Bring gardening tools if you have them!",
    location: "Community Garden, Oak Avenue",
    type: "weeds",
    votes: 18,
  },
  {
    id: "3",
    title: "Playground Graffiti Removal",
    description: "The children's playground has been vandalized with graffiti. Help us restore it to a family-friendly space.",
    location: "Central Park Playground",
    type: "graffiti",
    votes: 32,
  },
  {
    id: "4",
    title: "Park Bench Restoration",
    description: "Several benches in the central park need repainting and minor repairs. Help us make them beautiful and safe again.",
    location: "Central Park, East Entrance",
    type: "other",
    votes: 15,
  },
  {
    id: "5",
    title: "Highway Entrance Cleanup",
    description: "The entrance to our community from the highway is littered with trash. Let's clean it up to make a better first impression.",
    location: "Highway 101 Entrance",
    type: "cleanup",
    votes: 29,
  },
  {
    id: "6",
    title: "Elementary School Garden",
    description: "Help maintain the garden at the local elementary school. We need to remove weeds and plant new seasonal flowers.",
    location: "Lincoln Elementary School",
    type: "weeds",
    votes: 22,
  }
];

const ProjectsPage = () => {
  const [projects, setProjects] = useState<ProjectProps[]>(allProjects);
  const [searchTerm, setSearchTerm] = useState("");
  const [projectType, setProjectType] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    filterProjects(e.target.value, projectType);
  };

  const handleTypeChange = (value: string) => {
    setProjectType(value);
    filterProjects(searchTerm, value);
  };

  const filterProjects = (term: string, type: string) => {
    let filtered = [...allProjects];
    
    if (term) {
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(term.toLowerCase()) ||
        project.description.toLowerCase().includes(term.toLowerCase()) ||
        project.location.toLowerCase().includes(term.toLowerCase())
      );
    }
    
    if (type !== "all") {
      filtered = filtered.filter(project => project.type === type);
    }
    
    const sorted = sortProjects(filtered, sortOrder);
    setProjects(sorted);
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    setProjects(sortProjects([...projects], newOrder));
  };

  const sortProjects = (projectsToSort: ProjectProps[], order: "asc" | "desc") => {
    return projectsToSort.sort((a, b) => {
      return order === "asc" ? a.votes - b.votes : b.votes - a.votes;
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Community Projects
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
              Browse, vote on, and join projects in your community
            </p>
          </div>

          <div className="mb-8 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search projects..."
                className="pl-10"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="w-full sm:w-56">
              <Select value={projectType} onValueChange={handleTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  <SelectItem value="cleanup">Litter Cleanup</SelectItem>
                  <SelectItem value="weeds">Weed Removal</SelectItem>
                  <SelectItem value="graffiti">Graffiti Removal</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              variant="outline" 
              className="w-full sm:w-auto" 
              onClick={toggleSortOrder}
            >
              Sort by Votes
              <ArrowUpDown className={`ml-2 h-4 w-4 ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />
            </Button>
          </div>

          {projects.length > 0 ? (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-xl text-gray-500">No projects match your search criteria.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectsPage;
