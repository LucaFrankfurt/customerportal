import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { 
  Bell,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  FileText,
  Calendar,
  MessageCircle,
  Settings,
  CheckCircle2,
  X,
  Filter
} from 'lucide-react'

interface Notification {
  id: string
  title: string
  message: string
  type: 'alert' | 'market' | 'document' | 'meeting' | 'system' | 'performance'
  priority: 'high' | 'medium' | 'low'
  timestamp: string
  isRead: boolean
  actionUrl?: string
  metadata?: {
    portfolioChange?: number
    documentName?: string
    meetingDate?: string
    marketIndex?: string
  }
}

const notifications: Notification[] = [
  {
    id: '1',
    title: 'Portfolio Alert: Significant Movement',
    message: 'Your portfolio has increased by 3.2% today, primarily driven by technology sector gains.',
    type: 'alert',
    priority: 'high',
    timestamp: '2025-09-30T14:30:00Z',
    isRead: false,
    metadata: {
      portfolioChange: 3.2
    }
  },
  {
    id: '2',
    title: 'New Document Available',
    message: 'Your Q3 2025 Portfolio Statement is now available for download.',
    type: 'document',
    priority: 'medium',
    timestamp: '2025-09-30T10:00:00Z',
    isRead: false,
    actionUrl: '/documents',
    metadata: {
      documentName: 'Q3 2025 Portfolio Statement'
    }
  },
  {
    id: '3',
    title: 'Market Update: Federal Reserve Decision',
    message: 'The Federal Reserve has announced its latest interest rate decision. Review the impact on your portfolio.',
    type: 'market',
    priority: 'high',
    timestamp: '2025-09-29T16:00:00Z',
    isRead: true,
    metadata: {
      marketIndex: 'Federal Funds Rate'
    }
  },
  {
    id: '4',
    title: 'Meeting Reminder',
    message: 'Your quarterly portfolio review with Alex Thompson is scheduled for tomorrow at 2:00 PM.',
    type: 'meeting',
    priority: 'medium',
    timestamp: '2025-09-29T09:00:00Z',
    isRead: false,
    metadata: {
      meetingDate: '2025-09-30T14:00:00Z'
    }
  },
  {
    id: '5',
    title: 'Performance Report Generated',
    message: 'Your September performance report shows outperformance of +1.8% vs benchmark.',
    type: 'performance',
    priority: 'medium',
    timestamp: '2025-09-28T11:30:00Z',
    isRead: true,
    metadata: {
      portfolioChange: 1.8
    }
  },
  {
    id: '6',
    title: 'System Maintenance Scheduled',
    message: 'The platform will undergo maintenance on October 1st from 2:00 AM to 4:00 AM EST.',
    type: 'system',
    priority: 'low',
    timestamp: '2025-09-27T15:00:00Z',
    isRead: true
  },
  {
    id: '7',
    title: 'Investment Proposal Pending',
    message: 'A new investment proposal for ESG bond integration is awaiting your review.',
    type: 'alert',
    priority: 'medium',
    timestamp: '2025-09-26T13:45:00Z',
    isRead: false,
    actionUrl: '/proposals'
  },
  {
    id: '8',
    title: 'Market Volatility Alert',
    message: 'Increased volatility detected in emerging markets. Your exposure is within acceptable limits.',
    type: 'market',
    priority: 'medium',
    timestamp: '2025-09-25T08:15:00Z',
    isRead: true,
    metadata: {
      marketIndex: 'Emerging Markets'
    }
  }
]

const typeConfig = {
  alert: { label: 'Alert', icon: AlertTriangle, color: 'bg-red-100 text-red-700' },
  market: { label: 'Market', icon: TrendingUp, color: 'bg-blue-100 text-blue-700' },
  document: { label: 'Document', icon: FileText, color: 'bg-green-100 text-green-700' },
  meeting: { label: 'Meeting', icon: Calendar, color: 'bg-purple-100 text-purple-700' },
  system: { label: 'System', icon: Settings, color: 'bg-gray-100 text-gray-700' },
  performance: { label: 'Performance', icon: TrendingUp, color: 'bg-orange-100 text-orange-700' }
}

const priorityConfig = {
  high: { label: 'High', color: 'bg-red-100 text-red-700' },
  medium: { label: 'Medium', color: 'bg-yellow-100 text-yellow-700' },
  low: { label: 'Low', color: 'bg-gray-100 text-gray-700' }
}

