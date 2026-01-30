'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, TrendingUp, Target, MapPin, DollarSign, Goal } from 'lucide-react'
import { BusinessProfile } from '@/types'

interface Props {
  onComplete: (profile: BusinessProfile) => void
}

export default function BusinessAnalysisForm({ onComplete }: Props) {
  const [formData, setFormData] = useState<Partial<BusinessProfile>>({
    businessGoals: []
  })

  const businessTypes = [
    'Café/Restaurant', 'Fashion Brand', 'Beauty/Salon', 'Fitness/Gym',
    'Agency/Consulting', 'E-commerce', 'Local Shop', 'Tech Startup',
    'Real Estate', 'Education', 'Healthcare', 'Other'
  ]

  const goalOptions = [
    'Brand Awareness', 'Lead Generation', 'Direct Sales',
    'Community Building', 'Website Traffic', 'App Downloads'
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isFormValid()) {
      onComplete(formData as BusinessProfile)
    }
  }

  const isFormValid = () => {
    return formData.businessName &&
           formData.businessType &&
           formData.targetAudience &&
           formData.location &&
           formData.pricePositioning &&
           formData.businessGoals &&
           formData.businessGoals.length > 0
  }

  const toggleGoal = (goal: string) => {
    const currentGoals = formData.businessGoals || []
    if (currentGoals.includes(goal)) {
      setFormData({
        ...formData,
        businessGoals: currentGoals.filter(g => g !== goal)
      })
    } else {
      setFormData({
        ...formData,
        businessGoals: [...currentGoals, goal]
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl w-full"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-instagram mb-4"
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Agentic AI Growth Manager
          </h1>
          <p className="text-xl text-gray-300">
            Strategic Instagram Growth & Business Intelligence Platform
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Target className="w-6 h-6" />
            Business Intelligence Analysis
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white font-semibold mb-2">
                Business Name
              </label>
              <input
                type="text"
                value={formData.businessName || ''}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your business name"
                required
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Business Type
              </label>
              <select
                value={formData.businessType || ''}
                onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="" className="bg-slate-800">Select business type</option>
                {businessTypes.map(type => (
                  <option key={type} value={type} className="bg-slate-800">{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                Target Audience
              </label>
              <input
                type="text"
                value={formData.targetAudience || ''}
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., Young professionals 25-35, urban lifestyle"
                required
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Location & Cultural Context
              </label>
              <input
                type="text"
                value={formData.location || ''}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., Mumbai, India - Cosmopolitan audience"
                required
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Price Positioning
              </label>
              <select
                value={formData.pricePositioning || ''}
                onChange={(e) => setFormData({ ...formData, pricePositioning: e.target.value as any })}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="" className="bg-slate-800">Select price positioning</option>
                <option value="budget" className="bg-slate-800">Budget (Value-focused)</option>
                <option value="mid-range" className="bg-slate-800">Mid-Range (Quality & Value)</option>
                <option value="premium" className="bg-slate-800">Premium (High Quality)</option>
                <option value="luxury" className="bg-slate-800">Luxury (Exclusive)</option>
              </select>
            </div>

            <div>
              <label className="block text-white font-semibold mb-3 flex items-center gap-2">
                <Goal className="w-4 h-4" />
                Business Goals (Select all that apply)
              </label>
              <div className="grid grid-cols-2 gap-3">
                {goalOptions.map(goal => (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => toggleGoal(goal)}
                    className={`px-4 py-3 rounded-lg font-medium transition-all ${
                      formData.businessGoals?.includes(goal)
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                Competitive Context (Optional)
              </label>
              <textarea
                value={formData.competitiveContext || ''}
                onChange={(e) => setFormData({ ...formData, competitiveContext: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Describe your competitors or market position"
                rows={3}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={!isFormValid()}
              className="w-full py-4 rounded-lg font-bold text-white text-lg gradient-instagram hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Generate Growth Strategy
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  )
}
