'use client'

import { motion } from 'framer-motion'
import { BusinessProfile } from '@/types'
import { generateBrandIntelligence, generateInstagramStrategy } from '@/lib/strategyEngine'
import { Target, TrendingUp, Users, Zap, Calendar, Hash, MessageCircle } from 'lucide-react'

interface Props {
  businessProfile: BusinessProfile
}

export default function StrategyView({ businessProfile }: Props) {
  const brandIntel = generateBrandIntelligence(businessProfile)
  const strategy = generateInstagramStrategy(businessProfile)

  return (
    <div className="space-y-6">
      {/* Brand Intelligence Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
      >
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Target className="w-6 h-6" />
          Brand Intelligence Summary
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-purple-300 mb-2">Brand Tone</h3>
            <p className="text-gray-300">{brandIntel.brandTone}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-purple-300 mb-2">Content Personality</h3>
            <div className="flex flex-wrap gap-2">
              {brandIntel.contentPersonality.map(trait => (
                <span key={trait} className="px-3 py-1 bg-purple-500/20 rounded-full text-sm text-purple-200">
                  {trait}
                </span>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-purple-300 mb-2">Audience Psychology</h3>
            <p className="text-gray-300">{brandIntel.audiencePsychology}</p>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-purple-300 mb-2">Competitive Positioning</h3>
            <p className="text-gray-300">{brandIntel.competitivePositioning}</p>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-purple-300 mb-2">Key Differentiators</h3>
            <ul className="space-y-2">
              {brandIntel.keyDifferentiators.map((diff, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-300">
                  <Zap className="w-4 h-4 text-yellow-400 mt-1 flex-shrink-0" />
                  <span>{diff}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* 30-Day Growth Strategy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
      >
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6" />
          30-Day Instagram Growth Strategy
        </h2>

        {/* Content Pillars */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-4">Content Pillars</h3>
          <div className="space-y-4">
            {strategy.contentPillars.map((pillar, idx) => (
              <motion.div
                key={pillar.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 rounded-xl p-4 border border-white/10"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-semibold text-white">{pillar.name}</h4>
                  <span className="px-3 py-1 bg-purple-500/30 rounded-full text-sm text-purple-200 font-semibold">
                    {pillar.percentage}%
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-3">{pillar.description}</p>
                <div className="space-y-1">
                  {pillar.examples.map((example, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-purple-400">•</span>
                      <span>{example}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Posting Frequency */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Posting Frequency (Per Week)
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-4 text-center border border-purple-500/30">
              <div className="text-3xl font-bold text-white mb-1">
                {strategy.postingFrequency.reels}
              </div>
              <div className="text-sm text-gray-300">Reels</div>
            </div>
            <div className="bg-gradient-to-br from-pink-500/20 to-orange-500/20 rounded-xl p-4 text-center border border-pink-500/30">
              <div className="text-3xl font-bold text-white mb-1">
                {strategy.postingFrequency.carousels}
              </div>
              <div className="text-sm text-gray-300">Carousels</div>
            </div>
            <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-xl p-4 text-center border border-orange-500/30">
              <div className="text-3xl font-bold text-white mb-1">
                {strategy.postingFrequency.stories}
              </div>
              <div className="text-sm text-gray-300">Stories (Daily)</div>
            </div>
          </div>
        </div>

        {/* Growth Hooks */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Hash className="w-5 h-5" />
            Viral Growth Hooks
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {strategy.growthHooks.map((hook, idx) => (
              <div
                key={idx}
                className="bg-white/5 rounded-lg p-3 border border-white/10 text-gray-300 text-sm"
              >
                "{hook}"
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Strategic CTAs
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {strategy.ctas.map((cta, idx) => (
              <div
                key={idx}
                className="bg-white/5 rounded-lg p-3 border border-white/10 text-gray-300 text-sm"
              >
                {cta}
              </div>
            ))}
          </div>
        </div>

        {/* Seasonal Content */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Upcoming Seasonal Content
          </h3>
          <div className="space-y-2">
            {strategy.seasonalContent.map((theme, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-3 border border-purple-500/20 text-gray-300"
              >
                {theme}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Implementation Roadmap */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-lg rounded-2xl p-6 border border-green-500/30"
      >
        <h2 className="text-2xl font-bold text-white mb-4">Implementation Roadmap</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold flex-shrink-0">
              1
            </div>
            <div>
              <h4 className="font-semibold text-white">Week 1: Foundation</h4>
              <p className="text-gray-300 text-sm">Set up content calendar, create first batch of posts, optimize profile</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold flex-shrink-0">
              2
            </div>
            <div>
              <h4 className="font-semibold text-white">Week 2: Momentum</h4>
              <p className="text-gray-300 text-sm">Increase posting frequency, engage with audience, test different hooks</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold flex-shrink-0">
              3
            </div>
            <div>
              <h4 className="font-semibold text-white">Week 3: Optimization</h4>
              <p className="text-gray-300 text-sm">Analyze performance data, double down on winning formats, refine strategy</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold flex-shrink-0">
              4
            </div>
            <div>
              <h4 className="font-semibold text-white">Week 4: Scale</h4>
              <p className="text-gray-300 text-sm">Launch seasonal campaigns, consider paid promotion for top content, plan next month</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
