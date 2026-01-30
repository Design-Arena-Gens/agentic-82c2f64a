'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BusinessProfile } from '@/types'
import StrategyView from './StrategyView'
import ContentGenerator from './ContentGenerator'
import AnalyticsView from './AnalyticsView'
import CalendarView from './CalendarView'
import {
  LayoutDashboard,
  Sparkles,
  BarChart3,
  Calendar,
  LogOut,
  Target,
  TrendingUp,
  Users,
  MapPin
} from 'lucide-react'

interface Props {
  businessProfile: BusinessProfile
  onReset: () => void
}

type Tab = 'strategy' | 'content' | 'analytics' | 'calendar'

export default function Dashboard({ businessProfile, onReset }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('strategy')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500)
  }, [])

  const tabs = [
    { id: 'strategy' as Tab, label: 'Strategy', icon: Target },
    { id: 'content' as Tab, label: 'Content Hub', icon: Sparkles },
    { id: 'analytics' as Tab, label: 'Analytics', icon: BarChart3 },
    { id: 'calendar' as Tab, label: 'Calendar', icon: Calendar },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full gradient-instagram mb-6"
          >
            <Sparkles className="w-12 h-12 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Analyzing Your Business...
          </h2>
          <p className="text-gray-300 text-lg">
            Creating your personalized growth strategy
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full gradient-instagram flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {businessProfile.businessName}
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {businessProfile.businessType}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {businessProfile.location}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onReset}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
            >
              <LogOut className="w-4 h-4" />
              New Business
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-6">
            {tabs.map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-t-lg font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-white/10 text-white border-b-2 border-purple-500'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'strategy' && <StrategyView businessProfile={businessProfile} />}
            {activeTab === 'content' && <ContentGenerator businessProfile={businessProfile} />}
            {activeTab === 'analytics' && <AnalyticsView businessProfile={businessProfile} />}
            {activeTab === 'calendar' && <CalendarView businessProfile={businessProfile} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
