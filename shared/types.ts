export interface Message {
  content: string;
  created_at: Date;
  id: number;
  user_id: string;
  profiles: User;
}

export interface User {
  avatar_url: string;
  full_name: string;
  id: string;
}
