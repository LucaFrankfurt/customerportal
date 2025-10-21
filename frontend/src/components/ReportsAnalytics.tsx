import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter,
  Search,
  BarChart3,
  PieChart,
  TrendingUp,
  FileSpreadsheet,
  
  Mail,
  Settings,
  Clock,
  CheckCircle,
  Eye
} from 'lucide-react'

interface Report {
  id: string
  name: string
  type: 'performance' | 'holdings' | 'compliance' | 'tax' | 'custom'
  description: string
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annually' | 'on-demand'
  lastGenerated: string
  format: 'pdf' | 'excel' | 'csv'
  status: 'ready' | 'generating' | 'scheduled'
  size?: string
}

interface ReportTemplate {
  id: string
  name: string
  description: string
  category: 'standard' | 'regulatory' | 'custom'
  complexity: 'basic' | 'advanced' | 'comprehensive'
}

interface ScheduledReport {
  id: string
  reportId: string
  name: string
  schedule: string
  nextRun: string
  recipients: string[]
  isActive: boolean
}

export const ReportsAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')

  // Mock data for reports
  const reports: Report[] = [
    {
      id: '1',
      name: 'Monthly Performance Report',
      type: 'performance',
      description: 'Comprehensive performance analysis with benchmarks and attribution',
      frequency: 'monthly',
      lastGenerated: '2024-09-30',
      format: 'pdf',
      status: 'ready',
      size: '2.4 MB'
    },
    {
      id: '2',
      name: 'Portfolio Holdings Summary',
      type: 'holdings',
      description: 'Current portfolio positions and allocations',
      frequency: 'weekly',
      lastGenerated: '2024-09-27',
      format: 'excel',
      status: 'ready',
      size: '856 KB'
    },
    {
      id: '3',
      name: 'Quarterly Compliance Report',
      type: 'compliance',
      description: 'Regulatory compliance and fiduciary reporting',
      frequency: 'quarterly',
      lastGenerated: '2024-09-30',
      format: 'pdf',
      status: 'generating',
      size: '1.8 MB'
    },
    {
      id: '4',
      name: 'Tax Loss Harvesting Analysis',
      type: 'tax',
      description: 'Tax optimization opportunities and realized gains/losses',
      frequency: 'monthly',
      lastGenerated: '2024-09-25',
      format: 'pdf',
      status: 'ready',
      size: '945 KB'
    },
    {
      id: '5',
      name: 'Custom Risk Assessment',
      type: 'custom',
      description: 'Tailored risk analysis with stress testing scenarios',
      frequency: 'on-demand',
      lastGenerated: '2024-09-20',
      format: 'pdf',
      status: 'ready',
      size: '3.1 MB'
    }
  ]

  // Mock report templates
  const reportTemplates: ReportTemplate[] = [
    {
      id: '1',
      name: 'Performance Dashboard',
      description: 'Portfolio performance with charts and analytics',
      category: 'standard',
      complexity: 'basic'
    },
    {
      id: '2',
      name: 'Holdings Detail Report',
      description: 'Comprehensive position-level analysis',
      category: 'standard',
      complexity: 'advanced'
    },
    {
      id: '3',
      name: 'Regulatory Filing Report',
      description: 'ADV Part 2 and Form CRS compliance reporting',
      category: 'regulatory',
      complexity: 'comprehensive'
    },
    {
      id: '4',
      name: 'Client Review Package',
      description: 'Quarterly client meeting presentation materials',
      category: 'custom',
      complexity: 'comprehensive'
    }
  ]

  // Mock scheduled reports
  const scheduledReports: ScheduledReport[] = [
    {
      id: '1',
      reportId: '1',
      name: 'Monthly Performance Report',
      schedule: 'Last day of every month',
      nextRun: '2024-10-31',
      recipients: ['client@email.com', 'advisor@firm.com'],
      isActive: true
    },
    {
      id: '2',
      reportId: '2',
      name: 'Weekly Holdings Update',
      schedule: 'Every Friday',
      nextRun: '2024-10-04',
      recipients: ['advisor@firm.com'],
      isActive: true
    }
  ]

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || report.type === selectedType
    return matchesSearch && matchesType
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ready':
        return <Badge className="bg-green-100 text-green-800">Ready</Badge>
      case 'generating':
        return <Badge className="bg-blue-100 text-blue-800">Generating</Badge>
      case 'scheduled':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Scheduled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'generating':
        return <Clock className="h-4 w-4 text-blue-600" />
      case 'scheduled':
        return <Calendar className="h-4 w-4 text-yellow-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'performance': return 'bg-blue-100 text-blue-800'
      case 'holdings': return 'bg-green-100 text-green-800'
      case 'compliance': return 'bg-purple-100 text-purple-800'
      case 'tax': return 'bg-orange-100 text-orange-800'
      case 'custom': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getComplexityBadge = (complexity: string) => {
    switch (complexity) {
      case 'basic':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Basic</Badge>
      case 'advanced':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Advanced</Badge>
      case 'comprehensive':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Comprehensive</Badge>
      default:
        return <Badge variant="outline">{complexity}</Badge>
    }
  }

  const tabs = [
    { id: 'overview', label: 'Reports Overview', icon: FileText },
    { id: 'generate', label: 'Generate Reports', icon: BarChart3 },
    { id: 'templates', label: 'Report Templates', icon: FileSpreadsheet },
    { id: 'scheduled', label: 'Scheduled Reports', icon: Calendar }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Generate, customize, and schedule comprehensive portfolio reports
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Report Settings
          </Button>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
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
                    <p className="text-sm text-muted-foreground">Total Reports</p>
                    <p className="text-2xl font-bold">{reports.length}</p>
                  </div>
                  <FileText className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Ready to Download</p>
                    <p className="text-2xl font-bold">
                      {reports.filter(r => r.status === 'ready').length}
                    </p>
                  </div>
                  <Download className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Scheduled Reports</p>
                    <p className="text-2xl font-bold">{scheduledReports.length}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Custom Templates</p>
                    <p className="text-2xl font-bold">
                      {reportTemplates.filter(t => t.category === 'custom').length}
                    </p>
                  </div>
                  <FileSpreadsheet className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border rounded-md"
              aria-label="Filter by report type"
            >
              <option value="all">All Types</option>
              <option value="performance">Performance</option>
              <option value="holdings">Holdings</option>
              <option value="compliance">Compliance</option>
              <option value="tax">Tax</option>
              <option value="custom">Custom</option>
            </select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>

          {/* Reports List */}
          <Card>
            <CardHeader>
              <CardTitle>Available Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      {getStatusIcon(report.status)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{report.name}</h3>
                          <Badge variant="outline" className={getTypeColor(report.type)}>
                            {report.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Frequency: {report.frequency}</span>
                          <span>Last Generated: {report.lastGenerated}</span>
                          {report.size && <span>Size: {report.size}</span>}
                          <span>Format: {report.format.toUpperCase()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(report.status)}
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                        {report.status === 'ready' && (
                          <Button size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
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

      {activeTab === 'generate' && (
        <div className="space-y-6">
          {/* Quick Generate Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-12 w-12 mx-auto text-primary mb-4" />
                <h3 className="font-semibold mb-2">Performance Report</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Generate comprehensive performance analysis
                </p>
                <Button className="w-full">Generate Now</Button>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <PieChart className="h-12 w-12 mx-auto text-primary mb-4" />
                <h3 className="font-semibold mb-2">Holdings Report</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Current portfolio positions and allocations
                </p>
                <Button className="w-full">Generate Now</Button>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <BarChart3 className="h-12 w-12 mx-auto text-primary mb-4" />
                <h3 className="font-semibold mb-2">Custom Report</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Build a custom report with selected metrics
                </p>
                <Button className="w-full">Build Report</Button>
              </CardContent>
            </Card>
          </div>

          {/* Report Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>Custom Report Builder</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Report Name</label>
                  <Input placeholder="Enter report name..." />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Report Type</label>
                  <select className="w-full px-3 py-2 border rounded-md" aria-label="Select report type">
                    <option>Performance Analysis</option>
                    <option>Holdings Summary</option>
                    <option>Risk Assessment</option>
                    <option>Tax Analysis</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Date Range</label>
                  <select className="w-full px-3 py-2 border rounded-md" aria-label="Select date range">
                    <option>Last 30 Days</option>
                    <option>Last 90 Days</option>
                    <option>Year to Date</option>
                    <option>Last 12 Months</option>
                    <option>Custom Range</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Output Format</label>
                  <select className="w-full px-3 py-2 border rounded-md" aria-label="Select output format">
                    <option>PDF</option>
                    <option>Excel</option>
                    <option>CSV</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <Button>
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'templates' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Report Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reportTemplates.map((template) => (
                  <div key={template.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{template.name}</h3>
                        <p className="text-sm text-muted-foreground">{template.description}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Badge variant="outline" className={
                          template.category === 'standard' ? 'bg-blue-100 text-blue-800' :
                          template.category === 'regulatory' ? 'bg-purple-100 text-purple-800' :
                          'bg-gray-100 text-gray-800'
                        }>
                          {template.category}
                        </Badge>
                        {getComplexityBadge(template.complexity)}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Use Template</Button>
                      <Button size="sm" variant="outline">Preview</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'scheduled' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Scheduled Reports</CardTitle>
                <Button>
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule New Report
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledReports.map((schedule) => (
                  <div key={schedule.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{schedule.name}</h3>
                        <p className="text-sm text-muted-foreground">{schedule.schedule}</p>
                      </div>
                      <Badge variant={schedule.isActive ? 'default' : 'outline'} className={
                        schedule.isActive ? 'bg-green-100 text-green-800' : ''
                      }>
                        {schedule.isActive ? 'Active' : 'Paused'}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Next Run</p>
                        <p className="font-medium">{schedule.nextRun}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Recipients</p>
                        <p className="font-medium">{schedule.recipients.length} recipients</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Settings className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          <Mail className="h-4 w-4 mr-2" />
                          Send Now
                        </Button>
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