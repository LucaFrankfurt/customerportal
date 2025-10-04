import { Link, useLocation } from "react-router-dom"
import { Button } from "./ui/button"
import { Building, Menu } from "lucide-react"
import { ModeToggle } from "./ThemeSwitcher"

export function Header() {
  const location = useLocation()
  
  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Company Name */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Building className="h-8 w-8 text-primary" />
              <div className="text-xl font-bold text-primary">
                Asset Capital
              </div>
            </div>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Portfolio Management
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Research & Analytics
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Reporting
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Support
            </a>
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <ModeToggle />
            <Link to="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            {location.pathname === '/employee-dashboard' ? (
              <Link to="/customer-dashboard">
                <Button variant="outline">Customer View</Button>
              </Link>
            ) : location.pathname === '/customer-dashboard' ? (
              <>
                <Link to="/messages">
                  <Button variant="outline">Messages</Button>
                </Link>
                <Link to="/employee-dashboard">
                  <Button variant="outline">Employee View</Button>
                </Link>
              </>
            ) : location.pathname === '/messages' ? (
              <Link to="/customer-dashboard">
                <Button variant="outline">Back to Dashboard</Button>
              </Link>
            ) : location.pathname === '/schedule-demo' ? (
              <Link to="/">
                <Button variant="outline">Back to Home</Button>
              </Link>
            ) : location.pathname === '/login' ? (
              <Link to="/schedule-demo">
                <Button variant="outline">Schedule Demo</Button>
              </Link>
            ) : (
              <Link to="/schedule-demo">
                <Button>Schedule Demo</Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}