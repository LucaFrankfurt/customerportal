import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { 
  Search, 
  BookOpen, 
  
  BarChart3,
  Star,
  Clock,
  Filter,
  Download,
  Eye,
  Bookmark,
  Share,
  Building,
  
  
  FileText,
  Globe,
  
} from 'lucide-react'

interface ResearchReport {
  id: string
  title: string
  analyst: string
  firm: string
  symbol?: string
  company?: string
  sector: string
  rating: 'Buy' | 'Hold' | 'Sell' | 'Strong Buy' | 'Strong Sell'
  priceTarget?: number
  currentPrice?: number
  publishDate: string
  summary: string
  isBookmarked: boolean
  confidence: number
  reportType: 'equity' | 'sector' | 'macro' | 'fixed-income' | 'alternative'
}

interface MarketResearch {
  id: string
  title: string
  category: 'economic' | 'market-outlook' | 'strategy' | 'thematic'
  source: string
  publishDate: string
  readTime: number
  summary: string
  tags: string[]
  isBookmarked: boolean
  isPremium: boolean
}

interface CompanyProfile {
  symbol: string
  name: string
  sector: string
  industry: string
  marketCap: number
  price: number
  change: number
  changePercent: number
  peRatio: number
  dividend: number
  volume: number
  description: string
}

