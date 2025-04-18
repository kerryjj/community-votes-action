
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center">
              <Sparkles className="h-8 w-8 text-community-purple mr-2" />
              <span className="text-xl font-bold text-gray-900">CommunityAction</span>
            </div>
            <p className="text-gray-500 text-base">
              Empowering communities to make a difference, one project at a time.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Navigation</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/" className="text-base text-gray-500 hover:text-community-purple">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/projects" className="text-base text-gray-500 hover:text-community-purple">
                      Projects
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="text-base text-gray-500 hover:text-community-purple">
                      About
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Actions</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/new-project" className="text-base text-gray-500 hover:text-community-purple">
                      Submit a Project
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} CommunityAction. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
