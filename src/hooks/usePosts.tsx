import useSWR from 'swr';
import {getPosts} from '@/lib/api';

export function usePosts() {
    const {data, error, isLoading, mutate} = useSWR('/api/posts', getPosts);

    return {
        posts: data || [],
        isLoading,
        isError: !!error,
        refresh: mutate
    };
}
