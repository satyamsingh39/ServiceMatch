import { Job, Application, Notification, UserProfile } from '../types';

export const MOCK_USER: UserProfile = {
  name: "Alex Rivera",
  role: "Senior Waiter",
  avatar: "https://picsum.photos/200/200",
  completionPercentage: 75,
  email: "alex.rivera@example.com",
  phone: "+1 (555) 123-4567",
  location: "New York, NY",
  skills: ["Wine Service", "POS Systems", "Team Leadership"],
  experience: "5 years in fine dining",
  availability: "Weekends and Evenings",
};

export const MOCK_JOBS: Job[] = [
  {
    id: "1",
    title: "Fine Dining Waiter",
    company: "Le Gourmet Palace",
    location: "Manhattan, NY",
    salary: "$25/hr + Tips",
    type: "Full-time",
    description: "Looking for an experienced server for our evening shifts. Must have wine knowledge.",
    postedAt: "2 days ago",
    matchScore: 95,
  },
  {
    id: "2",
    title: "Breakfast Server",
    company: "Sunny Side Cafe",
    location: "Brooklyn, NY",
    salary: "$18/hr + Tips",
    type: "Part-time",
    description: "Fast-paced breakfast spot needs energetic servers for weekend shifts.",
    postedAt: "1 day ago",
    matchScore: 88,
  },
  {
    id: "3",
    title: "Event Staff / Banquet Server",
    company: "Grand Hotel Events",
    location: "Queens, NY",
    salary: "$30/hr",
    type: "Casual",
    description: "Join our on-call roster for weddings and corporate events.",
    postedAt: "4 hours ago",
    matchScore: 70,
  },
  {
    id: "4",
    title: "Bartender / Server",
    company: "The Rusty Anchor",
    location: "Staten Island, NY",
    salary: "$22/hr + Tips",
    type: "Full-time",
    description: "Experience with cocktail mixing is a plus. Fun environment.",
    postedAt: "1 week ago",
    matchScore: 82,
  },
];

export const MOCK_APPLICATIONS: Application[] = [
  {
    id: "a1",
    jobId: "2",
    jobTitle: "Breakfast Server",
    company: "Sunny Side Cafe",
    status: "Shortlisted",
    date: "2023-10-25",
  },
  {
    id: "a2",
    jobId: "5",
    jobTitle: "Dinner Host",
    company: "Blue Ocean Grill",
    status: "Rejected",
    date: "2023-10-20",
  },
  {
    id: "a3",
    jobId: "6",
    jobTitle: "Head Waiter",
    company: "Italiano Vero",
    status: "Interview",
    date: "2023-10-28",
  },
  {
    id: "a4",
    jobId: "1",
    jobTitle: "Fine Dining Waiter",
    company: "Le Gourmet Palace",
    status: "Applied",
    date: "2023-10-29",
  },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    title: "Interview Scheduled",
    message: "Your interview with Italiano Vero is set for tomorrow at 2 PM.",
    date: "1 hour ago",
    read: false,
    type: "success",
  },
  {
    id: "n2",
    title: "Profile Viewed",
    message: "Le Gourmet Palace viewed your profile.",
    date: "5 hours ago",
    read: true,
    type: "info",
  },
  {
    id: "n3",
    title: "Application Update",
    message: "Sunny Side Cafe has shortlisted your application.",
    date: "1 day ago",
    read: true,
    type: "success",
  },
];
