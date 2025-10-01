import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { 
  Calculator, 
  FileText, 
  Download, 
  Calendar, 
  DollarSign,
  TrendingDown,
  TrendingUp,
  Search,
  Filter,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react'

interface TaxDocument {
  id: string
  name: string
  type: 'form' | 'statement' | 'certificate' | 'schedule'
  year: number
  status: 'available' | 'pending' | 'processing'
  size: string
  date: string
}

interface TaxLossHarvesting {
  id: string
  security: string
  symbol: string
  currentLoss: number
  harvestableAmount: number
  washSaleRisk: boolean
  recommendation: string
  potentialSavings: number
}

interface TaxProjection {
  year: number
  capitalGains: number
  capitalLosses: number
  dividends: number
  interest: number
  netTaxableIncome: number
  estimatedTax: number
  effectiveRate: number
}

export const TaxCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedYear, setSelectedYear] = useState(2024)

  // Mock data for tax documents
  const taxDocuments: TaxDocument[] = [
    {
      id: '1',
      name: '1099-DIV Dividend Income',
      type: 'form',
      year: 2024,
      status: 'available',
      size: '245 KB',
      date: '2024-01-15'
    },
    {
      id: '2',
      name: '1099-INT Interest Income',
      type: 'form',
      year: 2024,
      status: 'available',
      size: '189 KB',
      date: '2024-01-15'
    },
    {
      id: '3',
      name: '1099-B Proceeds from Sales',
      type: 'form',
      year: 2024,
      status: 'pending',
      size: '567 KB',
      date: '2024-02-28'
    },
    {
      id: '4',
      name: 'Annual Tax Summary 2024',
      type: 'statement',
      year: 2024,
      status: 'available',
      size: '1.2 MB',
      date: '2024-01-31'
    }
  ]

  // Mock data for tax-loss harvesting opportunities
  const harvestingOpportunities: TaxLossHarvesting[] = [
    {
      id: '1',
      security: 'ABC Corp',
      symbol: 'ABC',
      currentLoss: -2150,
      harvestableAmount: 2150,
      washSaleRisk: false,
      recommendation: 'Harvest immediately',
      potentialSavings: 516
    },
    {
      id: '2',
      security: 'XYZ Technologies',
      symbol: 'XYZ',
      currentLoss: -890,
      harvestableAmount: 890,
      washSaleRisk: true,
      recommendation: 'Wait 31 days',
      potentialSavings: 214
    },
    {
      id: '3',
      security: 'Global Fund ETF',
      symbol: 'GFUN',
      currentLoss: -1450,
      harvestableAmount: 1450,
      washSaleRisk: false,
      recommendation: 'Consider harvesting',
      potentialSavings: 348
    }
  ]

  // Mock data for tax projections
  const taxProjections: TaxProjection[] = [
    {
      year: 2024,
      capitalGains: 15420,
      capitalLosses: -3200,
      dividends: 8750,
      interest: 1200,
      netTaxableIncome: 22170,
      estimatedTax: 5320,
      effectiveRate: 24.0
    },
    {
      year: 2023,
      capitalGains: 12890,
      capitalLosses: -1800,
      dividends: 7650,
      interest: 980,
      netTaxableIncome: 19720,
      estimatedTax: 4730,
      effectiveRate: 24.0
    }
  ]

  const filteredDocuments = taxDocuments.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    doc.year === selectedYear
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge variant="default" className="bg-green-100 text-green-800">Available</Badge>
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case 'processing':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Processing</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />
      case 'processing':
        return <AlertCircle className="h-4 w-4 text-blue-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const totalPotentialSavings = harvestingOpportunities.reduce((sum, opp) => sum + opp.potentialSavings, 0)

  const tabs = [
    { id: 'overview', label: 'Tax Overview', icon: Calculator },
    { id: 'documents', label: 'Tax Documents', icon: FileText },
    { id: 'harvesting', label: 'Tax-Loss Harvesting', icon: TrendingDown },
    { id: 'projections', label: 'Tax Projections', icon: TrendingUp }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tax Center</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive tax reporting, planning, and optimization tools
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download All Forms
          </Button>
          <Button>
            <Calculator className="h-4 w-4 mr-2" />
            Tax Estimator
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
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">YTD Capital Gains</p>
                    <p className="text-2xl font-bold text-green-600">$15,420</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">YTD Capital Losses</p>
                    <p className="text-2xl font-bold text-red-600">-$3,200</p>
                  </div>
                  <TrendingDown className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Dividend Income</p>
                    <p className="text-2xl font-bold">$8,750</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Tax</p>
                    <p className="text-2xl font-bold">$5,320</p>
                  </div>
                  <Calculator className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Tax Optimization Opportunities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingDown className="h-5 w-5 text-red-600" />
                    <h3 className="font-semibold">Tax-Loss Harvesting</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Potential savings of ${totalPotentialSavings.toLocaleString()} available
                  </p>
                  <Button size="sm" variant="outline">View Opportunities</Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Tax Planning</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Schedule a consultation to optimize your tax strategy
                  </p>
                  <Button size="sm" variant="outline">Schedule Meeting</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'documents' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tax documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="px-3 py-2 border rounded-md"
              aria-label="Select tax year"
            >
              <option value={2024}>2024</option>
              <option value={2023}>2023</option>
              <option value={2022}>2022</option>
            </select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Documents List */}
          <Card>
            <CardHeader>
              <CardTitle>Tax Documents - {selectedYear}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredDocuments.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      {getStatusIcon(doc.status)}
                      <div>
                        <h3 className="font-medium">{doc.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {doc.type.charAt(0).toUpperCase() + doc.type.slice(1)} • {doc.size} • {doc.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(doc.status)}
                      {doc.status === 'available' && (
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'harvesting' && (
        <div className="space-y-6">
          {/* Summary Card */}
          <Card>
            <CardHeader>
              <CardTitle>Tax-Loss Harvesting Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <h3 className="font-semibold text-red-800">Total Harvestable Losses</h3>
                  <p className="text-2xl font-bold text-red-600">
                    ${harvestingOpportunities.reduce((sum, opp) => sum + Math.abs(opp.currentLoss), 0).toLocaleString()}
                  </p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-800">Potential Tax Savings</h3>
                  <p className="text-2xl font-bold text-green-600">${totalPotentialSavings.toLocaleString()}</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-800">Available Opportunities</h3>
                  <p className="text-2xl font-bold text-blue-600">{harvestingOpportunities.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Opportunities List */}
          <Card>
            <CardHeader>
              <CardTitle>Harvesting Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {harvestingOpportunities.map((opportunity) => (
                  <div key={opportunity.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{opportunity.security} ({opportunity.symbol})</h3>
                        <p className="text-sm text-muted-foreground">{opportunity.recommendation}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-red-600">
                          ${Math.abs(opportunity.currentLoss).toLocaleString()} loss
                        </p>
                        <p className="text-sm text-green-600">
                          ${opportunity.potentialSavings} savings
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {opportunity.washSaleRisk ? (
                          <Badge variant="destructive">Wash Sale Risk</Badge>
                        ) : (
                          <Badge variant="default" className="bg-green-100 text-green-800">Safe to Harvest</Badge>
                        )}
                      </div>
                      <Button size="sm" variant={opportunity.washSaleRisk ? "outline" : "default"}>
                        {opportunity.washSaleRisk ? 'Monitor' : 'Harvest Now'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'projections' && (
        <div className="space-y-6">
          {/* Year Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Tax Projection Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {taxProjections.map((projection, index) => (
                  <div key={projection.year} className={`p-4 border rounded-lg ${index === 0 ? 'border-primary' : ''}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Tax Year {projection.year}</h3>
                      {index === 0 && <Badge>Current Year</Badge>}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Capital Gains</p>
                        <p className="font-semibold text-green-600">
                          ${projection.capitalGains.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Capital Losses</p>
                        <p className="font-semibold text-red-600">
                          ${projection.capitalLosses.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Dividends</p>
                        <p className="font-semibold">${projection.dividends.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Interest</p>
                        <p className="font-semibold">${projection.interest.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Net Taxable Income</p>
                          <p className="text-lg font-bold">${projection.netTaxableIncome.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Estimated Tax</p>
                          <p className="text-lg font-bold text-orange-600">${projection.estimatedTax.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Effective Rate</p>
                          <p className="text-lg font-bold">{projection.effectiveRate}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tax Planning Tools */}
          <Card>
            <CardHeader>
              <CardTitle>Tax Planning Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                  <Calculator className="h-6 w-6 mb-2" />
                  <span className="font-semibold">Tax Impact Calculator</span>
                  <span className="text-sm text-muted-foreground">Estimate tax impact of trades</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                  <Calendar className="h-6 w-6 mb-2" />
                  <span className="font-semibold">Tax Planning Session</span>
                  <span className="text-sm text-muted-foreground">Schedule with tax advisor</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}