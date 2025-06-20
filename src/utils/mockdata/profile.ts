export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  gender: string;
  bio: string;
  avatar: string;
  role: 'admin' | 'member' | 'coach';
  joinedDate: string;
  membershipDetails?: {
    plan: string;
    status: string;
    startDate: string;
    endDate: string;
    autoRenew: boolean;
    paymentMethod: string;
  };
  fitnessStats?: {
    height: number;
    weight: number;
    bodyFat: number;
    goals: string[];
    preferences: string[];
  };
  coachDetails?: {
    specialties: string[];
    certifications: string[];
    experience: number;
    rating: number;
    reviewCount: number;
    availability: {
      monday: string[];
      tuesday: string[];
      wednesday: string[];
      thursday: string[];
      friday: string[];
      saturday: string[];
      sunday: string[];
    };
  };
}

// Mock data for different user types
const memberProfile: UserProfile = {
  id: 'mem-001',
  name: 'John Smith',
  email: 'john.smith@example.com',
  phoneNumber: '(555) 123-4567',
  address: '123 Main St, New York, NY 10001',
  dateOfBirth: '1990-06-15',
  gender: 'male',
  bio: 'Fitness enthusiast looking to improve my overall health and strength. I enjoy running and weightlifting.',
  avatar: 'https://i.pravatar.cc/150?img=12',
  role: 'member',
  joinedDate: '2023-01-15',
  membershipDetails: {
    plan: 'Premium Annual',
    status: 'active',
    startDate: '2023-01-15',
    endDate: '2024-01-15',
    autoRenew: true,
    paymentMethod: 'Credit Card',
  },
  fitnessStats: {
    height: 182,
    weight: 78,
    bodyFat: 15.5,
    goals: ['Build Muscle', 'Increase Strength', 'Improve Endurance'],
    preferences: ['Morning Workouts', 'Group Classes', 'Weightlifting'],
  },
};

const coachProfile: UserProfile = {
  id: 'coach-001',
  name: 'Sarah Johnson',
  email: 'sarah.johnson@example.com',
  phoneNumber: '(555) 987-6543',
  address: '456 Park Ave, New York, NY 10022',
  dateOfBirth: '1985-03-22',
  gender: 'female',
  bio: 'Certified personal trainer with 8 years of experience specializing in strength training and nutrition. Passionate about helping clients achieve their fitness goals.',
  avatar: 'https://i.pravatar.cc/150?img=5',
  role: 'coach',
  joinedDate: '2022-04-10',
  coachDetails: {
    specialties: ['Strength Training', 'Weight Loss', 'Nutrition', 'HIIT'],
    certifications: [
      'NASM Certified Personal Trainer',
      'Precision Nutrition Level 1',
      'CrossFit Level 2 Trainer',
      'TRX Suspension Training',
    ],
    experience: 8,
    rating: 4.8,
    reviewCount: 124,
    availability: {
      monday: ['9:00 AM - 12:00 PM', '2:00 PM - 6:00 PM'],
      tuesday: ['9:00 AM - 12:00 PM', '2:00 PM - 6:00 PM'],
      wednesday: ['9:00 AM - 12:00 PM', '2:00 PM - 6:00 PM'],
      thursday: ['9:00 AM - 12:00 PM', '2:00 PM - 6:00 PM'],
      friday: ['9:00 AM - 12:00 PM', '2:00 PM - 6:00 PM'],
      saturday: ['10:00 AM - 2:00 PM'],
      sunday: [],
    },
  },
};

const adminProfile: UserProfile = {
  id: 'admin-001',
  name: 'Alex Rodriguez',
  email: 'alex.rodriguez@example.com',
  phoneNumber: '(555) 345-6789',
  address: '789 Broadway, New York, NY 10003',
  dateOfBirth: '1982-11-08',
  gender: 'male',
  bio: 'System administrator and fitness center manager with over 10 years of experience in the fitness industry.',
  avatar: 'https://i.pravatar.cc/150?img=68',
  role: 'admin',
  joinedDate: '2020-02-01',
};

export function getMockProfile(role: string = 'member'): UserProfile {
  switch (role.toLowerCase()) {
    case 'coach':
      return coachProfile;
    case 'admin':
      return adminProfile;
    case 'member':
    default:
      return memberProfile;
  }
}

// Function to simulate API call to update profile
export async function updateProfile(
  userId: string,
  data: Partial<UserProfile>
): Promise<UserProfile> {
  // Simulate API latency
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  // In a real app, this would be an API call to update the user's profile
  // For now, we'll just return the merged data
  const currentProfile = getMockProfile(data.role || 'member');
  
  return {
    ...currentProfile,
    ...data,
  };
}