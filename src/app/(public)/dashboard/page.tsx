'use client';
import { withRole } from '@/components/protected/withRole'
import { StatCard } from '@/components/dashboard/StatsCard'
import React, { useState } from 'react'
import { Calendar, Users, CheckCircle, Award, TrendingUp } from 'lucide-react';
import { RegisterationTable } from '@/components/dashboard/RegisterationTable';
import { useEvents } from '@/APIsFetches/Events';
import { useUsers } from '@/APIsFetches/Users';
import axios from 'axios';
import { getAuthToken } from '@/lib/getAuthToken';
import toast from 'react-hot-toast';
import { useQueryClient } from "@tanstack/react-query";
export default function Dashboard() {
  const [showMoreRows, setShowMoreRows] = useState(false);
  const { events } = useEvents()
  const { users } = useUsers()
  const token = getAuthToken();
  const queryClient = useQueryClient();
  async function handleUpdateStatus(id: string, status: string) {
    try {
      await axios.patch(`https://api.ieeehsb.com/api/user/${id}/states`,
        { status }
        , {
          headers:
            { Authorization: `Bearer ${token}` },
        }
      );
      queryClient.invalidateQueries({ queryKey: ["users"] });

      toast.success("User verified successfully")
    } catch (error) {
      console.log("Failed to update user status", error);
      toast.error("Failed to update user status");
    }
  }


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
            value={events?.length || 0}
            icon={Calendar}
            color="blue"
          />
          <StatCard
            title="Total Volunteers"
            value={users?.length || 0}
            icon={Users}
            color="indigo"
          />
          <StatCard
            title="Tasks Completed"
            value='0' // {tasks.filter(t => t.status === 'completed').length}
            icon={CheckCircle}
            color="green"
          // trend={{ value: '5% from last month', isPositive: true }}
          />
          <StatCard
            title="Active Quizzes"
            value='0'
            icon={Award}
            color="purple"
          />
        </div>
      </div>


      {/* Recent Submissions */}
      <div>
        <h2 className="text-xl text-gray-900 dark:text-white mb-4">Recent Submissions</h2>
        <RegisterationTable
          users={showMoreRows ? (users || []) : (users || []).slice(0, 3)}
          showActions={true}
          onApprove={handleUpdateStatus}
          onReject={handleUpdateStatus}
        />
      </div>
      <button className='m-6 bg-ieee-blue-100 py-3 px-4 text-lg cursor-pointer text-white rounded-md hover:bg-ieee-blue-80 transition-all'

        onClick={() => toggleShowMore()}
      >
        {showMoreRows ? 'Show Less Rows' : 'Show More Rows'}
      </button>

    </div>
  );
}
