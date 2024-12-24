-- Create database
CREATE DATABASE portfolio;

-- Connect to the database
\c portfolio;

-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(50)
);

-- Create companies table
CREATE TABLE companies (
    ticker VARCHAR(10) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    sector VARCHAR(255),
    industry VARCHAR(255),
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create stock_prices table
CREATE TABLE stock_prices (
    id SERIAL PRIMARY KEY,
    date TIMESTAMP NOT NULL,
    open DOUBLE PRECISION,
    high DOUBLE PRECISION,
    low DOUBLE PRECISION,
    close DOUBLE PRECISION,
    volume BIGINT,
    adjusted_close DOUBLE PRECISION,
    ticker VARCHAR(10) NOT NULL REFERENCES companies(ticker),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create transactions table
CREATE TABLE transactions (
    purchase_id BIGSERIAL PRIMARY KEY,
    ticker VARCHAR(10) NOT NULL REFERENCES companies(ticker),
    purchase_date DATE,
    quantity DECIMAL(10,5),
    type CHAR(4),
    comment VARCHAR(200),
    purchase_price DECIMAL(10,2),
    portfolio_id INTEGER REFERENCES users(id),
    current_price DECIMAL(10,2),
    "AccountId" INTEGER,
    "Description" VARCHAR(200),
    remaining_shares DECIMAL(10,5),
    cost_basis DECIMAL(10,2),
    realized_gain_loss DECIMAL(10,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create watchlists table
CREATE TABLE watchlists (
    id SERIAL PRIMARY KEY,
    date_added DATE NOT NULL,
    reason TEXT,
    ticker VARCHAR(100),
    userid INTEGER REFERENCES users(id),
    "currentPrice" DOUBLE PRECISION DEFAULT 0,
    "weekHigh52" DOUBLE PRECISION DEFAULT 0,
    "percentBelow52WeekHigh" DOUBLE PRECISION DEFAULT 0,
    "avgClose" DOUBLE PRECISION DEFAULT 0,
    sector VARCHAR(100) DEFAULT '',
    "priceWhenAdded" DOUBLE PRECISION DEFAULT 0,
    "priceChange" DOUBLE PRECISION,
    "lastUpdated" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    interested BOOLEAN,
    metrics JSONB,
    industry VARCHAR(255),
    "UserId" INTEGER REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_stock_prices_ticker ON stock_prices(ticker);
CREATE INDEX idx_stock_prices_date ON stock_prices(date);
CREATE INDEX idx_transactions_ticker ON transactions(ticker);
CREATE INDEX idx_transactions_portfolio_id ON transactions(portfolio_id);
CREATE INDEX idx_watchlists_ticker ON watchlists(ticker);
CREATE INDEX idx_watchlists_userid ON watchlists(userid);

-- Create trigger to update timestamps
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$ language 'plpgsql';

-- Add update timestamp triggers to all tables
CREATE TRIGGER update_companies_timestamp
    BEFORE UPDATE ON companies
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_stock_prices_timestamp
    BEFORE UPDATE ON stock_prices
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_transactions_timestamp
    BEFORE UPDATE ON transactions
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_watchlists_timestamp
    BEFORE UPDATE ON watchlists
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();