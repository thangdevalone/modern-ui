import { useState, useEffect } from 'react';
import axiosService from '@/lib/services/axios.service';

export function useHookCode(hookName: string) {
  const [code, setCode] = useState<string>("// Loading hook code...");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComponentCode = async () => {
      setIsLoading(true);
      try {
        const response = await axiosService.get(`/api/hook-code`, {
          params: { name: hookName }
        });
        
        if (response.data.code) {
          setCode(response.data.code);
          setError(null);
        } else {
          setCode("// Failed to load component code");
          setError(response.data.error || "Unknown error");
        }
      } catch (error: any) {
        console.error(`Error fetching code for ${hookName}:`, error);
        setCode("// Error loading component code");
        setError(error?.message || "Failed to fetch component code");
      } finally {
        setIsLoading(false);
      }
    };

    fetchComponentCode();
  }, [hookName]);

  return { code, isLoading, error };
} 