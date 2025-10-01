-- Create sample users with bcrypt hashed passwords
-- Password for all users: "password123"
-- Bcrypt hash: $2b$10$rOZ7VpjChyU7ejmU8VersOH2C7I.tyTZWmsE6VTRVeIJEvNLwGqPK

INSERT INTO users (email, password_hash, role, first_name, last_name, phone, address) VALUES
('employee@assetcapital.com', '$2b$10$rOZ7VpjChyU7ejmU8VersOH2C7I.tyTZWmsE6VTRVeIJEvNLwGqPK', 'employee', 'Alex', 'Thompson', '+1-555-0001', '456 Financial Ave, New York, NY 10002'),
('customer@assetcapital.com', '$2b$10$rOZ7VpjChyU7ejmU8VersOH2C7I.tyTZWmsE6VTRVeIJEvNLwGqPK', 'customer', 'Sarah', 'Johnson', '+1-555-0002', '123 Investment St, New York, NY 10001'),
('admin@assetcapital.com', '$2b$10$rOZ7VpjChyU7ejmU8VersOH2C7I.tyTZWmsE6VTRVeIJEvNLwGqPK', 'admin', 'John', 'Smith', '+1-555-0003', '789 Management Blvd, New York, NY 10003')
ON CONFLICT (email) DO NOTHING;

-- Create customer profile for Sarah Johnson (assuming her user_id will be 2)
INSERT INTO customer_profiles (user_id, risk_tolerance, investment_goals, communication_preference) 
SELECT id, 'Moderate', 'Long-term Growth, Retirement Planning', 'Email' 
FROM users WHERE email = 'customer@assetcapital.com'
ON CONFLICT (user_id) DO NOTHING;

-- Create employee profile for Alex Thompson (assuming his user_id will be 1)
INSERT INTO employee_profiles (user_id, department, title) 
SELECT id, 'Investment Management', 'Senior Portfolio Advisor' 
FROM users WHERE email = 'employee@assetcapital.com'
ON CONFLICT (user_id) DO NOTHING;

-- Create admin profile for John Smith (assuming his user_id will be 3)
INSERT INTO employee_profiles (user_id, department, title) 
SELECT id, 'Administration', 'System Administrator' 
FROM users WHERE email = 'admin@assetcapital.com'
ON CONFLICT (user_id) DO NOTHING;

-- Create portfolio for Sarah Johnson
INSERT INTO portfolios (user_id, total_value, ytd_performance, monthly_return, risk_score, day_change) 
SELECT id, '$2,847,320', '+12.4%', '+2.1%', '7.2/10', '+$87,450 (3.17%)' 
FROM users WHERE email = 'customer@assetcapital.com'
ON CONFLICT (user_id) DO NOTHING;