import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import {
  Search,
  Download,
  Filter,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  RotateCcw,
} from 'lucide-react';

interface Transaction {
  id: string
  date: string
  type: 'BUY' | 'SELL' | 'DIVIDEND' | 'TRANSFER' | 'FEE'
  symbol: string
  description: string
  quantity: number
  price: number
  amount: number
  fees: number
  status: 'COMPLETED' | 'PENDING' | 'CANCELLED'
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2025-10-01',
    type: 'BUY',
    symbol: 'AAPL',
    description: 'Apple Inc. - Market Order',
    quantity: 25,
    price: 178.25,
    amount: -4456.25,
    fees: 0.00,
    status: 'COMPLETED'
  },
  {
    id: '2',
    date: '2025-09-28',
    type: 'DIVIDEND',
    symbol: 'MSFT',
    description: 'Microsoft Corporation - Quarterly Dividend',
    quantity: 0,
    price: 0.75,
    amount: 60.00,
    fees: 0.00,
    status: 'COMPLETED'
  },
  {
    id: '3',
    date: '2025-09-25',
    type: 'SELL',
    symbol: 'TSLA',
    description: 'Tesla Inc. - Limit Order',
    quantity: 10,
    price: 198.50,
    amount: 1975.00,
    fees: 0.50,
    status: 'COMPLETED'
  },
  {
    id: '4',
    date: '2025-09-22',
    type: 'BUY',
    symbol: 'SPY',
    description: 'SPDR S&P 500 ETF - Market Order',
    quantity: 50,
    price: 448.75,
    amount: -22437.50,
    fees: 0.00,
    status: 'COMPLETED'
  },
  {
    id: '5',
    date: '2025-09-20',
    type: 'TRANSFER',
    symbol: '',
    description: 'Bank Transfer - Deposit',
    quantity: 0,
    price: 0,
    amount: 25000.00,
    fees: 0.00,
    status: 'COMPLETED'
  },
  {
    id: '6',
    date: '2025-09-18',
    type: 'BUY',
    symbol: 'BTC',
    description: 'Bitcoin - Market Order',
    quantity: 0.1,
    price: 67500.00,
    amount: -6750.00,
    fees: 25.00,
    status: 'COMPLETED'
  },
  {
    id: '7',
    date: '2025-09-15',
    type: 'DIVIDEND',
    symbol: 'SPY',
    description: 'SPDR S&P 500 ETF - Quarterly Dividend',
    quantity: 0,
    price: 1.65,
    amount: 330.00,
    fees: 0.00,
    status: 'COMPLETED'
  },
  {
    id: '8',
    date: '2025-09-12',
    type: 'FEE',
    symbol: '',
    description: 'Account Maintenance Fee',
    quantity: 0,
    price: 0,
    amount: -15.00,
    fees: 0.00,
    status: 'COMPLETED'
  },
  {
    id: '9',
    date: '2025-09-10',
    type: 'SELL',
    symbol: 'GOOGL',
    description: 'Alphabet Inc. - Market Order',
    quantity: 5,
    price: 138.22,
    amount: 690.10,
    fees: 0.50,
    status: 'COMPLETED'
  },
  {
    id: '10',
    date: '2025-09-08',
    type: 'BUY',
    symbol: 'MSFT',
    description: 'Microsoft Corporation - Limit Order',
    quantity: 30,
    price: 312.45,
    amount: -9373.50,
    fees: 0.00,
    status: 'PENDING'
  }
]

