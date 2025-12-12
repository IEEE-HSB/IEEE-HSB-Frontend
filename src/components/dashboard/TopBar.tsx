
'use client';
import React, { useState } from 'react';
import { Search, Bell, Moon, Sun, ChevronDown, User, LogOut, Settings } from 'lucide-react';
// import { useAuth } from '../contexts/AuthContext';
// import { mockNotifications } from '../data/mockData';



export function TopBar() {
//   const { currentUser } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
//   const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <div className="sticky top-0 z-40 bg-ieee-blue-100">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Page Title */}
        <div>
          <h1 className="text-4xl font-medium text-white ms-9 my-3">Dashboard</h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search */}
         
          {/* Theme Toggle */}
          

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 hover:bg-gray-800 rounded-xl transition-all relative"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-gray-300" />
              {/* {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )} */}
            </button>

            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowNotifications(false)}
                ></div>
                <div className="absolute right-0 mt-2 w-80 glass-strong rounded-2xl card-shadow-lg overflow-hidden z-50 bg-gray-700">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-white">Notifications</h3>
                      {/* {unreadCount > 0 && (
                        <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs rounded-full">
                          {unreadCount} new
                        </span>
                      )} */}
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {/* {mockNotifications.map(notification => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer ${
                          !notification.read ? 'bg-primary-50/50 dark:bg-primary-950/20' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-1">
                            <p className="text-sm text-gray-900 dark:text-white">
                              {notification.title}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                              {new Date(notification.createdAt).toLocaleString()}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                          )}
                        </div>
                      </div>
                    ))} */}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-3 px-3 py-2 hover:bg-gray-800 rounded-xl transition-all"
            >
              <img
                src='/assets/logos/ieeehsb.png' //currentUser.avatar
                // alt={currentUser.name}
                className="w-8 h-8 rounded-full"
              />
              <div className="hidden md:block text-left">
                <p className="text-sm text-white">Menna</p>
                <p className="text-xs text-gray-400 capitalize">
                   Chairman {/* {currentUser.role} */}
                </p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {showProfile && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowProfile(false)}
                ></div>
                <div className="absolute right-0 mt-2 w-64 glass-strong rounded-2xl card-shadow-lg overflow-hidden z-50 bg-gray-700">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm text-white">Menna</p>
                    <p className="text-xs text-gray-400">webmaster.ieee.hsb.2026@gmail.com</p>
                  </div>
                  <div className="py-2 text-gray-300">
                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-3">
                      <User className="w-4 h-4" />
                      Profile
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-3">
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-3">
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
