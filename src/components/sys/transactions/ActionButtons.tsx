'use client';

import { Download, RefreshCw, Eye } from 'lucide-react';

interface ActionButtonsProps {
  onExport: () => void;
  onRefresh: () => void;
  onViewDetails: () => void;
  isLoading?: boolean;
}

export default function ActionButtons({ 
  onExport, 
  onRefresh, 
  onViewDetails, 
  isLoading = false 
}: ActionButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <button
        onClick={onExport}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
      >
        <Download className="w-4 h-4" />
        Export Data
      </button>

      <button
        onClick={onRefresh}
        disabled={isLoading}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
      >
        <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        {isLoading ? 'Refreshing...' : 'Refresh'}
      </button>

      <button
        onClick={onViewDetails}
        className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
      >
        <Eye className="w-4 h-4" />
        View Details
      </button>
    </div>
  );
}