export function Notifications() {
  const [notificationList, setNotificationList] = useState<Notification[]>(notifications)
  const [filter, setFilter] = useState<string>('all')
  const [showUnreadOnly, setShowUnreadOnly] = useState(false)

  const filteredNotifications = notificationList.filter(notification => {
    const matchesType = filter === 'all' || notification.type === filter
    const matchesReadStatus = !showUnreadOnly || !notification.isRead
    return matchesType && matchesReadStatus
  })

  const unreadCount = notificationList.filter(n => !n.isRead).length

  const markAsRead = (id: string) => {
    setNotificationList(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotificationList(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    )
  }

  const deleteNotification = (id: string) => {
    setNotificationList(prev => prev.filter(notification => notification.id !== id))
  }

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  const getNotificationIcon = (type: Notification['type']) => {
    const config = typeConfig[type]
    const IconComponent = config.icon
    return <IconComponent className="h-4 w-4" />
  }

  const renderMetadata = (notification: Notification) => {
    const { metadata } = notification
    if (!metadata) return null

    if (metadata.portfolioChange) {
      const isPositive = metadata.portfolioChange > 0
      return (
        <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {isPositive ? '+' : ''}{metadata.portfolioChange}%
        </div>
      )
    }

    if (metadata.documentName) {
      return (
        <div className="text-sm text-blue-600 font-medium">
          {metadata.documentName}
        </div>
      )
    }

    if (metadata.meetingDate) {
      const meetingDate = new Date(metadata.meetingDate)
      return (
        <div className="text-sm text-purple-600 font-medium">
          {meetingDate.toLocaleDateString()} at {meetingDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      )
    }

    if (metadata.marketIndex) {
      return (
        <div className="text-sm text-blue-600 font-medium">
          {metadata.marketIndex}
        </div>
      )
    }

    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Bell className="h-6 w-6" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {unreadCount} unread
              </Badge>
            )}
          </h2>
          <p className="text-muted-foreground">
            Stay updated with important account and market information
          </p>
        </div>
        {unreadCount > 0 && (
          <Button onClick={markAllAsRead} variant="outline">
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
        )}
      </div>

      {/* Filter Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Filter by type:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'all', label: 'All' },
                { value: 'alert', label: 'Alerts' },
                { value: 'market', label: 'Market' },
                { value: 'document', label: 'Documents' },
                { value: 'meeting', label: 'Meetings' },
                { value: 'performance', label: 'Performance' }
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
            <div className="flex items-center gap-2 ml-auto">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  title="Show only unread notifications"
                  checked={showUnreadOnly}
                  onChange={(e) => setShowUnreadOnly(e.target.checked)}
                  className="rounded"
                />
                Unread only
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        {Object.entries(typeConfig).map(([type, config]) => {
          const count = notificationList.filter(n => n.type === type && !n.isRead).length
          if (count === 0) return null
          
          return (
            <Card key={type} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setFilter(type)}>
              <CardContent className="p-4 text-center">
                <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg mb-2 ${config.color}`}>
                  <config.icon className="h-4 w-4" />
                </div>
                <p className="text-sm font-medium">{config.label}</p>
                <p className="text-xs text-muted-foreground">{count} unread</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Recent Notifications ({filteredNotifications.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No notifications found matching your criteria</p>
              </div>
            ) : (
              filteredNotifications.map((notification) => {
                const config = typeConfig[notification.type]
                const priorityBadge = priorityConfig[notification.priority]
                
                return (
                  <div
                    key={notification.id}
                    className={`relative p-4 border rounded-lg transition-colors hover:bg-muted/50 ${
                      !notification.isRead ? 'bg-blue-50/50 border-blue-200' : ''
                    }`}
                  >
                    {!notification.isRead && (
                      <div className="absolute top-2 left-2 w-2 h-2 bg-blue-600 rounded-full"></div>
                    )}
                    
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${config.color} mt-1`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="font-medium text-foreground pr-4">
                            {notification.title}
                          </h4>
                          <div className="flex items-center gap-2 ml-auto">
                            <Badge variant="outline" className={`text-xs ${config.color}`}>
                              {config.label}
                            </Badge>
                            {notification.priority === 'high' && (
                              <Badge className={`text-xs ${priorityBadge.color}`}>
                                {priorityBadge.label}
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground text-sm mb-2">
                          {notification.message}
                        </p>
                        
                        {renderMetadata(notification)}
                        
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs text-muted-foreground">
                            {formatTimeAgo(notification.timestamp)}
                          </span>
                          
                          <div className="flex items-center gap-2">
                            {notification.actionUrl && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => console.log(`Navigate to ${notification.actionUrl}`)}
                              >
                                View
                              </Button>
                            )}
                            {!notification.isRead && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Mark Read
                              </Button>
                            )}
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => deleteNotification(notification.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}