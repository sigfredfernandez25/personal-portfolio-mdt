-- Create portfolio table in Supabase
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS portfolio (
    id BIGSERIAL PRIMARY KEY,
    portfolio_data JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create an index on the updated_at column for better query performance
CREATE INDEX IF NOT EXISTS idx_portfolio_updated_at ON portfolio(updated_at);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations (you can restrict this based on your needs)
CREATE POLICY "Allow all operations on portfolio" ON portfolio
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Alternatively, create separate policies for read and write operations:
-- CREATE POLICY "Allow public read access" ON portfolio
--     FOR SELECT
--     USING (true);

-- CREATE POLICY "Allow authenticated updates" ON portfolio
--     FOR UPDATE
--     USING (auth.role() = 'service_role')
--     WITH CHECK (auth.role() = 'service_role');
