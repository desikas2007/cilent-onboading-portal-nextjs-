'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Search } from 'lucide-react';
import { TopBar } from '@/components/layout/TopBar';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/Badge';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { mockClients, mockDashboardStats } from '@/lib/mockData';
import { formatDate } from '@/lib/utils';

export default function DashboardPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // Check auth
  React.useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [router]);

  const filteredClients = mockClients.filter(
    (client) =>
      client.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.panNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    { label: 'ONBOARDING COMPLETED', value: mockDashboardStats.onboardingCompleted },
    { label: 'ONBOARDING IN PROGRESS', value: mockDashboardStats.onboardingInProgress },
    { label: 'DATA PENDING WITH CLIENT', value: mockDashboardStats.dataPendingWithClient },
    { label: 'DRAFT PREPARATION (WIP)', value: mockDashboardStats.draftPreparationWIP },
    { label: 'DRAFT SUBMITTED', value: mockDashboardStats.draftSubmitted },
    { label: 'PROCEED TO FILE', value: mockDashboardStats.proceedToFile },
    { label: 'FILING IN PROGRESS', value: mockDashboardStats.filingInProgress },
    { label: 'FILING COMPLETED', value: mockDashboardStats.filingCompleted },
    { label: 'SOFT COPY SENT', value: mockDashboardStats.softCopySent },
    { label: 'SIGNED COPY SENT', value: mockDashboardStats.signedCopySent },
    { label: 'PHYSICAL COPY SENT', value: mockDashboardStats.physicalCopySent },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Bar */}
      <TopBar title="Client Onboarding Portal" />

      {/* Main Content */}
      <div className="p-6 max-w-7xl mx-auto">
        {/* Stats Grid */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Dashboard Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {stats.map((stat, index) => (
              <StatsCard key={index} label={stat.label} value={String(stat.value).padStart(5, '0')} />
            ))}
          </div>
        </div>

        {/* Action & Search Bar */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              <Button onClick={() => router.push('/onboarding/client-detail')} className="gap-2">
                <Plus className="w-5 h-5" />
                Start client onboarding
              </Button>

              <div className="w-full md:w-96">
                <Input
                  type="text"
                  placeholder="Search client by Name or PAN..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-slate-900">Client Name</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-900">PAN Number</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-900">DOB</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-900">AY</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-900">Status</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-900">Remarks</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-900">Onboard Date</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-900">Updated Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredClients.map((client, index) => (
                    <tr key={client.id} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="px-4 py-3 text-slate-900 font-medium">{client.clientName}</td>
                      <td className="px-4 py-3 text-slate-600">{client.panNumber}</td>
                      <td className="px-4 py-3 text-slate-600">{client.dob}</td>
                      <td className="px-4 py-3 text-slate-600">{client.assessmentYear}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={client.status} />
                      </td>
                      <td className="px-4 py-3 text-slate-600">{client.remarks || '—'}</td>
                      <td className="px-4 py-3 text-slate-600">{client.onboardDate}</td>
                      <td className="px-4 py-3 text-slate-600">{client.updatedDate || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
