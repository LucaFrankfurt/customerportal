import { Building, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <Building className="h-8 w-8" />
              <span className="text-xl font-bold">Asset Capital</span>
            </div>
            <p className="text-slate-300 mb-6 text-sm leading-relaxed">
              Leading institutional asset management firm providing sophisticated 
              investment solutions and portfolio management services to professional investors worldwide.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-slate-300">
                <MapPin className="h-4 w-4 mr-2" />
                New York, London, Singapore
              </div>
              <div className="flex items-center text-slate-300">
                <Phone className="h-4 w-4 mr-2" />
                +1 (555) 123-4567
              </div>
              <div className="flex items-center text-slate-300">
                <Mail className="h-4 w-4 mr-2" />
                institutional@assetcapital.com
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Investment Services</h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li><a href="#" className="hover:text-white transition-colors">Portfolio Management</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Risk Management</a></li>
              <li><a href="#" className="hover:text-white transition-colors">ESG Investing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Alternative Investments</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Fixed Income</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Equity Solutions</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Resources</h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li><a href="#" className="hover:text-white transition-colors">Market Research</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Investment Insights</a></li>
              <li><a href="#" className="hover:text-white transition-colors">White Papers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Client Education</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Support</h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">System Status</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Compliance</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Training</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-slate-400">
              © 2025 Asset Capital Management. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-slate-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Regulatory Disclosures</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
          <div className="mt-4 text-xs text-slate-500 text-center md:text-left">
            <p>
              Investment management services provided by Asset Capital Management, LLC. 
              Securities offered through Asset Capital Securities, member FINRA/SIPC. 
              Past performance does not guarantee future results.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}