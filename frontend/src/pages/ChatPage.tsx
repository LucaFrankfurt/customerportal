import { Chat } from '../components/Chat'
import { Header } from '../components/Header'

export function ChatPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Messages</h1>
          <p className="text-muted-foreground">
            Communicate securely with your advisor and team members.
          </p>
        </div>

        <Chat userType="customer" customerName="Sarah Johnson" advisorName="Alex Thompson" />
      </main>
    </div>
  )
}