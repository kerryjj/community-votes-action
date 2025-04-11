
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Users, Leaf, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              About CommunityAction
            </h1>
            <p className="mt-3 text-xl text-gray-500">
              Building stronger communities through collective action
            </p>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-700 mb-4">
                  CommunityAction was founded with a simple idea: when citizens come together to address small issues in their neighborhoods, the positive impact can be enormous.
                </p>
                <p className="text-gray-700 mb-4">
                  Our platform empowers community members to identify local problems, propose solutions, vote on priorities, and organize volunteer efforts to make tangible improvements to shared spaces.
                </p>
                <p className="text-gray-700">
                  From cleaning up litter in parks to removing graffiti from public spaces, we believe that small actions lead to big changes when we work together.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">How It Works</h2>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-community-light-purple p-3 mr-4">
                    <Sparkles className="h-6 w-6 text-community-purple" />
                  </div>
                  <h3 className="text-xl font-semibold">Propose</h3>
                </div>
                <p className="text-gray-700">
                  Community members submit project ideas for improving local spaces, from trash cleanup to graffiti removal.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-community-light-purple p-3 mr-4">
                    <Heart className="h-6 w-6 text-community-purple" />
                  </div>
                  <h3 className="text-xl font-semibold">Vote</h3>
                </div>
                <p className="text-gray-700">
                  Projects receive votes from the community, helping prioritize which initiatives should happen first.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-community-light-purple p-3 mr-4">
                    <Users className="h-6 w-6 text-community-purple" />
                  </div>
                  <h3 className="text-xl font-semibold">Volunteer</h3>
                </div>
                <p className="text-gray-700">
                  Community members sign up to participate in projects, contributing their time and skills.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-community-light-purple p-3 mr-4">
                    <Leaf className="h-6 w-6 text-community-purple" />
                  </div>
                  <h3 className="text-xl font-semibold">Impact</h3>
                </div>
                <p className="text-gray-700">
                  Together, we complete projects that make our community cleaner, safer, and more beautiful for everyone.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-6">Join Our Community</h2>
            <p className="text-gray-700 mb-6">
              Ready to make a difference? Start by exploring current projects or submitting a new idea.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild className="bg-community-purple hover:bg-community-dark-purple">
                <Link to="/projects">
                  Explore Projects
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-community-purple text-community-purple hover:bg-community-light-purple hover:text-community-dark-purple">
                <Link to="/new-project">
                  Submit a Project
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
