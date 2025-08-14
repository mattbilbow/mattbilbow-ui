import useSWR from 'swr';
import { getCategories } from '@/lib/api';

export function useCategories() {
    const { data, error, isLoading } = useSWR('/api/categories', getCategories);

    return {
        categories: data || [],
        isLoading,
        isError: !!error
    };
}