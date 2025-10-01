import { useState, useRef, useEffect } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { 
  Send, 
  Paperclip, 
  MoreVertical, 
  Phone, 
  Video, 
  Info,
  Smile,
  Image,
  File
} from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'advisor' | 'system'
  timestamp: Date
  senderName: string
  attachments?: {
    type: 'image' | 'document' | 'file'
    name: string
    url: string
    size?: string
  }[]
  isRead?: boolean
}

interface ChatProps {
  userType?: 'employee' | 'customer'
  customerName?: string
  advisorName?: string
}

export function Chat({ userType = 'customer', customerName = 'Sarah Johnson', advisorName = 'Alex Thompson' }: ChatProps) {
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Chat participant info
  const currentUserName = userType === 'employee' ? advisorName : customerName

  // Sample messages - in real app, these would come from backend
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! I hope you\'re doing well. I wanted to reach out regarding your portfolio performance this quarter.',
      sender: userType === 'employee' ? 'user' : 'advisor',
      timestamp: new Date(2025, 8, 29, 9, 15),
      senderName: advisorName,
      isRead: true
    },
    {
      id: '2',
      text: 'Hello! Yes, I\'ve been reviewing the statements. The performance looks quite good.',
      sender: userType === 'employee' ? 'advisor' : 'user',
      timestamp: new Date(2025, 8, 29, 9, 22),
      senderName: customerName,
      isRead: true
    },
    {
      id: '3',
      text: 'Absolutely! Your YTD return is at 12.4%, which is 2.8% above the S&P 500 benchmark.',
      sender: userType === 'employee' ? 'user' : 'advisor',
      timestamp: new Date(2025, 8, 29, 9, 25),
      senderName: advisorName,
      isRead: true
    }
  ])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: 'user',
        timestamp: new Date(),
        senderName: currentUserName,
        isRead: false
      }
      setMessages(prev => [...prev, message])
      setNewMessage('')

      // Simulate other party typing and response
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        const response: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Thank you for your message. I\'ll get back to you shortly with more details.',
          sender: 'advisor',
          timestamp: new Date(),
          senderName: userType === 'employee' ? customerName : advisorName,
          isRead: false
        }
        setMessages(prev => [...prev, response])
      }, 2000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="flex flex-col h-[600px] bg-background border rounded-lg overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b flex items-center justify-between bg-muted/20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-sm font-medium">
              {(userType === 'employee' ? customerName : advisorName)?.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="font-medium">
              {userType === 'employee' ? customerName : `${advisorName} (Advisor)`}
            </h3>
            <p className="text-xs text-muted-foreground">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Info className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[70%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
              <div
                className={`rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : message.sender === 'system'
                    ? 'bg-muted text-muted-foreground text-center italic'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                {message.attachments && (
                  <div className="mt-2 space-y-2">
                    {message.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-background/20 rounded border">
                        {attachment.type === 'document' ? (
                          <File className="h-4 w-4" />
                        ) : attachment.type === 'image' ? (
                          <Image className="h-4 w-4" />
                        ) : (
                          <Paperclip className="h-4 w-4" />
                        )}
                        <div className="flex-1">
                          <p className="text-xs font-medium">{attachment.name}</p>
                          {attachment.size && (
                            <p className="text-xs opacity-70">{attachment.size}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <p className={`text-xs text-muted-foreground mt-1 ${
                message.sender === 'user' ? 'text-right' : 'text-left'
              }`}>
                {formatTime(message.timestamp)}
                {message.sender === 'user' && (
                  <span className="ml-1">
                    {message.isRead ? '✓✓' : '✓'}
                  </span>
                )}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg p-3 max-w-[70%]">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:0.1s]"></div>
                <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t">
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <div className="relative">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="pr-20"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleFileUpload}
                  className="h-6 w-6"
                >
                  <Paperclip className="h-3 w-3" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6"
                >
                  <Smile className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
          <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          aria-label="Upload file"
          onChange={() => {/* Handle file upload */}}
        />
      </div>
    </div>
  )
}