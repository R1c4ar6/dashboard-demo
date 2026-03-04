'use client';

import { useState } from 'react';
import { User } from '@/types';

interface UsersTableProps {
  users: User[];
  onUserClick: (user: User) => void;
}

export function UsersTable({ users, onUserClick }: UsersTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const departments = Array.from(new Set(users.map(user => user.company.department)));

  const filteredUsers = users.filter(user => {
    const matchesSearch = `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || user.company.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="sm:w-48">
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Age
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Gender
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Email
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                onClick={() => onUserClick(user)}
                className="hover:bg-muted/50 cursor-pointer transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.image}
                        alt={`${user.firstName} ${user.lastName}`}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-foreground">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        @{user.username}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {user.age}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.gender === 'male' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-pink-100 text-pink-800'
                  }`}>
                    {user.gender}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {user.company.department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                  {user.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No users found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
