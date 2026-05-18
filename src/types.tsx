export interface Job {
  id?: string;
  _id?: string;
  title: string;
  company?: string; // Optional if referencing employer
  employerId?: { name: string; businessName?: string };
  location: string;
  salary: string;
  jobType: string;
  type?: string; // For backward compatibility
  description: string;
  requirements?: string[];
  postedAt?: string;
  createdAt?: string;
  matchScore?: number;
}

export interface Application {
  id?: string;
  _id?: string;
    jobId: any;
    applicantId: any;
    status: 'Applied' | 'Shortlisted' | 'Interview' | 'Rejected' | 'Hired';
    appliedAt?: string;
    date?: string;
    jobTitle?: string;
    company?: string;
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
