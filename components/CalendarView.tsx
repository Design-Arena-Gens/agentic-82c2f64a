'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BusinessProfile, ReelContent, CarouselContent, StoryContent } from '@/types'
import { generateReelContent, generateCarouselContent, generateStoryContent } from '@/lib/contentEngine'
import { Calendar, ChevronLeft, ChevronRight, Video, Image, Film } from 'lucide-react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, startOfWeek, endOfWeek } from 'date-fns'

interface Props {
  businessProfile: BusinessProfile
}

interface ScheduledContent {
  date: Date
  content: (ReelContent | CarouselContent | StoryContent)[]
}

export default function CalendarView({ businessProfile }: Props) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [scheduledContent, setScheduledContent] = useState<ScheduledContent[]>([])

  useEffect(() => {
    // Generate scheduled content for the month
    const reels = generateReelContent(businessProfile, 16)
    const carousels = generateCarouselContent(businessProfile, 8)
    const stories = generateStoryContent(businessProfile, 30)

    const schedule: ScheduledContent[] = []
    const startDate = startOfMonth(currentMonth)
    const endDate = endOfMonth(currentMonth)
    const days = eachDayOfInterval({ start: startDate, end: endDate })

    // Distribute content across the month
    days.forEach((day, index) => {
      const dayContent: (ReelContent | CarouselContent | StoryContent)[] = []

      // 4 reels per week (Mon, Wed, Fri, Sun)
      const dayOfWeek = day.getDay()
      if ([1, 3, 5, 0].includes(dayOfWeek) && index < reels.length) {
        const reelIndex = Math.floor(index / 2) % reels.length
        dayContent.push({ ...reels[reelIndex], status: 'scheduled' as const, scheduledDate: day.toISOString() })
      }

      // 2 carousels per week (Tue, Sat)
      if ([2, 6].includes(dayOfWeek) && index < carousels.length) {
        const carouselIndex = Math.floor(index / 3.5) % carousels.length
        dayContent.push({ ...carousels[carouselIndex], status: 'scheduled' as const, scheduledDate: day.toISOString() })
      }

      // Stories every day
      const storyIndex = index % stories.length
      dayContent.push({ ...stories[storyIndex], status: 'scheduled' as const, scheduledDate: day.toISOString() })

      if (dayContent.length > 0) {
        schedule.push({ date: day, content: dayContent })
      }
    })

    setScheduledContent(schedule)
  }, [currentMonth, businessProfile])

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const startDate = startOfWeek(monthStart)
  const endDate = endOfWeek(monthEnd)
  const dateRange = eachDayOfInterval({ start: startDate, end: endDate })

  const getContentForDate = (date: Date) => {
    return scheduledContent.find(sc => isSameDay(sc.date, date))?.content || []
  }

  const ContentIcon = ({ content }: { content: ReelContent | CarouselContent | StoryContent }) => {
    if ('script' in content) {
      return <Video className="w-3 h-3" />
    } else if ('slides' in content) {
      return <Image className="w-3 h-3" />
    } else {
      return <Film className="w-3 h-3" />
    }
  }

  const selectedDateContent = selectedDate ? getContentForDate(selectedDate) : []

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl gradient-instagram flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                {format(currentMonth, 'MMMM yyyy')}
              </h2>
              <p className="text-gray-400 text-sm">Content Calendar & Schedule</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Day Headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-semibold text-gray-400 py-2">
              {day}
            </div>
          ))}

          {/* Calendar Days */}
          {dateRange.map((date, index) => {
            const content = getContentForDate(date)
            const isCurrentMonth = isSameMonth(date, currentMonth)
            const isSelected = selectedDate && isSameDay(date, selectedDate)
            const isToday = isSameDay(date, new Date())

            return (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.01 }}
                onClick={() => setSelectedDate(date)}
                className={`aspect-square p-2 rounded-lg transition-all relative ${
                  !isCurrentMonth
                    ? 'bg-white/5 text-gray-600'
                    : isSelected
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg'
                    : isToday
                    ? 'bg-white/20 text-white border-2 border-purple-500'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <div className="text-sm font-semibold mb-1">
                  {format(date, 'd')}
                </div>
                {content.length > 0 && (
                  <div className="flex flex-wrap gap-1 justify-center">
                    {content.map((c, idx) => (
                      <div
                        key={idx}
                        className={`w-1.5 h-1.5 rounded-full ${
                          isSelected ? 'bg-white' : 'bg-purple-400'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </motion.button>
            )
          })}
        </div>
      </motion.div>

      {/* Selected Date Content */}
      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
        >
          <h3 className="text-xl font-bold text-white mb-4">
            Scheduled for {format(selectedDate, 'EEEE, MMMM d, yyyy')}
          </h3>

          {selectedDateContent.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              No content scheduled for this day
            </div>
          ) : (
            <div className="space-y-4">
              {selectedDateContent.map((content, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 rounded-xl p-4 border border-white/10"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      'script' in content
                        ? 'bg-purple-500/20 text-purple-300'
                        : 'slides' in content
                        ? 'bg-pink-500/20 text-pink-300'
                        : 'bg-orange-500/20 text-orange-300'
                    }`}>
                      <ContentIcon content={content} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-white">
                          {'script' in content
                            ? 'Reel'
                            : 'slides' in content
                            ? 'Carousel'
                            : 'Story'}
                        </span>
                        <span className="px-2 py-0.5 bg-green-500/20 text-green-300 text-xs rounded-full">
                          Scheduled
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm line-clamp-2">
                        {'script' in content
                          ? (content as ReelContent).hook
                          : 'slides' in content
                          ? (content as CarouselContent).title
                          : (content as StoryContent).content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Monthly Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid md:grid-cols-3 gap-4"
      >
        <div className="bg-gradient-to-br from-purple-500/20 to-purple-700/20 rounded-xl p-4 border border-purple-500/30">
          <div className="flex items-center gap-3">
            <Video className="w-8 h-8 text-purple-300" />
            <div>
              <div className="text-2xl font-bold text-white">
                {scheduledContent.reduce((sum, sc) => sum + sc.content.filter(c => 'script' in c).length, 0)}
              </div>
              <div className="text-sm text-gray-300">Reels Scheduled</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-500/20 to-pink-700/20 rounded-xl p-4 border border-pink-500/30">
          <div className="flex items-center gap-3">
            <Image className="w-8 h-8 text-pink-300" />
            <div>
              <div className="text-2xl font-bold text-white">
                {scheduledContent.reduce((sum, sc) => sum + sc.content.filter(c => 'slides' in c).length, 0)}
              </div>
              <div className="text-sm text-gray-300">Carousels Scheduled</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500/20 to-orange-700/20 rounded-xl p-4 border border-orange-500/30">
          <div className="flex items-center gap-3">
            <Film className="w-8 h-8 text-orange-300" />
            <div>
              <div className="text-2xl font-bold text-white">
                {scheduledContent.reduce((sum, sc) => sum + sc.content.filter(c => 'type' in c).length, 0)}
              </div>
              <div className="text-sm text-gray-300">Stories Scheduled</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
