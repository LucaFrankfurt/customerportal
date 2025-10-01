import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Label } from '../components/ui/label'
import { SimpleDatePicker } from '../components/ui/simple-date-picker'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Calendar, Clock, User, Building, CheckCircle } from 'lucide-react'

export function ScheduleDemo() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    title: '',
    assetsUnderManagement: '',
    preferredTime: '',
    interests: '',
    message: ''
  })

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    const submissionData = {
      ...formData,
      preferredDate: selectedDate ? selectedDate.toISOString() : ''
    }
    console.log('Demo request submitted:', submissionData)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <Card className="p-8">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 bg-green-100 rounded-full">
                      <CheckCircle className="h-12 w-12 text-green-600" />
                    </div>
                  </div>
                  <CardTitle className="text-3xl mb-4 text-green-800">
                    Demo Request Submitted Successfully
                  </CardTitle>
                  <CardDescription className="text-lg mb-6">
                    Thank you for your interest in our institutional asset management platform. 
                    Our team will review your request and contact you within 24 hours to schedule 
                    your personalized demonstration.
                  </CardDescription>
                  <div className="space-y-2 text-sm text-muted-foreground mb-6">
                    <p>✓ We'll send you a calendar invitation with meeting details</p>
                    <p>✓ Our solution specialist will prepare a customized demo</p>
                    <p>✓ You'll receive our institutional investment guide</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button onClick={() => setIsSubmitted(false)} variant="outline">
                      Schedule Another Demo
                    </Button>
                    <Button onClick={() => window.location.href = '/'}>
                      Return to Home
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Schedule Your Personalized Demo
            </h1>
            <p className="text-xl text-muted-foreground">
              Experience our institutional-grade asset management platform with a 
              tailored demonstration designed for your investment needs.
            </p>
          </div>

          {/* Demo Benefits */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-6">
                <CardContent>
                  <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-lg mb-2">Personalized Session</CardTitle>
                  <CardDescription>
                    60-minute tailored demonstration focused on your specific investment strategies
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="text-center p-6">
                <CardContent>
                  <User className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-lg mb-2">Expert Guidance</CardTitle>
                  <CardDescription>
                    Meet with our institutional solutions specialist and portfolio management experts
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="text-center p-6">
                <CardContent>
                  <Building className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-lg mb-2">Live Platform</CardTitle>
                  <CardDescription>
                    Hands-on experience with real portfolio data and comprehensive reporting tools
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Demo Request Form */}
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Request Your Demo</CardTitle>
                <CardDescription>
                  Please provide your details so we can prepare a customized demonstration 
                  that addresses your institutional investment requirements.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  {/* Organization Information */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Building className="h-5 w-5 mr-2" />
                      Organization Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="company">Institution/Company Name *</Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="title">Your Title/Role *</Label>
                        <Input
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2 mt-4">
                      <Label htmlFor="assetsUnderManagement">Assets Under Management (Optional)</Label>
                      <select
                        id="assetsUnderManagement"
                        name="assetsUnderManagement"
                        value={formData.assetsUnderManagement}
                        onChange={handleInputChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        title="Select your institution's assets under management range"
                      >
                        <option value="">Select range</option>
                        <option value="under-100m">Under $100M</option>
                        <option value="100m-500m">$100M - $500M</option>
                        <option value="500m-1b">$500M - $1B</option>
                        <option value="1b-5b">$1B - $5B</option>
                        <option value="5b-plus">$5B+</option>
                      </select>
                    </div>
                  </div>

                  {/* Scheduling Preferences */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Clock className="h-5 w-5 mr-2" />
                      Scheduling Preferences
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Preferred Date</Label>
                        <SimpleDatePicker
                          date={selectedDate}
                          setDate={setSelectedDate}
                          placeholder="Select your preferred date"
                          disabled={false}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="preferredTime">Preferred Time (Your Timezone)</Label>
                        <select
                          id="preferredTime"
                          name="preferredTime"
                          value={formData.preferredTime}
                          onChange={handleInputChange}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          title='Select your preferred time for the demo session'
                        >
                          <option value="">Select time</option>
                          <option value="morning">Morning (9:00 AM - 12:00 PM)</option>
                          <option value="afternoon">Afternoon (12:00 PM - 5:00 PM)</option>
                          <option value="evening">Early Evening (5:00 PM - 7:00 PM)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Areas of Interest */}
                  <div className="space-y-2">
                    <Label htmlFor="interests">Areas of Interest (Optional)</Label>
                    <Textarea
                      id="interests"
                      name="interests"
                      value={formData.interests}
                      onChange={handleInputChange}
                      placeholder="Please describe your specific areas of interest (e.g., portfolio analytics, risk management, ESG investing, alternative investments)"
                      rows={3}
                    />
                  </div>

                  {/* Additional Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Additional Comments or Questions</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Any specific questions or requirements you'd like us to address during the demo?"
                      rows={4}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6 border-t">
                    <div className="flex flex-col sm:flex-row gap-4 justify-between">
                      <div className="text-sm text-muted-foreground">
                        <p>* Required fields</p>
                        <p>We'll contact you within 24 hours to confirm your demo session.</p>
                      </div>
                      <div className="flex gap-4">
                        <Button type="button" variant="outline" onClick={() => window.location.href = '/'}>
                          Cancel
                        </Button>
                        <Button type="submit" size="lg" className="px-8">
                          Request Demo
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}