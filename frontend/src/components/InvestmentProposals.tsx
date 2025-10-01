import { useState } from 'react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { 
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  AlertTriangle,
  Calendar,
  DollarSign,
  BarChart3,
  Target,
  Eye
} from 'lucide-react'

interface InvestmentProposal {
  id: string
  title: string
  description: string
  advisor: string
  proposedDate: string
  expectedReturn: number
  riskLevel: 'low' | 'medium' | 'high'
  investmentAmount: number
  status: 'pending' | 'approved' | 'rejected' | 'implemented'
  category: 'rebalancing' | 'new-investment' | 'divestment' | 'tax-optimization'
  rationale: string
  timeline: string
  impactAnalysis: {
    expectedReturn: number
    riskImpact: string
    liquidityImpact: string
    taxImplications: string
  }
  allocations: Array<{
    asset: string
    currentAllocation: number
    proposedAllocation: number
    change: number
  }>
}

const investmentProposals: InvestmentProposal[] = [
  {
    id: '1',
    title: 'Technology Sector Rebalancing',
    description: 'Recommended rebalancing of technology holdings to capture emerging AI and cloud computing opportunities while reducing exposure to legacy hardware.',
    advisor: 'Alex Thompson',
    proposedDate: '2025-09-30T10:00:00Z',
    expectedReturn: 8.5,
    riskLevel: 'medium',
    investmentAmount: 250000,
    status: 'pending',
    category: 'rebalancing',
    rationale: 'Recent technology sector analysis indicates strong growth potential in AI and cloud infrastructure. Current portfolio is overweight in traditional hardware companies that may face margin pressure.',
    timeline: '2-3 weeks for full implementation',
    impactAnalysis: {
      expectedReturn: 8.5,
      riskImpact: 'Slight increase in portfolio volatility (+0.3%)',
      liquidityImpact: 'No impact on overall portfolio liquidity',
      taxImplications: 'Minimal tax impact due to tax-loss harvesting opportunities'
    },
    allocations: [
      { asset: 'Technology ETF (VGT)', currentAllocation: 12.5, proposedAllocation: 8.0, change: -4.5 },
      { asset: 'Cloud Computing (SKYY)', currentAllocation: 3.2, proposedAllocation: 6.0, change: 2.8 },
      { asset: 'AI & Robotics (ROBO)', currentAllocation: 1.5, proposedAllocation: 4.5, change: 3.0 },
      { asset: 'Semiconductor (SMH)', currentAllocation: 4.8, proposedAllocation: 3.0, change: -1.8 }
    ]
  },
  {
    id: '2',
    title: 'ESG Bond Integration',
    description: 'Introduction of ESG-focused bonds to the fixed income allocation, replacing some traditional corporate bonds.',
    advisor: 'Sarah Rodriguez',
    proposedDate: '2025-09-28T14:30:00Z',
    expectedReturn: 4.2,
    riskLevel: 'low',
    investmentAmount: 150000,
    status: 'pending',
    category: 'new-investment',
    rationale: 'ESG bonds offer competitive yields while aligning with your sustainability objectives. Current corporate bond holdings have limited ESG screening.',
    timeline: '1-2 weeks for execution',
    impactAnalysis: {
      expectedReturn: 4.2,
      riskImpact: 'Minimal change to overall risk profile',
      liquidityImpact: 'ESG bonds maintain similar liquidity characteristics',
      taxImplications: 'Tax-efficient bond selection to minimize current income'
    },
    allocations: [
      { asset: 'Corporate Bonds', currentAllocation: 15.0, proposedAllocation: 10.0, change: -5.0 },
      { asset: 'ESG Corporate Bonds', currentAllocation: 0.0, proposedAllocation: 5.0, change: 5.0 }
    ]
  },
  {
    id: '3',
    title: 'International Diversification Enhancement',
    description: 'Increase exposure to emerging markets and European equities to improve geographic diversification.',
    advisor: 'Michael Chen',
    proposedDate: '2025-09-25T11:15:00Z',
    expectedReturn: 12.3,
    riskLevel: 'high',
    investmentAmount: 300000,
    status: 'approved',
    category: 'new-investment',
    rationale: 'Portfolio is currently overweight in US equities. International markets offer attractive valuations and diversification benefits.',
    timeline: '3-4 weeks for phased implementation',
    impactAnalysis: {
      expectedReturn: 12.3,
      riskImpact: 'Increased short-term volatility but improved long-term risk-adjusted returns',
      liquidityImpact: 'Slight reduction in liquidity for emerging market positions',
      taxImplications: 'Foreign tax credits may apply; overall tax efficiency maintained'
    },
    allocations: [
      { asset: 'US Large Cap', currentAllocation: 35.0, proposedAllocation: 30.0, change: -5.0 },
      { asset: 'European Equities', currentAllocation: 8.0, proposedAllocation: 11.0, change: 3.0 },
      { asset: 'Emerging Markets', currentAllocation: 5.0, proposedAllocation: 7.0, change: 2.0 }
    ]
  },
  {
    id: '4',
    title: 'Tax Loss Harvesting Opportunity',
    description: 'Strategic sale of underperforming positions to realize tax losses while maintaining portfolio exposure.',
    advisor: 'David Park',
    proposedDate: '2025-09-20T16:45:00Z',
    expectedReturn: 0.0,
    riskLevel: 'low',
    investmentAmount: 75000,
    status: 'implemented',
    category: 'tax-optimization',
    rationale: 'Several positions have unrealized losses that can be harvested for tax benefits while maintaining similar market exposure through alternative securities.',
    timeline: 'Completed on September 22, 2025',
    impactAnalysis: {
      expectedReturn: 0.0,
      riskImpact: 'No change to overall risk profile',
      liquidityImpact: 'No impact on portfolio liquidity',
      taxImplications: 'Estimated $18,000 in tax loss benefits for current year'
    },
    allocations: [
      { asset: 'Growth Stock A', currentAllocation: 2.5, proposedAllocation: 0.0, change: -2.5 },
      { asset: 'Similar Growth Stock B', currentAllocation: 0.0, proposedAllocation: 2.5, change: 2.5 }
    ]
  }
]

