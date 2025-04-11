
import { Users, ThumbsUp, Calendar } from "lucide-react";

const Stats = () => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Making a difference together
          </h2>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            Our community is working hard to improve our shared spaces
          </p>
        </div>
        <dl className="mt-10 text-center grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate flex items-center justify-center">
              <Users className="mr-1 h-5 w-5 text-community-purple" />
              Active Volunteers
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">124</dd>
          </div>
          <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate flex items-center justify-center">
              <ThumbsUp className="mr-1 h-5 w-5 text-community-purple" />
              Projects Completed
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">38</dd>
          </div>
          <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate flex items-center justify-center">
              <Calendar className="mr-1 h-5 w-5 text-community-purple" />
              Upcoming Events
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">15</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default Stats;
