import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Chat } from '../components/Chat'
import { Header } from '../components/Header'
import { Button } from '../components/ui/button'
import { ArrowLeft } from 'lucide-react'

interface ConversationData {
  customerName: string
  advisorName: string
  isLoading: boolean
  error: string | null
}

export function CustomerChatPage() {
  const { conversationId } = useParams<{ conversationId: string }>()
  const [conversationData, setConversationData] = useState<ConversationData>({
    customerName: '',
    advisorName: '',
    isLoading: true,
    error: null
  })

  useEffect(() => {
    const fetchConversationData = async () => {
      if (!conversationId) {
        setConversationData(prev => ({ 
          ...prev, 
          isLoading: false, 
          error: 'No conversation ID provided' 
        }))
        return
      }

      try {
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/conversations/${conversationId}`, {
        //   headers: {
        //     'Authorization': `Bearer ${token}`,
        //     'Content-Type': 'application/json'
        //   }
        // })
        // 
        // if (!response.ok) {
        //   throw new Error('Failed to fetch conversation')
        // }
        // 
        // const data = await response.json()

        // Mock data for development
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API delay
        
        // Mock conversation mapping based on conversation ID
        const mockConversations: { [key: string]: { customerName: string; advisorName: string } } = {
          'conv-1001': { customerName: 'Sarah Johnson', advisorName: 'John Smith' },
          'conv-1002': { customerName: 'Michael Brown', advisorName: 'John Smith' },
          'conv-1003': { customerName: 'Emma Davis', advisorName: 'John Smith' },
          'conv-1004': { customerName: 'James Wilson', advisorName: 'John Smith' }
        }

        const conversationInfo = mockConversations[conversationId]
        
        if (!conversationInfo) {
          throw new Error('Conversation not found')
        }

        setConversationData({
          customerName: conversationInfo.customerName,
          advisorName: conversationInfo.advisorName,
          isLoading: false,
          error: null
        })

      } catch (error) {
        console.error('Failed to load conversation:', error)
        setConversationData(prev => ({ 
          ...prev, 
          isLoading: false, 
          error: 'Failed to load conversation' 
        }))
      }
    }

    fetchConversationData()
  }, [conversationId])

  if (conversationData.isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2 text-muted-foreground">Loading conversation...</span>
          </div>
        </main>
      </div>
    )
  }

  if (conversationData.error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-red-600 mb-4">{conversationData.error}</p>
              <Button onClick={() => window.history.back()}>Go Back</Button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="outline" size="icon" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Chat with {conversationData.customerName}</h1>
              <p className="text-muted-foreground">
                Direct communication with your client
              </p>
              <p className="text-xs text-muted-foreground">
                Conversation ID: {conversationId}
              </p>
            </div>
          </div>
        </div>

        <Chat 
          userType="employee" 
          customerName={conversationData.customerName} 
          advisorName={conversationData.advisorName} 
        />
      </main>
    </div>
  )
}