import { useState } from 'react'
import { Card, CardContent, CardHeader } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { 
  TrendingUp, 
  BarChart3,
  Target,
  Activity,
  Calendar,
  PieChart,
  Info
} from 'lucide-react'

interface PerformanceData {
  period: string
  portfolioReturn: number
  benchmarkReturn: number
  alpha: number
  volatility: number
  sharpeRatio: number
}

interface Holding {
  symbol: string
  name: string
  allocation: number
  return: number
  contribution: number
  sector: string
}

interface RiskMetric {
  name: string
  value: number
  benchmark: number
  interpretation: string
}

const performanceData: PerformanceData[] = [
  { period: '1M', portfolioReturn: 2.1, benchmarkReturn: 1.8, alpha: 0.3, volatility: 12.5, sharpeRatio: 1.2 },
  { period: '3M', portfolioReturn: 5.8, benchmarkReturn: 4.9, alpha: 0.9, volatility: 13.1, sharpeRatio: 1.1 },
  { period: '6M', portfolioReturn: 8.4, benchmarkReturn: 7.2, alpha: 1.2, volatility: 14.2, sharpeRatio: 1.0 },
  { period: '1Y', portfolioReturn: 12.3, benchmarkReturn: 10.5, alpha: 1.8, volatility: 15.8, sharpeRatio: 0.9 },
  { period: '3Y', portfolioReturn: 28.7, benchmarkReturn: 24.1, alpha: 4.6, volatility: 16.2, sharpeRatio: 0.8 },
  { period: '5Y', portfolioReturn: 67.2, benchmarkReturn: 58.3, alpha: 8.9, volatility: 17.1, sharpeRatio: 0.7 }
]

