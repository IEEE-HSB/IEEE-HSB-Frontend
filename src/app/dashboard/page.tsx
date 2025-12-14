'use client';
import { withRole } from '@/components/protected/withRole'
import { StatCard } from '@/components/dashboard/StatsCard'
import React, { useState } from 'react'
import { Calendar, Users, CheckCircle, Award, TrendingUp } from 'lucide-react';
import { mockSubmissions } from '@/data/mockData';
import { RegisterationTable } from '@/components/dashboard/RegisterationTable';
 export default function Dashboard() {
  const [showMoreRows, setShowMoreRows] = useState(false);
  function toggleShowMore() {
    setShowMoreRows(prev => !prev);
  }
  return (
    <div className='m-6'>
      <div className="">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Events"
            value='13'
            icon={Calendar}
            color="blue"
            trend={{ value: '12% from last month', isPositive: false }}
          />
          <StatCard
            title="Total Volunteers"
            value='13'
            icon={Users}
            color="indigo"
            trend={{ value: '8% from last month', isPositive: true }}
          />
          <StatCard
            title="Tasks Completed"
            value='13' // {tasks.filter(t => t.status === 'completed').length}
            icon={CheckCircle}
            color="green"
            trend={{ value: '5% from last month', isPositive: true }}
          />
          <StatCard
            title="Active Quizzes"
            value='13'
            icon={Award}
            color="purple"
          />
        </div>
      </div>

     
      {/* Recent Submissions */}
      <div>
        <h2 className="text-xl text-gray-900 dark:text-white mb-4">Recent Submissions</h2>
        <RegisterationTable
          registeration={showMoreRows?mockSubmissions:mockSubmissions.slice(0, 3)}
          showActions={true}
          onApprove={id => console.log('Approve', id)}
          onReject={id => console.log('Reject', id)}
        />
      </div>
      <button className='m-6 bg-ieee-blue-100 py-3 px-4 text-lg cursor-pointer text-white rounded-md hover:bg-ieee-blue-80 transition-all'
  
  onClick={() =>  toggleShowMore()}
>
  {showMoreRows ? 'Show Less Rows' : 'Show More Rows'}
</button>

    </div>
  );
}
