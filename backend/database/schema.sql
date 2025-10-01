-- Customer Portal Database Schema
-- Created: September 29, 2025

-- Create extension for UUID support (if needed)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (already exists, extending if needed)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('customer', 'employee', 'admin')),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Clients table (for employee management)
CREATE TABLE IF NOT EXISTS clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    aum VARCHAR(20), -- Assets Under Management (e.g., "$450M")
    status VARCHAR(50) DEFAULT 'Onboarding' CHECK (status IN ('Active', 'Inactive', 'Review Pending', 'Onboarding')),
    priority VARCHAR(20) DEFAULT 'Medium' CHECK (priority IN ('High', 'Medium', 'Low')),
    performance VARCHAR(20), -- YTD Performance (e.g., "+12.3%")
    last_contact TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Customer profiles (customer-specific information)
CREATE TABLE IF NOT EXISTS customer_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    risk_tolerance VARCHAR(50) CHECK (risk_tolerance IN ('Conservative', 'Moderate', 'Aggressive')),
    investment_goals TEXT,
    communication_preference VARCHAR(50) DEFAULT 'Email' CHECK (communication_preference IN ('Email', 'Phone', 'SMS', 'Portal')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Employee profiles (employee-specific information)
CREATE TABLE IF NOT EXISTS employee_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    department VARCHAR(100),
    title VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Portfolios (customer investment portfolios)
CREATE TABLE IF NOT EXISTS portfolios (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    total_value VARCHAR(20), -- e.g., "$2,847,320"
    ytd_performance VARCHAR(10), -- e.g., "+12.4%"
    monthly_return VARCHAR(10), -- e.g., "+2.1%"
    risk_score VARCHAR(10), -- e.g., "7.2/10"
    day_change VARCHAR(10), -- e.g., "+$87,450 (3.17%)"
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Holdings (individual securities in portfolios)
CREATE TABLE IF NOT EXISTS holdings (
    id SERIAL PRIMARY KEY,
    portfolio_id INTEGER NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE,
    symbol VARCHAR(10) NOT NULL,
    security_name VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL,
    current_price VARCHAR(20), -- e.g., "$421.35"
    market_value VARCHAR(20), -- e.g., "$358,147.50"
    day_change VARCHAR(10), -- e.g., "+1.2%"
    total_return VARCHAR(10), -- e.g., "+15.3%"
    allocation_percentage VARCHAR(10), -- e.g., "25.8%"
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Transactions (buy/sell/dividend transactions)
CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    portfolio_id INTEGER NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE,
    transaction_date DATE NOT NULL,
    transaction_type VARCHAR(20) NOT NULL CHECK (transaction_type IN ('Buy', 'Sell', 'Dividend', 'Interest')),
    security_name VARCHAR(255) NOT NULL,
    symbol VARCHAR(10) NOT NULL,
    quantity INTEGER NOT NULL,
    price_per_unit VARCHAR(20), -- e.g., "$421.35"
    total_amount VARCHAR(20), -- e.g., "$63,202.50"
    status VARCHAR(20) DEFAULT 'Completed' CHECK (status IN ('Completed', 'Pending', 'Failed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Portfolio performance history (for charts and historical data)
CREATE TABLE IF NOT EXISTS portfolio_performance (
    id SERIAL PRIMARY KEY,
    portfolio_id INTEGER NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    portfolio_value DECIMAL(15,2) NOT NULL,
    daily_return DECIMAL(8,4), -- Daily return percentage
    cumulative_return DECIMAL(8,4), -- Cumulative return percentage
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(portfolio_id, date)
);

-- Conversations (chat conversations between employees and customers)
CREATE TABLE IF NOT EXISTS conversations (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    customer_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'closed', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(employee_id, customer_id, status) -- Prevent multiple active conversations
);

-- Messages (individual chat messages)
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    conversation_id INTEGER NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications (system notifications for users)
CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('alert', 'market', 'document', 'system', 'meeting')),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);
CREATE INDEX IF NOT EXISTS idx_clients_status ON clients(status);
CREATE INDEX IF NOT EXISTS idx_clients_priority ON clients(priority);
CREATE INDEX IF NOT EXISTS idx_clients_last_contact ON clients(last_contact);

CREATE INDEX IF NOT EXISTS idx_portfolios_user_id ON portfolios(user_id);
CREATE INDEX IF NOT EXISTS idx_holdings_portfolio_id ON holdings(portfolio_id);
CREATE INDEX IF NOT EXISTS idx_holdings_symbol ON holdings(symbol);

CREATE INDEX IF NOT EXISTS idx_transactions_portfolio_id ON transactions(portfolio_id);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(transaction_date);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(transaction_type);

CREATE INDEX IF NOT EXISTS idx_portfolio_performance_portfolio_date ON portfolio_performance(portfolio_id, date);

CREATE INDEX IF NOT EXISTS idx_conversations_employee ON conversations(employee_id);
CREATE INDEX IF NOT EXISTS idx_conversations_customer ON conversations(customer_id);
CREATE INDEX IF NOT EXISTS idx_conversations_status ON conversations(status);

CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at);

CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON notifications(user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created ON notifications(created_at);

-- Insert sample data for development
INSERT INTO clients (name, contact_person, email, phone, aum, status, priority, performance, last_contact) VALUES
('Meridian Pension Fund', 'Sarah Johnson', 'sarah.johnson@meridianpension.com', '+1-555-0101', '$450M', 'Active', 'High', '+12.3%', NOW() - INTERVAL '2 days'),
('Global University Endowment', 'Michael Chen', 'michael.chen@globaluni.edu', '+1-555-0102', '$280M', 'Review Pending', 'Medium', '+8.9%', NOW() - INTERVAL '1 week'),
('Sterling Insurance Corp', 'Emily Rodriguez', 'emily.rodriguez@sterlinginsurance.com', '+1-555-0103', '$320M', 'Active', 'Low', '+15.1%', NOW() - INTERVAL '1 day'),
('Pacific Health System', 'David Kim', 'david.kim@pacifichealth.org', '+1-555-0104', '$190M', 'Onboarding', 'High', 'N/A', NOW() - INTERVAL '3 days')
ON CONFLICT (email) DO NOTHING;

-- Insert sample portfolio data (assuming user with ID 1 exists)
INSERT INTO portfolios (user_id, total_value, ytd_performance, monthly_return, risk_score, day_change) VALUES
(1, '$2,847,320', '+12.4%', '+2.1%', '7.2/10', '+$87,450 (3.17%)')
ON CONFLICT (user_id) DO UPDATE SET
    total_value = EXCLUDED.total_value,
    ytd_performance = EXCLUDED.ytd_performance,
    monthly_return = EXCLUDED.monthly_return,
    risk_score = EXCLUDED.risk_score,
    day_change = EXCLUDED.day_change,
    updated_at = NOW();

-- Insert sample holdings (assuming portfolio with ID 1 exists)
INSERT INTO holdings (portfolio_id, symbol, security_name, quantity, current_price, market_value, day_change, total_return, allocation_percentage) VALUES
(1, 'VOO', 'Vanguard S&P 500 ETF', 850, '$421.35', '$358,147.50', '+1.2%', '+15.3%', '25.8%'),
(1, 'MSFT', 'Microsoft Corporation', 400, '$422.89', '$169,156.00', '+0.8%', '+22.1%', '12.2%'),
(1, 'AAPL', 'Apple Inc', 300, '$189.46', '$56,838.00', '-0.5%', '+8.7%', '4.1%')
ON CONFLICT DO NOTHING;

-- Insert sample transactions
INSERT INTO transactions (portfolio_id, transaction_date, transaction_type, security_name, symbol, quantity, price_per_unit, total_amount, status) VALUES
(1, '2025-09-28', 'Buy', 'VANGUARD S&P 500 ETF', 'VOO', 150, '$421.35', '$63,202.50', 'Completed'),
(1, '2025-09-25', 'Dividend', 'MICROSOFT CORP', 'MSFT', 200, '$2.72', '$544.00', 'Completed'),
(1, '2025-09-23', 'Sell', 'TESLA INC', 'TSLA', 50, '$251.05', '$12,552.50', 'Completed')
ON CONFLICT DO NOTHING;

-- Insert sample notifications (assuming user with ID 1 exists)
INSERT INTO notifications (user_id, type, title, message, is_read) VALUES
(1, 'alert', 'Quarterly Review Scheduled', 'Your Q3 portfolio review is scheduled for October 5th at 2:00 PM with your advisor Alex Thompson.', true),
(1, 'market', 'Market Update', 'Tech sector showing strong performance this week. Your MSFT holdings up 4.2%.', true),
(1, 'document', 'New Document Available', 'Your September monthly statement is now available for download.', false)
ON CONFLICT DO NOTHING;

-- Update user table to ensure we have proper sample users if they don't exist
-- Password for all users: "password123"
-- Bcrypt hash: $2b$10$rOZ7VpjChyU7ejmU8VersOH2C7I.tyTZWmsE6VTRVeIJEvNLwGqPK
INSERT INTO users (email, password_hash, role, first_name, last_name, phone, address) VALUES
('customer@example.com', '$2b$10$rOZ7VpjChyU7ejmU8VersOH2C7I.tyTZWmsE6VTRVeIJEvNLwGqPK', 'customer', 'Sarah', 'Johnson', '+1-555-1234', '123 Main St, New York, NY 10001'),
('employee@example.com', '$2b$10$rOZ7VpjChyU7ejmU8VersOH2C7I.tyTZWmsE6VTRVeIJEvNLwGqPK', 'employee', 'Alex', 'Thompson', '+1-555-5678', '456 Business Ave, New York, NY 10002')
ON CONFLICT (email) DO UPDATE SET
    password_hash = EXCLUDED.password_hash,
    updated_at = NOW();

-- Insert sample customer profile
INSERT INTO customer_profiles (user_id, risk_tolerance, investment_goals, communication_preference) VALUES
(1, 'Moderate', 'Long-term Growth, Retirement Planning', 'Email')
ON CONFLICT (user_id) DO UPDATE SET
    risk_tolerance = EXCLUDED.risk_tolerance,
    investment_goals = EXCLUDED.investment_goals,
    communication_preference = EXCLUDED.communication_preference,
    updated_at = NOW();

-- Insert sample employee profile  
INSERT INTO employee_profiles (user_id, department, title) VALUES
(2, 'Investment Management', 'Senior Portfolio Advisor')
ON CONFLICT (user_id) DO UPDATE SET
    department = EXCLUDED.department,
    title = EXCLUDED.title,
    updated_at = NOW();

-- Create meeting_requests table for scheduling meetings
CREATE TABLE IF NOT EXISTS meeting_requests (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('portfolio-review', 'investment-planning', 'general-consultation', 'other')),
    preferred_date DATE NOT NULL,
    preferred_time TIME NOT NULL,
    duration INTEGER NOT NULL, -- duration in minutes
    format VARCHAR(20) NOT NULL CHECK (format IN ('in-person', 'video-call', 'phone-call')),
    topic VARCHAR(200),
    notes TEXT,
    urgency VARCHAR(10) NOT NULL CHECK (urgency IN ('low', 'medium', 'high')) DEFAULT 'medium',
    status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for meeting requests
CREATE INDEX IF NOT EXISTS idx_meeting_requests_user ON meeting_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_meeting_requests_status ON meeting_requests(status);
CREATE INDEX IF NOT EXISTS idx_meeting_requests_urgency ON meeting_requests(urgency);
CREATE INDEX IF NOT EXISTS idx_meeting_requests_date ON meeting_requests(preferred_date);

-- Insert sample meeting requests
INSERT INTO meeting_requests (user_id, type, preferred_date, preferred_time, duration, format, topic, notes, urgency, status, created_at, updated_at) VALUES
(1, 'portfolio-review', CURRENT_DATE + INTERVAL '3 days', '10:00:00', 60, 'video-call', 'Q4 Portfolio Performance Review', 'I would like to review my portfolio performance and discuss rebalancing options.', 'high', 'pending', NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'),
(1, 'investment-planning', CURRENT_DATE + INTERVAL '5 days', '14:00:00', 90, 'in-person', 'Retirement Planning Discussion', 'Need to discuss retirement investment strategy and timeline.', 'medium', 'pending', NOW() - INTERVAL '2 hours', NOW() - INTERVAL '2 hours')
ON CONFLICT DO NOTHING;