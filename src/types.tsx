export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: 'Full-time' | 'Part-time' | 'Casual';
  description: string;
  postedAt: string;
  matchScore?: number; // AI match score
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  status: 'Applied' | 'Shortlisted' | 'Interview' | 'Rejected' | 'Hired';
  date: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

export interface UserProfile {
  name: string;
  role: string;
  avatar: string;
  completionPercentage: number;
  email: string;
  phone: string;
  location: string;
  skills: string[];
  experience: string;
  availability: string;
}
