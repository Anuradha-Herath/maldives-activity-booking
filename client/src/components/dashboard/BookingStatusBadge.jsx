import React from 'react';

const BookingStatusBadge = ({ status }) => {
  const getBadgeStyles = () => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'confirmed':
        return <i className="fas fa-check-circle mr-1.5"></i>;
      case 'pending':
        return <i className="fas fa-clock mr-1.5"></i>;
      case 'cancelled':
        return <i className="fas fa-times-circle mr-1.5"></i>;
      case 'completed':
        return <i className="fas fa-flag-checkered mr-1.5"></i>;
      default:
        return <i className="fas fa-info-circle mr-1.5"></i>;
    }
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getBadgeStyles()}`}>
      {getStatusIcon()}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default BookingStatusBadge;
