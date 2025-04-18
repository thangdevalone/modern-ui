import { useState, useEffect } from 'react';
import axiosService from '@/lib/services/axios.service';

export function useComponentCode(componentName: string) {
  const [code, setCode] = useState<string>("// Loading component code...");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComponentCode = async () => {
      setIsLoading(true);
      try {
        const response = await axiosService.get(`/api/component-code`, {
          params: { name: componentName }
        });

        if (response.data.code) {
          setCode(response.data.code);
          setError(null);
        } else {
          setCode("// Failed to load component code");
          setError(response.data.error || "Unknown error");
        }
      } catch (error: any) {
        console.error(`Error fetching code for ${componentName}:`, error);
        setCode("// Error loading component code");
        setError(error?.message || "Failed to fetch component code");
      } finally {
        setIsLoading(false);
      }
    };

    fetchComponentCode();
  }, [componentName]);

  return { code, isLoading, error };
} 