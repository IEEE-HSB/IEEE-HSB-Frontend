import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color: 'blue' | 'indigo' | 'green' | 'purple' | 'orange';
}

export function StatCard({ title, value, icon: Icon, trend, color= 'blue' }: StatCardProps) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    indigo: 'from-indigo-500 to-indigo-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
  };

  return (
    <div className="z-20 bg-ieee-blue-100 rounded-2xl p-6 card-shadow hover:card-shadow-lg transition-all hover:scale-[1.02]">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-300 dark:text-gray-400">{title}</p>
          <p className="text-3xl mt-2 text-white">{value}</p>
          {trend && (
            <p
              className={`text-sm mt-2 ${trend.isPositive
                  ? 'text-green-400'
                  : 'text-red-400'
                }`}
            >
              {trend.isPositive ? '↑' : '↓'} {trend.value}
            </p>
          )}
        </div>
        <div
          className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center shadow-lg`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}
