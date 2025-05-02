
import axios from 'axios';
import { UserMatch } from '@/types/user';

export class RecommendationService {
  static async getRecommendations(userId: number, token: string): Promise<UserMatch[]> {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const resp = await axios.get(`${API_URL}/recommend/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    // Map backend response to UserMatch[]
    return resp.data.recommendations.map((rec: any) => ({
      user: {
        id: rec.id,
        name: rec.name,
        department: rec.department,
        year: rec.year,
        connection_type: rec.connection_type,
        interests: rec.interests || [],
        currentSkills: rec.skills || [],
        learningSkills: rec.learning_goals || [],
        // add more fields if backend returns them
      },
      matchScore: rec.score
    }));
  }

  static getStarRating(score: number): number {
    // Convert a score out of 100 to a star rating out of 5
    return Math.round((score / 100) * 5);
  }
  
  static getLinkedInSearchUrl(name: string): string {
    // Create LinkedIn search URL via Google
    const query = `site:linkedin.com "${name}" "Amity University"`;
    return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  }
}
