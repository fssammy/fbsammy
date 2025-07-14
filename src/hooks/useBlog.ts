import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BlogPost, BlogComment } from '../types/blog';

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

export const useBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = getUserId();

  // Load posts and comments from localStorage
  useEffect(() => {
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
      console.error('Error loading blog data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save posts to localStorage
  const savePosts = (newPosts: BlogPost[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPosts));
    setPosts(newPosts);
  };

  // Save comments to localStorage
  const saveComments = (newComments: BlogComment[]) => {
    localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(newComments));
    setComments(newComments);
  };

  // Create a new post
  const createPost = (author: string, title: string, content: string, tags: string[] = [], mood?: BlogPost['mood']) => {
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

    const updatedPosts = [newPost, ...posts];
    savePosts(updatedPosts);
    return newPost;
  };

  // Like/unlike a post
  const togglePostLike = (postId: string) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const hasLiked = post.likedBy.includes(userId);
        return {
          ...post,
          likes: hasLiked ? post.likes - 1 : post.likes + 1,
          likedBy: hasLiked 
            ? post.likedBy.filter(id => id !== userId)
            : [...post.likedBy, userId]
        };
      }
      return post;
    });
    savePosts(updatedPosts);
  };

  // Add a comment to a post
  const addComment = (postId: string, author: string, content: string) => {
    const newComment: BlogComment = {
      id: uuidv4(),
      postId,
      author: author.trim() || 'Anonymous',
      content: content.trim(),
      timestamp: new Date(),
      likes: 0,
      likedBy: []
    };

    const updatedComments = [...comments, newComment];
    saveComments(updatedComments);
    return newComment;
  };

  // Like/unlike a comment
  const toggleCommentLike = (commentId: string) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        const hasLiked = comment.likedBy.includes(userId);
        return {
          ...comment,
          likes: hasLiked ? comment.likes - 1 : comment.likes + 1,
          likedBy: hasLiked 
            ? comment.likedBy.filter(id => id !== userId)
            : [...comment.likedBy, userId]
        };
      }
      return comment;
    });
    saveComments(updatedComments);
  };

  // Get comments for a specific post
  const getPostComments = (postId: string) => {
    return comments
      .filter(comment => comment.postId === postId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  };

  // Delete a post (only if user created it)
  const deletePost = (postId: string) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    savePosts(updatedPosts);
    
    // Also delete associated comments
    const updatedComments = comments.filter(comment => comment.postId !== postId);
    saveComments(updatedComments);
  };

  return {
    posts: posts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()),
    comments,
    loading,
    userId,
    createPost,
    togglePostLike,
    addComment,
    toggleCommentLike,
    getPostComments,
    deletePost
  };
};