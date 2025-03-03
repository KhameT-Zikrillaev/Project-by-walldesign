import { useMutation } from '@tanstack/react-query';
import api from './api';

const useApiMutation = ({ url, method = 'POST', onSuccess, onError }) => {
  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await api({
        url,
        method,
        data,
      });
      return response.data;
    },
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data); // Muvaffaqiyatli javob
    },
    onError: (error) => {
      console.error('Mutation error:', error.response?.data?.message || error.message);
      if (onError) onError(error); // Xatolikni qayta ishlash
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
