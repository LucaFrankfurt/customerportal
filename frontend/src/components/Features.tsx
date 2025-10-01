import { Link } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { 
  PieChart, 
  FileText, 
  Users, 
  Calculator, 
  Lock, 
  Globe,
  ArrowRight,
  CheckCircle
} from "lucide-react"

export function Features() {
  const features = [
    {
      icon: PieChart,
      title: "Portfolio Analytics",
      description: "Advanced performance attribution, risk metrics, and benchmark analysis",
      benefits: ["Real-time performance tracking", "Risk-adjusted returns", "Sector allocation analysis"]
    },
    {
      icon: FileText,
      title: "Comprehensive Reporting",
      description: "Institutional-grade reports with customizable metrics and schedules",
      benefits: ["Monthly/quarterly reports", "Custom report builder", "Regulatory compliance"]
    },
    {
      icon: Calculator,
      title: "Investment Research",
      description: "In-depth market analysis and investment opportunities",
      benefits: ["Market intelligence", "ESG screening", "Due diligence reports"]
    },
    {
      icon: Lock,
      title: "Secure Access",
      description: "Bank-level security with role-based access controls",
      benefits: ["Multi-factor authentication", "Encrypted data transmission", "Audit trail logging"]
    },
    {
      icon: Users,
      title: "Client Management",
      description: "Dedicated relationship management and support team",
      benefits: ["Personal account manager", "24/7 technical support", "Training and onboarding"]
    },
    {
      icon: Globe,
      title: "Global Markets",
      description: "Access to international markets and multi-currency support",
      benefits: ["Global equity markets", "Fixed income instruments", "Alternative investments"]
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Comprehensive Investment Platform
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything institutional investors need to manage portfolios, 
            analyze performance, and make informed investment decisions.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="relative group hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-primary/5 to-blue-50 border-primary/20">
            <CardContent className="p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Ready to Experience Professional Asset Management?
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Join leading institutional investors who trust our platform for their 
                  portfolio management and investment analysis needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="px-8">
                    Request Access
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Link to="/schedule-demo">
                    <Button variant="outline" size="lg" className="px-8">
                      Schedule Demo
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}