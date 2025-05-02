
import { User, UserMatch } from '@/types/user';

// In-memory database for demo purposes
// In a real app, this would be replaced with actual database calls
class InMemoryDatabase {
  private users: User[] = [];

  constructor() {
    // Add some sample users for testing
    this.addSampleUsers();
  }

  async createUser(user: User): Promise<User> {
    // Check if email already exists
    const existingUser = this.users.find(u => u.email === user.email);
    if (existingUser) {
      throw new Error('Email already exists');
    }
    
    this.users.push(user);
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === user.email);
  }

  async getUserById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async getAllUsers(): Promise<User[]> {
    return [...this.users];
  }

  async getRecommendations(userId: string): Promise<UserMatch[]> {
    const currentUser = this.users.find(user => user.id === userId);
    
    if (!currentUser) {
      throw new Error('User not found');
    }

    const matches = this.users
      .filter(user => user.id !== userId)
      .map(user => ({
        user: this.omitPassword(user),
        matchScore: this.calculateMatchScore(currentUser, user)
      }))
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 10); // Get top 10 matches
    
    return matches;
  }

  private calculateMatchScore(user1: User, user2: User): number {
    let score = 0;
    
    // Common interests: +30 points per match
    const commonInterests = user1.interests.filter(interest => 
      user2.interests.includes(interest));
    score += commonInterests.length * 30;
    
    // Skill-Learning Goal match: +20 points
    const skillMatches = user1.currentSkills.filter(skill => 
      user2.learningSkills.includes(skill));
    const reverseSkillMatches = user1.learningSkills.filter(skill => 
      user2.currentSkills.includes(skill));
    score += (skillMatches.length + reverseSkillMatches.length) * 20;
    
    // Same department: +15 points
    if (user1.department === user2.department) {
      score += 15;
    }
    
    // Same year: +10 points
    if (user1.year === user2.year) {
      score += 10;
    }
    
    return Math.min(score, 100); // Cap at 100 points
  }

  private omitPassword(user: User) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  private addSampleUsers() {
    const sampleUsers: User[] = [
      {
        id: '1',
        name: 'Priya Sharma',
        email: 'priya@s.amity.edu',
        password: 'hashed_password', // In real app, use bcrypt
        gender: 'Female',
        interests: ['Web Development', 'Data Science', 'Cloud Computing & DevOps'],
        currentSkills: ['JavaScript', 'Python', 'SQL / NoSQL Databases'],
        learningSkills: ['Machine Learning', 'Cybersecurity'],
        department: 'BTech',
        year: '3rd',
        connectionType: 'Project Collaboration',
        createdAt: new Date()
      },
      {
        id: '2',
        name: 'Rahul Singh',
        email: 'rahul@s.amity.edu',
        password: 'hashed_password',
        gender: 'Male',
        interests: ['Cybersecurity & Ethical Hacking', 'Data Science', 'Cloud Computing & DevOps'],
        currentSkills: ['Python', 'C / C++', 'SQL / NoSQL Databases'],
        learningSkills: ['JavaScript', 'Machine Learning'],
        department: 'BTech',
        year: '3rd',
        connectionType: 'Study Partner',
        createdAt: new Date()
      },
      {
        id: '3',
        name: 'Neha Gupta',
        email: 'neha@s.amity.edu',
        password: 'hashed_password',
        gender: 'Female',
        interests: ['Web Development', 'Entrepreneurship and Startup', 'Blockchain & Web3'],
        currentSkills: ['JavaScript', 'Java / Kotlin'],
        learningSkills: ['Python', 'SQL / NoSQL Databases'],
        department: 'BCA',
        year: '2nd',
        connectionType: 'General',
        createdAt: new Date()
      },
      {
        id: '4',
        name: 'Arjun Kumar',
        email: 'arjun@s.amity.edu',
        password: 'hashed_password',
        gender: 'Male',
        interests: ['Data Science', 'Blockchain & Web3', 'Cloud Computing & DevOps'],
        currentSkills: ['Python', 'SQL / NoSQL Databases'],
        learningSkills: ['JavaScript', 'Cybersecurity'],
        department: 'MCA',
        year: '1st',
        connectionType: 'Friendship',
        createdAt: new Date()
      },
      {
        id: '5',
        name: 'Ananya Patel',
        email: 'ananya@s.amity.edu',
        password: 'hashed_password',
        gender: 'Female',
        interests: ['Web Development', 'Data Science', 'Entrepreneurship and Startup'],
        currentSkills: ['JavaScript', 'Python', 'Java / Kotlin'],
        learningSkills: ['DSA', 'Cybersecurity'],
        department: 'BTech',
        year: '4th',
        connectionType: 'Project Collaboration',
        createdAt: new Date()
      }
    ];
    
    this.users.push(...sampleUsers);
  }
}

export const db = new InMemoryDatabase();
