
import React from 'react';
import { ExternalLink } from 'lucide-react';

interface ResourceCardProps {
  resource: string;
  index: number;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, index }) => (
  <div
    key={index}
    className="group relative p-4 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl border border-gray-200/50 dark:border-gray-600/50 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer"
  >
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {resource}
      </span>
      <ExternalLink size={16} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
    </div>
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </div>
);

export default ResourceCard;
