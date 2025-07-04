import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';
import SourceSelectionComponent from '@/components/resources/SourceSelection';
import ResourceTabs from '@/components/resources/ResourceTabs';

interface SourceSelection {
  youtube: boolean;
  wikipedia: boolean;
  scholar: boolean;
}

interface AIResourcesSidebarProps {
  resources?: string[];
  onGenerateResources: () => void;
}

const AIResourcesSidebar: React.FC<AIResourcesSidebarProps> = ({ 
  resources = [], 
  onGenerateResources 
}) => {
  const [sourceSelection, setSourceSelection] = useState<SourceSelection>({
    youtube: false,
    wikipedia: false,
    scholar: false
  });
  const [showSourceSelection, setShowSourceSelection] = useState(true);

  // Categorize resources by type
  const categorizeResources = (resources: string[]) => {
    const youtube = resources.filter(resource => 
      resource.toLowerCase().includes('youtube') || 
      resource.toLowerCase().includes('video') ||
      resource.toLowerCase().includes('khan academy')
    );
    
    const wikipedia = resources.filter(resource => 
      resource.toLowerCase().includes('wikipedia') || 
      resource.toLowerCase().includes('wiki')
    );
    
    const scholar = resources.filter(resource => 
      resource.toLowerCase().includes('scholar') || 
      resource.toLowerCase().includes('mit') ||
      resource.toLowerCase().includes('courseware') ||
      resource.toLowerCase().includes('wolfram') ||
      (!youtube.includes(resource) && !wikipedia.includes(resource))
    );

    return { youtube, wikipedia, scholar };
  };

  const resourceCategories = categorizeResources(resources);

  // Filter resources based on selected sources
  const getFilteredCategories = () => {
    const filtered = { youtube: [], wikipedia: [], scholar: [] };
    if (sourceSelection.youtube) filtered.youtube = resourceCategories.youtube;
    if (sourceSelection.wikipedia) filtered.wikipedia = resourceCategories.wikipedia;
    if (sourceSelection.scholar) filtered.scholar = resourceCategories.scholar;
    return filtered;
  };

  const filteredCategories = getFilteredCategories();
  const hasSelectedSources = Object.values(sourceSelection).some(Boolean);

  const handleSourceToggle = (source: keyof SourceSelection) => {
    setSourceSelection(prev => ({
      ...prev,
      [source]: !prev[source]
    }));
  };

  const handleConfirmSources = () => {
    if (hasSelectedSources) {
      setShowSourceSelection(false);
    }
  };

  return (
    <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden">

      <CardHeader className="relative pb-4">
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl">
            <Lightbulb className="text-white" size={24} />
          </div>
          AI Resources
        </CardTitle>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Curated learning materials powered by AI
        </p>
      </CardHeader>
      
      <CardContent className="relative space-y-6">
        {showSourceSelection ? (
          <SourceSelectionComponent
            sourceSelection={sourceSelection}
            onSourceToggle={handleSourceToggle}
            onConfirm={handleConfirmSources}
            hasSelectedSources={hasSelectedSources}
          />
        ) : (
          <ResourceTabs
            sourceSelection={sourceSelection}
            filteredCategories={filteredCategories}
            onShowSourceSelection={() => setShowSourceSelection(true)}
            onGenerateResources={onGenerateResources}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default AIResourcesSidebar;
