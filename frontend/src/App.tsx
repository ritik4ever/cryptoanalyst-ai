import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Brain, Coins, BarChart3, Settings } from 'lucide-react';
import AuthSection from './components/AuthSection';
import AnalysisForm from './components/AnalysisForm';
import PaymentModal from './components/PaymentModal';
import ReportViewer from './components/ReportViewer';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import { analysisAPI } from './services/api';
import { Analysis } from './types';

function App() {
  const [user, setUser] = useState<any>(null);
  const [currentAnalysis, setCurrentAnalysis] = useState<Analysis | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentId, setPaymentId] = useState<string>('');
  const [analysisAmount, setAnalysisAmount] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'create' | 'dashboard' | 'admin'>('create');

  const handleAnalysisCreated = (analysisId: string, paymentId: string) => {
    setPaymentId(paymentId);
    setShowPaymentModal(true);
    // Get analysis details to show amount
    analysisAPI.get(analysisId).then(response => {
      setCurrentAnalysis(response.data);
      setAnalysisAmount(response.data.price);
    });
  };

  const handlePaymentComplete = async () => {
    if (currentAnalysis) {
      // Start processing the analysis
      try {
        await analysisAPI.process(currentAnalysis.id);
        // Poll for completion
        pollAnalysisStatus(currentAnalysis.id);
      } catch (error) {
        console.error('Failed to start analysis processing:', error);
      }
    }
  };

  const pollAnalysisStatus = async (analysisId: string) => {
    const interval = setInterval(async () => {
      try {
        const response = await analysisAPI.get(analysisId);
        const analysis = response.data;
        
        if (analysis.status === 'COMPLETED') {
          setCurrentAnalysis(analysis);
          setActiveTab('dashboard');
          clearInterval(interval);
        } else if (analysis.status === 'FAILED') {
          clearInterval(interval);
        }
      } catch (error) {
        clearInterval(interval);
      }
    }, 5000);

    // Stop polling after 10 minutes
    setTimeout(() => clearInterval(interval), 600000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Brain className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">CryptoAnalyst AI</span>
              </div>
              <div className="hidden md:flex items-center space-x-1 ml-6">
                <span className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
                  Amazon Bedrock
                </span>
                <span className="px-2 py-1 text-xs font-medium text-purple-700 bg-purple-100 rounded-full">
                  x402pay
                </span>
                <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                  CDP Wallet
                </span>
              </div>
            </div>
            
            {user && (
              <nav className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('create')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'create'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Brain className="h-4 w-4" />
                  <span>Create Analysis</span>
                </button>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'dashboard'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={() => setActiveTab('admin')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'admin'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Settings className="h-4 w-4" />
                  <span>Revenue</span>
                </button>
              </nav>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            <AuthSection user={user} setUser={setUser} />
            
            {/* Features Highlight */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-900">Amazon Bedrock AI</p>
                    <p className="text-sm text-gray-600">Claude & Nova models for analysis</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-900">x402pay Integration</p>
                    <p className="text-sm text-gray-600">Pay-per-use monetization</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-900">CDP Wallet</p>
                    <p className="text-sm text-gray-600">Autonomous profit distribution</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Info */}
            <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">💰 Transparent Pricing</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Basic Overview:</span>
                  <span className="font-medium">$10</span>
                </div>
                <div className="flex justify-between">
                  <span>Technical Analysis:</span>
                  <span className="font-medium">$25</span>
                </div>
                <div className="flex justify-between">
                  <span>DeFi Opportunities:</span>
                  <span className="font-medium">$50</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-white border-opacity-20">
                <p className="text-xs text-green-100">
                  Revenue automatically distributed to data providers & researchers
                </p>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {!user ? (
              /* Landing Page */
              <div className="text-center py-12">
                <div className="max-w-3xl mx-auto">
                  <h1 className="text-4xl font-bold text-gray-900 mb-6">
                    AI-Powered Crypto Analysis
                    <span className="block text-2xl text-blue-600 mt-2">
                      with Autonomous Payments
                    </span>
                  </h1>
                  <p className="text-xl text-gray-600 mb-8">
                    Get professional cryptocurrency investment analysis powered by Amazon Bedrock AI. 
                    Pay only for what you use with x402pay, while supporting the ecosystem through 
                    automatic profit distribution via CDP Wallet.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                      <Brain className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                      <h3 className="font-semibold text-gray-900 mb-2">AI Analysis</h3>
                      <p className="text-sm text-gray-600">
                        Advanced market analysis using Amazon Bedrock's Claude and Nova models
                      </p>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                      <Coins className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                      <h3 className="font-semibold text-gray-900 mb-2">Pay Per Use</h3>
                      <p className="text-sm text-gray-600">
                        Fair pricing with x402pay - only pay for the analysis you need
                      </p>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                      <BarChart3 className="h-8 w-8 text-green-600 mx-auto mb-3" />
                      <h3 className="font-semibold text-gray-900 mb-2">Auto Distribution</h3>
                      <p className="text-sm text-gray-600">
                        Revenue automatically shared with data providers and researchers
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-500">
                    Please log in or create an account to start generating analyses
                  </p>
                </div>
              </div>
            ) : (
              /* User Content */
              <>
                {activeTab === 'create' && (
                  <AnalysisForm 
                    user={user} 
                    onAnalysisCreated={handleAnalysisCreated}
                  />
                )}
                
                {activeTab === 'dashboard' && (
                  <Dashboard user={user} />
                )}
                
                {activeTab === 'admin' && (
                  <AdminPanel />
                )}
                
                {/* Show current analysis if available */}
                {currentAnalysis && currentAnalysis.status === 'COMPLETED' && (
                  <ReportViewer analysis={currentAnalysis} />
                )}
              </>
            )}
          </div>
        </div>
      </main>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        paymentId={paymentId}
        amount={analysisAmount}
        onPaymentComplete={handlePaymentComplete}
      />
    </div>
  );
}

export default App;