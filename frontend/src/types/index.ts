export interface User {
  id: string;
  email: string;
  walletId?: string;
  createdAt: string;
}

export interface Analysis {
  id: string;
  type: AnalysisType;
  parameters: any;
  result?: AnalysisResult;
  status: AnalysisStatus;
  price: number;
  createdAt: string;
  completedAt?: string;
  payment?: Payment;
}

export interface AnalysisResult {
  fullAnalysis: string;
  executiveSummary: string;
  cryptoData: CryptoData;
  marketData: MarketData;
  generatedAt: string;
}

export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  x402PaymentId?: string;
  transactionHash?: string;
  createdAt: string;
  completedAt?: string;
}

export interface CryptoData {
  symbol: string;
  name: string;
  price: number;
  marketCap: number;
  volume24h: number;
  change24h: number;
  change7d: number;
  change30d: number;
  rank: number;
}

export interface MarketData {
  totalMarketCap: number;
  totalVolume: number;
  btcDominance: number;
  ethDominance: number;
  fearGreedIndex?: number;
}

export type AnalysisType = 
  | 'BASIC_OVERVIEW'
  | 'TECHNICAL_ANALYSIS'
  | 'FUNDAMENTAL_ANALYSIS'
  | 'PORTFOLIO_REVIEW'
  | 'MARKET_SENTIMENT'
  | 'DEFI_OPPORTUNITIES';

export type AnalysisStatus = 'PENDING_PAYMENT' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
export type PaymentStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';

export interface AnalysisTypeInfo {
  type: AnalysisType;
  name: string;
  description: string;
  price: number;
  duration: string;
}