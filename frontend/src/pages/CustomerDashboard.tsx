import { useState } from 'react'
import { Button } from '../components/ui/button'
import { StatCard } from '../components/StatCard'
import { Header } from '../components/Header'
import { Chat } from '../components/Chat'
import { ScheduleMeeting } from '../components/ScheduleMeeting'
import { DocumentCenter } from '../components/DocumentCenter'
import { PerformanceAnalytics } from '../components/PerformanceAnalytics'
import { MarketInsights } from '../components/MarketInsights'
import { InvestmentProposals } from '../components/InvestmentProposals'
import { AccountSettings } from '../components/AccountSettings'
import { Notifications } from '../components/Notifications'
import { TaxCenter } from '../components/TaxCenter'
import { GoalsPlanning } from '../components/GoalsPlanning'
import { ReportsAnalytics } from '../components/ReportsAnalytics'
import { RiskManagement } from '../components/RiskManagement'
import { ResearchHub } from '../components/ResearchHub'
import { Holdings } from '../components/Holdings'
import { Transactions } from '../components/Transactions'
import { Overview } from '../components/Overview'
import { Profile } from '../components/Profile'
import { 
  DollarSign, 
  TrendingUp,
  PieChart,
  FileText,
  MessageCircle,
  Calendar,
  Settings,
  Bell,
  BarChart3,
  Activity,
  Shield,
  LineChart,
  Lightbulb,
  Newspaper,
  Calculator,
  Target,
  BookOpen
} from 'lucide-react'

