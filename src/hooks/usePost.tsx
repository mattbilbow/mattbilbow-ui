import useSWR from 'swr';
import {getPost} from '@/lib/api';

export function usePost(id: string | null) {
    const {data, error, isLoading, mutate} = useSWR(
        id ? `/api/posts/${id}` : null,
        () => id ? getPost(id) : null
    );

    return {
        post: data,
        isLoading,
        isError: !!error,
        refresh: mutate
    };
}
