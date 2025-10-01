import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { ArrowRight, TrendingUp, Shield, BarChart3 } from "lucide-react"

export function Hero() {
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
            <TrendingUp className="h-4 w-4 mr-2" />
            Institutional Asset Management Portal
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Sophisticated Portfolio Management for 
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"> Institutional Investors</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Access comprehensive investment solutions, real-time analytics, and institutional-grade reporting 
            through our secure customer portal designed for professional asset managers.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8 py-6">
              Access Your Portfolio
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link to="/schedule-demo">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Schedule Demo
              </Button>
            </Link>
          </div>

          {/* Key Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex flex-col items-center p-6 bg-white/60 backdrop-blur rounded-lg border">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="font-semibold text-lg mb-2">Bank-Level Security</h3>
              <p className="text-sm text-muted-foreground text-center">
                Enterprise-grade encryption and multi-factor authentication
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white/60 backdrop-blur rounded-lg border">
              <BarChart3 className="h-12 w-12 text-primary mb-4" />
              <h3 className="font-semibold text-lg mb-2">Real-Time Analytics</h3>
              <p className="text-sm text-muted-foreground text-center">
                Advanced portfolio analytics and performance attribution
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white/60 backdrop-blur rounded-lg border">
              <TrendingUp className="h-12 w-12 text-primary mb-4" />
              <h3 className="font-semibold text-lg mb-2">Institutional Grade</h3>
              <p className="text-sm text-muted-foreground text-center">
                Professional tools built for sophisticated investors
              </p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 pt-8 border-t">
            <p className="text-sm text-muted-foreground mb-4">Trusted by leading institutional investors</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <span className="text-lg font-semibold">$50B+</span>
              <span className="text-lg font-semibold">AUM</span>
              <span className="text-lg font-semibold">200+</span>
              <span className="text-lg font-semibold">Institutions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 rounded-full bg-gradient-to-br from-blue-400/20 to-indigo-400/20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 rounded-full bg-gradient-to-tr from-slate-400/20 to-gray-400/20 blur-3xl"></div>
      </div>
    </section>
  )
}