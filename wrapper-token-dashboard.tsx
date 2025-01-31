import React, { useState } from 'react';
import { LineChart, BarChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { AlertCircle, ArrowUpRight, ArrowDownRight, Percent, BarChart2, Wallet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Sample data - replace with actual API calls
const sampleData = {
  priceHistory: [
    { date: '2024-01-01', value: 100 },
    { date: '2024-01-02', value: 105 },
    { date: '2024-01-03', value: 103 },
    { date: '2024-01-04', value: 107 },
    { date: '2024-01-05', value: 109 }
  ],
  distribution: [
    { asset: 'USDT', percentage: 40 },
    { asset: 'USDC', percentage: 35 },
    { asset: 'DAI', percentage: 25 }
  ]
};

export default function WrapperTokenDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [slippageAlert, setSlippageAlert] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Wrapper Token Dashboard</h1>
        <p className="text-gray-600">Manage and monitor your wrapped token portfolio</p>
      </div>

      {/* Alert */}
      {slippageAlert && (
        <Alert className="mb-6 bg-yellow-50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            High market volatility detected. Consider adjusting slippage tolerance.
            <button 
              onClick={() => setSlippageAlert(false)}
              className="ml-4 text-sm underline"
            >
              Dismiss
            </button>
          </AlertDescription>
        </Alert>
      )}

      {/* Navigation */}
      <div className="mb-6 flex space-x-4">
        {['overview', 'mint', 'burn', 'analytics'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === tab
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Token Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Token Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Wallet className="h-4 w-4 text-gray-500" />
                  <span>Total Supply</span>
                </div>
                <span className="font-semibold">1,234,567</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <BarChart2 className="h-4 w-4 text-gray-500" />
                  <span>Current Price</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">$1.05</span>
                  <span className="text-green-500 flex items-center">
                    <ArrowUpRight className="h-4 w-4" />
                    2.3%
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Percent className="h-4 w-4 text-gray-500" />
                  <span>Current Slippage</span>
                </div>
                <span className="font-semibold text-yellow-500">0.45%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Price Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Price History</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart width={600} height={200} data={sampleData.priceHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#2563eb" />
            </LineChart>
          </CardContent>
        </Card>

        {/* Asset Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Asset Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart width={300} height={200} data={sampleData.distribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="asset" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="percentage" fill="#2563eb" />
            </BarChart>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: 'Mint', amount: '1000', time: '5 mins ago' },
                { type: 'Burn', amount: '500', time: '1 hour ago' },
                { type: 'Transfer', amount: '200', time: '2 hours ago' }
              ].map((activity, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'Mint' ? 'bg-green-500' :
                      activity.type === 'Burn' ? 'bg-red-500' : 'bg-blue-500'
                    }`} />
                    <span>{activity.type}</span>
                    <span className="font-medium">{activity.amount} tokens</span>
                  </div>
                  <span className="text-gray-500 text-sm">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
