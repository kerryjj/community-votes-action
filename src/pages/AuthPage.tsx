
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles } from "lucide-react";

const AuthPage = () => {
  const { signInWithGoogle, user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  // If user is already logged in, redirect them
  useEffect(() => {
    if (!isLoading && user) {
      // Redirect to stored URL or default to projects page
      navigate(redirectUrl || "/projects");
    }
  }, [user, isLoading, navigate, redirectUrl]);

  // Store the current URL to redirect back after login
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get("redirect");
    if (redirect) {
      setRedirectUrl(redirect);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin h-12 w-12 border-4 border-community-purple border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-10">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Sparkles className="h-12 w-12 text-community-purple mx-auto mb-4" />
            <h1 className="text-3xl font-extrabold text-gray-900">Sign in to CommunityAction</h1>
            <p className="mt-3 text-lg text-gray-500">
              Join our community to create and support local projects
            </p>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-6">
            <Button 
              className="w-full py-6 mb-4 flex items-center justify-center bg-white hover:bg-gray-50 text-gray-900 border border-gray-300"
              variant="outline"
              onClick={signInWithGoogle}
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 mr-3" />
              Continue with Google
            </Button>
            
            <p className="text-center text-sm text-gray-500 mt-4">
              By signing in, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AuthPage;
