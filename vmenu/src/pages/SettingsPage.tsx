import React from 'react';

const SettingsPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
      <p className="text-gray-600 dark:text-gray-400 mt-1">
        Configure your organization and system preferences.
      </p>
    </div>
  );
};

export default SettingsPage;