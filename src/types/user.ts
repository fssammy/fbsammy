export interface User {
  id: string;
  name: string;
  email: string;
  ipAddress?: string;
  sessionId: string;
  createdAt: Date;
  isSubscribed: boolean;
}

export interface EmailNotification {
  id: string;
  recipientEmail: string;
  recipientName: string;
  subject: string;
  message: string;
  postId: string;
  postTitle: string;
  postAuthor: string;
  sentAt: Date;
  status: 'pending' | 'sent' | 'failed';
}