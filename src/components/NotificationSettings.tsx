import React, { useState } from 'react';
import { Bell, BellOff, Mail, Settings, Users, Check, X } from 'lucide-react';
import { useUser } from '../hooks/useUser';

interface NotificationSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({ isOpen, onClose }) => {
  const { currentUser, updateSubscription, getSubscribedUsers, clearUserSession } = useUser();
  const [isUpdating, setIsUpdating] = useState(false);

  if (!isOpen || !currentUser) return null;

  const subscribedUsers = getSubscribedUsers();

  const handleToggleSubscription = async () => {
    setIsUpdating(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
    updateSubscription(!currentUser.isSubscribed);
    setIsUpdating(false);
  };

  const handleChangeAccount = () => {
    if (window.confirm('Are you sure you want to change your account? This will log you out.')) {
      clearUserSession();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-400 to-purple-400 p-3 rounded-full">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Notification Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-200"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* User Info */}
        <div className="bg-white/5 rounded-lg p-4 border border-white/10 mb-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className="bg-gradient-to-r from-green-400 to-teal-400 p-2 rounded-full">
              <Users className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-white font-medium">{currentUser.name}</h3>
              <p className="text-white/60 text-sm">{currentUser.email}</p>
            </div>
          </div>
          <div className="text-white/50 text-xs">
            Member since {currentUser.createdAt.toLocaleDateString()}
          </div>
        </div>

        {/* Notification Toggle */}
        <div className="bg-white/5 rounded-lg p-4 border border-white/10 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-full transition-all duration-200 ${
                currentUser.isSubscribed
                  ? 'bg-green-500/20 text-green-300'
                  : 'bg-gray-500/20 text-gray-400'
              }`}>
                {currentUser.isSubscribed ? (
                  <Bell className="w-5 h-5" />
                ) : (
                  <BellOff className="w-5 h-5" />
                )}
              </div>
              <div>
                <h4 className="text-white font-medium">Email Notifications</h4>
                <p className="text-white/60 text-sm">
                  Get notified when someone posts
                </p>
              </div>
            </div>
            <button
              onClick={handleToggleSubscription}
              disabled={isUpdating}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                currentUser.isSubscribed ? 'bg-green-500' : 'bg-gray-600'
              } ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  currentUser.isSubscribed ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Community Stats */}
        <div className="bg-white/5 rounded-lg p-4 border border-white/10 mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <Mail className="w-4 h-4 text-purple-300" />
            <h4 className="text-white font-medium">Community</h4>
          </div>
          <div className="text-white/70 text-sm">
            <p>{subscribedUsers.length + (currentUser.isSubscribed ? 1 : 0)} members subscribed to notifications</p>
            {currentUser.isSubscribed && (
              <p className="text-green-300 mt-1 flex items-center space-x-1">
                <Check className="w-3 h-3" />
                <span>You'll be notified of new posts</span>
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={handleChangeAccount}
            className="w-full px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all duration-200 border border-white/20"
          >
            Change Account
          </button>
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-medium transition-all duration-200"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};