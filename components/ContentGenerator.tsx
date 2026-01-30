'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BusinessProfile, ReelContent, CarouselContent } from '@/types'
import { generateReelContent, generateCarouselContent, generateVisualPrompt } from '@/lib/contentEngine'
import { Video, Image, Copy, Check, Sparkles, Download } from 'lucide-react'

interface Props {
  businessProfile: BusinessProfile
}

type ContentType = 'reels' | 'carousels'

export default function ContentGenerator({ businessProfile }: Props) {
  const [contentType, setContentType] = useState<ContentType>('reels')
  const [reels] = useState<ReelContent[]>(() => generateReelContent(businessProfile, 5))
  const [carousels] = useState<CarouselContent[]>(() => generateCarouselContent(businessProfile, 3))
  const [selectedContent, setSelectedContent] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const exportContent = (content: ReelContent | CarouselContent) => {
    const isReel = 'script' in content
    const text = isReel
      ? `REEL CONTENT\n\nHook: ${(content as ReelContent).hook}\n\nScript:\n${(content as ReelContent).script}\n\nCaption:\n${content.caption}\n\nCTA: ${content.cta}\n\nHashtags:\n${content.hashtags.join(' ')}`
      : `CAROUSEL CONTENT\n\nTitle: ${(content as CarouselContent).title}\n\nSlides:\n${(content as CarouselContent).slides.map(s => `Slide ${s.slideNumber}: ${s.headline}\n${s.content}`).join('\n\n')}\n\nCaption:\n${content.caption}\n\nCTA: ${content.cta}\n\nHashtags:\n${content.hashtags.join(' ')}`

    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${content.id}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Content Type Selector */}
      <div className="flex gap-4">
        <button
          onClick={() => setContentType('reels')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
            contentType === 'reels'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
              : 'bg-white/10 text-gray-300 hover:bg-white/20'
          }`}
        >
          <Video className="w-5 h-5" />
          Reels ({reels.length})
        </button>
        <button
          onClick={() => setContentType('carousels')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
            contentType === 'carousels'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
              : 'bg-white/10 text-gray-300 hover:bg-white/20'
          }`}
        >
          <Image className="w-5 h-5" />
          Carousels ({carousels.length})
        </button>
      </div>

      {/* Content Display */}
      <AnimatePresence mode="wait">
        {contentType === 'reels' && (
          <motion.div
            key="reels"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {reels.map((reel, idx) => (
              <motion.div
                key={reel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Video className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Reel #{idx + 1}</h3>
                      <span className="text-sm text-gray-400">Status: {reel.status}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopy(reel.caption, reel.id)}
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
                      title="Copy caption"
                    >
                      {copiedId === reel.id ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                    <button
                      onClick={() => exportContent(reel)}
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
                      title="Export content"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-purple-300 mb-2">🎣 Hook (First 3 seconds)</h4>
                    <p className="text-white bg-white/5 rounded-lg p-3 border border-white/10">{reel.hook}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-purple-300 mb-2">📝 Script</h4>
                    <pre className="text-gray-300 bg-white/5 rounded-lg p-3 border border-white/10 whitespace-pre-wrap font-sans text-sm">
                      {reel.script}
                    </pre>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-purple-300 mb-2">💬 Caption</h4>
                    <p className="text-gray-300 bg-white/5 rounded-lg p-3 border border-white/10 whitespace-pre-wrap">
                      {reel.caption}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-purple-300 mb-2">🎬 Visual Direction</h4>
                    <p className="text-gray-300 bg-white/5 rounded-lg p-3 border border-white/10">
                      {reel.visualDirection}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-purple-300 mb-2">📺 On-Screen Text</h4>
                    <div className="flex flex-wrap gap-2">
                      {reel.onScreenText.map((text, i) => (
                        <span key={i} className="px-3 py-1 bg-purple-500/20 rounded-full text-sm text-purple-200">
                          {i + 1}. {text}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-purple-300 mb-2">🚀 CTA</h4>
                    <p className="text-white bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-3 border border-purple-500/30">
                      {reel.cta}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-purple-300 mb-2"># Hashtags ({reel.hashtags.length})</h4>
                    <p className="text-gray-400 text-sm bg-white/5 rounded-lg p-3 border border-white/10">
                      {reel.hashtags.join(' ')}
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg p-4 border border-blue-500/30">
                    <h4 className="text-sm font-semibold text-blue-300 mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      AI Image Prompt
                    </h4>
                    <p className="text-gray-300 text-sm">
                      {generateVisualPrompt('reel', businessProfile.businessType)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {contentType === 'carousels' && (
          <motion.div
            key="carousels"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {carousels.map((carousel, idx) => (
              <motion.div
                key={carousel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center">
                      <Image className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{carousel.title}</h3>
                      <span className="text-sm text-gray-400">Status: {carousel.status}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopy(carousel.caption, carousel.id)}
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
                      title="Copy caption"
                    >
                      {copiedId === carousel.id ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                    <button
                      onClick={() => exportContent(carousel)}
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
                      title="Export content"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-purple-300 mb-3">📑 Slides ({carousel.slides.length})</h4>
                    <div className="space-y-3">
                      {carousel.slides.map(slide => (
                        <div
                          key={slide.slideNumber}
                          className="bg-white/5 rounded-lg p-4 border border-white/10"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-xs text-white font-bold">
                              {slide.slideNumber}
                            </span>
                            <h5 className="font-semibold text-white">{slide.headline}</h5>
                          </div>
                          <p className="text-gray-300 text-sm mb-2">{slide.content}</p>
                          <p className="text-xs text-gray-500 italic">Visual: {slide.visualNote}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-purple-300 mb-2">💬 Caption</h4>
                    <p className="text-gray-300 bg-white/5 rounded-lg p-3 border border-white/10 whitespace-pre-wrap">
                      {carousel.caption}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-purple-300 mb-2">🚀 CTA</h4>
                    <p className="text-white bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-3 border border-purple-500/30">
                      {carousel.cta}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-purple-300 mb-2"># Hashtags ({carousel.hashtags.length})</h4>
                    <p className="text-gray-400 text-sm bg-white/5 rounded-lg p-3 border border-white/10">
                      {carousel.hashtags.join(' ')}
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg p-4 border border-blue-500/30">
                    <h4 className="text-sm font-semibold text-blue-300 mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      AI Design Prompt
                    </h4>
                    <p className="text-gray-300 text-sm">
                      {generateVisualPrompt('carousel', businessProfile.businessType)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
