import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { SimpleDatePicker } from './ui/simple-date-picker'
import { 
  Calendar, 
  Clock, 
  MessageCircle, 
  CheckCircle2,
  AlertCircle,
  Phone,
  Video,
  MapPin
} from 'lucide-react'

interface MeetingRequest {
  type: 'portfolio-review' | 'investment-planning' | 'general-consultation' | 'other'
  preferredDate: Date | undefined
  preferredTime: string
  duration: '30' | '60' | '90'
  format: 'in-person' | 'video-call' | 'phone-call'
  topic: string
  notes: string
  urgency: 'low' | 'medium' | 'high'
}

export function ScheduleMeeting() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [meetingData, setMeetingData] = useState<MeetingRequest>({
    type: 'portfolio-review',
    preferredDate: undefined,
    preferredTime: '',
    duration: '60',
    format: 'video-call',
    topic: '',
    notes: '',
    urgency: 'medium'
  })

  const meetingTypes = [
    {
      id: 'portfolio-review',
      title: 'Portfolio Review',
      description: 'Discuss your current holdings and performance',
      icon: '📊',
      duration: '60 minutes'
    },
    {
      id: 'investment-planning',
      title: 'Investment Planning',
      description: 'Plan new investments and strategy',
      icon: '🎯',
      duration: '90 minutes'
    },
    {
      id: 'general-consultation',
      title: 'General Consultation', 
      description: 'General financial advice and questions',
      icon: '💬',
      duration: '30 minutes'
    },
    {
      id: 'other',
      title: 'Other',
      description: 'Custom meeting topic',
      icon: '📝',
      duration: 'Variable'
    }
  ]

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00'
  ]

  const handleInputChange = (field: keyof MeetingRequest, value: string | Date | undefined) => {
    setMeetingData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('http://localhost:3001/api/meetings/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          type: meetingData.type,
          preferredDate: meetingData.preferredDate?.toISOString().split('T')[0] || '',
          preferredTime: meetingData.preferredTime,
          duration: parseInt(meetingData.duration),
          format: meetingData.format,
          topic: meetingData.topic,
          notes: meetingData.notes,
          urgency: meetingData.urgency
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit meeting request');
      }

      const result = await response.json();
      console.log('Meeting request submitted successfully:', result);
      
      setIsSubmitted(true)
    } catch (error) {
      console.error('Failed to submit meeting request:', error)
      // You might want to show an error message to the user here
      alert('Failed to submit meeting request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  if (isSubmitted) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Meeting Request Submitted!</h3>
                <p className="text-muted-foreground">
                  Your meeting request has been sent to your advisor. You'll receive a confirmation within 24 hours.
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                <div className="text-sm text-blue-800">
                  <strong>Meeting Details:</strong>
                </div>
                <div className="text-sm text-blue-700 space-y-1">
                  <div>Type: {meetingTypes.find(t => t.id === meetingData.type)?.title}</div>
                  <div>Date: {meetingData.preferredDate?.toLocaleDateString() || 'Not selected'}</div>
                  <div>Time: {meetingData.preferredTime}</div>
                  <div>Format: {meetingData.format.replace('-', ' ')}</div>
                  <div>Duration: {meetingData.duration} minutes</div>
                </div>
              </div>
              <Button onClick={() => { setIsSubmitted(false); setStep(1) }}>
                Schedule Another Meeting
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= stepNumber 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                {stepNumber}
              </div>
              {stepNumber < 3 && (
                <div className={`w-12 h-1 ml-2 ${
                  step > stepNumber ? 'bg-primary' : 'bg-muted'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="text-sm text-muted-foreground">
          Step {step} of 3
        </div>
      </div>

      {/* Step 1: Meeting Type */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Choose Meeting Type
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {meetingTypes.map((type) => (
                <div
                  key={type.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    meetingData.type === type.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleInputChange('type', type.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">{type.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{type.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
                      <p className="text-xs text-primary mt-2">Typical duration: {type.duration}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {meetingData.type === 'other' && (
              <div className="space-y-2">
                <Label htmlFor="topic">Meeting Topic</Label>
                <Input
                  id="topic"
                  placeholder="Please describe what you'd like to discuss"
                  value={meetingData.topic}
                  onChange={(e) => handleInputChange('topic', e.target.value)}
                />
              </div>
            )}

            <div className="flex justify-end">
              <Button onClick={nextStep}>
                Next: Schedule
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Date & Time */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Schedule Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Meeting Format */}
            <div className="space-y-2">
              <Label>Meeting Format</Label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'video-call', label: 'Video Call', icon: Video },
                  { id: 'phone-call', label: 'Phone Call', icon: Phone },
                  { id: 'in-person', label: 'In Person', icon: MapPin }
                ].map((format) => (
                  <button
                    key={format.id}
                    className={`p-3 border rounded-lg flex flex-col items-center space-y-2 transition-colors ${
                      meetingData.format === format.id
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => handleInputChange('format', format.id)}
                  >
                    <format.icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{format.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Date Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Preferred Date</Label>
                <SimpleDatePicker
                  date={meetingData.preferredDate}
                  setDate={(date: Date | undefined) => handleInputChange('preferredDate', date)}
                  placeholder="Select a date"
                />
              </div>

              <div className="space-y-2">
                <Label>Preferred Time</Label>
                <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      className={`p-2 text-sm border rounded transition-colors ${
                        meetingData.preferredTime === time
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => handleInputChange('preferredTime', time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Duration & Urgency */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <select
                  id="duration"
                  value={meetingData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  className="w-full p-2 border border-border rounded-md"
                  title="Select meeting duration"
                >
                  <option value="30">30 minutes</option>
                  <option value="60">60 minutes</option>
                  <option value="90">90 minutes</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="urgency">Urgency</Label>
                <select
                  id="urgency"
                  value={meetingData.urgency}
                  onChange={(e) => handleInputChange('urgency', e.target.value)}
                  className="w-full p-2 border border-border rounded-md"
                  title="Select meeting urgency"
                >
                  <option value="low">Low - Within 2 weeks</option>
                  <option value="medium">Medium - Within 1 week</option>
                  <option value="high">High - Within 2-3 days</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
              <Button 
                onClick={nextStep}
                disabled={!meetingData.preferredDate || !meetingData.preferredTime}
              >
                Next: Review
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Additional Notes & Confirmation */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Additional Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Any specific topics you'd like to discuss or questions you have..."
                rows={4}
                value={meetingData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
              />
            </div>

            {/* Meeting Summary */}
            <div className="bg-muted p-4 rounded-lg space-y-3">
              <h4 className="font-medium text-foreground">Meeting Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Type:</span>
                  <span className="ml-2 font-medium">
                    {meetingTypes.find(t => t.id === meetingData.type)?.title}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Format:</span>
                  <span className="ml-2 font-medium capitalize">
                    {meetingData.format.replace('-', ' ')}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Date:</span>
                  <span className="ml-2 font-medium">
                    {meetingData.preferredDate ? new Date(meetingData.preferredDate).toLocaleDateString() : 'Not selected'}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Time:</span>
                  <span className="ml-2 font-medium">{meetingData.preferredTime}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="ml-2 font-medium">{meetingData.duration} minutes</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Urgency:</span>
                  <span className={`ml-2 font-medium ${
                    meetingData.urgency === 'high' ? 'text-red-600' :
                    meetingData.urgency === 'medium' ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {meetingData.urgency.charAt(0).toUpperCase() + meetingData.urgency.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-2 p-3 bg-blue-50 rounded-lg">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <strong>Note:</strong> This is a meeting request. Your advisor will confirm the exact time and provide meeting details within 24 hours.
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
              <Button 
                onClick={handleSubmit} 
                disabled={isSubmitting}
                className="min-w-32"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}