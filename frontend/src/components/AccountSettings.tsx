import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Bell,
  Target,
  Settings,
  Check,
  Edit
} from 'lucide-react'

interface UserProfile {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  investmentGoals: string
  riskTolerance: 'conservative' | 'moderate' | 'aggressive'
  communicationPreference: 'email' | 'phone' | 'sms' | 'portal'
}

interface NotificationSettings {
  portfolioAlerts: boolean
  marketUpdates: boolean
  documentAlerts: boolean
  meetingReminders: boolean
  performanceReports: boolean
  emailDigest: boolean
}

interface SecuritySettings {
  twoFactorEnabled: boolean
  loginNotifications: boolean
  passwordLastChanged: string
}

const initialProfile: UserProfile = {
  firstName: 'Sarah',
  lastName: 'Johnson',
  email: 'customer@example.com',
  phone: '+1 (555) 123-4567',
  address: '123 Main St, New York, NY 10001',
  investmentGoals: 'Long-term growth and retirement planning with a focus on sustainable investments',
  riskTolerance: 'moderate',
  communicationPreference: 'email'
}

const initialNotifications: NotificationSettings = {
  portfolioAlerts: true,
  marketUpdates: true,
  documentAlerts: true,
  meetingReminders: true,
  performanceReports: false,
  emailDigest: true
}

const initialSecurity: SecuritySettings = {
  twoFactorEnabled: false,
  loginNotifications: true,
  passwordLastChanged: '2025-08-15'
}

export function AccountSettings() {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security' | 'preferences'>('profile')
  const [profile, setProfile] = useState<UserProfile>(initialProfile)
  const [notifications, setNotifications] = useState<NotificationSettings>(initialNotifications)
  const [security, setSecurity] = useState<SecuritySettings>(initialSecurity)
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const handleProfileUpdate = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNotificationUpdate = (field: keyof NotificationSettings, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    setIsEditing(null)
    console.log('Settings saved:', { profile, notifications, security })
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Settings }
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Account Settings</h2>
          <p className="text-muted-foreground">
            Manage your account preferences and security settings
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab(tab.id as 'profile' | 'notifications' | 'security' | 'preferences')}
                className="flex items-center gap-2"
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="firstName"
                      value={profile.firstName}
                      onChange={(e) => handleProfileUpdate('firstName', e.target.value)}
                      disabled={isEditing !== 'name'}
                    />
                    {isEditing !== 'name' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsEditing('name')}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profile.lastName}
                    onChange={(e) => handleProfileUpdate('lastName', e.target.value)}
                    disabled={isEditing !== 'name'}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleProfileUpdate('email', e.target.value)}
                    disabled={isEditing !== 'contact'}
                  />
                  {isEditing !== 'contact' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsEditing('contact')}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => handleProfileUpdate('phone', e.target.value)}
                    disabled={isEditing !== 'contact'}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="address"
                    value={profile.address}
                    onChange={(e) => handleProfileUpdate('address', e.target.value)}
                    disabled={isEditing !== 'contact'}
                  />
                </div>
              </div>

              {(isEditing === 'name' || isEditing === 'contact') && (
                <div className="flex items-center gap-2 pt-4">
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(null)}>
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Investment Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="investmentGoals">Investment Goals</Label>
                <div className="flex items-start gap-2">
                  <textarea
                    id="investmentGoals"
                    title="Investment goals and objectives"
                    className="w-full p-3 border rounded-md bg-background resize-none"
                    rows={3}
                    value={profile.investmentGoals}
                    onChange={(e) => handleProfileUpdate('investmentGoals', e.target.value)}
                    disabled={isEditing !== 'investment'}
                  />
                  {isEditing !== 'investment' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsEditing('investment')}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="riskTolerance">Risk Tolerance</Label>
                <select
                  title="Risk tolerance level"
                  id="riskTolerance"
                  value={profile.riskTolerance}
                  onChange={(e) => handleProfileUpdate('riskTolerance', e.target.value)}
                  disabled={isEditing !== 'investment'}
                  className="w-full p-2 border rounded-md bg-background"
                >
                  <option value="conservative">Conservative - Preserve capital, low risk</option>
                  <option value="moderate">Moderate - Balanced growth and risk</option>
                  <option value="aggressive">Aggressive - Maximum growth potential</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="communicationPreference">Preferred Communication</Label>
                <select
                  title="Communication preference"
                  id="communicationPreference"
                  value={profile.communicationPreference}
                  onChange={(e) => handleProfileUpdate('communicationPreference', e.target.value)}
                  disabled={isEditing !== 'investment'}
                  className="w-full p-2 border rounded-md bg-background"
                >
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="sms">SMS</option>
                  <option value="portal">Portal Only</option>
                </select>
              </div>

              {isEditing === 'investment' && (
                <div className="flex items-center gap-2 pt-4">
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(null)}>
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {key === 'portfolioAlerts' && 'Receive alerts for significant portfolio changes'}
                    {key === 'marketUpdates' && 'Get notified about relevant market news'}
                    {key === 'documentAlerts' && 'Alerts when new documents are available'}
                    {key === 'meetingReminders' && 'Reminders for upcoming meetings'}
                    {key === 'performanceReports' && 'Monthly performance report notifications'}
                    {key === 'emailDigest' && 'Weekly digest of account activity'}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    title={`Toggle ${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}`}
                    checked={value}
                    onChange={(e) => handleNotificationUpdate(key as keyof NotificationSettings, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
            <Button onClick={handleSave} disabled={isSaving} className="w-full">
              {isSaving ? 'Saving...' : 'Save Notification Preferences'}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Button variant={security.twoFactorEnabled ? 'default' : 'outline'}>
                  {security.twoFactorEnabled ? 'Enabled' : 'Enable 2FA'}
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Login Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Get notified when someone logs into your account
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    title="Toggle login notifications"
                    checked={security.loginNotifications}
                    onChange={(e) => setSecurity(prev => ({ ...prev, loginNotifications: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Password</p>
                  <p className="text-sm text-muted-foreground">
                    Last changed: {new Date(security.passwordLastChanged).toLocaleDateString()}
                  </p>
                </div>
                <Button variant="outline">
                  Change Password
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Security Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">Login from Chrome (Current)</p>
                    <p className="text-sm text-muted-foreground">New York, NY • Today at 2:34 PM</p>
                  </div>
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">Password Changed</p>
                    <p className="text-sm text-muted-foreground">August 15, 2025</p>
                  </div>
                  <Check className="h-4 w-4 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Preferences Tab */}
      {activeTab === 'preferences' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Display Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Dashboard Theme</p>
                <p className="text-sm text-muted-foreground">Choose your preferred color scheme</p>
              </div>
              <select title="Dashboard theme" className="px-3 py-2 border rounded-md bg-background">
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Currency Display</p>
                <p className="text-sm text-muted-foreground">Default currency for portfolio values</p>
              </div>
              <select title="Currency display" className="px-3 py-2 border rounded-md bg-background">
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Date Format</p>
                <p className="text-sm text-muted-foreground">How dates are displayed</p>
              </div>
              <select title="Date format" className="px-3 py-2 border rounded-md bg-background">
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}