import { User } from '../types/user';
import { BlogPost } from '../types/blog';

// Email service configuration
const EMAIL_SERVICE_URL = 'https://api.emailjs.com/api/v1.0/email/send';
const SERVICE_ID = 'service_q0ozut6'; // You'll need to set this up with EmailJS
const TEMPLATE_ID = 'new_post_notification';
const PUBLIC_KEY = '3o_QyILDvFjpKmYqb'; // You'll need to get this from EmailJS

interface EmailData {
  to_email: string;
  to_name: string;
  from_name: string;
  post_title: string;
  post_author: string;
  post_content: string;
  blog_url: string;
}

export class EmailService {
  private static instance: EmailService;
  private isConfigured: boolean = false;

  private constructor() {
    // Check if EmailJS is configured
    this.isConfigured = !!(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY && PUBLIC_KEY !== 'your_emailjs_public_key');
  }

  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  public async sendNewPostNotification(
    recipients: User[],
    post: BlogPost,
    blogUrl: string = window.location.origin
  ): Promise<{ success: number; failed: number; errors: string[] }> {
    if (!this.isConfigured) {
      console.warn('Email service not configured. Notifications will be simulated.');
      return this.simulateEmailSending(recipients, post);
    }

    const results = {
      success: 0,
      failed: 0,
      errors: [] as string[]
    };

    // Send emails to all subscribed users
    for (const user of recipients) {
      try {
        await this.sendEmail({
          to_email: user.email,
          to_name: user.name,
          from_name: 'July 12th Blog',
          post_title: post.title,
          post_author: post.author,
          post_content: post.content.substring(0, 200) + (post.content.length > 200 ? '...' : ''),
          blog_url: blogUrl
        });
        
        results.success++;
        console.log(`✅ Email sent to ${user.name} (${user.email})`);
      } catch (error) {
        results.failed++;
        const errorMessage = `Failed to send email to ${user.name}: ${error}`;
        results.errors.push(errorMessage);
        console.error(`❌ ${errorMessage}`);
      }
    }

    return results;
  }

  private async sendEmail(data: EmailData): Promise<void> {
    const response = await fetch(EMAIL_SERVICE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: SERVICE_ID,
        template_id: TEMPLATE_ID,
        user_id: PUBLIC_KEY,
        template_params: data
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }

  private async simulateEmailSending(
    recipients: User[],
    post: BlogPost
  ): Promise<{ success: number; failed: number; errors: string[] }> {
    // Simulate email sending with delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('📧 Simulating email notifications:');
    recipients.forEach(user => {
      console.log(`📨 Email would be sent to: ${user.name} (${user.email})`);
      console.log(`   Subject: New post on July 12th Blog: "${post.title}"`);
      console.log(`   Message: Hi ${user.name}, you have an unread message from ${post.author}`);
    });

    return {
      success: recipients.length,
      failed: 0,
      errors: []
    };
  }

  public isEmailServiceConfigured(): boolean {
    return this.isConfigured;
  }
}

// Email template for reference (you'll set this up in EmailJS):
/*
Subject: New post on July 12th Blog: "{{post_title}}"

Hi {{to_name}},

You have an unread message on the July 12th Blog!

📝 New Post: "{{post_title}}"
✍️ By: {{post_author}}

{{post_content}}

Visit the blog to read the full post and join the conversation:
{{blog_url}}

Best regards,
July 12th Blog Team

---
You're receiving this because you subscribed to notifications. 
You can unsubscribe anytime by visiting the blog settings.
*/