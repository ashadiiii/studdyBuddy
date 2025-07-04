import React from 'react';
import { Button } from '@/components/ui/button';
import { Youtube, BookOpen, GraduationCap, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SourceSelection {
  youtube: boolean;
  wikipedia: boolean;
  scholar: boolean;
}

interface SourceSelectionProps {
  sourceSelection: SourceSelection;
  onSourceToggle: (source: keyof SourceSelection) => void;
  onConfirm: () => void;
  hasSelectedSources: boolean;
}

const SourceSelectionComponent: React.FC<SourceSelectionProps> = ({
  sourceSelection,
  onSourceToggle,
  onConfirm,
  hasSelectedSources
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
        <Settings size={18} />
        <span className="font-semibold">Select Your Preferred Sources</span>
      </div>
      
      <div className="space-y-4">
        <div 
          onClick={() => onSourceToggle('youtube')}
          className={cn(
            "flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300",
            sourceSelection.youtube 
              ? "border-red-300 bg-red-50 dark:bg-red-900/20 shadow-lg scale-[1.02]" 
              : "border-gray-200 dark:border-gray-700 hover:border-red-200 hover:bg-red-50/50 dark:hover:bg-red-900/10"
          )}
        >
          <div className={cn(
            "p-3 rounded-xl transition-colors",
            sourceSelection.youtube ? "bg-red-500" : "bg-gray-300 dark:bg-gray-600"
          )}>
            <Youtube className="text-white" size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">YouTube Videos</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Educational videos and tutorials
            </p>
          </div>
        </div>

        <div 
          onClick={() => onSourceToggle('wikipedia')}
          className={cn(
            "flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300",
            sourceSelection.wikipedia 
              ? "border-blue-300 bg-blue-50 dark:bg-blue-900/20 shadow-lg scale-[1.02]" 
              : "border-gray-200 dark:border-gray-700 hover:border-blue-200 hover:bg-blue-50/50 dark:hover:bg-blue-900/10"
          )}
        >
          <div className={cn(
            "p-3 rounded-xl transition-colors",
            sourceSelection.wikipedia ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600"
          )}>
            <BookOpen className="text-white" size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Wikipedia</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Comprehensive reference articles
            </p>
          </div>
        </div>

        <div 
          onClick={() => onSourceToggle('scholar')}
          className={cn(
            "flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300",
            sourceSelection.scholar 
              ? "border-purple-300 bg-purple-50 dark:bg-purple-900/20 shadow-lg scale-[1.02]" 
              : "border-gray-200 dark:border-gray-700 hover:border-purple-200 hover:bg-purple-50/50 dark:hover:bg-purple-900/10"
          )}
        >
          <div className={cn(
            "p-3 rounded-xl transition-colors",
            sourceSelection.scholar ? "bg-purple-500" : "bg-gray-300 dark:bg-gray-600"
          )}>
            <GraduationCap className="text-white" size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Academic Sources</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Scholarly articles and research
            </p>
          </div>
        </div>
      </div>

      <Button
        onClick={onConfirm}
        disabled={!hasSelectedSources}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-2xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Show Resources
      </Button>
    </div>
  );
};

export default SourceSelectionComponent;
