import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { 
  Target, 
  TrendingUp, 
  DollarSign,
  PieChart,
  Calculator,
  Edit,
  CheckCircle,
  Home,
  GraduationCap,
  Plane,
  Heart
} from 'lucide-react'

interface Goal {
  id: string
  name: string
  type: 'retirement' | 'education' | 'home' | 'emergency' | 'travel' | 'other'
  targetAmount: number
  currentAmount: number
  targetDate: string
  monthlyContribution: number
  priority: 'high' | 'medium' | 'low'
  status: 'on-track' | 'behind' | 'ahead' | 'at-risk'
  projectedCompletion: string
}

interface RetirementProjection {
  age: number
  year: number
  portfolioValue: number
  contributions: number
  growthRate: number
  monthlyIncome: number
  confidenceLevel: number
}

export function GoalsPlanning() {
  const [activeTab, setActiveTab] = useState<'goals' | 'planning' | 'projections'>('goals')

  // Mock data for financial goals
  const goals: Goal[] = [
    {
      id: '1',
      name: 'Retirement Fund',
      type: 'retirement',
      targetAmount: 1500000,
      currentAmount: 650000,
      targetDate: '2045-01-01',
      monthlyContribution: 3500,
      priority: 'high',
      status: 'on-track',
      projectedCompletion: '2044-08-15'
    },
    {
      id: '2',
      name: 'Emergency Fund',
      type: 'emergency',
      targetAmount: 50000,
      currentAmount: 42000,
      targetDate: '2025-06-01',
      monthlyContribution: 800,
      priority: 'high',
      status: 'ahead',
      projectedCompletion: '2025-04-15'
    },
    {
      id: '3',
      name: "Children's College Fund",
      type: 'education',
      targetAmount: 200000,
      currentAmount: 85000,
      targetDate: '2035-09-01',
      monthlyContribution: 1200,
      priority: 'medium',
      status: 'behind',
      projectedCompletion: '2036-03-15'
    },
    {
      id: '4',
      name: 'Vacation Home Down Payment',
      type: 'home',
      targetAmount: 100000,
      currentAmount: 25000,
      targetDate: '2028-01-01',
      monthlyContribution: 2000,
      priority: 'low',
      status: 'on-track',
      projectedCompletion: '2027-11-15'
    }
  ]

  // Mock retirement projections
  const retirementProjections: RetirementProjection[] = [
    { age: 65, year: 2045, portfolioValue: 1500000, monthlyIncome: 6250, confidenceLevel: 85, contributions: 0, growthRate: 7.5 },
    { age: 67, year: 2047, portfolioValue: 1680000, monthlyIncome: 7000, confidenceLevel: 90, contributions: 0, growthRate: 7.5 },
    { age: 70, year: 2050, portfolioValue: 1890000, monthlyIncome: 7875, confidenceLevel: 95, contributions: 0, growthRate: 7.5 }
  ]

  const getGoalIcon = (type: string) => {
    switch (type) {
      case 'retirement': return <TrendingUp className="h-5 w-5" />
      case 'education': return <GraduationCap className="h-5 w-5" />
      case 'home': return <Home className="h-5 w-5" />
      case 'emergency': return <Heart className="h-5 w-5" />
      case 'travel': return <Plane className="h-5 w-5" />
      default: return <Target className="h-5 w-5" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'on-track':
        return <Badge className="bg-green-100 text-green-800">On Track</Badge>
      case 'ahead':
        return <Badge className="bg-blue-100 text-blue-800">Ahead</Badge>
      case 'behind':
        return <Badge variant="destructive">Behind</Badge>
      case 'at-risk':
        return <Badge variant="destructive">At Risk</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100)
  }

  const totalGoalProgress = goals.reduce((sum, goal) => {
    return sum + calculateProgress(goal.currentAmount, goal.targetAmount)
  }, 0) / goals.length

  const tabs = [
    { id: 'goals', label: 'Goals Overview', icon: Target },
    { id: 'planning', label: 'Planning Tools', icon: Calculator },
    { id: 'projections', label: 'Projections', icon: TrendingUp }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Goals & Planning</h1>
          <p className="text-muted-foreground mt-1">
            Track your financial goals and plan for the future
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Calculator className="h-4 w-4 mr-2" />
            Goal Calculator
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
                onClick={() => setActiveTab(tab.id as 'goals' | 'planning' | 'projections')}
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
      {activeTab === 'goals' && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Goals</p>
                    <p className="text-2xl font-bold">{goals.length}</p>
                  </div>
                  <Target className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Average Progress</p>
                    <p className="text-2xl font-bold">{totalGoalProgress.toFixed(0)}%</p>
                  </div>
                  <PieChart className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Savings</p>
                    <p className="text-2xl font-bold">
                      ${goals.reduce((sum, goal) => sum + goal.monthlyContribution, 0).toLocaleString()}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">On Track Goals</p>
                    <p className="text-2xl font-bold">
                      {goals.filter(g => g.status === 'on-track' || g.status === 'ahead').length}
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Goals List */}
          <Card>
            <CardHeader>
              <CardTitle>Your Financial Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {goals.map((goal) => {
                  const progress = calculateProgress(goal.currentAmount, goal.targetAmount)
                  return (
                    <div key={goal.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {getGoalIcon(goal.type)}
                          <div>
                            <h3 className="font-semibold">{goal.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              Target: {new Date(goal.targetDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {getStatusBadge(goal.status)}
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress: ${goal.currentAmount.toLocaleString()} of ${goal.targetAmount.toLocaleString()}</span>
                          <span className="font-medium">{progress.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              progress >= 100 ? 'bg-green-500' :
                              progress >= 75 ? 'bg-blue-500' :
                              progress >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Monthly Contribution</p>
                            <p className="font-medium">${goal.monthlyContribution.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Remaining</p>
                            <p className="font-medium">${(goal.targetAmount - goal.currentAmount).toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Priority</p>
                            <p className="font-medium capitalize">{goal.priority}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Projected Completion</p>
                            <p className="font-medium">{new Date(goal.projectedCompletion).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'projections' && (
        <div className="space-y-6">
          {/* Retirement Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Retirement Planning Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-800">Current Age</h3>
                  <p className="text-2xl font-bold text-blue-600">45</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-800">Target Retirement Age</h3>
                  <p className="text-2xl font-bold text-green-600">65</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-semibold text-purple-800">Years to Retirement</h3>
                  <p className="text-2xl font-bold text-purple-600">20</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Retirement Projections */}
          <Card>
            <CardHeader>
              <CardTitle>Retirement Income Projections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {retirementProjections.map((projection, index) => (
                  <div key={projection.age} className={`p-4 border rounded-lg ${index === 0 ? 'border-primary' : ''}`}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold">Age {projection.age} ({projection.year})</h3>
                      <Badge variant={projection.confidenceLevel >= 90 ? 'default' : 'secondary'}>
                        {projection.confidenceLevel}% Confidence
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Projected Portfolio Value</p>
                        <p className="text-2xl font-bold">${projection.portfolioValue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Monthly Income (4% Rule)</p>
                        <p className="text-2xl font-bold text-green-600">${projection.monthlyIncome.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Retirement Planning Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Retirement Planning Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                  <Calculator className="h-6 w-6 mb-2" />
                  <span className="font-semibold">Retirement Calculator</span>
                  <span className="text-sm text-muted-foreground">Calculate retirement needs</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                  <TrendingUp className="h-6 w-6 mb-2" />
                  <span className="font-semibold">Increase Contributions</span>
                  <span className="text-sm text-muted-foreground">Optimize retirement savings</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'planning' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <Calculator className="h-12 w-12 mx-auto text-primary" />
                  <h3 className="font-semibold">Goal Calculator</h3>
                  <p className="text-sm text-muted-foreground">Calculate how much you need to save monthly to reach your goals</p>
                  <Button className="w-full">Use Calculator</Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <TrendingUp className="h-12 w-12 mx-auto text-primary" />
                  <h3 className="font-semibold">Retirement Planner</h3>
                  <p className="text-sm text-muted-foreground">Plan your retirement strategy and income needs</p>
                  <Button className="w-full">Plan Retirement</Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <PieChart className="h-12 w-12 mx-auto text-primary" />
                  <h3 className="font-semibold">Asset Allocation</h3>
                  <p className="text-sm text-muted-foreground">Optimize your portfolio allocation for your goals</p>
                  <Button className="w-full">Optimize Portfolio</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}