import React, { useState } from 'react';
import { PenTool, Send, Tag, Smile, X } from 'lucide-react';
import { useBlog } from '../hooks/useBlog';
import { BlogPost } from '../types/blog';

interface CreatePostFormProps {
  onClose: () => void;
}

const moodOptions: { value: BlogPost['mood']; label: string; emoji: string; color: string }[] = [
  { value: 'happy', label: 'Happy', emoji: '😊', color: 'from-yellow-400 to-orange-400' },
  { value: 'excited', label: 'Excited', emoji: '🎉', color: 'from-pink-400 to-purple-400' },
  { value: 'grateful', label: 'Grateful', emoji: '🙏', color: 'from-green-400 to-teal-400' },
  { value: 'thoughtful', label: 'Thoughtful', emoji: '🤔', color: 'from-blue-400 to-indigo-400' },
  { value: 'celebratory', label: 'Celebratory', emoji: '🎊', color: 'from-red-400 to-pink-400' },
];

const suggestedTags = [
  'July12th', 'celebration', 'memories', 'friendship', 'gratitude', 
  'excitement', 'countdown', 'special-day', 'thoughts', 'wishes'
];

export const CreatePostForm: React.FC<CreatePostFormProps> = ({ onClose }) => {
  const { createPost } = useBlog();
  const [formData, setFormData] = useState({
    author: '',
    title: '',
    content: '',
    mood: undefined as BlogPost['mood'] | undefined,
    tags: [] as string[]
  });
  const [customTag, setCustomTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;

    setIsSubmitting(true);
    
    try {
      createPost(
        formData.author,
        formData.title,
        formData.content,
        formData.tags,
        formData.mood
      );
      
      // Reset form
      setFormData({
        author: '',
        title: '',
        content: '',
        mood: undefined,
        tags: []
      });
      
      onClose();
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addTag = (tag: string) => {
    const cleanTag = tag.trim().toLowerCase();
    if (cleanTag && !formData.tags.includes(cleanTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, cleanTag]
      }));
    }
    setCustomTag('');
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleCustomTagSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTag(customTag);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-3 rounded-full">
              <PenTool className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Share Your Thoughts</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-200"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Author Name */}
          <div>
            <label className="block text-white font-medium mb-2">Your Name (Optional)</label>
            <input
              type="text"
              placeholder="Anonymous"
              value={formData.author}
              onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            />
          </div>

          {/* Post Title */}
          <div>
            <label className="block text-white font-medium mb-2">Title *</label>
            <input
              type="text"
              placeholder="What's on your mind about July 12th?"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              required
            />
          </div>

          {/* Mood Selection */}
          <div>
            <label className="block text-white font-medium mb-3">How are you feeling?</label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {moodOptions.map((mood) => (
                <button
                  key={mood.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ 
                    ...prev, 
                    mood: prev.mood === mood.value ? undefined : mood.value 
                  }))}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    formData.mood === mood.value
                      ? `border-white bg-gradient-to-r ${mood.color} text-white`
                      : 'border-white/20 bg-white/5 hover:bg-white/10 text-white/80'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">{mood.emoji}</div>
                    <div className="text-xs font-medium">{mood.label}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Post Content */}
          <div>
            <label className="block text-white font-medium mb-2">Your Message *</label>
            <textarea
              placeholder="Share your thoughts, memories, excitement, or anything about July 12th..."
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              rows={6}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none"
              required
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-white font-medium mb-3">Tags (Optional)</label>
            
            {/* Selected Tags */}
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-purple-500/20 text-purple-200 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2"
                  >
                    <Tag className="w-3 h-3" />
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-purple-300 hover:text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Suggested Tags */}
            <div className="mb-3">
              <p className="text-white/60 text-sm mb-2">Suggested tags:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => addTag(tag)}
                    disabled={formData.tags.includes(tag)}
                    className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                      formData.tags.includes(tag)
                        ? 'bg-purple-500/20 text-purple-300 cursor-not-allowed'
                        : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Tag Input */}
            <form onSubmit={handleCustomTagSubmit} className="flex space-x-2">
              <input
                type="text"
                placeholder="Add custom tag..."
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-sm"
              />
              <button
                type="submit"
                disabled={!customTag.trim()}
                className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add
              </button>
            </form>
          </div>

          {/* Submit Button */}
          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !formData.title.trim() || !formData.content.trim()}
              className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
              <span>{isSubmitting ? 'Publishing...' : 'Publish Post'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};