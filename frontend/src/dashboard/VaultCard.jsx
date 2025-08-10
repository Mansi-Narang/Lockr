import React, { useState } from 'react';
import { Eye, EyeOff, Edit3, Trash2, Globe, User, Calendar, MapPin } from 'lucide-react';
import CryptoJS from 'crypto-js';
import { useAuth } from '../context/AuthContext';

const VaultCard = ({ vault, onEdit, onDelete, onView }) => {
  const {user} = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const formatDomainName = (domain) => {
    return domain
      .replace(/^https?:\/\//, '')
      .replace(/\/$/, '')
      .replace('www.', '');
  };
    function decrypt(){
      const bytes = CryptoJS.AES.decrypt(vault.encryptedPassword, user.id);
      return bytes.toString(CryptoJS.enc.Utf8);
    }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDomainInitials = (domain) => {
    const formatted = formatDomainName(domain);
    const parts = formatted.split('.');
    return parts[0].substring(0, 2).toUpperCase();
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(vault._id);
    } finally {
      setIsDeleting(false);
    }

   
  };

  return (
    <div className="group relative bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      
      <div className="flex items-center justify-between p-6 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm shadow-md">
            {getDomainInitials(vault.domainName)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">
              {formatDomainName(vault.domainName)}
            </h3>
            <p className="text-sm text-gray-500 flex items-center">
              <Globe className="w-3 h-3 mr-1" />
              {vault.domainName}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onView(vault)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
            title="View details"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => onEdit(vault)}
            className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors duration-200"
            title="Edit vault"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 disabled:opacity-50"
            title="Delete vault"
          >
            <Trash2 className={`w-4 h-4 ${isDeleting ? 'animate-pulse' : ''}`} />
          </button>
        </div>
      </div>

      
      <div className="px-6 pb-6 space-y-4">
        
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">Username:</span>
          <span className="text-sm font-medium text-gray-900 bg-gray-50 px-2 py-1 rounded">
            {vault.domainUsername}
          </span>
        </div>

      
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
          <span className="text-sm text-gray-600">Password:</span>
          <span className="text-sm font-mono text-gray-900 bg-gray-50 px-2 py-1 rounded flex-1">
            {showPassword ? decrypt() : '••••••••••••'}
          </span>
        </div>

      
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            <span>Created {formatDate(vault.createdAt)}</span>
          </div>
          
          {vault.lastUse && (
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <MapPin className="w-3 h-3" />
              <span>Last used</span>
            </div>
          )}
        </div>
      </div>

    
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

export default VaultCard;