import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { StatCard } from '../components/StatCard'
import { Header } from '../components/Header'
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2,
  Clock,
  Search,
  Filter,
  MoreHorizontal,
  Mail,
  Phone,
  Calendar,
  FileText,
  User,
  Edit,
  Save,
  X
} from 'lucide-react'

interface ClientData {
  id: number
  name: string
  contact: string
  aum: string
  status: string
  lastContact: string
  priority: string
  performance: string
}

export function EmployeeDashboard() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isStartingChat, setIsStartingChat] = useState<number | null>(null)
  const [editingClient, setEditingClient] = useState<number | null>(null)
  const [editFormData, setEditFormData] = useState<Partial<ClientData>>({})
  const [isSaving, setIsSaving] = useState(false)

  // Handler for starting a chat with a client
  const handleStartChat = async (clientId: number, clientName: string) => {
    try {
      setIsStartingChat(clientId)
      
      // TODO: Replace with actual API call to backend
      // const response = await fetch('/api/conversations/client/' + clientId, {
      //   method: 'POST',
      //   headers: { 'Authorization': `Bearer ${token}` }
      // })
      // const { conversationId } = await response.json()
      // window.location.href = `/customer-chat/${conversationId}`
      
      // Temporary: simulate API call and use client name (for demo purposes)
      await new Promise(resolve => setTimeout(resolve, 500))
      window.location.href = `/customer-chat/${encodeURIComponent(clientName)}`
      
    } catch (error) {
      console.error('Failed to start chat:', error)
      // TODO: Show error message to user
    } finally {
      setIsStartingChat(null)
    }
  }

  // Handler for editing client data
  const handleEditClient = (client: ClientData) => {
    setEditingClient(client.id)
    setEditFormData({ ...client })
  }

  // Handler for saving client changes
  const handleSaveClient = async () => {
    try {
      setIsSaving(true)
      
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/clients/${editingClient}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify(editFormData)
      // })
      // 
      // if (!response.ok) throw new Error('Failed to update client')
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update local data (in real app, refetch from server)
      console.log('Client updated:', editFormData)
      
      setEditingClient(null)
      setEditFormData({})
    } catch (error) {
      console.error('Failed to save client:', error)
      // TODO: Show error message to user
    } finally {
      setIsSaving(false)
    }
  }

  // Handler for canceling edit
  const handleCancelEdit = () => {
    setEditingClient(null)
    setEditFormData({})
  }

  // Mock data for employee dashboard
  const stats = [
    {
      title: "Total Clients",
      value: "47",
      change: "+3 this month",
      changeType: "positive" as const,
      icon: Users,
      description: "Active institutional clients"
    },
    {
      title: "Assets Under Management",
      value: "$2.4B",
      change: "+12.5% vs last quarter",
      changeType: "positive" as const,
      icon: DollarSign,
      description: "Total client assets"
    },
    {
      title: "Performance",
      value: "8.7%",
      change: "+2.1% vs benchmark",
      changeType: "positive" as const,
      icon: TrendingUp,
      description: "YTD portfolio performance"
    },
    {
      title: "Open Tasks",
      value: "12",
      change: "3 urgent",
      changeType: "negative" as const,
      icon: AlertCircle,
      description: "Pending client actions"
    }
  ]

  const recentClients = [
    {
      id: 1001, // Use proper client IDs instead of simple increments
      name: "Meridian Pension Fund",
      contact: "Sarah Johnson",
      aum: "$450M",
      status: "Active",
      lastContact: "2 days ago",
      priority: "High",
      performance: "+12.3%"
    },
    {
      id: 1002,
      name: "Global University Endowment",
      contact: "Michael Chen",
      aum: "$280M",
      status: "Review Pending",
      lastContact: "1 week ago",
      priority: "Medium",
      performance: "+8.9%"
    },
    {
      id: 1003,
      name: "Sterling Insurance Corp",
      contact: "Emily Rodriguez",
      aum: "$320M",
      status: "Active",
      lastContact: "Yesterday",
      priority: "Low",
      performance: "+15.1%"
    },
    {
      id: 1004,
      name: "Pacific Health System",
      contact: "David Kim",
      aum: "$190M",
      status: "Onboarding",
      lastContact: "3 days ago",
      priority: "High",
      performance: "N/A"
    }
  ]

  const notifications = [
    {
      id: 1,
      type: "urgent",
      title: "Client Review Meeting",
      message: "Meridian Pension Fund quarterly review scheduled for tomorrow at 2 PM",
      time: "10 minutes ago",
      action: "Prepare Report"
    },
    {
      id: 2,
      type: "info",
      title: "Performance Alert",
      message: "Sterling Insurance Corp portfolio exceeded target by 2.1%",
      time: "2 hours ago",
      action: "Send Update"
    },
    {
      id: 3,
      type: "task",
      title: "Documentation Required",
      message: "Pacific Health System onboarding documents pending review",
      time: "1 day ago",
      action: "Review Docs"
    }
  ]

  const openTasks = [
    {
      id: 1,
      client: "Meridian Pension Fund",
      task: "Prepare Q3 Performance Report",
      due: "Tomorrow",
      priority: "High",
      type: "Report"
    },
    {
      id: 2,
      client: "Global University Endowment",
      task: "ESG Compliance Review",
      due: "In 3 days",
      priority: "Medium",
      type: "Compliance"
    },
    {
      id: 3,
      client: "Sterling Insurance Corp",
      task: "Rebalancing Recommendation",
      due: "Next week",
      priority: "Low",
      type: "Advisory"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, Alex</h1>
          <p className="text-muted-foreground">Here's what's happening with your institutional clients today.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Recent Notifications */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="border-l-4 border-primary pl-4 py-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                      </div>
                      <Button size="sm" variant="outline" className="ml-2">
                        {notification.action}
                      </Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4">
                  View All Notifications
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Open Tasks */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  Open Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {openTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <h4 className="font-medium">{task.task}</h4>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            task.priority === 'High' ? 'bg-red-100 text-red-800' :
                            task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {task.priority}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">Client: {task.client}</p>
                        <p className="text-xs text-muted-foreground">Due: {task.due}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Clock className="h-4 w-4 mr-1" />
                          Reschedule
                        </Button>
                        <Button size="sm">
                          Complete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Tasks
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Client Overview */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Client Overview
              </CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search clients..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Client</th>
                    <th className="text-left py-3 px-4 font-medium">Contact</th>
                    <th className="text-left py-3 px-4 font-medium">AUM</th>
                    <th className="text-left py-3 px-4 font-medium">Performance</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                    <th className="text-left py-3 px-4 font-medium">Last Contact</th>
                    <th className="text-left py-3 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentClients.map((client) => (
                    <tr key={client.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">
                        {editingClient === client.id ? (
                          <div className="space-y-2">
                            <Input
                              value={editFormData.name || ''}
                              onChange={(e) => setEditFormData(prev => ({ ...prev, name: e.target.value }))}
                              className="text-sm"
                              placeholder="Client name"
                            />
                            <select
                              value={editFormData.priority || ''}
                              onChange={(e) => setEditFormData(prev => ({ ...prev, priority: e.target.value }))}
                              className="text-xs px-2 py-1 rounded border bg-background"
                              aria-label="Client priority"
                            >
                              <option value="High">High Priority</option>
                              <option value="Medium">Medium Priority</option>
                              <option value="Low">Low Priority</option>
                            </select>
                          </div>
                        ) : (
                          <div>
                            <div className="font-medium">{client.name}</div>
                            <div className={`text-xs px-2 py-1 rounded-full inline-block mt-1 ${
                              client.priority === 'High' ? 'bg-red-100 text-red-800' :
                              client.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {client.priority} Priority
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {editingClient === client.id ? (
                          <Input
                            value={editFormData.contact || ''}
                            onChange={(e) => setEditFormData(prev => ({ ...prev, contact: e.target.value }))}
                            className="text-sm"
                            placeholder="Contact name"
                          />
                        ) : (
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            {client.contact}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {editingClient === client.id ? (
                          <Input
                            value={editFormData.aum || ''}
                            onChange={(e) => setEditFormData(prev => ({ ...prev, aum: e.target.value }))}
                            className="text-sm font-medium"
                            placeholder="Assets under management"
                          />
                        ) : (
                          <span className="font-medium">{client.aum}</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-green-600 font-medium">{client.performance}</span>
                      </td>
                      <td className="py-3 px-4">
                        {editingClient === client.id ? (
                          <select
                            value={editFormData.status || ''}
                            onChange={(e) => setEditFormData(prev => ({ ...prev, status: e.target.value }))}
                            className="px-2 py-1 text-xs rounded border bg-background"
                            aria-label="Client status"
                          >
                            <option value="Active">Active</option>
                            <option value="Review Pending">Review Pending</option>
                            <option value="Onboarding">Onboarding</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        ) : (
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            client.status === 'Active' ? 'bg-green-100 text-green-800' :
                            client.status === 'Review Pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {client.status}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{client.lastContact}</td>
                      <td className="py-3 px-4">
                        {editingClient === client.id ? (
                          <div className="flex gap-1">
                            <Button 
                              size="sm" 
                              onClick={handleSaveClient}
                              disabled={isSaving}
                              title="Save changes"
                            >
                              <Save className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={handleCancelEdit}
                              disabled={isSaving}
                              title="Cancel edit"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex gap-1">
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => handleEditClient(client)}
                              title="Edit client"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => handleStartChat(client.id, client.contact)}
                              title="Message client"
                              disabled={isStartingChat === client.id}
                            >
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Phone className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Calendar className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-muted-foreground">Showing 4 of 47 clients</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}