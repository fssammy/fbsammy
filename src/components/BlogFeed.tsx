import React, { useState } from 'react';
import { PenTool, Search, Filter, Users, MessageSquare, Heart, Calendar } from 'lucide-react';
import { useBlog } from '../hooks/useBlog';
import { BlogPost } from './BlogPost';
import { CreatePostForm } from './CreatePostForm';

export const BlogFeed: React.FC = () => {
  const { posts, loading } = useBlog();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMood, setSelectedMood] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'popular'>('newest');

  // Filter and sort posts
  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesMood = selectedMood === 'all' || post.mood === selectedMood;
    
    return matchesSearch && matchesMood;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === 'popular') {
      return b.likes - a.likes;
    }
    return b.timestamp.getTime() - a.timestamp.getTime();
  });

  const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0);
  const totalPosts = posts.length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/70">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Blog Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <MessageSquare className="w-8 h-8 md:w-12 md:h-12 text-purple-300 mr-4" />
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white">
            July 12<sup className="text-2xl md:text-3xl">th</sup> Blog
          </h1>
        </div>
        <p className="text-purple-200 text-lg md:text-xl lg:text-2xl font-light mb-4">
          Share your thoughts and connect with others
        </p>
        
        {/* Stats */}
        <div className="flex items-center justify-center space-x-6 text-purple-300">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span className="text-sm md:text-base">{totalPosts} posts</span>
          </div>
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5" />
            <span className="text-sm md:text-base">{totalLikes} likes</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span className="text-sm md:text-base">Community Blog</span>
          </div>
        </div>
      </div>

      {/* Create Post Button */}
      <div className="text-center mb-8">
        <button
          onClick={() => setShowCreateForm(true)}
          className="group relative overflow-hidden bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 hover:scale-105"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center space-x-2">
            <PenTool className="w-5 h-5" />
            <span>Share Your Thoughts</span>
            <MessageSquare className="w-5 h-5" />
          </div>
        </button>
        <p className="text-purple-200/60 text-sm mt-3">
          What's on your mind about July 12th?
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl mb-8">
        <div className="grid md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            />
          </div>

          {/* Mood Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
            <select
              value={selectedMood}
              onChange={(e) => setSelectedMood(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent appearance-none"
            >
              <option value="all">All Moods</option>
              <option value="happy">😊 Happy</option>
              <option value="excited">🎉 Excited</option>
              <option value="grateful">🙏 Grateful</option>
              <option value="thoughtful">🤔 Thoughtful</option>
              <option value="celebratory">🎊 Celebratory</option>
            </select>
          </div>

          {/* Sort */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'popular')}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent appearance-none"
            >
              <option value="newest">Newest First</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {sortedPosts.length > 0 ? (
          sortedPosts.map((post) => (
            <BlogPost key={post.id} post={post} />
          ))
        ) : (
          <div className="text-center py-12">
            <MessageSquare className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              {searchTerm || selectedMood !== 'all' ? 'No posts found' : 'No posts yet'}
            </h3>
            <p className="text-white/60 mb-6">
              {searchTerm || selectedMood !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Be the first to share your thoughts about July 12th!'
              }
            </p>
            {(!searchTerm && selectedMood === 'all') && (
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
              >
                Write the First Post
              </button>
            )}
          </div>
        )}
      </div>

      {/* Create Post Modal */}
      {showCreateForm && (
        <CreatePostForm onClose={() => setShowCreateForm(false)} />
      )}
    </div>
  );
};