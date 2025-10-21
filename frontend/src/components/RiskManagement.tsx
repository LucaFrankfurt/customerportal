import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { 
  Shield, 
  TrendingDown, 
  AlertTriangle, 
  BarChart3,
  PieChart,
  Activity,
  Calculator,
  Settings,
  Play,
  RefreshCw,
  Eye,
  FileText
} from 'lucide-react'

interface RiskMetric {
  id: string
  name: string
  value: number
  threshold: number
  unit: string
  status: 'normal' | 'warning' | 'critical'
  change: number
  description: string
}

interface StressTest {
  id: string
  name: string
  scenario: string
  portfolioImpact: number
  probability: number
  timeframe: string
  lastRun: string
  status: 'completed' | 'running' | 'scheduled'
}

interface RiskAllocation {
  category: string
  value: number
  limit: number
  percentage: number
  status: 'within-limit' | 'near-limit' | 'over-limit'
}

interface RiskAlert {
  id: string
  type: 'breach' | 'warning' | 'info'
  title: string
  description: string
  timestamp: string
  isRead: boolean
  severity: 'low' | 'medium' | 'high' | 'critical'
}

export const RiskManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedTimeframe, setSelectedTimeframe] = useState('1M')

  // Mock risk metrics data
  const riskMetrics: RiskMetric[] = [
    {
      id: '1',
      name: 'Portfolio Beta',
      value: 0.89,
      threshold: 1.0,
      unit: '',
      status: 'normal',
      change: -0.03,
      description: 'Sensitivity to market movements'
    },
    {
      id: '2',
      name: 'Value at Risk (95%)',
      value: 145000,
      threshold: 200000,
      unit: '$',
      status: 'normal',
      change: -12000,
      description: 'Maximum expected loss over 1 day'
    },
    {
      id: '3',
      name: 'Sharpe Ratio',
      value: 1.24,
      threshold: 1.0,
      unit: '',
      status: 'normal',
      change: 0.08,
      description: 'Risk-adjusted return measure'
    },
    {
      id: '4',
      name: 'Maximum Drawdown',
      value: 8.2,
      threshold: 15.0,
      unit: '%',
      status: 'normal',
      change: 1.1,
      description: 'Peak to trough decline'
    },
    {
      id: '5',
      name: 'Concentration Risk',
      value: 18.5,
      threshold: 20.0,
      unit: '%',
      status: 'warning',
      change: 2.3,
      description: 'Largest single position weight'
    },
    {
      id: '6',
      name: 'Volatility (Annualized)',
      value: 12.4,
      threshold: 18.0,
      unit: '%',
      status: 'normal',
      change: -0.8,
      description: 'Portfolio volatility measure'
    }
  ]

  // Mock stress test scenarios
  const stressTests: StressTest[] = [
    {
      id: '1',
      name: 'Market Crash Scenario',
      scenario: '2008 Financial Crisis repeat with 40% market decline',
      portfolioImpact: -32.5,
      probability: 5.2,
      timeframe: '12 months',
      lastRun: '2024-09-25',
      status: 'completed'
    },
    {
      id: '2',
      name: 'Interest Rate Shock',
      scenario: 'Federal funds rate increases by 300 basis points',
      portfolioImpact: -18.7,
      probability: 12.8,
      timeframe: '6 months',
      lastRun: '2024-09-20',
      status: 'completed'
    },
    {
      id: '3',
      name: 'Currency Crisis',
      scenario: 'USD weakens 25% against major currencies',
      portfolioImpact: -14.2,
      probability: 8.5,
      timeframe: '18 months',
      lastRun: '2024-09-15',
      status: 'running'
    },
    {
      id: '4',
      name: 'Inflation Surge',
      scenario: 'Inflation rises to 8% with economic uncertainty',
      portfolioImpact: -22.1,
      probability: 15.3,
      timeframe: '24 months',
      lastRun: '2024-09-10',
      status: 'scheduled'
    }
  ]

  // Mock risk allocation data
  const riskAllocations: RiskAllocation[] = [
    {
      category: 'Equity Risk',
      value: 68.5,
      limit: 75.0,
      percentage: 91.3,
      status: 'near-limit'
    },
    {
      category: 'Credit Risk',
      value: 15.2,
      limit: 25.0,
      percentage: 60.8,
      status: 'within-limit'
    },
    {
      category: 'Currency Risk',
      value: 8.9,
      limit: 15.0,
      percentage: 59.3,
      status: 'within-limit'
    },
    {
      category: 'Interest Rate Risk',
      value: 12.4,
      limit: 20.0,
      percentage: 62.0,
      status: 'within-limit'
    },
    {
      category: 'Concentration Risk',
      value: 18.5,
      limit: 20.0,
      percentage: 92.5,
      status: 'near-limit'
    }
  ]

  // Mock risk alerts
  const riskAlerts: RiskAlert[] = [
    {
      id: '1',
      type: 'warning',
      title: 'Concentration Risk Approaching Limit',
      description: 'Single position weight has reached 18.5% of portfolio',
      timestamp: '2024-09-30T14:30:00Z',
      isRead: false,
      severity: 'medium'
    },
    {
      id: '2',
      type: 'info',
      title: 'Volatility Decreased',
      description: 'Portfolio volatility has decreased to 12.4% from 13.2%',
      timestamp: '2024-09-29T09:15:00Z',
      isRead: false,
      severity: 'low'
    },
    {
      id: '3',
      type: 'breach',
      title: 'VaR Threshold Breached (Resolved)',
      description: 'Value at Risk exceeded threshold but has since normalized',
      timestamp: '2024-09-27T16:45:00Z',
      isRead: true,
      severity: 'high'
    }
  ]

  const getMetricStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-600'
      case 'warning': return 'text-yellow-600'
      case 'critical': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getMetricStatusBadge = (status: string) => {
    switch (status) {
      case 'normal':
        return <Badge className="bg-green-100 text-green-800">Normal</Badge>
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
      case 'critical':
        return <Badge variant="destructive">Critical</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getStressTestStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case 'running':
        return <Badge className="bg-blue-100 text-blue-800">Running</Badge>
      case 'scheduled':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Scheduled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getAllocationStatusColor = (status: string) => {
    switch (status) {
      case 'within-limit': return 'bg-green-500'
      case 'near-limit': return 'bg-yellow-500'
      case 'over-limit': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'breach': return <AlertTriangle className="h-5 w-5 text-red-600" />
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case 'info': return <Activity className="h-5 w-5 text-blue-600" />
      default: return <Activity className="h-5 w-5 text-gray-600" />
    }
  }

  const tabs = [
    { id: 'overview', label: 'Risk Overview', icon: Shield },
    { id: 'metrics', label: 'Risk Metrics', icon: BarChart3 },
    { id: 'stress', label: 'Stress Testing', icon: TrendingDown },
    { id: 'allocation', label: 'Risk Allocation', icon: PieChart },
    { id: 'alerts', label: 'Risk Alerts', icon: AlertTriangle }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Risk Management</h1>
          <p className="text-muted-foreground mt-1">
            Monitor and manage portfolio risk with advanced analytics
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Risk Settings
          </Button>
          <Button>
            <Play className="h-4 w-4 mr-2" />
            Run Stress Test
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
          {/* Risk Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Overall Risk Score</p>
                    <p className="text-2xl font-bold text-yellow-600">Medium</p>
                  </div>
                  <Shield className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Alerts</p>
                    <p className="text-2xl font-bold text-red-600">
                      {riskAlerts.filter(alert => !alert.isRead).length}
                    </p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">VaR (1 Day)</p>
                    <p className="text-2xl font-bold">$145k</p>
                  </div>
                  <TrendingDown className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Portfolio Beta</p>
                    <p className="text-2xl font-bold">0.89</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Key Risk Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Key Risk Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {riskMetrics.slice(0, 6).map((metric) => (
                  <div key={metric.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{metric.name}</h3>
                      {getMetricStatusBadge(metric.status)}
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-2xl font-bold ${getMetricStatusColor(metric.status)}`}>
                        {metric.unit === '$' ? `$${(metric.value / 1000).toFixed(0)}k` : 
                         metric.unit === '%' ? `${metric.value.toFixed(1)}%` : 
                         metric.value.toFixed(2)}
                      </span>
                      <span className={`text-sm ${metric.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {metric.change >= 0 ? '+' : ''}{metric.change.toFixed(2)}{metric.unit}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{metric.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Risk Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {riskAlerts.slice(0, 3).map((alert) => (
                  <div key={alert.id} className={`p-3 border rounded-lg ${!alert.isRead ? 'bg-blue-50' : ''}`}>
                    <div className="flex items-start gap-3">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{alert.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{alert.description}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(alert.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <Badge variant={alert.severity === 'critical' ? 'destructive' : 'outline'}>
                        {alert.severity}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'metrics' && (
        <div className="space-y-6">
          {/* Time Frame Selector */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Time Frame:</span>
            {['1D', '1W', '1M', '3M', '6M', '1Y'].map((period) => (
              <Button
                key={period}
                variant={selectedTimeframe === period ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedTimeframe(period)}
              >
                {period}
              </Button>
            ))}
          </div>

          {/* Detailed Risk Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Risk Metrics Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {riskMetrics.map((metric) => (
                  <div key={metric.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold">{metric.name}</h3>
                        <p className="text-sm text-muted-foreground">{metric.description}</p>
                      </div>
                      {getMetricStatusBadge(metric.status)}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Current Value</p>
                        <p className={`text-lg font-bold ${getMetricStatusColor(metric.status)}`}>
                          {metric.unit === '$' ? `$${metric.value.toLocaleString()}` : 
                           metric.unit === '%' ? `${metric.value.toFixed(1)}%` : 
                           metric.value.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Threshold</p>
                        <p className="text-lg font-medium">
                          {metric.unit === '$' ? `$${metric.threshold.toLocaleString()}` : 
                           metric.unit === '%' ? `${metric.threshold.toFixed(1)}%` : 
                           metric.threshold.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Change</p>
                        <p className={`text-lg font-medium ${metric.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {metric.change >= 0 ? '+' : ''}{metric.change.toFixed(2)}{metric.unit}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Utilization</p>
                        <p className="text-lg font-medium">
                          {((metric.value / metric.threshold) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'stress' && (
        <div className="space-y-6">
          {/* Stress Test Controls */}
          <Card>
            <CardHeader>
              <CardTitle>Stress Test Suite</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <Button>
                  <Play className="h-4 w-4 mr-2" />
                  Run All Tests
                </Button>
                <Button variant="outline">
                  <Calculator className="h-4 w-4 mr-2" />
                  Custom Scenario
                </Button>
                <Button variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh Data
                </Button>
              </div>
              
              <div className="space-y-4">
                {stressTests.map((test) => (
                  <div key={test.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{test.name}</h3>
                        <p className="text-sm text-muted-foreground">{test.scenario}</p>
                      </div>
                      {getStressTestStatusBadge(test.status)}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Portfolio Impact</p>
                        <p className="text-lg font-bold text-red-600">{test.portfolioImpact.toFixed(1)}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Probability</p>
                        <p className="text-lg font-medium">{test.probability.toFixed(1)}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Time Frame</p>
                        <p className="text-lg font-medium">{test.timeframe}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        {test.status === 'completed' && (
                          <Button size="sm" variant="outline">
                            <Play className="h-4 w-4 mr-2" />
                            Rerun
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'allocation' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Risk Allocation by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskAllocations.map((allocation, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{allocation.category}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {allocation.value.toFixed(1)}% of {allocation.limit.toFixed(1)}%
                        </span>
                        <Badge variant={
                          allocation.status === 'within-limit' ? 'default' :
                          allocation.status === 'near-limit' ? 'secondary' : 'destructive'
                        } className={
                          allocation.status === 'within-limit' ? 'bg-green-100 text-green-800' :
                          allocation.status === 'near-limit' ? 'bg-yellow-100 text-yellow-800' : ''
                        }>
                          {allocation.status.replace('-', ' ')}
                        </Badge>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all ${getAllocationStatusColor(allocation.status)}`}
                        style={{ width: `${allocation.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'alerts' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Risk Alert Center</CardTitle>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Alert Settings
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskAlerts.map((alert) => (
                  <div key={alert.id} className={`p-4 border rounded-lg ${!alert.isRead ? 'bg-blue-50 border-blue-200' : ''}`}>
                    <div className="flex items-start gap-3">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{alert.title}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant={alert.severity === 'critical' ? 'destructive' : 'outline'}>
                              {alert.severity}
                            </Badge>
                            {!alert.isRead && (
                              <Badge className="bg-blue-100 text-blue-800">New</Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{alert.description}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">
                            {new Date(alert.timestamp).toLocaleString()}
                          </p>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                            <Button size="sm" variant="outline">
                              <FileText className="h-4 w-4 mr-2" />
                              Generate Report
                            </Button>
                          </div>
                        </div>
                      </div>
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