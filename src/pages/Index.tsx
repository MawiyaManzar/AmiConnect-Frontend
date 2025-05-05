
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SharedLayout from "@/components/SharedLayout";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <SharedLayout title="">
      <div className="min-h-[80vh] flex flex-col items-center justify-center gradient-background rounded-xl py-16 px-4">
        <div className="text-center max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-amiconnect-primary">
            AmiConnect AI by Rekhi Foundation, Amity Centre Of Happiness
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-700">
          Discover Your Tribe at Amity University: Collaborate, Connect, and Co-Create with Students Who Share Your Passions, Skills, and Learning Ambitions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Button 
                size="lg" 
                className="px-8 py-6 text-lg"
                onClick={() => navigate('/recommendations')}
              >
                View Recommendations
              </Button>
            ) : (
              <>
                <Button 
                  size="lg" 
                  className="px-8 py-6 text-lg"
                  onClick={() => navigate('/signup')}
                >
                  Sign Up
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="px-8 py-6 text-lg"
                  onClick={() => navigate('/login')}
                >
                  Log In
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
          <FeatureCard 
            title="Find Study Partners" 
            description="Connect with students who share your academic interests and goals."
          />
          <FeatureCard 
            title="Build Projects Together" 
            description="Find collaborators with complementary skills for your next project."
          />
          <FeatureCard 
            title="Expand Your Network" 
            description="Meet students from your department and beyond, based on shared interests."
          />
        </div>
      </div>
    </SharedLayout>
  );
};

const FeatureCard = ({ title, description }: { title: string; description: string }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold mb-3 text-amiconnect-primary">{title}</h2>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Index;
