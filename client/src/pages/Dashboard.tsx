import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Clock, Users, Activity } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const recentActivity = [
    { id: 1, type: 'login', date: new Date().toISOString() },
    { id: 2, type: 'profile_update', date: '2024-02-20T10:30:00Z' },
    { id: 3, type: 'friend_request', date: '2024-02-19T15:45:00Z' },
  ];

  return (
    <div className="space-y-6">
      <header className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 transition-colors duration-200">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back, {user?.name}!</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Last login: {new Date(user?.lastLogin || '').toLocaleString()}
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg transition-colors duration-200">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-6 w-6 text-gray-400 dark:text-gray-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Session Time</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">2 hours 15 minutes</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg transition-colors duration-200">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-gray-400 dark:text-gray-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Friends Online</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">5 active now</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg transition-colors duration-200">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Activity className="h-6 w-6 text-gray-400 dark:text-gray-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Activity Status</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">All systems normal</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg transition-colors duration-200">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Activity</h2>
          <div className="mt-6 flow-root">
            <ul className="-my-5 divide-y divide-gray-200 dark:divide-gray-700">
              {recentActivity.map((activity) => (
                <li key={activity.id} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Activity className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {activity.type === 'login' && 'Logged in successfully'}
                        {activity.type === 'profile_update' && 'Updated profile information'}
                        {activity.type === 'friend_request' && 'Received a friend request'}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(activity.date).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;