import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { 
  TrendingUp,
  TrendingDown, 
  DollarSign,
  PieChart,
  Activity,
  Target,
  Calendar,
  Bell,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Eye
} from 'lucide-react'

export function Overview() {
  const portfolioValue = 181415.90
  const dailyChange = 2347.65
  const dailyChangePercent = 1.31
  const totalReturn = 23847.32
  const totalReturnPercent = 15.1

  const topHoldings = [
    { symbol: 'SPY', name: 'SPDR S&P 500 ETF', value: 89750, percent: 49.5, change: 2.1 },
    { symbol: 'AAPL', name: 'Apple Inc.', value: 26737.50, percent: 14.7, change: -0.8 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', value: 24996, percent: 13.8, change: 1.5 },
    { symbol: 'BTC', name: 'Bitcoin', value: 33750, percent: 18.6, change: 4.2 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', value: 6219.90, percent: 3.4, change: 0.9 }
  ]

  const recentActivity = [
    { type: 'BUY', symbol: 'AAPL', shares: 25, price: 178.25, date: '2025-10-01' },
    { type: 'DIVIDEND', symbol: 'MSFT', amount: 60.00, date: '2025-09-28' },
    { type: 'SELL', symbol: 'TSLA', shares: 10, price: 198.50, date: '2025-09-25' },
    { type: 'BUY', symbol: 'SPY', shares: 50, price: 448.75, date: '2025-09-22' }
  ]

  const marketNews = [
    {
      title: 'Fed Holds Interest Rates Steady',
      time: '2 hours ago',
      impact: 'positive'
    },
    {
      title: 'Tech Stocks Rally on AI Optimism',
      time: '4 hours ago', 
      impact: 'positive'
    },
    {
      title: 'Oil Prices Decline Amid Supply Concerns',
      time: '6 hours ago',
      impact: 'negative'
    }
  ]

  const upcomingEvents = [
    { event: 'AAPL Earnings Report', date: '2025-10-05', type: 'earnings' },
    { event: 'MSFT Dividend Payment', date: '2025-10-08', type: 'dividend' },
    { event: 'Portfolio Rebalancing Due', date: '2025-10-15', type: 'action' }
  ]

  return (
    <div className="space-y-6">
      {/* Portfolio Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Portfolio Value</p>
                <p className="text-2xl font-bold">${portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                <p className={`text-sm ${dailyChange >= 0 ? 'text-green-600' : 'text-red-600'} flex items-center`}>
                  {dailyChange >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                  {dailyChange >= 0 ? '+' : ''}${dailyChange.toLocaleString('en-US', { minimumFractionDigits: 2 })} ({dailyChange >= 0 ? '+' : ''}{dailyChangePercent}%)
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Return</p>
                <p className={`text-2xl font-bold ${totalReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {totalReturn >= 0 ? '+' : ''}${totalReturn.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
                <p className={`text-sm ${totalReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {totalReturn >= 0 ? '+' : ''}{totalReturnPercent}% All Time
                </p>
              </div>
              {totalReturn >= 0 ? (
                <TrendingUp className="h-8 w-8 text-green-600" />
              ) : (
                <TrendingDown className="h-8 w-8 text-red-600" />
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Asset Allocation</p>
                <p className="text-lg font-semibold">Diversified</p>
                <p className="text-sm text-muted-foreground">5 Holdings</p>
              </div>
              <PieChart className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Recent Activity</p>
                <p className="text-lg font-semibold">{recentActivity.length} Transactions</p>
                <p className="text-sm text-muted-foreground">Last 30 days</p>
              </div>
              <Activity className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Portfolio Composition */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Top Holdings
              </span>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topHoldings.map((holding, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <span className="font-medium">{holding.symbol}</span>
                        <span className="text-sm text-muted-foreground ml-2">{holding.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${holding.value.toLocaleString()}</div>
                        <div className={`text-sm flex items-center justify-end ${
                          holding.change >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {holding.change >= 0 ? (
                            <ArrowUpRight className="h-3 w-3 mr-1" />
                          ) : (
                            <ArrowDownRight className="h-3 w-3 mr-1" />
                          )}
                          {holding.change >= 0 ? '+' : ''}{holding.change}%
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${holding.percent}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{holding.percent}% of portfolio</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity
              </span>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Trade
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      activity.type === 'BUY' ? 'bg-red-100 text-red-600' :
                      activity.type === 'SELL' ? 'bg-green-100 text-green-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {activity.type === 'BUY' ? <ArrowDownRight className="h-4 w-4" /> :
                       activity.type === 'SELL' ? <ArrowUpRight className="h-4 w-4" /> :
                       <DollarSign className="h-4 w-4" />}
                    </div>
                    <div>
                      <div className="font-medium">
                        {activity.type} {activity.symbol}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {'shares' in activity 
                          ? `${activity.shares} shares @ $${activity.price}` 
                          : `Dividend $${activity.amount}`
                        }
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">
                      {new Date(activity.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Market News */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Market News & Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {marketNews.map((news, index) => (
                <div key={index} className="flex items-start gap-3 p-3 hover:bg-muted/50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    news.impact === 'positive' ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <div className="flex-1">
                    <div className="font-medium">{news.title}</div>
                    <div className="text-sm text-muted-foreground">{news.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All News
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{event.event}</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    event.type === 'earnings' ? 'bg-blue-100 text-blue-700' :
                    event.type === 'dividend' ? 'bg-green-100 text-green-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {event.type}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              <Target className="h-4 w-4 mr-2" />
              Set Reminders
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex-col">
              <Plus className="h-6 w-6 mb-2" />
              Buy Stocks
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <ArrowUpRight className="h-6 w-6 mb-2" />
              Sell Holdings
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <DollarSign className="h-6 w-6 mb-2" />
              Add Funds
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Calendar className="h-6 w-6 mb-2" />
              Schedule Meeting
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}