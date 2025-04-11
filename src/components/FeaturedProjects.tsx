
import { useState } from "react";
import ProjectCard, { ProjectProps } from "./ProjectCard";

const initialProjects: ProjectProps[] = [
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
  }
];

const FeaturedProjects = () => {
  const [projects] = useState<ProjectProps[]>(initialProjects);

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
        <div className="mt-10 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
