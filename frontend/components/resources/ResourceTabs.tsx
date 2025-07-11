import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Youtube, BookOpen, GraduationCap } from 'lucide-react';
import ResourceCard from './ResourceCard';

interface SourceSelection {
  youtube: boolean;
  wikipedia: boolean;
  scholar: boolean;
}

interface ResourceCategories {
  youtube: string[];
  wikipedia: string[];
  scholar: string[];
}

interface ResourceTabsProps {
  sourceSelection: SourceSelection;
  filteredCategories: ResourceCategories;
  onShowSourceSelection: () => void;
  onGenerateResources: () => void;
}

const ResourceTabs: React.FC<ResourceTabsProps> = ({
  sourceSelection,
  filteredCategories,
  onShowSourceSelection,
  onGenerateResources
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Showing selected sources
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onShowSourceSelection}
          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
        >
          Change Sources
        </Button>
      </div>

      <Tabs defaultValue="youtube" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6 bg-white/50 dark:bg-gray-800/50 p-1 rounded-2xl">
          {sourceSelection.youtube && (
            <TabsTrigger value="youtube" className="flex items-center gap-2 text-xs font-medium rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-gray-700">
              <Youtube size={16} />
              Videos
            </TabsTrigger>
          )}
          {sourceSelection.wikipedia && (
            <TabsTrigger value="wikipedia" className="flex items-center gap-2 text-xs font-medium rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-gray-700">
              <BookOpen size={16} />
              Wiki
            </TabsTrigger>
          )}
          {sourceSelection.scholar && (
            <TabsTrigger value="scholar" className="flex items-center gap-1 text-xs font-medium rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-gray-700">
             <GraduationCap size={16} />
             Scholar
            </TabsTrigger>
          )}
        </TabsList>
        
        {sourceSelection.youtube && (
          <TabsContent value="youtube" className="space-y-4 mt-0">
            {filteredCategories.youtube.length > 0 ? (
              filteredCategories.youtube.map((resource, index) => (
                <ResourceCard key={`youtube-${index}`} resource={resource} index={index} />
              ))
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <Youtube size={48} className="mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium">No video resources available</p>
                <p className="text-sm">Try generating resources for this task</p>
              </div>
            )}
          </TabsContent>
        )}
        
        {sourceSelection.wikipedia && (
          <TabsContent value="wikipedia" className="space-y-4 mt-0">
            {filteredCategories.wikipedia.length > 0 ? (
              filteredCategories.wikipedia.map((resource, index) => (
                <ResourceCard key={`wiki-${index}`} resource={resource} index={index} />
              ))
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <BookOpen size={48} className="mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium">No wiki resources available</p>
                <p className="text-sm">Try generating resources for this task</p>
              </div>
            )}
          </TabsContent>
        )}
        
        {sourceSelection.scholar && (
          <TabsContent value="scholar" className="space-y-4 mt-0">
            {filteredCategories.scholar.length > 0 ? (
              filteredCategories.scholar.map((resource, index) => (
                <ResourceCard key={`scholar-${index}`} resource={resource} index={index} />
              ))
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <GraduationCap size={48} className="mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium">No academic resources available</p>
                <p className="text-sm">Try generating resources for this task</p>
              </div>
            )}
          </TabsContent>
        )}
      </Tabs>
      
      <Button
        onClick={onGenerateResources}
        className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-3 rounded-2xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
      >
        Generate More Resources
      </Button>
    </div>
  );
};

export default ResourceTabs;
