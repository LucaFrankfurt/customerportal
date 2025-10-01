import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  TrendingUp, 
  TrendingDown,
  Eye,
  DollarSign,
  Percent,
  Calendar
} from 'lucide-react'

interface Holding {
  id: string
  symbol: string
  name: string
  shares: number
  avgCost: number
  currentPrice: number
  marketValue: number
  gainLoss: number
  gainLossPercent: number
  sector: string
  lastUpdated: string
  type: 'Stock' | 'Bond' | 'ETF' | 'Mutual Fund' | 'Crypto'
}

const mockHoldings: Holding[] = [
  {
    id: '1',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    shares: 150,
    avgCost: 145.50,
    currentPrice: 178.25,
    marketValue: 26737.50,
    gainLoss: 4912.50,
    gainLossPercent: 22.5,
    sector: 'Technology',
    lastUpdated: '2025-10-01 16:00:00',
    type: 'Stock'
  },
  {
    id: '2',
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    shares: 80,
    avgCost: 285.00,
    currentPrice: 312.45,
    marketValue: 24996.00,
    gainLoss: 2196.00,
    gainLossPercent: 9.6,
    sector: 'Technology',
    lastUpdated: '2025-10-01 16:00:00',
    type: 'Stock'
  },
  {
    id: '3',
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    shares: 45,
    avgCost: 125.80,
    currentPrice: 138.22,
    marketValue: 6219.90,
    gainLoss: 558.90,
    gainLossPercent: 9.9,
    sector: 'Technology',
    lastUpdated: '2025-10-01 16:00:00',
    type: 'Stock'
  },
  {
    id: '4',
    symbol: 'SPY',
    name: 'SPDR S&P 500 ETF Trust',
    shares: 200,
    avgCost: 425.30,
    currentPrice: 448.75,
    marketValue: 89750.00,
    gainLoss: 4690.00,
    gainLossPercent: 5.5,
    sector: 'Diversified',
    lastUpdated: '2025-10-01 16:00:00',
    type: 'ETF'
  },
  {
    id: '5',
    symbol: 'BTC',
    name: 'Bitcoin',
    shares: 0.5,
    avgCost: 42000.00,
    currentPrice: 67500.00,
    marketValue: 33750.00,
    gainLoss: 12750.00,
    gainLossPercent: 60.7,
    sector: 'Cryptocurrency',
    lastUpdated: '2025-10-01 15:30:00',
    type: 'Crypto'
  },
  {
    id: '6',
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    shares: 25,
    avgCost: 245.60,
    currentPrice: 198.50,
    marketValue: 4962.50,
    gainLoss: -1177.50,
    gainLossPercent: -19.2,
    sector: 'Automotive',
    lastUpdated: '2025-10-01 16:00:00',
    type: 'Stock'
  }
]

export function Holdings() {
  const [holdings] = useState<Holding[]>(mockHoldings)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<string>('All')
  const [sortBy, setSortBy] = useState<string>('marketValue')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const filteredAndSortedHoldings = holdings
    .filter(holding => {
      const matchesSearch = holding.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           holding.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = filterType === 'All' || holding.type === filterType
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      const aValue = a[sortBy as keyof Holding] as number
      const bValue = b[sortBy as keyof Holding] as number
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
    })

  const totalValue = holdings.reduce((sum, holding) => sum + holding.marketValue, 0)
  const totalGainLoss = holdings.reduce((sum, holding) => sum + holding.gainLoss, 0)
  const totalGainLossPercent = (totalGainLoss / (totalValue - totalGainLoss)) * 100

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('desc')
    }
  }

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Portfolio Value</p>
                <p className="text-2xl font-bold">${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Gain/Loss</p>
                <p className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${totalGainLoss >= 0 ? '+' : ''}${totalGainLoss.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
              {totalGainLoss >= 0 ? (
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
                <p className="text-sm font-medium text-muted-foreground">Total Return</p>
                <p className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {totalGainLoss >= 0 ? '+' : ''}{totalGainLossPercent.toFixed(2)}%
                </p>
              </div>
              <Percent className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Holdings ({filteredAndSortedHoldings.length})</CardTitle>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search holdings..."
                  className="pl-10 w-full sm:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="px-3 py-2 border border-input bg-background rounded-md text-sm"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="All">All Types</option>
                <option value="Stock">Stocks</option>
                <option value="ETF">ETFs</option>
                <option value="Bond">Bonds</option>
                <option value="Mutual Fund">Mutual Funds</option>
                <option value="Crypto">Cryptocurrency</option>
              </select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">
                    <Button variant="ghost" onClick={() => handleSort('symbol')} className="p-0 h-auto font-semibold">
                      Symbol <ArrowUpDown className="ml-1 h-4 w-4" />
                    </Button>
                  </th>
                  <th className="text-left py-3 px-4">
                    <Button variant="ghost" onClick={() => handleSort('shares')} className="p-0 h-auto font-semibold">
                      Shares <ArrowUpDown className="ml-1 h-4 w-4" />
                    </Button>
                  </th>
                  <th className="text-left py-3 px-4">
                    <Button variant="ghost" onClick={() => handleSort('avgCost')} className="p-0 h-auto font-semibold">
                      Avg Cost <ArrowUpDown className="ml-1 h-4 w-4" />
                    </Button>
                  </th>
                  <th className="text-left py-3 px-4">
                    <Button variant="ghost" onClick={() => handleSort('currentPrice')} className="p-0 h-auto font-semibold">
                      Current Price <ArrowUpDown className="ml-1 h-4 w-4" />
                    </Button>
                  </th>
                  <th className="text-left py-3 px-4">
                    <Button variant="ghost" onClick={() => handleSort('marketValue')} className="p-0 h-auto font-semibold">
                      Market Value <ArrowUpDown className="ml-1 h-4 w-4" />
                    </Button>
                  </th>
                  <th className="text-left py-3 px-4">
                    <Button variant="ghost" onClick={() => handleSort('gainLoss')} className="p-0 h-auto font-semibold">
                      Gain/Loss <ArrowUpDown className="ml-1 h-4 w-4" />
                    </Button>
                  </th>
                  <th className="text-left py-3 px-4">Type</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedHoldings.map((holding) => (
                  <tr key={holding.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium">{holding.symbol}</div>
                        <div className="text-sm text-muted-foreground">{holding.name}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">{holding.shares.toLocaleString()}</td>
                    <td className="py-3 px-4">${holding.avgCost.toFixed(2)}</td>
                    <td className="py-3 px-4">${holding.currentPrice.toFixed(2)}</td>
                    <td className="py-3 px-4 font-medium">${holding.marketValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    <td className="py-3 px-4">
                      <div className={holding.gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}>
                        <div className="font-medium">
                          ${holding.gainLoss >= 0 ? '+' : ''}{holding.gainLoss.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </div>
                        <div className="text-sm">
                          {holding.gainLoss >= 0 ? '+' : ''}{holding.gainLossPercent.toFixed(2)}%
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{holding.type}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}