export function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data for customer dashboard
  const portfolioStats = [
    {
      title: "Total Portfolio Value",
      value: "$2,847,320",
      change: "+$87,450 (3.17%)",
      changeType: "positive" as const,
      icon: DollarSign
    },
    {
      title: "YTD Performance",
      value: "+12.4%",
      change: "+2.1% this month",
      changeType: "positive" as const,
      icon: TrendingUp
    },
    {
      title: "Risk Score",
      value: "7.2/10",
      change: "Moderate risk",
      changeType: "neutral" as const,
      icon: Activity
    },
    {
      title: "Total Contributions",
      value: "$1,250,000",
      change: "+$50K this year",
      changeType: "positive" as const,
      icon: PieChart
    }
  ]

  

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Good afternoon, Sarah</h1>
              <p className="text-muted-foreground">Here's your portfolio summary for today.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setActiveTab('schedule')}>
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Meeting
              </Button>
              <Button variant="outline" onClick={() => setActiveTab('messages')}>
                <MessageCircle className="h-4 w-4 mr-2" />
                Messages
              </Button>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Portfolio Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {portfolioStats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Grouped Navigation Menu */}
        <div className="mb-8">
          <div className="border-b">
            <nav className="-mb-px flex space-x-6 flex-wrap gap-y-2">
              
              {/* Performance Group */}
              <div className="relative group">
                <button
                  className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    ['overview', 'analytics'].includes(activeTab)
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                  }`}
                >
                  <LineChart className="h-4 w-4" />
                  Performance
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div className="absolute top-full left-0 mt-1 w-72 bg-background border rounded-md shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-3">
                    <div className="space-y-2">
                      {[
                        { id: 'overview', label: 'Overview', icon: PieChart, desc: 'Portfolio summary and performance' },
                        { id: 'analytics', label: 'Analytics', icon: LineChart, desc: 'Detailed analytics and charts' }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-start gap-3 p-3 text-sm hover:bg-accent rounded-md ${
                            activeTab === tab.id ? 'bg-accent text-primary font-medium' : 'text-foreground'
                          }`}
                        >
                          <tab.icon className="h-5 w-5 mt-0.5" />
                          <div className="text-left">
                            <div className="font-medium">{tab.label}</div>
                            <div className="text-xs text-muted-foreground">{tab.desc}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Risk Group */}
              <div className="relative group">
                <button
                  className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    ['risk'].includes(activeTab)
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                  }`}
                >
                  <Shield className="h-4 w-4" />
                  Risk
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div className="absolute top-full left-0 mt-1 w-72 bg-background border rounded-md shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-3">
                    <div className="space-y-2">
                      {[
                        { id: 'risk', label: 'Risk Management', icon: Shield, desc: 'Portfolio risk monitoring' }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-start gap-3 p-3 text-sm hover:bg-accent rounded-md ${
                            activeTab === tab.id ? 'bg-accent text-primary font-medium' : 'text-foreground'
                          }`}
                        >
                          <tab.icon className="h-5 w-5 mt-0.5" />
                          <div className="text-left">
                            <div className="font-medium">{tab.label}</div>
                            <div className="text-xs text-muted-foreground">{tab.desc}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Holdings Group */}
              <div className="relative group">
                <button
                  className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    ['holdings'].includes(activeTab)
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                  }`}
                >
                  <BarChart3 className="h-4 w-4" />
                  Holdings
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div className="absolute top-full left-0 mt-1 w-72 bg-background border rounded-md shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-3">
                    <div className="space-y-2">
                      {[
                        { id: 'holdings', label: 'Holdings', icon: BarChart3, desc: 'View all your investments' }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-start gap-3 p-3 text-sm hover:bg-accent rounded-md ${
                            activeTab === tab.id ? 'bg-accent text-primary font-medium' : 'text-foreground'
                          }`}
                        >
                          <tab.icon className="h-5 w-5 mt-0.5" />
                          <div className="text-left">
                            <div className="font-medium">{tab.label}</div>
                            <div className="text-xs text-muted-foreground">{tab.desc}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Transactions Group */}
              <div className="relative group">
                <button
                  className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    ['transactions'].includes(activeTab)
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                  }`}
                >
                  <Activity className="h-4 w-4" />
                  Transactions
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div className="absolute top-full left-0 mt-1 w-72 bg-background border rounded-md shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-3">
                    <div className="space-y-2">
                      {[
                        { id: 'transactions', label: 'Transactions', icon: Activity, desc: 'Recent trading activity' }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-start gap-3 p-3 text-sm hover:bg-accent rounded-md ${
                            activeTab === tab.id ? 'bg-accent text-primary font-medium' : 'text-foreground'
                          }`}
                        >
                          <tab.icon className="h-5 w-5 mt-0.5" />
                          <div className="text-left">
                            <div className="font-medium">{tab.label}</div>
                            <div className="text-xs text-muted-foreground">{tab.desc}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ESG Group */}
              <div className="relative group">
                <button
                  className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    ['market', 'research', 'proposals'].includes(activeTab)
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                  }`}
                >
                  <BookOpen className="h-4 w-4" />
                  ESG
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div className="absolute top-full left-0 mt-1 w-72 bg-background border rounded-md shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-3">
                    <div className="space-y-2">
                      {[
                        { id: 'proposals', label: 'Investment Proposals', icon: Lightbulb, desc: 'Investment recommendations' },
                        { id: 'market', label: 'Market Insights', icon: Newspaper, desc: 'Market news & trends' },
                        { id: 'research', label: 'Research Hub', icon: BookOpen, desc: 'Research & analysis' }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-start gap-3 p-3 text-sm hover:bg-accent rounded-md ${
                            activeTab === tab.id ? 'bg-accent text-primary font-medium' : 'text-foreground'
                          }`}
                        >
                          <tab.icon className="h-5 w-5 mt-0.5" />
                          <div className="text-left">
                            <div className="font-medium">{tab.label}</div>
                            <div className="text-xs text-muted-foreground">{tab.desc}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Report Management Group */}
              <div className="relative group">
                <button
                  className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    ['reports', 'tax', 'goals', 'documents'].includes(activeTab)
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                  }`}
                >
                  <FileText className="h-4 w-4" />
                  Report Management
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div className="absolute top-full left-0 mt-1 w-80 bg-background border rounded-md shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-3">
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'reports', label: 'Reports', icon: FileText, desc: 'Generate detailed reports' },
                        { id: 'tax', label: 'Tax Center', icon: Calculator, desc: 'Tax optimization and reporting' },
                        { id: 'goals', label: 'Goals & Planning', icon: Target, desc: 'Set and track financial goals' },
                        { id: 'documents', label: 'Documents', icon: FileText, desc: 'Statements and forms' }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex items-start gap-3 p-3 text-sm hover:bg-accent rounded-md ${
                            activeTab === tab.id ? 'bg-accent text-primary font-medium' : 'text-foreground'
                          }`}
                        >
                          <tab.icon className="h-5 w-5 mt-0.5" />
                          <div className="text-left">
                            <div className="font-medium">{tab.label}</div>
                            <div className="text-xs text-muted-foreground">{tab.desc}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Communication Group */}
              <div className="relative group">
                <button
                  className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    ['schedule', 'messages'].includes(activeTab)
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                  }`}
                >
                  <MessageCircle className="h-4 w-4" />
                  Communication
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div className="absolute top-full left-0 mt-1 w-72 bg-background border rounded-md shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-3">
                    <div className="space-y-2">
                      {[
                        { id: 'schedule', label: 'Schedule Meeting', icon: Calendar, desc: 'Book appointments with advisors' },
                        { id: 'messages', label: 'Messages', icon: MessageCircle, desc: 'Chat and communicate' }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-start gap-3 p-3 text-sm hover:bg-accent rounded-md ${
                            activeTab === tab.id ? 'bg-accent text-primary font-medium' : 'text-foreground'
                          }`}
                        >
                          <tab.icon className="h-5 w-5 mt-0.5" />
                          <div className="text-left">
                            <div className="font-medium">{tab.label}</div>
                            <div className="text-xs text-muted-foreground">{tab.desc}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Group */}
              <div className="relative group">
                <button
                  className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    ['notifications', 'settings', 'profile'].includes(activeTab)
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                  }`}
                >
                  <Settings className="h-4 w-4" />
                  Account
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div className="absolute top-full left-0 mt-1 w-72 bg-background border rounded-md shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-3">
                    <div className="space-y-2">
                      {[
                        { id: 'profile', label: 'Profile', icon: Settings, desc: 'Personal information' },
                        { id: 'notifications', label: 'Notifications', icon: Bell, desc: 'Alerts and updates' },
                        { id: 'settings', label: 'Settings', icon: Settings, desc: 'Account preferences' }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-start gap-3 p-3 text-sm hover:bg-accent rounded-md ${
                            activeTab === tab.id ? 'bg-accent text-primary font-medium' : 'text-foreground'
                          }`}
                        >
                          <tab.icon className="h-5 w-5 mt-0.5" />
                          <div className="text-left">
                            <div className="font-medium">{tab.label}</div>
                            <div className="text-xs text-muted-foreground">{tab.desc}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="space-y-6">
            {activeTab === 'overview' && (
              <Overview />
            )}

            {activeTab === 'holdings' && (
              <Holdings />
            )}

            {activeTab === 'transactions' && (
              <Transactions />
            )}

            {activeTab === 'schedule' && (
              <ScheduleMeeting />
            )}

            {activeTab === 'messages' && (
              <div className="bg-card rounded-lg">
                <Chat userType="customer" customerName="Sarah Johnson" advisorName="Alex Thompson" />
              </div>
            )}

            {activeTab === 'profile' && (
              <Profile />
            )}

            {activeTab === 'analytics' && (
              <PerformanceAnalytics />
            )}

            {activeTab === 'proposals' && (
              <InvestmentProposals />
            )}

            {activeTab === 'market' && (
              <MarketInsights />
            )}

            {activeTab === 'documents' && (
              <DocumentCenter />
            )}

            {activeTab === 'notifications' && (
              <Notifications />
            )}

            {activeTab === 'settings' && (
              <AccountSettings />
            )}

            {activeTab === 'tax' && (
              <TaxCenter />
            )}

            {activeTab === 'goals' && (
              <GoalsPlanning />
            )}

            {activeTab === 'reports' && (
              <ReportsAnalytics />
            )}

            {activeTab === 'risk' && (
              <RiskManagement />
            )}

            {activeTab === 'research' && (
              <ResearchHub />
            )}
        </div>
      
      </main>
    </div>
  )
}