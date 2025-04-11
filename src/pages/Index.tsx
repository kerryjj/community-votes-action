
import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";
import Stats from "@/components/Stats";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedProjects />
        <Stats />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