const topHoldings: Holding[] = [
  { symbol: 'MSFT', name: 'Microsoft Corporation', allocation: 8.5, return: 15.2, contribution: 1.29, sector: 'Technology' },
  { symbol: 'AAPL', name: 'Apple Inc', allocation: 7.8, return: 8.7, contribution: 0.68, sector: 'Technology' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', allocation: 6.2, return: 45.3, contribution: 2.81, sector: 'Technology' },
  { symbol: 'GOOGL', name: 'Alphabet Inc', allocation: 5.9, return: 12.8, contribution: 0.76, sector: 'Technology' },
  { symbol: 'AMZN', name: 'Amazon.com Inc', allocation: 5.4, return: 18.9, contribution: 1.02, sector: 'Consumer Discretionary' }
]

const riskMetrics: RiskMetric[] = [
  { name: 'Beta', value: 0.92, benchmark: 1.00, interpretation: 'Lower than market risk' },
  { name: 'VaR (95%)', value: -2.1, benchmark: -2.8, interpretation: 'Maximum 1-day loss estimate' },
  { name: 'Tracking Error', value: 3.2, benchmark: 0.0, interpretation: 'Deviation from benchmark' },
  { name: 'Information Ratio', value: 0.56, benchmark: 0.00, interpretation: 'Risk-adjusted excess return' }
]

const sectorAllocation = [
  { sector: 'Technology', allocation: 28.5, benchmark: 25.2 },
  { sector: 'Healthcare', allocation: 15.3, benchmark: 14.8 },
  { sector: 'Financial Services', allocation: 12.8, benchmark: 15.1 },
  { sector: 'Consumer Discretionary', allocation: 11.2, benchmark: 10.9 },
  { sector: 'Industrials', allocation: 8.9, benchmark: 9.4 },
  { sector: 'Communication Services', allocation: 7.8, benchmark: 8.2 },
  { sector: 'Energy', allocation: 6.1, benchmark: 5.9 },
  { sector: 'Other', allocation: 9.4, benchmark: 10.5 }
]

export function PerformanceAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('1Y')
  const [selectedTab, setSelectedTab] = useState<'overview' | 'attribution' | 'risk' | 'allocation'>('overview')

  const currentData = performanceData.find(d => d.period === selectedPeriod) || performanceData[3]

  const formatPercentage = (value: number, decimals = 1) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`
  }

  const formatNumber = (value: number, decimals = 2) => {
    return value.toFixed(decimals)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Performance Analytics</h2>
          <p className="text-muted-foreground">
            Comprehensive analysis of your portfolio performance and risk metrics
          </p>
        </div>
      </div>

      {/* Performance Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Return</p>
                <p className="text-2xl font-bold text-foreground">{formatPercentage(currentData.portfolioReturn)}</p>
                <p className="text-xs text-muted-foreground">vs {formatPercentage(currentData.benchmarkReturn)} benchmark</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Alpha</p>
                <p className="text-2xl font-bold text-foreground">{formatPercentage(currentData.alpha)}</p>
                <p className="text-xs text-muted-foreground">Excess return over benchmark</p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Volatility</p>
                <p className="text-2xl font-bold text-foreground">{formatPercentage(currentData.volatility)}</p>
                <p className="text-xs text-muted-foreground">Annualized standard deviation</p>
              </div>
              <Activity className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Sharpe Ratio</p>
                <p className="text-2xl font-bold text-foreground">{formatNumber(currentData.sharpeRatio)}</p>
                <p className="text-xs text-muted-foreground">Risk-adjusted return</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Time Period Selector */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Time Period:
            </span>
            {performanceData.map((data) => (
              <Button
                key={data.period}
                variant={selectedPeriod === data.period ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPeriod(data.period)}
              >
                {data.period}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Analytics Tabs */}
      <Card>
        <CardHeader>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'overview', label: 'Performance Overview', icon: BarChart3 },
              { id: 'attribution', label: 'Attribution Analysis', icon: TrendingUp },
              { id: 'risk', label: 'Risk Metrics', icon: Activity },
              { id: 'allocation', label: 'Sector Allocation', icon: PieChart }
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={selectedTab === tab.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedTab(tab.id as 'overview' | 'attribution' | 'risk' | 'allocation')}
                className="flex items-center gap-2"
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          {selectedTab === 'overview' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Performance Comparison</h4>
                  <div className="space-y-3">
                    {performanceData.slice(0, 4).map((data) => (
                      <div key={data.period} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <span className="font-medium">{data.period}</span>
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{formatPercentage(data.portfolioReturn)}</span>
                            <Badge variant={data.portfolioReturn > data.benchmarkReturn ? 'default' : 'secondary'}>
                              {formatPercentage(data.alpha)}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Benchmark: {formatPercentage(data.benchmarkReturn)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Key Statistics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span>Best Month</span>
                      <span className="font-medium text-green-600">+4.2%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span>Worst Month</span>
                      <span className="font-medium text-red-600">-2.8%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span>Win Rate</span>
                      <span className="font-medium">68%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span>Max Drawdown</span>
                      <span className="font-medium text-red-600">-8.4%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'attribution' && (
            <div className="space-y-4">
              <h4 className="font-semibold">Top Contributors ({selectedPeriod})</h4>
              <div className="space-y-2">
                {topHoldings.map((holding) => (
                  <div key={holding.symbol} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="font-medium">{holding.symbol}</p>
                          <p className="text-sm text-muted-foreground">{holding.name}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {holding.sector}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-sm font-medium">{holding.allocation}%</p>
                          <p className="text-xs text-muted-foreground">Allocation</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{formatPercentage(holding.return)}</p>
                          <p className="text-xs text-muted-foreground">Return</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-green-600">
                            {formatPercentage(holding.contribution)}
                          </p>
                          <p className="text-xs text-muted-foreground">Contribution</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'risk' && (
            <div className="space-y-4">
              <h4 className="font-semibold">Risk Analysis</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {riskMetrics.map((metric) => (
                  <div key={metric.name} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{metric.name}</span>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-2xl font-bold">
                        {metric.name === 'VaR (95%)' ? metric.value.toFixed(1) + '%' : formatNumber(metric.value)}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Benchmark: {metric.name === 'VaR (95%)' ? metric.benchmark.toFixed(1) + '%' : formatNumber(metric.benchmark)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{metric.interpretation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'allocation' && (
            <div className="space-y-4">
              <h4 className="font-semibold">Sector Allocation vs Benchmark</h4>
              <div className="space-y-3">
                {sectorAllocation.map((sector) => (
                  <div key={sector.sector} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{sector.sector}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-sm">
                          {sector.allocation}% 
                          <span className="text-muted-foreground ml-1">
                            (vs {sector.benchmark}%)
                          </span>
                        </span>
                        <Badge 
                          variant={sector.allocation > sector.benchmark ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {sector.allocation > sector.benchmark ? '+' : ''}{(sector.allocation - sector.benchmark).toFixed(1)}%
                        </Badge>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${Math.min((sector.allocation / 30) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}