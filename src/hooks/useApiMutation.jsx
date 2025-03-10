import { useMutation } from '@tanstack/react-query';
import api from '@/services/api';

const useApiMutation = ({ url, method = 'POST', onSuccess, onError }) => {
  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await api({
        url,
        method,
        data: method === 'DELETE' ? undefined : data, // DELETE uchun `data` yuborilmaydi
      });
      return response.data;
    },
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data);
    },
    onError: (error) => {
      console.error('Mutation error:', error.response?.data?.message || error.message);
      if (onError) onError(error);
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
  };
};

export default useApiMutation;
