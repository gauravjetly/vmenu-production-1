import React from 'react';
import { 
  TrendingUp, 
  Monitor, 
  Utensils, 
  ShoppingBag, 
  Users,
  Activity,
  DollarSign,
  Clock
} from 'lucide-react';

const DashboardPage: React.FC = () => {
  // Mock data - replace with real data from Firebase
  const stats = [
    { label: 'Active Menus', value: '4', icon: Utensils, change: '+2', trend: 'up' },
    { label: 'Menu Items', value: '127', icon: ShoppingBag, change: '+15', trend: 'up' },
    { label: 'TV Displays', value: '8', icon: Monitor, change: '0', trend: 'neutral' },
    { label: 'Online TVs', value: '7/8', icon: Activity, change: '-1', trend: 'down' },
  ];

  const recentActivity = [
    { id: 1, action: 'Menu updated', detail: 'Lunch Menu - Added 3 new items', time: '2 hours ago', user: 'John Doe' },
    { id: 2, action: 'Price changed', detail: 'Caesar Salad - $12.99 to $13.99', time: '4 hours ago', user: 'Jane Smith' },
    { id: 3, action: 'TV offline', detail: 'Bar Display - Connection lost', time: '6 hours ago', user: 'System' },
    { id: 4, action: 'New item added', detail: 'Grilled Salmon Special', time: '1 day ago', user: 'John Doe' },
  ];

  const popularItems = [
    { id: 1, name: 'Margherita Pizza', views: 245, percentage: 85 },
    { id: 2, name: 'Caesar Salad', views: 189, percentage: 65 },
    { id: 3, name: 'Chicken Wings', views: 156, percentage: 54 },
    { id: 4, name: 'Chocolate Brownie', views: 134, percentage: 46 },
    { id: 5, name: 'Craft Beer Selection', views: 98, percentage: 34 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Welcome back! Here's what's happening with your digital menus.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {stat.value}
                </p>
                <p className={`text-sm mt-2 flex items-center ${
                  stat.trend === 'up' ? 'text-green-600' : 
                  stat.trend === 'down' ? 'text-red-600' : 
                  'text-gray-600'
                }`}>
                  {stat.change} from last week
                </p>
              </div>
              <div className={`p-3 rounded-lg ${
                stat.trend === 'up' ? 'bg-green-100 dark:bg-green-900' : 
                stat.trend === 'down' ? 'bg-red-100 dark:bg-red-900' : 
                'bg-gray-100 dark:bg-gray-700'
              }`}>
                <stat.icon className={`w-6 h-6 ${
                  stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 
                  stat.trend === 'down' ? 'text-red-600 dark:text-red-400' : 
                  'text-gray-600 dark:text-gray-400'
                }`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Activity
            </h2>
            <button className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400">
              View all
            </button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 mt-2 bg-primary-600 rounded-full"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {activity.detail}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {activity.time} by {activity.user}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Menu Items */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Popular Menu Items
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Last 7 days
            </span>
          </div>
          <div className="space-y-4">
            {popularItems.map((item) => (
              <div key={item.id}>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.views} views
                  </p>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-center">
            <Utensils className="w-6 h-6 mx-auto mb-2 text-primary-600 dark:text-primary-400" />
            <p className="text-sm font-medium text-gray-900 dark:text-white">Create Menu</p>
          </button>
          <button className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-center">
            <ShoppingBag className="w-6 h-6 mx-auto mb-2 text-primary-600 dark:text-primary-400" />
            <p className="text-sm font-medium text-gray-900 dark:text-white">Add Item</p>
          </button>
          <button className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-center">
            <Monitor className="w-6 h-6 mx-auto mb-2 text-primary-600 dark:text-primary-400" />
            <p className="text-sm font-medium text-gray-900 dark:text-white">Setup TV</p>
          </button>
          <button className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-center">
            <Clock className="w-6 h-6 mx-auto mb-2 text-primary-600 dark:text-primary-400" />
            <p className="text-sm font-medium text-gray-900 dark:text-white">Schedule</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;