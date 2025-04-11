
import { useState, useEffect } from "react";
import ProjectCard, { ProjectProps, validateProjectType } from "./ProjectCard";
import { supabase } from "@/integrations/supabase/client";

const FeaturedProjects = () => {
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('votes', { ascending: false })
          .limit(3);
        
        if (error) {
          console.error("Error fetching projects:", error);
          return;
        }
        
        // Transform and validate the data before setting state
        const validatedProjects = data?.map(project => ({
          ...project,
          type: validateProjectType(project.type)
        })) || [];
        
        setProjects(validatedProjects);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Featured Projects
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Join these community initiatives that need your support
          </p>
        </div>
        
        {isLoading ? (
          <div className="mt-10 grid gap-6 grid-cols-1 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="mt-10 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProjects;
