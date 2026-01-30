export interface BusinessProfile {
  businessName: string
  businessType: string
  targetAudience: string
  location: string
  pricePositioning: 'budget' | 'mid-range' | 'premium' | 'luxury'
  businessGoals: string[]
  brandTone: string
  competitiveContext: string
}

export interface BrandIntelligence {
  brandTone: string
  contentPersonality: string[]
  audiencePsychology: string
  competitivePositioning: string
  keyDifferentiators: string[]
}

export interface ContentPillar {
  name: string
  description: string
  percentage: number
  examples: string[]
}

export interface InstagramStrategy {
  contentPillars: ContentPillar[]
  postingFrequency: {
    reels: number
    carousels: number
    stories: number
  }
  growthHooks: string[]
  ctas: string[]
  seasonalContent: string[]
}

export interface ReelContent {
  id: string
  hook: string
  script: string
  caption: string
  cta: string
  hashtags: string[]
  visualDirection: string
  onScreenText: string[]
  status: 'draft' | 'scheduled' | 'posted'
  scheduledDate?: string
}

export interface CarouselContent {
  id: string
  title: string
  slides: {
    slideNumber: number
    headline: string
    content: string
    visualNote: string
  }[]
  caption: string
  cta: string
  hashtags: string[]
  status: 'draft' | 'scheduled' | 'posted'
  scheduledDate?: string
}

export interface StoryContent {
  id: string
  type: 'poll' | 'question' | 'offer' | 'behind-scenes' | 'testimonial'
  content: string
  interactive?: {
    pollOptions?: string[]
    questionPrompt?: string
  }
  status: 'draft' | 'scheduled' | 'posted'
  scheduledDate?: string
}

export interface PerformanceMetrics {
  reach: number
  engagement: number
  followers: number
  leads: number
  conversionRate: number
  topPerformingContent: string[]
  recommendations: string[]
}

export interface AnalyticsData {
  date: string
  reach: number
  engagement: number
  followers: number
  leads: number
}
