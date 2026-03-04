import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Trash2, Calendar, AlertCircle, BarChart, Users } from 'lucide-react';

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/collections', label: 'Collections', icon: Trash2 },
    { path: '/schedules', label: 'Schedules', icon: Calendar },
    { path: '/disposal', label: 'Disposal Sites', icon: AlertCircle },
    { path: '/reports', label: 'Reports', icon: BarChart },
    { path: '/users', label: 'Users', icon: Users }
  ];

  return (
    <div className="w-64 bg-gray-900 text-white h-screen overflow-y-auto">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Mazuri</h1>
        <p className="text-sm text-gray-400 mt-1">Waste Management</p>
      </div>

      <nav className="mt-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-3 transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white border-l-4 border-blue-400'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default Sidebar;