export function Transactions() {
  const [transactions] = useState<Transaction[]>(mockTransactions)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<string>('All')
  const [filterStatus, setFilterStatus] = useState<string>('All')
  const [dateRange, setDateRange] = useState<string>('30')
  const [sortBy, setSortBy] = useState<string>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const filteredAndSortedTransactions = transactions
    .filter(transaction => {
      const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           transaction.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = filterType === 'All' || transaction.type === filterType
      const matchesStatus = filterStatus === 'All' || transaction.status === filterStatus
      
      // Date filtering
      const transactionDate = new Date(transaction.date)
      const now = new Date()
      const daysAgo = new Date(now.getTime() - parseInt(dateRange) * 24 * 60 * 60 * 1000)
      const matchesDate = dateRange === 'All' || transactionDate >= daysAgo
      
      return matchesSearch && matchesType && matchesStatus && matchesDate
    })
    .sort((a, b) => {
      const aValue = a[sortBy as keyof Transaction]
      const bValue = b[sortBy as keyof Transaction]
      
      if (sortBy === 'date') {
        const aDate = new Date(aValue as string).getTime()
        const bDate = new Date(bValue as string).getTime()
        return sortOrder === 'asc' ? aDate - bDate : bDate - aDate
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
      }
      
      return sortOrder === 'asc' 
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue))
    })

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('desc')
    }
  }

  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'BUY':
        return <ArrowDown className="h-4 w-4 text-red-600" />
      case 'SELL':
        return <ArrowUp className="h-4 w-4 text-green-600" />
      case 'DIVIDEND':
        return <ArrowUp className="h-4 w-4 text-blue-600" />
      case 'TRANSFER':
        return <RotateCcw className="h-4 w-4 text-purple-600" />
      case 'FEE':
        return <ArrowDown className="h-4 w-4 text-orange-600" />
      default:
        return <RotateCcw className="h-4 w-4 text-gray-600" />
    }
  }

  const getTypeColor = (type: Transaction['type']) => {
    switch (type) {
      case 'BUY':
        return 'bg-red-100 text-red-700'
      case 'SELL':
        return 'bg-green-100 text-green-700'
      case 'DIVIDEND':
        return 'bg-blue-100 text-blue-700'
      case 'TRANSFER':
        return 'bg-purple-100 text-purple-700'
      case 'FEE':
        return 'bg-orange-100 text-orange-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-700'
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-700'
      case 'CANCELLED':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const totalInflow = transactions
    .filter(t => t.amount > 0 && t.status === 'COMPLETED')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalOutflow = transactions
    .filter(t => t.amount < 0 && t.status === 'COMPLETED')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)

  const totalFees = transactions
    .filter(t => t.status === 'COMPLETED')
    .reduce((sum, t) => sum + t.fees, 0)

  return (
    <div className="space-y-6">
      {/* Transaction Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Inflow</p>
                <p className="text-2xl font-bold text-green-600">
                  +${totalInflow.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <ArrowUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Outflow</p>
                <p className="text-2xl font-bold text-red-600">
                  -${totalOutflow.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <ArrowDown className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Fees</p>
                <p className="text-2xl font-bold">
                  ${totalFees.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <Filter className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <CardTitle>Transaction History ({filteredAndSortedTransactions.length})</CardTitle>
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search transactions..."
                  className="pl-10 w-full sm:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <select
                className="px-3 py-2 border border-input bg-background rounded-md text-sm"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                title="Filter by transaction type"
              >
                <option value="All">All Types</option>
                <option value="BUY">Buy</option>
                <option value="SELL">Sell</option>
                <option value="DIVIDEND">Dividend</option>
                <option value="TRANSFER">Transfer</option>
                <option value="FEE">Fee</option>
              </select>

              <select
                className="px-3 py-2 border border-input bg-background rounded-md text-sm"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                title="Filter by transaction status"
              >
                <option value="All">All Status</option>
                <option value="COMPLETED">Completed</option>
                <option value="PENDING">Pending</option>
                <option value="CANCELLED">Cancelled</option>
              </select>

              <select
                className="px-3 py-2 border border-input bg-background rounded-md text-sm"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                title="Filter by date range"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
                <option value="365">Last year</option>
                <option value="All">All time</option>
              </select>

              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">
                    <Button variant="ghost" onClick={() => handleSort('date')} className="p-0 h-auto font-semibold">
                      Date <ArrowUpDown className="ml-1 h-4 w-4" />
                    </Button>
                  </th>
                  <th className="text-left py-3 px-4">
                    <Button variant="ghost" onClick={() => handleSort('type')} className="p-0 h-auto font-semibold">
                      Type <ArrowUpDown className="ml-1 h-4 w-4" />
                    </Button>
                  </th>
                  <th className="text-left py-3 px-4">Description</th>
                  <th className="text-left py-3 px-4">
                    <Button variant="ghost" onClick={() => handleSort('quantity')} className="p-0 h-auto font-semibold">
                      Quantity <ArrowUpDown className="ml-1 h-4 w-4" />
                    </Button>
                  </th>
                  <th className="text-left py-3 px-4">
                    <Button variant="ghost" onClick={() => handleSort('price')} className="p-0 h-auto font-semibold">
                      Price <ArrowUpDown className="ml-1 h-4 w-4" />
                    </Button>
                  </th>
                  <th className="text-left py-3 px-4">
                    <Button variant="ghost" onClick={() => handleSort('amount')} className="p-0 h-auto font-semibold">
                      Amount <ArrowUpDown className="ml-1 h-4 w-4" />
                    </Button>
                  </th>
                  <th className="text-left py-3 px-4">Fees</th>
                  <th className="text-left py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {getTransactionIcon(transaction.type)}
                        <span>{new Date(transaction.date).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getTypeColor(transaction.type)}>
                        {transaction.type}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium">{transaction.symbol}</div>
                        <div className="text-sm text-muted-foreground">{transaction.description}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {transaction.quantity > 0 ? transaction.quantity.toLocaleString() : '-'}
                    </td>
                    <td className="py-3 px-4">
                      {transaction.price > 0 ? `$${transaction.price.toFixed(2)}` : '-'}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`font-medium ${
                        transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.amount >= 0 ? '+' : ''}${transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {transaction.fees > 0 ? `$${transaction.fees.toFixed(2)}` : '-'}
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
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