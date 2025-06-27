# cryptoanalyst-ai

# 🚀 CryptoAnalyst AI 

<div align="center">

![CryptoAnalyst AI Logo](https://via.placeholder.com/200x100/4F46E5/FFFFFF?text=CryptoAnalyst+AI)

[![Amazon Bedrock](https://img.shields.io/badge/Amazon-Bedrock-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)](https://aws.amazon.com/bedrock/)
[![x402pay](https://img.shields.io/badge/x402pay-Integration-8B5CF6?style=for-the-badge)](https://x402.pay)
[![CDP Wallet](https://img.shields.io/badge/CDP-Wallet-10B981?style=for-the-badge)](https://www.coinbase.com/developer-platform)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)

**🏆 AI-Powered Cryptocurrency Analysis with Autonomous Payments**

*Professional-grade crypto investment analysis powered by Amazon Bedrock AI, monetized through x402pay, with autonomous profit distribution via CDP Wallet*

[🎥 Live Demo](http://localhost:3000) | [📚 Documentation](#documentation) | [🎯 Hackathon Info](#hackathon-information) | [🚀 Quick Start](#quick-start)

</div>

---

## 📋 Table of Contents

- [🎯 Project Overview](#-project-overview)
- [✨ Key Features](#-key-features)
- [🏗️ Architecture](#️-architecture)
- [🛠️ Technology Stack](#️-technology-stack)
- [🏆 Hackathon Information](#-hackathon-information)
- [🚀 Quick Start](#-quick-start)
- [📦 Installation](#-installation)
- [⚙️ Configuration](#️-configuration)
- [🎮 Usage Guide](#-usage-guide)
- [📖 API Documentation](#-api-documentation)
- [🔧 Development](#-development)
- [🚢 Deployment](#-deployment)
- [🎭 Demo Instructions](#-demo-instructions)
- [🧪 Testing](#-testing)
- [🛡️ Security](#️-security)
- [📊 Performance](#-performance)
- [🔍 Troubleshooting](#-troubleshooting)
- [🗺️ Roadmap](#️-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🎯 Project Overview

**CryptoAnalyst AI** is a cutting-edge platform that revolutionizes cryptocurrency investment analysis by combining advanced AI technology with autonomous Web3 payments. Built for the **Coinbase Agents in Action Hackathon**, this project demonstrates the future of AI-powered financial services.

### 🌟 The Problem We Solve

- **Information Overload**: Crypto investors struggle with analyzing vast amounts of market data
- **Expensive Research**: Professional analysis costs are prohibitive for individual investors
- **No Fair Compensation**: Data providers and researchers aren't fairly rewarded for their contributions
- **Manual Processes**: Traditional payment and distribution systems are slow and inefficient

### 💡 Our Solution

CryptoAnalyst AI provides:
- **Professional-grade AI analysis** using Amazon Bedrock's Claude and Nova models
- **Pay-per-use pricing** through x402pay integration for fair, transparent costs
- **Autonomous profit distribution** via CDP Wallet to fairly compensate all stakeholders
- **Real-time insights** with personalized investment recommendations

---

## ✨ Key Features

### 🧠 AI-Powered Analysis
- **Multiple Analysis Types**: Technical, Fundamental, Portfolio Review, Market Sentiment, DeFi Opportunities
- **Amazon Bedrock Integration**: Leverages Claude 3 and Nova models for sophisticated analysis
- **Real-time Data**: Live cryptocurrency market data integration
- **Personalized Insights**: Tailored recommendations based on user parameters

### 💰 Autonomous Payment System
- **x402pay Integration**: Seamless API-native payments for analysis requests
- **CDP Wallet Distribution**: Automatic profit sharing with stakeholders
- **Transparent Pricing**: Clear, upfront costs ($10-$50 per analysis)
- **Revenue Tracking**: Real-time dashboard for payment analytics

### 🏛️ Professional Infrastructure
- **Production-Ready**: Full TypeScript, comprehensive error handling
- **Scalable Architecture**: Microservices-ready design
- **Security First**: JWT authentication, rate limiting, input validation
- **Modern UI/UX**: Professional interface with real-time updates

### 🔗 Web3 Integration
- **MetaMask Support**: Connect with popular Web3 wallets
- **Coinbase Wallet**: Native integration with Coinbase ecosystem
- **Signature Authentication**: Secure wallet-based login
- **Multi-Auth**: Support for both email/password and wallet authentication

---

## 🏗️ Architecture

### System Architecture Diagram

```mermaid
graph TB
    U[User] --> FE[React Frontend]
    FE --> BE[Node.js Backend]
    BE --> DB[(PostgreSQL)]
    BE --> AWS[Amazon Bedrock]
    BE --> X402[x402pay API]
    BE --> CDP[CDP Wallet SDK]
    
    AWS --> AI[Claude/Nova Models]
    X402 --> PAY[Payment Processing]
    CDP --> DIST[Auto Distribution]
    
    BE --> EXT[External APIs]
    EXT --> CMC[CoinMarketCap]
    EXT --> CG[CoinGecko]
    
    subgraph "Hackathon Technologies"
        AWS
        X402
        CDP
    end

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   External      │
│                 │    │                 │    │                 │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │
│ │ Auth System │ │◄──►│ │ JWT Auth    │ │    │ │ Amazon      │ │
│ └─────────────┘ │    │ └─────────────┘ │    │ │ Bedrock     │ │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │ └─────────────┘ │
│ │ Analysis UI │ │◄──►│ │ AI Service  │ │◄──►│ ┌─────────────┐ │
│ └─────────────┘ │    │ └─────────────┘ │    │ │ x402pay     │ │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │ └─────────────┘ │
│ │ Payment UI  │ │◄──►│ │ Payment Svc │ │◄──►│ ┌─────────────┐ │
│ └─────────────┘ │    │ └─────────────┘ │    │ │ CDP Wallet  │ │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │ └─────────────┘ │
│ │ Dashboard   │ │◄──►│ │ Data APIs   │ │◄──►│ ┌─────────────┐ │
│ └─────────────┘ │    │ └─────────────┘ │    │ │ Market Data │ │
└─────────────────┘    └─────────────────┘    │ └─────────────┘ │
                                              └─────────────────┘
Data Flow

User Request: User selects analysis type and parameters
Payment Processing: x402pay handles payment securely
AI Analysis: Amazon Bedrock generates professional analysis
Profit Distribution: CDP Wallet automatically distributes revenue
Result Delivery: User receives comprehensive analysis report


🛠️ Technology Stack
Frontend

React 18 - Modern UI framework
TypeScript - Type-safe development
Tailwind CSS - Utility-first styling
Vite - Fast build tool
React Router - Client-side routing
Recharts - Data visualization
Framer Motion - Smooth animations
React Hot Toast - User notifications
Wagmi - Web3 wallet integration
Lucide React - Beautiful icons

Backend

Node.js 18+ - Server runtime
Express.js - Web framework
TypeScript - Type safety
Prisma - Database ORM
PostgreSQL - Primary database
JWT - Authentication
bcrypt - Password hashing
Helmet - Security middleware
Winston - Logging
Joi - Input validation
Rate Limiting - API protection

AI & Web3 Integration

Amazon Bedrock - AI analysis (Claude 3, Nova models)
x402pay - Payment processing
CDP Wallet SDK - Coinbase Developer Platform
ethers.js - Ethereum utilities
MetaMask - Web3 wallet connection

External APIs

CoinMarketCap API - Cryptocurrency data
CoinGecko API - Market data fallback
Fear & Greed Index - Market sentiment

Infrastructure

Docker - Containerization
AWS - Cloud deployment
Vercel - Frontend hosting
Railway - Backend hosting
GitHub Actions - CI/CD

# Clone repository
git clone https://github.com/your-username/cryptoanalyst-ai.git
cd cryptoanalyst-ai

# Install dependencies
npm install
cd backend && npm install
cd ../frontend && npm install

# Setup environment
cp .env.example .env
# Configure your API keys in .env

# Start database
docker-compose up -d postgres

# Run database migrations
cd backend && npx prisma db push

# Start development servers
npm run dev
📦 Installation
Detailed Installation Steps
1. Clone Repository
bashgit clone https://github.com/your-username/cryptoanalyst-ai.git
cd cryptoanalyst-ai
2. Install Dependencies
bash# Root dependencies
npm install

# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install
3. Database Setup
bash# Using Docker (Recommended)
docker-compose up -d postgres

# Or install PostgreSQL locally
# Ubuntu/Debian:
sudo apt update
sudo apt install postgresql postgresql-contrib

# macOS:
brew install postgresql
brew services start postgresql

# Windows:
# Download from https://www.postgresql.org/download/windows/
4. Environment Configuration
bash# Copy environment template
cp .env.example .env

# Edit configuration
nano .env  # or your preferred editor
5. Database Migration
bashcd backend
npx prisma generate
npx prisma db push
Development Setup
bash# Start all services
npm run dev

# Or start individually
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev

⚙️ Configuration
Environment Variables
Backend Configuration
env# Database
DATABASE_URL="postgresql://username:password@localhost:5432/cryptoanalyst"

# AWS Bedrock
AWS_ACCESS_KEY_ID="your_aws_access_key"
AWS_SECRET_ACCESS_KEY="your_aws_secret_key"
AWS_REGION="us-east-1"

# Coinbase CDP
CDP_API_KEY="your_cdp_api_key"
CDP_API_SECRET="your_cdp_api_secret"
CDP_WEBHOOK_SECRET="your_webhook_secret"

# x402pay
X402_API_KEY="your_x402_api_key"
X402_ENDPOINT="https://api.x402.pay"

# External APIs
COINMARKETCAP_API_KEY="your_cmc_api_key"
COINGECKO_API_KEY="your_coingecko_api_key"

# Security
JWT_SECRET="your_super_secure_jwt_secret_key_here"
NODE_ENV="development"
PORT=3001

# URLs
FRONTEND_URL="http://localhost:3000"
BACKEND_URL="http://localhost:3001"
Frontend Configuration
env# API Configuration
VITE_API_URL="http://localhost:3001/api"
VITE_X402_PAYMENT_URL="https://pay.x402.com"

# Wallet Connect (Optional)
VITE_WALLETCONNECT_PROJECT_ID="your_walletconnect_project_id"
API Keys Setup Guide
1. Amazon AWS Bedrock

Go to AWS Console
Navigate to Bedrock service
Request access to Claude and Nova models
Create IAM user with Bedrock permissions
Generate access keys

2. Coinbase Developer Platform

Visit Coinbase Developer Portal
Create new application
Generate API keys with wallet permissions
Configure webhook endpoints

3. x402pay

Sign up at x402pay
Create merchant account
Generate API keys
Configure webhook URLs

4. Market Data APIs

CoinMarketCap: Get free API key at CoinMarketCap API
CoinGecko: Get API key at CoinGecko API


🎮 Usage Guide
For End Users
1. Account Creation

Email/Password: Traditional registration
Wallet Connection: MetaMask or Coinbase Wallet
Auto-Signup: First-time wallet users are automatically registered

2. Analysis Request Flow

Select Analysis Type: Choose from 6 different analysis types
Configure Parameters: Set cryptocurrency symbol and preferences
Pay with x402pay: Secure payment processing
AI Generation: Amazon Bedrock creates your analysis
Receive Results: Professional-grade analysis report

3. Analysis Types
TypePriceDurationDescriptionBasic Overview$102-3 minPrice, market cap, short-term outlookTechnical Analysis$255-7 minChart patterns, indicators, entry/exit pointsFundamental Analysis$357-10 minProject fundamentals, tokenomics, long-term valuePortfolio Review$458-12 minPortfolio composition, diversification, rebalancingMarket Sentiment$204-6 minSocial sentiment, news analysis, market psychologyDeFi Opportunities$5010-15 minYield farming, staking, DeFi protocol analysis
4. Dashboard Features

Analysis History: View all past analyses
Spending Analytics: Track your investment in research
Performance Metrics: Charts and insights
Export Reports: Download analyses as Markdown

For Administrators
Revenue Dashboard

Total Revenue: Real-time earnings tracking
Distribution Analytics: Stakeholder payment breakdown
User Analytics: Active users and engagement metrics
Payment Processing: Transaction status and history

Stakeholder Management

Profit Distribution: 60% platform, 25% data providers, 15% researchers
Automatic Payouts: CDP Wallet handles distribution
Transparent Reporting: Full audit trail of payments


📖 API Documentation
Authentication
Register User
httpPOST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}
Login User
httpPOST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}
Wallet Authentication
httpPOST /api/auth/wallet-login
Content-Type: application/json

{
  "address": "0x742d35Cc6482Bb4c8c43999e55B4e4b3B34d96c0",
  "message": "Sign in to CryptoAnalyst AI...",
  "signature": "0x..."
}
Analysis Endpoints
Get Analysis Types
httpGET /api/analysis/types
Response:
json[
  {
    "type": "TECHNICAL_ANALYSIS",
    "name": "Technical Analysis",
    "description": "Chart patterns, indicators, and entry/exit points",
    "price": 25,
    "duration": "5-7 minutes"
  }
]
Create Analysis
httpPOST /api/analysis
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "type": "TECHNICAL_ANALYSIS",
  "parameters": {
    "symbol": "BTC",
    "timeframe": "1d",
    "riskTolerance": "medium"
  }
}
Get Analysis Results
httpGET /api/analysis/{analysisId}
Authorization: Bearer <jwt_token>
Payment Endpoints
Complete Payment (Demo)
httpPOST /api/payments/{paymentId}/complete
Authorization: Bearer <jwt_token>
Get Payment Status
httpGET /api/payments/{paymentId}/status
Authorization: Bearer <jwt_token>
Wallet Endpoints
Create CDP Wallet
httpPOST /api/wallet/create
Authorization: Bearer <jwt_token>
Get Wallet Balance
httpGET /api/wallet/{walletId}/balance
Authorization: Bearer <jwt_token>
Error Responses
400 Bad Request
json{
  "error": "Invalid request parameters",
  "details": "Symbol is required"
}
401 Unauthorized
json{
  "error": "Authentication required"
}
500 Internal Server Error
json{
  "error": "Internal server error"
}

🔧 Development
Project Structure
cryptoanalyst-ai/
├── backend/                    # Node.js/Express API
│   ├── src/
│   │   ├── controllers/       # Route handlers
│   │   ├── services/          # Business logic
│   │   ├── middleware/        # Auth, validation, etc.
│   │   ├── utils/            # Utilities and config
│   │   └── routes/           # API routes
│   ├── prisma/               # Database schema
│   └── package.json
├── frontend/                  # React application
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── hooks/           # Custom hooks
│   │   ├── services/        # API clients
│   │   ├── types/           # TypeScript types
│   │   └── utils/          # Utilities
│   └── package.json
├── docs/                     # Documentation
├── docker-compose.yml        # Development setup
└── README.md
Development Scripts
Backend
bashcd backend

# Development with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Database operations
npm run db:push      # Push schema changes
npm run db:generate  # Generate Prisma client
Frontend
bashcd frontend

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
Code Quality
ESLint Configuration
json{
  "extends": [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "react-hooks/recommended"
  ],
  "rules": {
    "no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn"
  }
}
Prettier Configuration
json{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2
}
Git Workflow
bash# Feature development
git checkout -b feature/new-analysis-type
git commit -m "feat: add sentiment analysis type"
git push origin feature/new-analysis-type

# Create Pull Request
# Merge to main after review

🚢 Deployment
Production Deployment Options
Option 1: AWS (Recommended for Hackathon)
Backend Deployment
bash# Using AWS App Runner
aws apprunner create-service \
  --service-name cryptoanalyst-api \
  --source-configuration '{
    "ImageRepository": {
      "ImageIdentifier": "your-ecr-repo:latest",
      "ImageConfiguration": {
        "Port": "3001"
      }
    }
  }'
Frontend Deployment
bash# Build frontend
npm run build

# Deploy to S3 + CloudFront
aws s3 sync dist/ s3://cryptoanalyst-frontend
aws cloudfront create-invalidation --distribution-id DISTRIBUTION_ID --paths "/*"
Option 2: Vercel + Railway
Frontend (Vercel)
bash# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
Backend (Railway)

Connect GitHub repository to Railway
Configure environment variables
Deploy automatically on push

Option 3: Docker Deployment
Complete Stack
bash# Build and run
docker-compose up -d

# Production configuration
docker-compose -f docker-compose.prod.yml up -d
Environment-Specific Configurations
Production Environment Variables
envNODE_ENV=production
DATABASE_URL="postgresql://prod_user:password@prod-db:5432/cryptoanalyst"
FRONTEND_URL="https://cryptoanalyst.ai"
BACKEND_URL="https://api.cryptoanalyst.ai"
Security Considerations

Enable HTTPS in production
Configure CORS properly
Use secure JWT secrets
Enable rate limiting
Set up monitoring and logging
