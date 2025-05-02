
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { RecommendationService } from '@/lib/recommendationService';
import { UserMatch } from '@/types/user';
import { RecommendationCard } from '@/components/RecommendationCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from '@/components/ui/button';
import SharedLayout from '@/components/SharedLayout';

const token = localStorage.getItem('token');
const Recommendations = () => {
  const { user } = useAuth();
  const [filterType, setFilterType] = useState<string>('all');
  
  // Fetch recommendations
  const { data: recommendations, isLoading, error } = useQuery({
    queryKey: ['recommendations', user?.id],
    queryFn: () => RecommendationService.getRecommendations(user?.id ,token),
    enabled: !!user?.id && !!token,
  });

  // Filter recommendations based on selected type
  const filteredRecommendations = React.useMemo(() => {
    if (!recommendations) return [];
    
    if (filterType === 'all') {
      return recommendations;
    }
    
    return recommendations.filter(rec => 
      rec.user.connection_type === filterType
    );
  }, [recommendations, filterType]);

  return (
    <SharedLayout title="Your Recommendations">
      <div className="container mx-auto py-8">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Your Matches</h1>
            <p className="text-muted-foreground">
              We've found {filteredRecommendations.length} potential connections for you
            </p>
          </div>
          
          <div className="w-full sm:w-auto">
            <Select
              value={filterType}
              onValueChange={(value) => setFilterType(value)}
            >
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Connections</SelectItem>
                <SelectItem value="Study Partner">Study Partners</SelectItem>
                <SelectItem value="Project Collaboration">Project Collaboration</SelectItem>
                <SelectItem value="General">General</SelectItem>
                <SelectItem value="Friendship">Friendship</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p>Loading your recommendations...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-red-500">Error loading recommendations</p>
          </div>
        ) : filteredRecommendations.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-64">
            <p className="text-xl font-medium">No matches found</p>
            <p className="text-muted-foreground">
              Try changing your filter or update your profile
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredRecommendations.map((match: UserMatch) => (
              <RecommendationCard key={match.user.id} match={match} />
            ))}
          </div>
        )}
      </div>
    </SharedLayout>
  );
};

export default Recommendations;
