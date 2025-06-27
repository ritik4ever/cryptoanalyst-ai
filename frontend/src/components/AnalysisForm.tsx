import React, { useState, useEffect } from 'react';
import { Brain, DollarSign, Clock, TrendingUp } from 'lucide-react';
import { analysisAPI } from '../services/api';
import { AnalysisTypeInfo } from '../types';
import toast from 'react-hot-toast';

interface AnalysisFormProps {
  user: any;
  onAnalysisCreated: (analysisId: string, paymentId: string) => void;
}

const AnalysisForm: React.FC<AnalysisFormProps> = ({ user, onAnalysisCreated }) => {
  const [analysisTypes, setAnalysisTypes] = useState<AnalysisTypeInfo[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');
  const [symbol, setSymbol] = useState('BTC');
  const [parameters, setParameters] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAnalysisTypes();
  }, []);

  const loadAnalysisTypes = async () => {
    try {
      const response = await analysisAPI.getTypes();
      setAnalysisTypes(response.data);
    } catch (error) {
      toast.error('Failed to load analysis types');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please login first');
      return;
    }

    if (!user.walletId) {
      toast.error('Please create a CDP wallet first');
      return;
    }

    setLoading(true);

    try {
      const analysisParameters = {
        symbol: symbol.toUpperCase(),
        ...parameters,
      };

      const response = await analysisAPI.create(selectedType, analysisParameters);
      
      toast.success('Analysis request created! Proceeding to payment...');
      onAnalysisCreated(response.data.analysisId, response.data.paymentId);
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to create analysis request');
    } finally {
      setLoading(false);
    }
  };

  const selectedTypeInfo = analysisTypes.find(type => type.type === selectedType);

  const renderParameterInputs = () => {
    if (!selectedType) return null;

    switch (selectedType) {
      case 'PORTFOLIO_REVIEW':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Portfolio Holdings (comma-separated symbols)
              </label>
              <input
                type="text"
                placeholder="BTC,ETH,SOL,DOGE"
                value={parameters.holdings || ''}
                onChange={(e) => setParameters({...parameters, holdings: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Investment Amount (USD)
              </label>
              <input
                type="number"
                placeholder="10000"
                value={parameters.amount || ''}
                onChange={(e) => setParameters({...parameters, amount: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );

      case 'TECHNICAL_ANALYSIS':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time Frame
              </label>
              <select
                value={parameters.timeframe || '1d'}
                onChange={(e) => setParameters({...parameters, timeframe: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="1h">1 Hour</option>
                <option value="4h">4 Hours</option>
                <option value="1d">1 Day</option>
                <option value="1w">1 Week</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Risk Tolerance
              </label>
              <select
                value={parameters.riskTolerance || 'medium'}
                onChange={(e) => setParameters({...parameters, riskTolerance: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Conservative</option>
                <option value="medium">Moderate</option>
                <option value="high">Aggressive</option>
              </select>
            </div>
          </div>
        );

      case 'DEFI_OPPORTUNITIES':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Investment Amount (USD)
              </label>
              <input
                type="number"
                placeholder="5000"
                value={parameters.amount || ''}
                onChange={(e) => setParameters({...parameters, amount: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Chains
              </label>
              <input
                type="text"
                placeholder="Ethereum,Polygon,Arbitrum"
                value={parameters.chains || ''}
                onChange={(e) => setParameters({...parameters, chains: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );

      default:
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Notes
            </label>
            <textarea
              placeholder="Any specific requirements or questions..."
              value={parameters.notes || ''}
              onChange={(e) => setParameters({...parameters, notes: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center space-x-3 mb-6">
        <Brain className="h-6 w-6 text-blue-600" />
        <h2 className="text-xl font-bold text-gray-900">Request AI Analysis</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Analysis Type
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {analysisTypes.map((type) => (
              <button
                key={type.type}
                type="button"
                onClick={() => setSelectedType(type.type)}
                className={`p-4 border rounded-lg text-left transition-all ${
                  selectedType === type.type
                    ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{type.name}</h3>
                  <div className="flex items-center space-x-1 text-green-600">
                    <DollarSign className="h-4 w-4" />
                    <span className="text-sm font-medium">{type.price}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{type.description}</p>
                <div className="flex items-center space-x-1 text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span className="text-xs">{type.duration}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {selectedType && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cryptocurrency Symbol
              </label>
              <input
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                placeholder="BTC, ETH, SOL..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {renderParameterInputs()}

            {selectedTypeInfo && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Analysis Summary</h4>
                    <p className="text-sm text-gray-600">{selectedTypeInfo.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-green-600 text-lg font-bold">
                      <DollarSign className="h-5 w-5" />
                      <span>{selectedTypeInfo.price}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-500 text-sm">
                      <Clock className="h-4 w-4" />
                      <span>{selectedTypeInfo.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !user}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 flex items-center justify-center space-x-2 font-medium"
            >
              <TrendingUp className="h-5 w-5" />
              <span>
                {loading 
                  ? 'Creating Request...' 
                  : `Generate Analysis - $${selectedTypeInfo?.price || 0}`
                }
              </span>
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default AnalysisForm;