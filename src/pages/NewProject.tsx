import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash, Scissors, LeafyGreen, Paintbrush } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const NewProject = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("You must be signed in to create a project");
      navigate("/auth");
      return;
    }
    
    if (!title || !description || !location || !type) {
      toast.error("Please fill out all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const newProject = {
        title,
        description,
        location,
        type,
        votes: 0,
        creator_id: user.id
      };
      
      const { data, error } = await supabase
        .from('projects')
        .insert(newProject)
        .select();
      
      if (error) {
        console.error("Error submitting project:", error);
        toast.error("Failed to submit project. Please try again.");
        return;
      }
      
      toast.success("Project submitted successfully!");
      
      // Navigate to the newly created project or projects page
      if (data && data.length > 0) {
        navigate(`/project/${data[0].id}`);
      } else {
        navigate("/projects");
      }
    } catch (error) {
      console.error("Failed to submit project:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Submit a New Project
            </h1>
            <p className="mt-3 text-xl text-gray-500">
              Propose a community initiative to improve our shared spaces
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
              <CardDescription>
                Fill out the form below to submit your project idea for community voting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter a clear, descriptive title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Project Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the project, its benefits, and what volunteers would do"
                    className="min-h-32"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="Where would this project take place?"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type">Project Type</Label>
                  <Select value={type} onValueChange={setType} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cleanup" className="flex items-center">
                        <div className="flex items-center">
                          <Trash className="h-4 w-4 mr-2 text-community-green" />
                          <span>Litter Cleanup</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="weeds">
                        <div className="flex items-center">
                          <LeafyGreen className="h-4 w-4 mr-2 text-community-dark-purple" />
                          <span>Weed Removal</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="graffiti">
                        <div className="flex items-center">
                          <Paintbrush className="h-4 w-4 mr-2 text-blue-600" />
                          <span>Graffiti Removal</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="other">
                        <div className="flex items-center">
                          <Scissors className="h-4 w-4 mr-2 text-orange-600" />
                          <span>Other</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full bg-community-purple hover:bg-community-dark-purple"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Project"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewProject;
