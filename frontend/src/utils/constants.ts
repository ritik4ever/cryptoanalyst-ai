export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const ANALYSIS_TYPES = {
  BASIC_OVERVIEW: 'Basic Overview',
  TECHNICAL_ANALYSIS: 'Technical Analysis',
  FUNDAMENTAL_ANALYSIS: 'Fundamental Analysis',
  PORTFOLIO_REVIEW: 'Portfolio Review',
  MARKET_SENTIMENT: 'Market Sentiment',
  DEFI_OPPORTUNITIES: 'DeFi Opportunities',
} as const;

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
} as const;

export const ANALYSIS_STATUS = {
  PENDING_PAYMENT: 'pending_payment',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;

export const PRICING = {
  BASIC_OVERVIEW: 10,
  TECHNICAL_ANALYSIS: 25,
  FUNDAMENTAL_ANALYSIS: 35,
  PORTFOLIO_REVIEW: 45,
  MARKET_SENTIMENT: 20,
  DEFI_OPPORTUNITIES: 50,
} as const;