const statusConfig = {
  pending: { label: 'Pending Review', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
  approved: { label: 'Approved', color: 'bg-green-100 text-green-700', icon: CheckCircle2 },
  rejected: { label: 'Rejected', color: 'bg-red-100 text-red-700', icon: XCircle },
  implemented: { label: 'Implemented', color: 'bg-blue-100 text-blue-700', icon: CheckCircle2 }
}

const riskConfig = {
  low: { label: 'Low Risk', color: 'bg-green-100 text-green-700' },
  medium: { label: 'Medium Risk', color: 'bg-yellow-100 text-yellow-700' },
  high: { label: 'High Risk', color: 'bg-red-100 text-red-700' }
}

const categoryConfig = {
  rebalancing: { label: 'Rebalancing', icon: BarChart3 },
  'new-investment': { label: 'New Investment', icon: TrendingUp },
  divestment: { label: 'Divestment', icon: TrendingUp },
  'tax-optimization': { label: 'Tax Optimization', icon: Target }
}

export function InvestmentProposals() {
  const [selectedProposal, setSelectedProposal] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>('all')

  const filteredProposals = investmentProposals.filter(proposal => {
    if (filter === 'all') return true
    return proposal.status === filter
  })

  const handleApprove = (id: string) => {
    console.log(`Approving proposal ${id}`)
    // Here you would make an API call to approve the proposal
  }

  const handleReject = (id: string) => {
    console.log(`Rejecting proposal ${id}`)
    // Here you would make an API call to reject the proposal
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Investment Proposals</h2>
          <p className="text-muted-foreground">
            Review and approve investment recommendations from your advisory team
          </p>
        </div>
      </div>

      {/* Filter Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-muted-foreground">Filter by status:</span>
            {[
              { value: 'all', label: 'All Proposals' },
              { value: 'pending', label: 'Pending' },
              { value: 'approved', label: 'Approved' },
              { value: 'implemented', label: 'Implemented' }
            ].map((option) => (
              <Button
                key={option.value}
                variant={filter === option.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Reviews</p>
                <p className="text-2xl font-bold text-foreground">
                  {investmentProposals.filter(p => p.status === 'pending').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold text-foreground">
                  {formatCurrency(investmentProposals.reduce((sum, p) => sum + p.investmentAmount, 0))}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Expected Return</p>
                <p className="text-2xl font-bold text-foreground">
                  {((investmentProposals.reduce((sum, p) => sum + p.expectedReturn, 0) / investmentProposals.length)).toFixed(1)}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">High Risk</p>
                <p className="text-2xl font-bold text-foreground">
                  {investmentProposals.filter(p => p.riskLevel === 'high').length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Proposals List */}
      <div className="space-y-4">
        {filteredProposals.map((proposal) => {
          const StatusIcon = statusConfig[proposal.status].icon
          const CategoryIcon = categoryConfig[proposal.category].icon
          const isExpanded = selectedProposal === proposal.id

          return (
            <Card key={proposal.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CategoryIcon className="h-5 w-5 text-muted-foreground" />
                        <h3 className="text-lg font-semibold text-foreground">
                          {proposal.title}
                        </h3>
                        <Badge className={`${statusConfig[proposal.status].color}`}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusConfig[proposal.status].label}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-3">{proposal.description}</p>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-muted rounded-lg">
                    <div>
                      <p className="text-xs text-muted-foreground">Investment Amount</p>
                      <p className="font-semibold">{formatCurrency(proposal.investmentAmount)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Expected Return</p>
                      <p className="font-semibold">{proposal.expectedReturn}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Risk Level</p>
                      <Badge className={`${riskConfig[proposal.riskLevel].color} text-xs`}>
                        {riskConfig[proposal.riskLevel].label}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Proposed By</p>
                      <p className="font-semibold text-sm">{proposal.advisor}</p>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="space-y-4 border-t pt-4">
                      <div>
                        <h4 className="font-semibold mb-2">Investment Rationale</h4>
                        <p className="text-muted-foreground">{proposal.rationale}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Impact Analysis</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium">Expected Return</p>
                            <p className="text-sm text-muted-foreground">{proposal.impactAnalysis.expectedReturn}% annually</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Risk Impact</p>
                            <p className="text-sm text-muted-foreground">{proposal.impactAnalysis.riskImpact}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Liquidity Impact</p>
                            <p className="text-sm text-muted-foreground">{proposal.impactAnalysis.liquidityImpact}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Tax Implications</p>
                            <p className="text-sm text-muted-foreground">{proposal.impactAnalysis.taxImplications}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Proposed Allocation Changes</h4>
                        <div className="space-y-2">
                          {proposal.allocations.map((allocation, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                              <span className="font-medium">{allocation.asset}</span>
                              <div className="flex items-center gap-4 text-sm">
                                <span>{allocation.currentAllocation}%</span>
                                <span>→</span>
                                <span>{allocation.proposedAllocation}%</span>
                                <Badge 
                                  variant={allocation.change > 0 ? 'default' : 'secondary'}
                                  className="text-xs"
                                >
                                  {allocation.change > 0 ? '+' : ''}{allocation.change}%
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Proposed: {formatDate(proposal.proposedDate)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Timeline: {proposal.timeline}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedProposal(isExpanded ? null : proposal.id)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      {isExpanded ? 'Show Less' : 'View Details'}
                    </Button>

                    {proposal.status === 'pending' && (
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReject(proposal.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleApprove(proposal.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}