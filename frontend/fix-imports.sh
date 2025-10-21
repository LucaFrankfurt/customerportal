#!/bin/bash

# Fix Holdings.tsx - remove unused imports
sed -i '' 's/Filter,//' src/components/Holdings.tsx
sed -i '' 's/Calendar,//' src/components/Holdings.tsx

# Fix ReportsAnalytics.tsx - remove Printer
sed -i '' 's/Printer,//' src/components/ReportsAnalytics.tsx

# Fix ResearchHub.tsx - remove unused imports  
sed -i '' 's/TrendingUp, //' src/components/ResearchHub.tsx
sed -i '' 's/DollarSign,//' src/components/ResearchHub.tsx
sed -i '' 's/Calendar,//' src/components/ResearchHub.tsx
sed -i '' 's/Users//' src/components/ResearchHub.tsx

# Fix RiskManagement.tsx - remove Input import and unused icons
sed -i '' '/import { Input } from/d' src/components/RiskManagement.tsx
sed -i '' 's/Pause,//' src/components/RiskManagement.tsx
sed -i '' 's/Target,//' src/components/RiskManagement.tsx

echo "Import fixes applied"
