import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
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
  Download,
  Settings,
  Bell,
  Eye,
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

  const notifications = [
    {
      id: 1,
      type: "alert",
      title: "Quarterly Review Scheduled",
      message: "Your Q3 portfolio review is scheduled for October 5th at 2:00 PM with your advisor Alex Thompson.",
      time: "2 hours ago",
      unread: true
    },
    {
      id: 2,
      type: "market",
      title: "Market Update",
      message: "Tech sector showing strong performance this week. Your MSFT holdings up 4.2%.",
      time: "1 day ago",
      unread: true
    },
    {
      id: 3,
      type: "document",
      title: "New Document Available",
      message: "Your September monthly statement is now available for download.",
      time: "3 days ago",
      unread: false
    }
  ]

  const messages = [
    {
      id: 1,
      from: "Alex Thompson",
      title: "Portfolio Rebalancing Recommendation",
      preview: "Based on recent market conditions, I recommend adjusting your equity allocation...",
      time: "4 hours ago",
      unread: true
    },
    {
      id: 2,
      from: "Asset Capital Research",
      title: "ESG Investment Opportunities",
      preview: "New sustainable investment options available that align with your preferences...",
      time: "2 days ago",
      unread: false
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
              
              {/* Portfolio Management Group */}
              <div className="relative group">
                <button
                  className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    ['overview', 'holdings', 'transactions', 'analytics'].includes(activeTab)
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                  }`}
                >
                  <PieChart className="h-4 w-4" />
                  Portfolio
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div className="absolute top-full left-0 mt-1 w-80 bg-background border rounded-md shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-3">
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'overview', label: 'Overview', icon: PieChart, desc: 'Portfolio summary and performance' },
                        { id: 'holdings', label: 'Holdings', icon: BarChart3, desc: 'View all your investments' },
                        { id: 'transactions', label: 'Transactions', icon: Activity, desc: 'Recent trading activity' },
                        { id: 'analytics', label: 'Performance', icon: LineChart, desc: 'Detailed analytics and charts' }
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

              {/* Investment Tools Group */}
              <div className="relative group">
                <button
                  className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    ['proposals', 'market', 'research', 'risk'].includes(activeTab)
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                  }`}
                >
                  <Lightbulb className="h-4 w-4" />
                  Investment Tools
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div className="absolute top-full left-0 mt-1 w-80 bg-background border rounded-md shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-3">
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'proposals', label: 'Proposals', icon: Lightbulb, desc: 'Investment recommendations' },
                        { id: 'market', label: 'Market Insights', icon: Newspaper, desc: 'Market news & trends' },
                        { id: 'research', label: 'Research Hub', icon: BookOpen, desc: 'Research & analysis' },
                        { id: 'risk', label: 'Risk Management', icon: Shield, desc: 'Portfolio risk monitoring' }
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

              {/* Planning & Reports Group */}
              <div className="relative group">
                <button
                  className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    ['goals', 'tax', 'reports'].includes(activeTab)
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                  }`}
                >
                  <Target className="h-4 w-4" />
                  Planning & Reports
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div className="absolute top-full left-0 mt-1 w-72 bg-background border rounded-md shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-3">
                    <div className="space-y-2">
                      {[
                        { id: 'goals', label: 'Goals & Planning', icon: Target, desc: 'Set and track financial goals' },
                        { id: 'tax', label: 'Tax Center', icon: Calculator, desc: 'Tax optimization and reporting' },
                        { id: 'reports', label: 'Reports', icon: FileText, desc: 'Generate detailed reports' }
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

              {/* Account & Settings Group */}
              <div className="relative group">
                <button
                  className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    ['documents', 'notifications', 'settings'].includes(activeTab)
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
                        { id: 'documents', label: 'Documents', icon: FileText, desc: 'Statements and forms' },
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
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

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className={`p-3 rounded-lg border ${
                    notification.unread ? 'bg-primary/5 border-primary/20' : 'bg-muted/20'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                      </div>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-primary rounded-full mt-1"></div>
                      )}
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  View All Notifications
                </Button>
              </CardContent>
            </Card>

            {/* Messages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Messages
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`p-3 rounded-lg border ${
                    message.unread ? 'bg-primary/5 border-primary/20' : 'bg-muted/20'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-sm">{message.title}</h4>
                          {message.unread && (
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{message.from}</p>
                        <p className="text-xs text-muted-foreground mt-1">{message.preview}</p>
                        <p className="text-xs text-muted-foreground mt-2">{message.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  View All Messages
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Statements
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Review
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  View Research
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => setActiveTab('profile')}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Account Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}