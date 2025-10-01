import { useState } from 'react'
import { Card, CardContent, CardHeader } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { 
  TrendingUp, 
  TrendingDown,
  Globe,
  Calendar,
  Clock,
  User,
  Bookmark,
  ExternalLink,
  Filter,
  Search
} from 'lucide-react'
import { Input } from './ui/input'

interface MarketUpdate {
  id: string
  title: string
  summary: string
  category: 'market' | 'economic' | 'research' | 'commentary' | 'alert'
  author: string
  publishedAt: string
  readTime: number
  trending?: boolean
  impact: 'high' | 'medium' | 'low'
  tags: string[]
}

interface MarketIndicator {
  name: string
  value: string
  change: number
  changePercent: number
  trend: 'up' | 'down' | 'neutral'
}

const marketUpdates: MarketUpdate[] = [
  {
    id: '1',
    title: 'Federal Reserve Signals Potential Rate Cuts Ahead',
    summary: 'Recent FOMC meeting minutes suggest the Fed may consider rate cuts in the coming quarters as inflation shows signs of cooling. This could have significant implications for fixed income and equity markets.',
    category: 'economic',
    author: 'Janet Mitchell, Chief Economist',
    publishedAt: '2025-09-30T10:30:00Z',
    readTime: 5,
    trending: true,
    impact: 'high',
    tags: ['Federal Reserve', 'Interest Rates', 'Monetary Policy']
  },
  {
    id: '2',
    title: 'Q3 Earnings Season: Technology Sector Outlook',
    summary: 'As Q3 earnings season approaches, technology companies are expected to show mixed results. AI investments continue to drive growth while traditional hardware faces headwinds.',
    category: 'research',
    author: 'Michael Chen, Technology Analyst',
    publishedAt: '2025-09-29T14:15:00Z',
    readTime: 8,
    impact: 'medium',
    tags: ['Earnings', 'Technology', 'AI', 'Growth']
  },
  {
    id: '3',
    title: 'Geopolitical Tensions Impact Energy Markets',
    summary: 'Recent developments in international relations are creating volatility in energy markets. Oil prices have shown increased sensitivity to geopolitical events.',
    category: 'market',
    author: 'Sarah Rodriguez, Energy Analyst',
    publishedAt: '2025-09-28T16:45:00Z',
    readTime: 6,
    impact: 'high',
    tags: ['Energy', 'Geopolitics', 'Oil', 'Volatility']
  },
  {
    id: '4',
    title: 'ESG Investment Trends: Sustainable Finance Update',
    summary: 'Environmental, Social, and Governance (ESG) investing continues to evolve. New regulations and investor preferences are shaping the sustainable finance landscape.',
    category: 'research',
    author: 'David Park, ESG Strategist',
    publishedAt: '2025-09-27T11:20:00Z',
    readTime: 7,
    impact: 'medium',
    tags: ['ESG', 'Sustainable Finance', 'Regulation']
  },
  {
    id: '5',
    title: 'Portfolio Rebalancing Recommendation',
    summary: 'Based on recent market movements and your investment objectives, our team has identified potential rebalancing opportunities in your portfolio allocation.',
    category: 'commentary',
    author: 'Alex Thompson, Portfolio Manager',
    publishedAt: '2025-09-26T09:00:00Z',
    readTime: 4,
    impact: 'high',
    tags: ['Portfolio Management', 'Rebalancing', 'Asset Allocation']
  },
  {
    id: '6',
    title: 'Global Manufacturing PMI Shows Mixed Signals',
    summary: 'The latest Purchasing Managers Index data reveals divergent trends across major economies, with implications for global supply chains and equity markets.',
    category: 'economic',
    author: 'Lisa Wang, Global Economist',
    publishedAt: '2025-09-25T13:30:00Z',
    readTime: 5,
    impact: 'medium',
    tags: ['PMI', 'Manufacturing', 'Global Economy']
  }
]