export const ResearchHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState('reports')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSector, setSelectedSector] = useState<string>('all')
  const [selectedRating, setSelectedRating] = useState<string>('all')

  // Mock research reports data
  const researchReports: ResearchReport[] = [
    {
      id: '1',
      title: 'Apple Inc. - iPhone 15 Cycle Driving Growth',
      analyst: 'Sarah Chen',
      firm: 'Goldman Sachs',
      symbol: 'AAPL',
      company: 'Apple Inc.',
      sector: 'Technology',
      rating: 'Buy',
      priceTarget: 200,
      currentPrice: 175.84,
      publishDate: '2024-09-28',
      summary: 'Strong iPhone 15 demand and services growth support our bullish thesis. Raising price target to $200.',
      isBookmarked: false,
      confidence: 85,
      reportType: 'equity'
    },
    {
      id: '2',
      title: 'Healthcare Sector Outlook - Defensive Play in Uncertain Times',
      analyst: 'Michael Rodriguez',
      firm: 'Morgan Stanley',
      sector: 'Healthcare',
      rating: 'Strong Buy',
      publishDate: '2024-09-27',
      summary: 'Healthcare sector offers defensive characteristics with growth potential from innovation and aging demographics.',
      isBookmarked: true,
      confidence: 92,
      reportType: 'sector'
    },
    {
      id: '3',
      title: 'Federal Reserve Policy Impact on REITs',
      analyst: 'Emily Watson',
      firm: 'J.P. Morgan',
      sector: 'Real Estate',
      rating: 'Hold',
      publishDate: '2024-09-25',
      summary: 'Interest rate environment creates headwinds for REITs, but selective opportunities remain in data centers and logistics.',
      isBookmarked: false,
      confidence: 78,
      reportType: 'sector'
    },
    {
      id: '4',
      title: 'Tesla - Cybertruck Production Ramp Concerns',
      analyst: 'David Kim',
      firm: 'Credit Suisse',
      symbol: 'TSLA',
      company: 'Tesla Inc.',
      sector: 'Automotive',
      rating: 'Hold',
      priceTarget: 220,
      currentPrice: 248.50,
      publishDate: '2024-09-24',
      summary: 'Production challenges for Cybertruck may impact near-term deliveries. Maintaining Hold rating.',
      isBookmarked: true,
      confidence: 71,
      reportType: 'equity'
    }
  ]

  // Mock market research data
  const marketResearch: MarketResearch[] = [
    {
      id: '1',
      title: 'Global Economic Outlook: Navigating Uncertainty',
      category: 'economic',
      source: 'IMF',
      publishDate: '2024-09-30',
      readTime: 12,
      summary: 'Global growth expected to moderate amid persistent inflation and geopolitical tensions.',
      tags: ['GDP', 'Inflation', 'Central Banks'],
      isBookmarked: false,
      isPremium: false
    },
    {
      id: '2',
      title: 'AI Revolution: Investment Opportunities in 2024',
      category: 'thematic',
      source: 'McKinsey & Company',
      publishDate: '2024-09-28',
      readTime: 8,
      summary: 'Artificial intelligence adoption accelerating across industries, creating new investment themes.',
      tags: ['AI', 'Technology', 'Innovation'],
      isBookmarked: true,
      isPremium: true
    },
    {
      id: '3',
      title: 'Q4 2024 Market Strategy Report',
      category: 'strategy',
      source: 'BlackRock',
      publishDate: '2024-09-26',
      readTime: 15,
      summary: 'Tactical asset allocation recommendations for the final quarter amid market volatility.',
      tags: ['Asset Allocation', 'Strategy', 'Q4'],
      isBookmarked: false,
      isPremium: true
    }
  ]

  // Mock company profiles
  const companyProfiles: CompanyProfile[] = [
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      sector: 'Technology',
      industry: 'Consumer Electronics',
      marketCap: 2800000,
      price: 175.84,
      change: 2.15,
      changePercent: 1.24,
      peRatio: 28.5,
      dividend: 0.96,
      volume: 48500000,
      description: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.'
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      sector: 'Technology',
      industry: 'Software',
      marketCap: 2900000,
      price: 415.26,
      change: -1.88,
      changePercent: -0.45,
      peRatio: 32.1,
      dividend: 2.72,
      volume: 22300000,
      description: 'Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide.'
    },
    {
      symbol: 'NVDA',
      name: 'NVIDIA Corporation',
      sector: 'Technology',
      industry: 'Semiconductors',
      marketCap: 1100000,
      price: 442.38,
      change: 8.45,
      changePercent: 1.95,
      peRatio: 65.2,
      dividend: 0.16,
      volume: 35600000,
      description: 'NVIDIA Corporation operates as a computing company in the United States and internationally.'
    }
  ]

  const filteredReports = researchReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.analyst.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSector = selectedSector === 'all' || report.sector === selectedSector
    const matchesRating = selectedRating === 'all' || report.rating === selectedRating
    return matchesSearch && matchesSector && matchesRating
  })

  const filteredResearch = marketResearch.filter(research => {
    return research.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           research.summary.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'Strong Buy': return 'bg-green-700 text-white'
      case 'Buy': return 'bg-green-500 text-white'
      case 'Hold': return 'bg-yellow-500 text-white'
      case 'Sell': return 'bg-red-500 text-white'
      case 'Strong Sell': return 'bg-red-700 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'economic': return 'bg-blue-100 text-blue-800'
      case 'market-outlook': return 'bg-purple-100 text-purple-800'
      case 'strategy': return 'bg-green-100 text-green-800'
      case 'thematic': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1000000) return `$${(marketCap / 1000000).toFixed(1)}T`
    if (marketCap >= 1000) return `$${(marketCap / 1000).toFixed(1)}B`
    return `$${marketCap.toFixed(1)}M`
  }

  const tabs = [
    { id: 'reports', label: 'Research Reports', icon: FileText },
    { id: 'market', label: 'Market Research', icon: Globe },
    { id: 'companies', label: 'Company Profiles', icon: Building },
    { id: 'bookmarks', label: 'Bookmarked', icon: Bookmark }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Research Hub</h1>
          <p className="text-muted-foreground mt-1">
            Access comprehensive investment research, analyst reports, and market insights
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filter
          </Button>
          <Button>
            <Search className="h-4 w-4 mr-2" />
            Research Request
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'reports' && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search research reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="px-3 py-2 border rounded-md"
              aria-label="Filter by sector"
            >
              <option value="all">All Sectors</option>
              <option value="Technology">Technology</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Financial">Financial</option>
              <option value="Energy">Energy</option>
            </select>
            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="px-3 py-2 border rounded-md"
              aria-label="Filter by rating"
            >
              <option value="all">All Ratings</option>
              <option value="Strong Buy">Strong Buy</option>
              <option value="Buy">Buy</option>
              <option value="Hold">Hold</option>
              <option value="Sell">Sell</option>
            </select>
          </div>

          {/* Research Reports */}
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{report.title}</h3>
                        {report.isBookmarked && <Bookmark className="h-4 w-4 text-yellow-500 fill-current" />}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span>{report.analyst} • {report.firm}</span>
                        <span>{report.publishDate}</span>
                        <Badge variant="outline" className="text-xs">
                          {report.reportType}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{report.summary}</p>
                      {report.symbol && (
                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{report.symbol}</span>
                            <span>${report.currentPrice?.toFixed(2)}</span>
                          </div>
                          {report.priceTarget && (
                            <div>
                              <span className="text-muted-foreground">Target: </span>
                              <span className="font-medium">${report.priceTarget}</span>
                              <span className={`ml-2 ${
                                ((report.priceTarget - (report.currentPrice || 0)) / (report.currentPrice || 1)) > 0 
                                  ? 'text-green-600' : 'text-red-600'
                              }`}>
                                ({(((report.priceTarget - (report.currentPrice || 0)) / (report.currentPrice || 1)) * 100).toFixed(1)}%)
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <Badge className={getRatingColor(report.rating)}>
                        {report.rating}
                      </Badge>
                      <div className="text-right text-sm">
                        <p className="text-muted-foreground">Confidence</p>
                        <p className="font-medium">{report.confidence}%</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Read Report
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline">
                      <Bookmark className="h-4 w-4 mr-2" />
                      Bookmark
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'market' && (
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search market research..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Market Research */}
          <div className="space-y-4">
            {filteredResearch.map((research) => (
              <Card key={research.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{research.title}</h3>
                        {research.isBookmarked && <Bookmark className="h-4 w-4 text-yellow-500 fill-current" />}
                        {research.isPremium && <Badge className="bg-gold-100 text-gold-800">Premium</Badge>}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span>{research.source}</span>
                        <span>{research.publishDate}</span>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{research.readTime} min read</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{research.summary}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" className={getCategoryColor(research.category)}>
                          {research.category.replace('-', ' ')}
                        </Badge>
                        {research.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button size="sm">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Read Article
                    </Button>
                    <Button size="sm" variant="outline">
                      <Bookmark className="h-4 w-4 mr-2" />
                      Bookmark
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'companies' && (
        <div className="space-y-6">
          {/* Company Profiles */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {companyProfiles.map((company) => (
              <Card key={company.symbol} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{company.symbol}</h3>
                        <Badge variant="outline">{company.sector}</Badge>
                      </div>
                      <h4 className="font-medium text-muted-foreground">{company.name}</h4>
                      <p className="text-sm text-muted-foreground">{company.industry}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">${company.price.toFixed(2)}</div>
                      <div className={`text-sm ${company.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {company.change >= 0 ? '+' : ''}${company.change.toFixed(2)} ({company.changePercent.toFixed(2)}%)
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Market Cap</p>
                      <p className="font-medium">{formatMarketCap(company.marketCap)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">P/E Ratio</p>
                      <p className="font-medium">{company.peRatio.toFixed(1)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Dividend Yield</p>
                      <p className="font-medium">{((company.dividend / company.price) * 100).toFixed(2)}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Volume</p>
                      <p className="font-medium">{(company.volume / 1000000).toFixed(1)}M</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">{company.description}</p>
                  
                  <div className="flex gap-3">
                    <Button size="sm">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button size="sm" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Research
                    </Button>
                    <Button size="sm" variant="outline">
                      <Star className="h-4 w-4 mr-2" />
                      Watch
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'bookmarks' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bookmark className="h-5 w-5" />
                Bookmarked Research
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Bookmarked Reports */}
                {researchReports.filter(r => r.isBookmarked).map((report) => (
                  <div key={report.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{report.title}</h4>
                      <Badge className={getRatingColor(report.rating)}>
                        {report.rating}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{report.summary}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{report.analyst} • {report.firm}</span>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        Read
                      </Button>
                    </div>
                  </div>
                ))}

                {/* Bookmarked Market Research */}
                {marketResearch.filter(r => r.isBookmarked).map((research) => (
                  <div key={research.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{research.title}</h4>
                      <Badge variant="outline" className={getCategoryColor(research.category)}>
                        {research.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{research.summary}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{research.source} • {research.readTime} min read</span>
                      <Button size="sm" variant="outline">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Read
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}