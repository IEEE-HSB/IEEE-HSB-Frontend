import React from 'react';
import { CheckCircle, XCircle, Clock, Eye } from 'lucide-react';
// import { Registeration } from '../../types/registerations';
import { UserType } from '@/types/user';

interface RegisterationTableProps {
  users: UserType[];
  onApprove?: (id: string, status: string) => void;
  onReject?: (id: string, status: string) => void;
  showActions?: boolean;
}

export function RegisterationTable({
  users,
  onApprove,
  onReject,
  showActions = false,
}: RegisterationTableProps) {
  const getStatusBadge = (status: UserType['status']) => {
    switch (status) {
      case 'approved':
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-xs">
            <CheckCircle className="w-3 h-3" />
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-xs">
            <XCircle className="w-3 h-3" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-yellow-200 text-yellow-700 rounded-full text-xs">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
    }
  };

  return (
    <div className="glass rounded-2xl overflow-hidden card-shadow">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-ieee-blue-100 text-gray-400 text-center text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">
                Name
              </th>
              <th className="">
                Chapter
              </th>
              <th className="">
                Committee
              </th>
              <th className="">
                Role
              </th>

              <th className="">
                Status
              </th>
              {showActions && (
                <th className="">
                  Actions
                </th>
              )}
              <th className="">
                Registered At
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {users.filter(item => item.status === 'pending')
              .map(users => (
                <tr
                  key={users._id}
                  className="text-lg text-white text-center transition-colors bg-ieee-blue-80"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="">
                      {users.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="">
                      {users.chapterId}
                    </div>

                  </td>
                  <td>
                    <div className="">
                      {users.committee}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1">
                      {users.role}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(users.status)}</td>

                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2 w-fit mx-auto">
                          <button
                            onClick={() => onApprove?.(users._id,'active')}
                            className="p-2 cursor-pointer bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-all"
                            title="Approve"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onReject?.(users._id, 'rejected')}
                            className="p-2 cursor-pointer bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-all"
                            title="Reject"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                    </td>
               
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(users.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && (
        <div className="p-12 text-center">
          <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400">No registerations yet</p>
        </div>
      )}
    </div>
  );
}
