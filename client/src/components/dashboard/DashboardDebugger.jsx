import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

/**
 * DashboardDebugger component
 * A hidden component that can be shown to help debug dashboard issues in production
 * 
 * Usage:
 * 1. Import this component into any dashboard pages
 * 2. Add it at the bottom of the component
 * 3. Press Alt+D to toggle its visibility
 */
const DashboardDebugger = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [logs, setLogs] = useState([]);
  const [apiStatus, setApiStatus] = useState('unknown');
  const [tokenStatus, setTokenStatus] = useState('unknown');
  const { currentUser } = useAuth();

  useEffect(() => {
    // Listen for Alt+D key combination to toggle visibility
    const handleKeyDown = (e) => {
      if (e.altKey && e.key === 'd') {
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isVisible) {
      checkApiConnection();
      checkToken();
      addLog('Debugger activated');
    }
  }, [isVisible]);

  const addLog = (message) => {
    setLogs(prev => [...prev, { time: new Date().toISOString(), message }]);
  };

  const checkApiConnection = async () => {
    try {
      addLog('Checking API connection...');
      const apiUrl = import.meta.env.VITE_API_URL || 'https://maldives-activity-booking-backend.onrender.com/api/v1';
      const startTime = performance.now();
      const response = await fetch(`${apiUrl}/health`);
      const endTime = performance.now();

      if (response.ok) {
        setApiStatus(`Connected (${Math.round(endTime - startTime)}ms)`);
        addLog(`API connection successful in ${Math.round(endTime - startTime)}ms`);
      } else {
        setApiStatus(`Error: ${response.status}`);
        addLog(`API connection failed with status: ${response.status}`);
      }
    } catch (error) {
      setApiStatus(`Failed: ${error.message}`);
      addLog(`API connection error: ${error.message}`);
    }
  };

  const checkToken = () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setTokenStatus('Missing');
        addLog('Authentication token is missing');
        return;
      }

      // Basic validation - check if it's a JWT (has 3 parts)
      const parts = token.split('.');
      if (parts.length !== 3) {
        setTokenStatus('Invalid format');
        addLog('Token has invalid format (not a JWT)');
        return;
      }

      setTokenStatus('Valid format');
      addLog('Token has valid format');
    } catch (error) {
      setTokenStatus(`Error: ${error.message}`);
      addLog(`Token validation error: ${error.message}`);
    }
  };

  const refreshDashboard = async () => {
    try {
      addLog('Manually refreshing dashboard data...');
      const apiUrl = import.meta.env.VITE_API_URL || 'https://maldives-activity-booking-backend.onrender.com/api/v1';
      const token = localStorage.getItem('token');

      if (!token) {
        addLog('Cannot refresh: No authentication token');
        return;
      }

      const response = await fetch(`${apiUrl}/user/bookings/stats`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        addLog(`Dashboard refresh successful. Total bookings: ${data.data?.totalBookings || 0}`);
      } else {
        addLog(`Dashboard refresh failed: ${response.status}`);
      }
    } catch (error) {
      addLog(`Dashboard refresh error: ${error.message}`);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50 max-h-96 overflow-auto">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-bold">Dashboard Debugger</h3>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-white bg-red-600 px-2 py-1 rounded text-xs"
        >
          Close
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-gray-800 p-3 rounded">
          <div className="text-xs text-gray-400 mb-1">API Status</div>
          <div className={`text-sm ${apiStatus.includes('Connected') ? 'text-green-400' : 'text-red-400'}`}>
            {apiStatus}
          </div>
        </div>

        <div className="bg-gray-800 p-3 rounded">
          <div className="text-xs text-gray-400 mb-1">Token Status</div>
          <div className={`text-sm ${tokenStatus === 'Valid format' ? 'text-green-400' : 'text-red-400'}`}>
            {tokenStatus}
          </div>
        </div>

        <div className="bg-gray-800 p-3 rounded">
          <div className="text-xs text-gray-400 mb-1">User</div>
          <div className="text-sm">
            {currentUser ? `${currentUser.name} (${currentUser.email})` : 'Not logged in'}
          </div>
        </div>
      </div>

      <div className="flex space-x-2 mb-4">
        <button
          onClick={checkApiConnection}
          className="bg-blue-600 text-white text-xs px-3 py-1 rounded"
        >
          Check API
        </button>
        <button
          onClick={checkToken}
          className="bg-blue-600 text-white text-xs px-3 py-1 rounded"
        >
          Check Token
        </button>
        <button
          onClick={refreshDashboard}
          className="bg-green-600 text-white text-xs px-3 py-1 rounded"
        >
          Refresh Dashboard Data
        </button>
      </div>

      <div className="border-t border-gray-700 pt-3">
        <div className="text-xs text-gray-400 mb-1">Debug Logs</div>
        <div className="bg-black text-green-400 p-2 rounded font-mono text-xs h-32 overflow-y-auto">
          {logs.map((log, index) => (
            <div key={index}>
              [{log.time.slice(11, 19)}] {log.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardDebugger;
