import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Badge } from './ui/badge'
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Edit,
  Save,
  X,
  Camera,
  Bell,
  Lock,
  CreditCard,
  FileText,
  Settings
} from 'lucide-react'

interface ProfileData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  dateOfBirth: string
  ssn: string
  employmentStatus: string
  annualIncome: string
  netWorth: string
  investmentExperience: string
  riskTolerance: string
  investmentGoals: string
  communicationPreference: string
}

export function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Investment Lane',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    dateOfBirth: '1985-05-15',
    ssn: '***-**-1234',
    employmentStatus: 'Employed',
    annualIncome: '$150,000 - $200,000',
    netWorth: '$500,000 - $1,000,000',
    investmentExperience: 'Intermediate',
    riskTolerance: 'Moderate',
    investmentGoals: 'Long-term Growth',
    communicationPreference: 'Email'
  })

  const [originalData, setOriginalData] = useState<ProfileData>(profileData)

  const handleEdit = () => {
    setOriginalData(profileData)
    setIsEditing(true)
  }

  const handleSave = () => {
    // Here you would typically save to backend
    setIsEditing(false)
    // Show success message
  }

  const handleCancel = () => {
    setProfileData(originalData)
    setIsEditing(false)
  }

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const accountStats = [
    { label: 'Account Age', value: '3 years, 2 months', icon: Calendar },
    { label: 'Security Level', value: 'High', icon: Shield },
    { label: 'Verification Status', value: 'Verified', icon: FileText },
    { label: 'Account Type', value: 'Premium', icon: CreditCard }
  ]

  const preferencesData = [
    { label: 'Two-Factor Authentication', enabled: true },
    { label: 'Email Notifications', enabled: true },
    { label: 'SMS Alerts', enabled: false },
    { label: 'Market News Updates', enabled: true },
    { label: 'Portfolio Reports', enabled: true }
  ]

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-primary" />
              </div>
              <Button
                size="sm"
                className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">{profileData.firstName} {profileData.lastName}</h2>
                  <p className="text-muted-foreground">{profileData.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      <Shield className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                    <Badge variant="outline" className="text-blue-600 border-blue-600">
                      Premium Member
                    </Badge>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {!isEditing ? (
                    <Button onClick={handleEdit} variant="outline">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button onClick={handleSave}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                      <Button onClick={handleCancel} variant="outline">
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={profileData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profileData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      className="pl-10"
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="phone"
                      className="pl-10"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="address">Street Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="address"
                    className="pl-10"
                    value={profileData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={profileData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={profileData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={profileData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={profileData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="ssn">Social Security Number</Label>
                  <Input
                    id="ssn"
                    value={profileData.ssn}
                    disabled={true}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Financial Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="employmentStatus">Employment Status</Label>
                  <select
                    id="employmentStatus"
                    className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                    value={profileData.employmentStatus}
                    onChange={(e) => handleInputChange('employmentStatus', e.target.value)}
                    disabled={!isEditing}
                  >
                    <option value="Employed">Employed</option>
                    <option value="Self-Employed">Self-Employed</option>
                    <option value="Unemployed">Unemployed</option>
                    <option value="Retired">Retired</option>
                    <option value="Student">Student</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="annualIncome">Annual Income</Label>
                  <select
                    id="annualIncome"
                    className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                    value={profileData.annualIncome}
                    onChange={(e) => handleInputChange('annualIncome', e.target.value)}
                    disabled={!isEditing}
                  >
                    <option value="Under $50,000">Under $50,000</option>
                    <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                    <option value="$100,000 - $150,000">$100,000 - $150,000</option>
                    <option value="$150,000 - $200,000">$150,000 - $200,000</option>
                    <option value="$200,000 - $500,000">$200,000 - $500,000</option>
                    <option value="Over $500,000">Over $500,000</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="netWorth">Net Worth</Label>
                  <select
                    id="netWorth"
                    className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                    value={profileData.netWorth}
                    onChange={(e) => handleInputChange('netWorth', e.target.value)}
                    disabled={!isEditing}
                  >
                    <option value="Under $100,000">Under $100,000</option>
                    <option value="$100,000 - $500,000">$100,000 - $500,000</option>
                    <option value="$500,000 - $1,000,000">$500,000 - $1,000,000</option>
                    <option value="$1,000,000 - $5,000,000">$1,000,000 - $5,000,000</option>
                    <option value="Over $5,000,000">Over $5,000,000</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="investmentExperience">Investment Experience</Label>
                  <select
                    id="investmentExperience"
                    className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                    value={profileData.investmentExperience}
                    onChange={(e) => handleInputChange('investmentExperience', e.target.value)}
                    disabled={!isEditing}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="riskTolerance">Risk Tolerance</Label>
                  <select
                    id="riskTolerance"
                    className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                    value={profileData.riskTolerance}
                    onChange={(e) => handleInputChange('riskTolerance', e.target.value)}
                    disabled={!isEditing}
                  >
                    <option value="Conservative">Conservative</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Aggressive">Aggressive</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="investmentGoals">Investment Goals</Label>
                  <select
                    id="investmentGoals"
                    className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                    value={profileData.investmentGoals}
                    onChange={(e) => handleInputChange('investmentGoals', e.target.value)}
                    disabled={!isEditing}
                  >
                    <option value="Capital Preservation">Capital Preservation</option>
                    <option value="Income Generation">Income Generation</option>
                    <option value="Balanced Growth">Balanced Growth</option>
                    <option value="Long-term Growth">Long-term Growth</option>
                    <option value="Aggressive Growth">Aggressive Growth</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Account Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {accountStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <stat.icon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{stat.label}</span>
                  </div>
                  <span className="text-sm font-medium">{stat.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Security & Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {preferencesData.map((pref, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">{pref.label}</span>
                  <div className={`w-10 h-6 rounded-full p-1 ${
                    pref.enabled ? 'bg-primary' : 'bg-gray-300'
                  }`}>
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      pref.enabled ? 'translate-x-4' : 'translate-x-0'
                    }`}></div>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full mt-4">
                <Settings className="w-4 h-4 mr-2" />
                Advanced Settings
              </Button>
            </CardContent>
          </Card>

          {/* Communication Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Communication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="communicationPreference">Preferred Method</Label>
                  <select
                    id="communicationPreference"
                    className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm mt-1"
                    value={profileData.communicationPreference}
                    onChange={(e) => handleInputChange('communicationPreference', e.target.value)}
                    disabled={!isEditing}
                  >
                    <option value="Email">Email</option>
                    <option value="Phone">Phone</option>
                    <option value="SMS">SMS</option>
                    <option value="Mail">Physical Mail</option>
                  </select>
                </div>
                
                <Button variant="outline" className="w-full">
                  Update Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}