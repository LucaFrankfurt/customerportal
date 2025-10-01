import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { ScheduleDemo } from './pages/ScheduleDemo'
import { Login } from './pages/Login'
import { EmployeeDashboard } from './pages/EmployeeDashboard'
import { CustomerDashboard } from './pages/CustomerDashboard'
import { ChatPage } from './pages/ChatPage'
import { CustomerChatPage } from './pages/CustomerChatPage'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/schedule-demo" element={<ScheduleDemo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/messages" element={<ChatPage />} />
        <Route path="/customer-chat/:conversationId" element={<CustomerChatPage />} />
      </Routes>
    </Router>
  )
}

export default App