const marketIndicators: MarketIndicator[] = [
  { name: 'S&P 500', value: '4,327.78', change: 23.45, changePercent: 0.54, trend: 'up' },
  { name: 'NASDAQ', value: '13,431.34', change: -12.67, changePercent: -0.09, trend: 'down' },
  { name: '10Y Treasury', value: '4.32%', change: 0.05, changePercent: 1.17, trend: 'up' },
  { name: 'USD Index', value: '104.23', change: -0.34, changePercent: -0.33, trend: 'down' },
  { name: 'Gold', value: '$1,982.45', change: 8.90, changePercent: 0.45, trend: 'up' },
  { name: 'Oil (WTI)', value: '$89.67', change: -1.23, changePercent: -1.35, trend: 'down' }
]

const categoryConfig = {
  market: { label: 'Market Update', color: 'bg-blue-100 text-blue-700' },
  economic: { label: 'Economic', color: 'bg-green-100 text-green-700' },
  research: { label: 'Research', color: 'bg-purple-100 text-purple-700' },
  commentary: { label: 'Commentary', color: 'bg-orange-100 text-orange-700' },
  alert: { label: 'Alert', color: 'bg-red-100 text-red-700' }
}

const impactConfig = {
  high: { label: 'High Impact', color: 'bg-red-100 text-red-700' },
  medium: { label: 'Medium Impact', color: 'bg-yellow-100 text-yellow-700' },
  low: { label: 'Low Impact', color: 'bg-gray-100 text-gray-700' }
}

export function MarketInsights() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [bookmarkedItems, setBookmarkedItems] = useState<Set<string>>(new Set())

  const filteredUpdates = marketUpdates.filter(update => {
    const matchesSearch = update.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         update.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         update.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || update.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleBookmark = (id: string) => {
    setBookmarkedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <div className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Market Insights</h2>
          <p className="text-muted-foreground">
            Stay informed with the latest market updates and research
          </p>
        </div>
      </div>

      {/* Market Indicators */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Market Overview
          </h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {marketIndicators.map((indicator) => (
              <div key={indicator.name} className="text-center">
                <div className="flex items-center justify-center mb-1">
                  {getTrendIcon(indicator.trend)}
                </div>
                <p className="text-sm font-medium text-muted-foreground">{indicator.name}</p>
                <p className="text-lg font-bold">{indicator.value}</p>
                <p className={`text-xs ${
                  indicator.trend === 'up' ? 'text-green-600' : 
                  indicator.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {indicator.trend === 'up' ? '+' : ''}{indicator.changePercent.toFixed(2)}%
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search insights, topics, or authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                title="Filter by category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background"
              >
                <option value="all">All Categories</option>
                <option value="market">Market Updates</option>
                <option value="economic">Economic</option>
                <option value="research">Research</option>
                <option value="commentary">Commentary</option>
                <option value="alert">Alerts</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights List */}
      <div className="space-y-4">
        {filteredUpdates.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8 text-muted-foreground">
                <Globe className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No insights found matching your criteria</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredUpdates.map((update) => (
            <Card key={update.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-foreground">
                            {update.title}
                          </h3>
                          {update.trending && (
                            <Badge variant="secondary" className="text-xs">
                              Trending
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground mb-3">
                          {update.summary}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {update.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {update.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatTimeAgo(update.publishedAt)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {update.readTime} min read
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          className={`text-xs ${categoryConfig[update.category].color}`}
                        >
                          {categoryConfig[update.category].label}
                        </Badge>
                        <Badge 
                          className={`text-xs ${impactConfig[update.impact].color}`}
                        >
                          {impactConfig[update.impact].label}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex lg:flex-col gap-2 lg:w-32">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleBookmark(update.id)}
                      className={`flex-1 lg:flex-none ${
                        bookmarkedItems.has(update.id) ? 'text-blue-600' : 'text-muted-foreground'
                      }`}
                    >
                      <Bookmark className={`h-4 w-4 ${bookmarkedItems.has(update.id) ? 'fill-current' : ''}`} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 lg:flex-none"
                      onClick={() => console.log(`Reading ${update.title}`)}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Read More
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}