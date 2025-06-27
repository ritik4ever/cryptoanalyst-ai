import { useState } from 'react';
import { analysisAPI } from '../services/api';
import { Analysis } from '../types';
import toast from 'react-hot-toast';

export const useAnalysis = () => {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [currentAnalysis, setCurrentAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);

  const createAnalysis = async (type: string, parameters: any) => {
    setLoading(true);
    try {
      const response = await analysisAPI.create(type, parameters);
      toast.success('Analysis request created!');
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to create analysis');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getAnalysis = async (id: string) => {
    setLoading(true);
    try {
      const response = await analysisAPI.get(id);
      setCurrentAnalysis(response.data);
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to get analysis');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loadUserAnalyses = async () => {
    setLoading(true);
    try {
      const response = await analysisAPI.getUserAnalyses();
      setAnalyses(response.data.analyses);
      return response.data;
    } catch (error: any) {
      console.error('Failed to load analyses:', error);
      return { analyses: [] };
    } finally {
      setLoading(false);
    }
  };

  return {
    analyses,
    currentAnalysis,
    loading,
    createAnalysis,
    getAnalysis,
    loadUserAnalyses,
    setCurrentAnalysis,
  };
};