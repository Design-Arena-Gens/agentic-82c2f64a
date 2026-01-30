'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BusinessProfile, AnalyticsData, PerformanceMetrics } from '@/types'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { TrendingUp, Users, Heart, MessageCircle, Target, ArrowUp, ArrowDown, AlertCircle } from 'lucide-react'

interface Props {
  businessProfile: BusinessProfile
}

export default function AnalyticsView({ businessProfile }: Props) {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([])
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)

  useEffect(() => {
    // Generate mock analytics data
    const mockData: AnalyticsData[] = []
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 30)

    for (let i = 0; i < 30; i++) {
      const date = new Date(startDate)
      date.setDate(date.getDate() + i)

      mockData.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        reach: Math.floor(1000 + Math.random() * 2000 + i * 50),
        engagement: Math.floor(50 + Math.random() * 100 + i * 3),
        followers: Math.floor(500 + i * 15 + Math.random() * 20),
        leads: Math.floor(5 + Math.random() * 10 + i * 0.5)
      })
    }

    setAnalyticsData(mockData)

    // Generate performance metrics
    const lastWeek = mockData.slice(-7)
    const previousWeek = mockData.slice(-14, -7)

    const avgReach = lastWeek.reduce((sum, d) => sum + d.reach, 0) / 7
    const avgEngagement = lastWeek.reduce((sum, d) => sum + d.engagement, 0) / 7
    const totalFollowers = mockData[mockData.length - 1].followers
    const totalLeads = lastWeek.reduce((sum, d) => sum + d.leads, 0)

    const prevAvgReach = previousWeek.reduce((sum, d) => sum + d.reach, 0) / 7
    const reachGrowth = ((avgReach - prevAvgReach) / prevAvgReach * 100).toFixed(1)

    setMetrics({
      reach: Math.floor(avgReach),
      engagement: Math.floor(avgEngagement),
      followers: totalFollowers,
      leads: totalLeads,
      conversionRate: 3.2,
      topPerformingContent: [
        'How-to tutorial reel (+245% engagement)',
        'Behind-the-scenes carousel (+189% reach)',
        'Customer testimonial story (+156% engagement)'
      ],
      recommendations: [
        `Your ${businessProfile.pricePositioning} positioning content performs 40% better - create more!`,
        'Reels posted at 6-8 PM get 2.5x more reach',
        'Educational content drives 3x more saves than promotional',
        'Add more trending audio to boost discoverability',
        'Story polls increase engagement by 85% - use them daily'
      ]
    })
  }, [businessProfile])

  const MetricCard = ({
    icon: Icon,
    label,
    value,
    change,
    color
  }: {
    icon: any,
    label: string,
    value: string | number,
    change?: string,
    color: string
  }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`bg-gradient-to-br ${color} backdrop-blur-lg rounded-2xl p-6 border border-white/20`}
    >
      <div className="flex items-center justify-between mb-2">
        <Icon className="w-8 h-8 text-white" />
        {change && (
          <span className={`flex items-center gap-1 text-sm font-semibold ${
            parseFloat(change) > 0 ? 'text-green-300' : 'text-red-300'
          }`}>
            {parseFloat(change) > 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
            {Math.abs(parseFloat(change))}%
          </span>
        )}
      </div>
      <div className="text-3xl font-bold text-white mb-1">{value.toLocaleString()}</div>
      <div className="text-sm text-gray-300">{label}</div>
    </motion.div>
  )

  if (!metrics) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-white text-lg">Loading analytics...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={TrendingUp}
          label="Avg. Daily Reach"
          value={metrics.reach}
          change="+18.5"
          color="from-purple-500/20 to-purple-700/20"
        />
        <MetricCard
          icon={Heart}
          label="Avg. Engagement"
          value={metrics.engagement}
          change="+24.2"
          color="from-pink-500/20 to-pink-700/20"
        />
        <MetricCard
          icon={Users}
          label="Total Followers"
          value={metrics.followers}
          change="+12.8"
          color="from-orange-500/20 to-orange-700/20"
        />
        <MetricCard
          icon={MessageCircle}
          label="Leads This Week"
          value={metrics.leads}
          change="+31.5"
          color="from-green-500/20 to-green-700/20"
        />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
        >
          <h3 className="text-xl font-bold text-white mb-4">Reach & Engagement Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis dataKey="date" stroke="#ffffff60" />
              <YAxis stroke="#ffffff60" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e1e1e',
                  border: '1px solid #ffffff20',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="reach" stroke="#a855f7" strokeWidth={2} name="Reach" />
              <Line type="monotone" dataKey="engagement" stroke="#ec4899" strokeWidth={2} name="Engagement" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
        >
          <h3 className="text-xl font-bold text-white mb-4">Followers & Leads Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.slice(-14)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis dataKey="date" stroke="#ffffff60" />
              <YAxis stroke="#ffffff60" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e1e1e',
                  border: '1px solid #ffffff20',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="followers" fill="#f97316" name="Followers" />
              <Bar dataKey="leads" fill="#10b981" name="Leads" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Top Performing Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
      >
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Target className="w-6 h-6" />
          Top Performing Content
        </h3>
        <div className="space-y-3">
          {metrics.topPerformingContent.map((content, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg p-4 border border-green-500/30"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                  {idx + 1}
                </div>
                <p className="text-gray-300">{content}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* AI Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30"
      >
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-blue-400" />
          AI-Powered Recommendations
        </h3>
        <div className="space-y-3">
          {metrics.recommendations.map((rec, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 bg-white/5 rounded-lg p-4 border border-white/10"
            >
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {idx + 1}
              </div>
              <p className="text-gray-300">{rec}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Conversion Funnel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
      >
        <h3 className="text-xl font-bold text-white mb-4">Conversion Funnel</h3>
        <div className="space-y-4">
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300">Profile Visits</span>
              <span className="text-white font-semibold">1,250</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full" style={{ width: '100%' }} />
            </div>
          </div>

          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300">Link Clicks</span>
              <span className="text-white font-semibold">420</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full" style={{ width: '33.6%' }} />
            </div>
          </div>

          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300">DM Inquiries</span>
              <span className="text-white font-semibold">87</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full" style={{ width: '7%' }} />
            </div>
          </div>

          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300">Conversions</span>
              <span className="text-white font-semibold">40</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full" style={{ width: '3.2%' }} />
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-green-500/10 rounded-lg border border-green-500/30">
          <div className="flex items-center gap-2 text-green-300 font-semibold mb-1">
            <TrendingUp className="w-5 h-5" />
            Conversion Rate: {metrics.conversionRate}%
          </div>
          <p className="text-gray-400 text-sm">
            Industry average: 2.1% - You're outperforming by 52%!
          </p>
        </div>
      </motion.div>
    </div>
  )
}
