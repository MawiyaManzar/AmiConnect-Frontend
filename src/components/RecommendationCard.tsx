
import { UserMatch } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RecommendationService } from "@/lib/recommendationService";
import { StarRating } from "./StarRating";

interface RecommendationCardProps {
  match: UserMatch;
}

export const RecommendationCard = ({ match }: RecommendationCardProps) => {
  const { user, matchScore } = match;
  const starRating = RecommendationService.getStarRating(matchScore);

  const handleConnect = () => {
    const searchUrl = RecommendationService.getLinkedInSearchUrl(user.name);
    window.open(searchUrl, "_blank");
  };
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="bg-gradient-to-r from-amiconnect-accent to-amiconnect-muted pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-amiconnect-primary">{user.name}</h3>
            <p className="text-sm text-gray-600">
              {user.department}, {user.year} Year
            </p>
          </div>
          <Badge variant="secondary" className="text-sm">
            {user.connection_type}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div>
            <p className="font-medium text-sm text-gray-500">Interests</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {user.interests.map((interest) => (
                <Badge key={interest} variant="outline" className="text-xs">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-sm text-gray-500">Current Skills</p>
              <div className="mt-1">
                {user.currentSkills.map((skill) => (
                  <p key={skill} className="text-sm">{skill}</p>
                ))}
                {user.currentSkills.length === 0 && (
                  <p className="text-sm text-gray-400">None specified</p>
                )}
              </div>
            </div>
            
            <div>
              <p className="font-medium text-sm text-gray-500">Learning Goals</p>
              <div className="mt-1">
                {user.learningSkills.map((skill) => (
                  <p key={skill} className="text-sm">{skill}</p>
                ))}
                {user.learningSkills.length === 0 && (
                  <p className="text-sm text-gray-400">None specified</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="font-medium text-sm text-gray-500">Match Score</p>
              <div className="flex items-center gap-2">
                <StarRating rating={starRating} />
                <span className="text-sm font-semibold">
                  {matchScore}/100
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-50">
        <Button 
          onClick={handleConnect}
          className="w-full"
        >
          Connect on LinkedIn
        </Button>
      </CardFooter>
    </Card>
  );
};
