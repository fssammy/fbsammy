import React, { useState } from 'react';
import { Heart, MessageCircle, Calendar, User, Tag, Smile, Trash2, Send } from 'lucide-react';
import { BlogPost as BlogPostType, BlogComment } from '../types/blog';
import { useBlog } from '../hooks/useBlog';

interface BlogPostProps {
  post: BlogPostType;
}

const moodEmojis = {
  happy: '😊',
  excited: '🎉',
  grateful: '🙏',
  thoughtful: '🤔',
  celebratory: '🎊'
};

const moodColors = {
  happy: 'from-yellow-400 to-orange-400',
  excited: 'from-pink-400 to-purple-400',
  grateful: 'from-green-400 to-teal-400',
  thoughtful: 'from-blue-400 to-indigo-400',
  celebratory: 'from-red-400 to-pink-400'
};

export const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  const { togglePostLike, addComment, toggleCommentLike, getPostComments, userId, deletePost } = useBlog();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  const comments = getPostComments(post.id);
  const hasLiked = post.likedBy.includes(userId);
  const canDelete = post.likedBy.includes(userId); // Simple ownership check

  const handleLike = () => {
    togglePostLike(post.id);
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setIsSubmittingComment(true);
    
    try {
      addComment(post.id, commentAuthor, commentText);
      setCommentText('');
      setCommentAuthor('');
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(post.id);
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInHours * 60);
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
      const hours = Math.floor(diffInHours);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffInHours / 24);
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
  };

  return (
    <article className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
      {/* Post Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-2 rounded-full">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">{post.author}</h3>
            <div className="flex items-center space-x-2 text-white/60 text-sm">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(post.timestamp)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {post.mood && (
            <div className={`bg-gradient-to-r ${moodColors[post.mood]} px-2 py-1 rounded-full text-xs font-medium text-white flex items-center space-x-1`}>
              <span>{moodEmojis[post.mood]}</span>
              <span className="capitalize">{post.mood}</span>
            </div>
          )}
          {canDelete && (
            <button
              onClick={handleDelete}
              className="p-1 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-full transition-colors duration-200"
              title="Delete post"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Post Title */}
      <h2 className="text-xl font-bold text-white mb-3">{post.title}</h2>

      {/* Post Content */}
      <div className="text-white/90 leading-relaxed mb-4 whitespace-pre-wrap">
        {post.content}
      </div>

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-white/20 text-white/80 px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1"
            >
              <Tag className="w-3 h-3" />
              <span>{tag}</span>
            </span>
          ))}
        </div>
      )}

      {/* Post Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-200 ${
              hasLiked
                ? 'bg-pink-500/20 text-pink-300 hover:bg-pink-500/30'
                : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`} />
            <span className="text-sm font-medium">{post.likes}</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 px-3 py-2 rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all duration-200"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm font-medium">{comments.length}</span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-6 pt-6 border-t border-white/10">
          {/* Add Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-6">
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Your name (optional)"
                value={commentAuthor}
                onChange={(e) => setCommentAuthor(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              />
              <textarea
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none"
                required
              />
              <button
                type="submit"
                disabled={isSubmittingComment || !commentText.trim()}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmittingComment ? 'Posting...' : 'Post Comment'}</span>
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="bg-gradient-to-r from-blue-400 to-purple-400 p-1 rounded-full">
                      <User className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-white/90 font-medium text-sm">{comment.author}</span>
                    <span className="text-white/50 text-xs">{formatDate(comment.timestamp)}</span>
                  </div>
                  <button
                    onClick={() => toggleCommentLike(comment.id)}
                    className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs transition-all duration-200 ${
                      comment.likedBy.includes(userId)
                        ? 'bg-pink-500/20 text-pink-300'
                        : 'bg-white/10 text-white/60 hover:bg-white/20'
                    }`}
                  >
                    <Heart className={`w-3 h-3 ${comment.likedBy.includes(userId) ? 'fill-current' : ''}`} />
                    <span>{comment.likes}</span>
                  </button>
                </div>
                <p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap">
                  {comment.content}
                </p>
              </div>
            ))}
            
            {comments.length === 0 && (
              <p className="text-white/50 text-center py-4 text-sm">
                No comments yet. Be the first to share your thoughts!
              </p>
            )}
          </div>
        </div>
      )}
    </article>
  );
};