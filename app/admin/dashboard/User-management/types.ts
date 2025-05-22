export type UserRole = 'Voter' | 'Candidate' | 'Election Officer' | 'Auditor';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role: UserRole;
  status: 'Active' | 'Suspended';
}
