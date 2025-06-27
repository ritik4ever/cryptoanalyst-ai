# 🚀 CryptoAnalyst AI - Hackathon Winning Project

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
