import React, { useState, useEffect } from 'react';
import { TrendingUp, Clock, CheckCircle, DollarSign, BarChart3 } from 'lucide-react';
import { analysisAPI } from '../services/api';
import { Analysis } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  user: any;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    totalSpent: 0,
    avgPrice: 0,
  });

  useEffect(() => {
    if (user) {
      loadUserAnalyses();
    }
  }, [user]);

  const loadUserAnalyses = async () => {
    try {
      const response = await analysisAPI.getUserAnalyses(1, 50);
      setAnalyses(response.data.analyses);
      
      // Calculate stats
      const total = response.data.analyses.length;
      const completed = response.data.analyses.filter((a: Analysis) => a.status === 'COMPLETED').length;
      const totalSpent = response.data.analyses.reduce((sum: number, a: Analysis) => 
        a.status === 'COMPLETED' ? sum + a.price : sum, 0
      );
      const avgPrice = completed > 0 ? totalSpent / completed : 0;
      
      setStats({ total, completed, totalSpent, avgPrice });
    } catch (error) {
      console.error('Failed to load analyses:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'PROCESSING':
        return <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>;
      case 'PENDING_PAYMENT':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'PROCESSING':
        return 'bg-blue-100 text-blue-800';
      case 'PENDING_PAYMENT':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Prepare chart data
  const chartData = analyses
    .filter(a => a.status === 'COMPLETED' && a.completedAt)
    .sort((a, b) => new Date(a.completedAt!).getTime() - new Date(b.completedAt!).getTime())
    .map((analysis, index) => ({
      date: new Date(analysis.completedAt!).toLocaleDateString(),
      cumulativeSpent: analyses
        .slice(0, index + 1)
        .reduce((sum, a) => a.status === 'COMPLETED' ? sum + a.price : sum, 0),
      price: analysis.price,
    }));

  if (!user) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Dashboard</h3>
        <p className="text-gray-600">Please login to view your analysis history</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Analyses</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900">${stats.totalSpent.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-orange-100">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg. Price</p>
              <p className="text-2xl font-bold text-gray-900">${stats.avgPrice.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Spending Chart */}
      {chartData.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Spending Over Time</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [`$${value}`, name === 'cumulativeSpent' ? 'Cumulative Spent' : 'Analysis Price']}
                />
                <Line 
                  type="monotone" 
                  dataKey="cumulativeSpent" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Recent Analyses */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Analyses</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {analyses.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No analyses yet. Create your first analysis to get started!
            </div>
          ) : (
            analyses.slice(0, 10).map((analysis) => (
              <div key={analysis.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(analysis.status)}
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        {analysis.type.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {analysis.parameters?.symbol || 'N/A'} • 
                        {new Date(analysis.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(analysis.status)}`}>
                      {analysis.status.replace('_', ' ').toLowerCase()}
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      ${analysis.price}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;