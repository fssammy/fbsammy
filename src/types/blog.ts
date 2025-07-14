export interface BlogPost {
  id: string;
  author: string;
  title: string;
  content: string;
  timestamp: Date;
  likes: number;
  likedBy: string[];
  tags: string[];
  mood?: 'happy' | 'excited' | 'grateful' | 'thoughtful' | 'celebratory';
}

export interface BlogComment {
  id: string;
  postId: string;
  author: string;
  content: string;
  timestamp: Date;
  likes: number;
  likedBy: string[];
}