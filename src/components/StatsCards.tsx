'use client';

import { User } from '@/types';

interface StatsCardsProps {
  users: User[];
}

export function StatsCards({ users }: StatsCardsProps) {
  const totalUsers = users.length;
  const averageAge = users.length > 0 
    ? Math.round(users.reduce((sum, user) => sum + user.age, 0) / users.length)
    : 0;
  
  const maleCount = users.filter(user => user.gender === 'male').length;
  const femaleCount = users.filter(user => user.gender === 'female').length;
  const genderRatio = totalUsers > 0 
    ? `${Math.round((maleCount / totalUsers) * 100)}% / ${Math.round((femaleCount / totalUsers) * 100)}%`
    : '0% / 0%';

  const stats = [
    {
      title: 'Total Users',
      value: totalUsers.toLocaleString(),
      description: 'Registered users',
    },
    {
      title: 'Average Age',
      value: averageAge.toString(),
      description: 'Years old',
    },
    {
      title: 'Gender Ratio',
      value: genderRatio,
      description: 'Male / Female',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
              <p className="text-2xl font-bold text-foreground mt-2">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <div className="w-6 h-6 bg-primary rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
