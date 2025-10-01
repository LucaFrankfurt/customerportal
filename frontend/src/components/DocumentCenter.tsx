import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { 
  FileText, 
  Download, 
  Search, 
  Filter,
  Calendar,
  Eye,
  Archive,
  TrendingUp,
  FileBarChart,
  Receipt,
  Shield
} from 'lucide-react'

interface Document {
  id: string
  name: string
  type: 'statement' | 'report' | 'tax' | 'research' | 'legal' | 'other'
  date: string
  size: string
  description?: string
  isNew?: boolean
}

const sampleDocuments: Document[] = [
  {
    id: '1',
    name: 'Q3 2025 Portfolio Statement',
    type: 'statement',
    date: '2025-09-30',
    size: '2.1 MB',
    description: 'Quarterly portfolio performance and holdings summary',
    isNew: true
  },
  {
    id: '2',
    name: 'Market Outlook - Q4 2025',
    type: 'research',
    date: '2025-09-28',
    size: '1.8 MB',
    description: 'Investment committee insights and market projections'
  },
  {
    id: '3',
    name: 'Tax Loss Harvesting Report',
    type: 'tax',
    date: '2025-09-25',
    size: '856 KB',
    description: 'Opportunities for tax optimization in your portfolio'
  },
  {
    id: '4',
    name: 'ESG Impact Report',
    type: 'report',
    date: '2025-09-20',
    size: '3.2 MB',
    description: 'Environmental and social impact analysis of your investments'
  },
  {
    id: '5',
    name: 'Investment Policy Statement',
    type: 'legal',
    date: '2025-09-15',
    size: '1.2 MB',
    description: 'Updated investment guidelines and risk parameters'
  },
  {
    id: '6',
    name: 'Monthly Performance Report',
    type: 'report',
    date: '2025-08-31',
    size: '1.5 MB',
    description: 'August portfolio performance and market commentary'
  },
  {
    id: '7',
    name: 'Q2 2025 Portfolio Statement',
    type: 'statement',
    date: '2025-06-30',
    size: '2.0 MB',
    description: 'Second quarter portfolio performance and holdings'
  },
  {
    id: '8',
    name: '2024 Tax Documents Package',
    type: 'tax',
    date: '2025-01-31',
    size: '4.1 MB',
    description: '1099s, K1s, and other tax-related documents for 2024'
  }
]

const documentTypeConfig = {
  statement: { icon: FileBarChart, color: 'bg-blue-100 text-blue-700', label: 'Statement' },
  report: { icon: TrendingUp, color: 'bg-green-100 text-green-700', label: 'Report' },
  tax: { icon: Receipt, color: 'bg-yellow-100 text-yellow-700', label: 'Tax' },
  research: { icon: FileText, color: 'bg-purple-100 text-purple-700', label: 'Research' },
  legal: { icon: Shield, color: 'bg-gray-100 text-gray-700', label: 'Legal' },
  other: { icon: Archive, color: 'bg-gray-100 text-gray-600', label: 'Other' }
}

export function DocumentCenter() {
  const [documents] = useState<Document[]>(sampleDocuments)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [isDownloading, setIsDownloading] = useState<string | null>(null)

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || doc.type === selectedType
    return matchesSearch && matchesType
  })

  const handleDownload = async (doc: Document) => {
    setIsDownloading(doc.id)
    // Simulate download
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log(`Downloading ${doc.name}`)
    setIsDownloading(null)
  }

  const handleView = (doc: Document) => {
    console.log(`Viewing ${doc.name}`)
    // In a real app, this would open the document in a viewer
  }

  const getDocumentIcon = (type: Document['type']) => {
    const config = documentTypeConfig[type]
    const IconComponent = config.icon
    return <IconComponent className="h-5 w-5" />
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
          <h2 className="text-2xl font-bold text-foreground">Document Center</h2>
          <p className="text-muted-foreground">
            Access your statements, reports, and important documents
          </p>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                title="Filter by document type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background"
              >
                <option value="all">All Documents</option>
                <option value="statement">Statements</option>
                <option value="report">Reports</option>
                <option value="tax">Tax Documents</option>
                <option value="research">Research</option>
                <option value="legal">Legal</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(documentTypeConfig).map(([type, config]) => {
          const count = documents.filter(doc => doc.type === type).length
          if (count === 0) return null
          
          return (
            <Card key={type} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${config.color}`}>
                      <config.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{config.label}</p>
                      <p className="text-sm text-muted-foreground">{count} documents</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Documents ({filteredDocuments.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDocuments.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No documents found matching your criteria</p>
              </div>
            ) : (
              filteredDocuments.map((doc) => {
                const config = documentTypeConfig[doc.type]
                const isCurrentlyDownloading = isDownloading === doc.id
                
                return (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <div className={`p-2 rounded-lg ${config.color}`}>
                        {getDocumentIcon(doc.type)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-foreground">{doc.name}</h4>
                          {doc.isNew && (
                            <Badge variant="secondary" className="text-xs">
                              New
                            </Badge>
                          )}
                        </div>
                        {doc.description && (
                          <p className="text-sm text-muted-foreground mb-1">
                            {doc.description}
                          </p>
                        )}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(doc.date)}
                          </span>
                          <span>{doc.size}</span>
                          <Badge variant="outline" className="text-xs">
                            {config.label}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleView(doc)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownload(doc)}
                        disabled={isCurrentlyDownloading}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        {isCurrentlyDownloading ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                        ) : (
                          <Download className="h-4 w-4" />
                        )}
                      </Button>
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