export interface User {
  id: number;
  email: string;
  password?: string;
  name: string;
  gender: string;
  department: string;
  year: number;
  connection_type: string;
  createdAt?: string;
  interests?: string[];
  skills?: string[];
  learning_goals?: string[];
}

export interface UserProfile {
  id: number;
  email: string;
  name: string;
  gender: string;
  department: string;
  year: number;
  connection_type: string;
}

export interface UserMatch {
  user: UserProfile;
  matchScore: number;
}
