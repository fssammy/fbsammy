import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BlogPost, BlogComment } from '../types/blog';
import { useUser } from './useUser';
import { EmailService } from '../services/emailService';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Fallback to localStorage if Supabase is not configured
const STORAGE_KEY = 'july12th-blog-posts';
const COMMENTS_STORAGE_KEY = 'july12th-blog-comments';
const USER_KEY = 'july12th-user-id';

// Get or create user ID
const getUserId = (): string => {
  let userId = localStorage.getItem(USER_KEY);
  if (!userId) {
    userId = uuidv4();
    localStorage.setItem(USER_KEY, userId);
  }
  return userId;
};

// Supabase client setup
const createSupabaseClient = () => {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return null;
  }
  
  // Simple fetch-based Supabase client
  return {
    from: (table: string) => ({
      select: async (columns = '*') => {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=${columns}`, {
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        return { data, error: response.ok ? null : data };
      },
      insert: async (values: any) => {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
          method: 'POST',
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation',
          },
          body: JSON.stringify(values),
        });
        const data = await response.json();
        return { data, error: response.ok ? null : data };
      },
      update: async (values: any) => ({
        eq: async (column: string, value: any) => {
          const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${column}=eq.${value}`, {
            method: 'PATCH',
            headers: {
              'apikey': SUPABASE_ANON_KEY,
              'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
              'Content-Type': 'application/json',
              'Prefer': 'return=representation',
            },
            body: JSON.stringify(values),
          });
          const data = await response.json();
          return { data, error: response.ok ? null : data };
        }
      }),
      delete: () => ({
        eq: async (column: string, value: any) => {
          const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${column}=eq.${value}`, {
            method: 'DELETE',
            headers: {
              'apikey': SUPABASE_ANON_KEY,
              'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            },
          });
          return { error: response.ok ? null : await response.json() };
        }
      })
    })
  };
};

export const useBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [sendingNotifications, setSendingNotifications] = useState(false);
  const userId = getUserId();
  const supabase = createSupabaseClient();
  const { getSubscribedUsers } = useUser();
  const emailService = EmailService.getInstance();

  // Load posts and comments
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    
    if (supabase) {
      // Load from Supabase
      try {
        const [postsResult, commentsResult] = await Promise.all([
          supabase.from('blog_posts').select('*'),
          supabase.from('blog_comments').select('*')
        ]);

        if (!postsResult.error && postsResult.data) {
          const formattedPosts = postsResult.data.map((post: any) => ({
            ...post,
            timestamp: new Date(post.created_at),
            likedBy: post.liked_by || []
          }));
          setPosts(formattedPosts);
        }

        if (!commentsResult.error && commentsResult.data) {
          const formattedComments = commentsResult.data.map((comment: any) => ({
            ...comment,
            postId: comment.post_id,
            timestamp: new Date(comment.created_at),
            likedBy: comment.liked_by || []
          }));
          setComments(formattedComments);
        }
      } catch (error) {
        console.error('Error loading from Supabase:', error);
        loadFromLocalStorage();
      }
    } else {
      // Fallback to localStorage
      loadFromLocalStorage();
    }
    
    setLoading(false);
  };

  const loadFromLocalStorage = () => {
    try {
      const savedPosts = localStorage.getItem(STORAGE_KEY);
      const savedComments = localStorage.getItem(COMMENTS_STORAGE_KEY);
      
      if (savedPosts) {
        const parsedPosts = JSON.parse(savedPosts).map((post: any) => ({
          ...post,
          timestamp: new Date(post.timestamp)
        }));
        setPosts(parsedPosts);
      }
      
      if (savedComments) {
        const parsedComments = JSON.parse(savedComments).map((comment: any) => ({
          ...comment,
          timestamp: new Date(comment.timestamp)
        }));
        setComments(parsedComments);
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  };

  // Save to localStorage as backup
  const saveToLocalStorage = (newPosts: BlogPost[], newComments: BlogComment[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPosts));
    localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(newComments));
  };

  // Create a new post
  const createPost = async (author: string, title: string, content: string, tags: string[] = [], mood?: BlogPost['mood']) => {
    const newPost: BlogPost = {
      id: uuidv4(),
      author: author.trim() || 'Anonymous',
      title: title.trim(),
      content: content.trim(),
      timestamp: new Date(),
      likes: 0,
      likedBy: [],
      tags,
      mood
    };

    // Send email notifications to subscribed users
    const subscribedUsers = getSubscribedUsers();
    if (subscribedUsers.length > 0) {
      setSendingNotifications(true);
      try {
        const results = await emailService.sendNewPostNotification(
          subscribedUsers,
          newPost,
          window.location.origin
        );
        
        console.log(`📧 Notification results: ${results.success} sent, ${results.failed} failed`);
        if (results.errors.length > 0) {
          console.error('Email errors:', results.errors);
        }
      } catch (error) {
        console.error('Error sending notifications:', error);
      } finally {
        setSendingNotifications(false);
      }
    }
    if (supabase) {
      try {
        const { error } = await supabase.from('blog_posts').insert({
          id: newPost.id,
          author: newPost.author,
          title: newPost.title,
          content: newPost.content,
          mood: newPost.mood,
          tags: newPost.tags,
          likes: 0,
          liked_by: []
        });

        if (!error) {
          const updatedPosts = [newPost, ...posts];
          setPosts(updatedPosts);
          saveToLocalStorage(updatedPosts, comments);
          return newPost;
        }
      } catch (error) {
        console.error('Error creating post in Supabase:', error);
      }
    }

    // Fallback to localStorage
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    saveToLocalStorage(updatedPosts, comments);
    return newPost;
  };

  // Like/unlike a post
  const togglePostLike = async (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const hasLiked = post.likedBy.includes(userId);
    const newLikes = hasLiked ? post.likes - 1 : post.likes + 1;
    const newLikedBy = hasLiked 
      ? post.likedBy.filter(id => id !== userId)
      : [...post.likedBy, userId];

    if (supabase) {
      try {
        const { error } = await supabase.from('blog_posts').update({
          likes: newLikes,
          liked_by: newLikedBy
        }).eq('id', postId);

        if (!error) {
          const updatedPosts = posts.map(p => 
            p.id === postId 
              ? { ...p, likes: newLikes, likedBy: newLikedBy }
              : p
          );
          setPosts(updatedPosts);
          saveToLocalStorage(updatedPosts, comments);
          return;
        }
      } catch (error) {
        console.error('Error updating post like in Supabase:', error);
      }
    }

    // Fallback to localStorage
    const updatedPosts = posts.map(p => 
      p.id === postId 
        ? { ...p, likes: newLikes, likedBy: newLikedBy }
        : p
    );
    setPosts(updatedPosts);
    saveToLocalStorage(updatedPosts, comments);
  };

  // Add a comment to a post
  const addComment = async (postId: string, author: string, content: string) => {
    const newComment: BlogComment = {
      id: uuidv4(),
      postId,
      author: author.trim() || 'Anonymous',
      content: content.trim(),
      timestamp: new Date(),
      likes: 0,
      likedBy: []
    };

    if (supabase) {
      try {
        const { error } = await supabase.from('blog_comments').insert({
          id: newComment.id,
          post_id: postId,
          author: newComment.author,
          content: newComment.content,
          likes: 0,
          liked_by: []
        });

        if (!error) {
          const updatedComments = [...comments, newComment];
          setComments(updatedComments);
          saveToLocalStorage(posts, updatedComments);
          return newComment;
        }
      } catch (error) {
        console.error('Error creating comment in Supabase:', error);
      }
    }

    // Fallback to localStorage
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    saveToLocalStorage(posts, updatedComments);
    return newComment;
  };

  // Like/unlike a comment
  const toggleCommentLike = async (commentId: string) => {
    const comment = comments.find(c => c.id === commentId);
    if (!comment) return;

    const hasLiked = comment.likedBy.includes(userId);
    const newLikes = hasLiked ? comment.likes - 1 : comment.likes + 1;
    const newLikedBy = hasLiked 
      ? comment.likedBy.filter(id => id !== userId)
      : [...comment.likedBy, userId];

    if (supabase) {
      try {
        const { error } = await supabase.from('blog_comments').update({
          likes: newLikes,
          liked_by: newLikedBy
        }).eq('id', commentId);

        if (!error) {
          const updatedComments = comments.map(c => 
            c.id === commentId 
              ? { ...c, likes: newLikes, likedBy: newLikedBy }
              : c
          );
          setComments(updatedComments);
          saveToLocalStorage(posts, updatedComments);
          return;
        }
      } catch (error) {
        console.error('Error updating comment like in Supabase:', error);
      }
    }

    // Fallback to localStorage
    const updatedComments = comments.map(c => 
      c.id === commentId 
        ? { ...c, likes: newLikes, likedBy: newLikedBy }
        : c
    );
    setComments(updatedComments);
    saveToLocalStorage(posts, updatedComments);
  };

  // Get comments for a specific post
  const getPostComments = (postId: string) => {
    return comments
      .filter(comment => comment.postId === postId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  };

  // Delete a post
  const deletePost = async (postId: string) => {
    if (supabase) {
      try {
        const { error } = await supabase.from('blog_posts').delete().eq('id', postId);
        
        if (!error) {
          const updatedPosts = posts.filter(post => post.id !== postId);
          const updatedComments = comments.filter(comment => comment.postId !== postId);
          setPosts(updatedPosts);
          setComments(updatedComments);
          saveToLocalStorage(updatedPosts, updatedComments);
          return;
        }
      } catch (error) {
        console.error('Error deleting post from Supabase:', error);
      }
    }

    // Fallback to localStorage
    const updatedPosts = posts.filter(post => post.id !== postId);
    const updatedComments = comments.filter(comment => comment.postId !== postId);
    setPosts(updatedPosts);
    setComments(updatedComments);
    saveToLocalStorage(updatedPosts, updatedComments);
  };

  return {
    posts: posts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()),
    comments,
    loading,
    sendingNotifications,
    userId,
    createPost,
    togglePostLike,
    addComment,
    toggleCommentLike,
    getPostComments,
    deletePost,
    isUsingSupabase: !!supabase
  };
};