'use client';

import {usePosts} from '@/hooks/usePosts';
import EmptyMessage from "@/components/EmptyMessage";
import PostCard from "@/components/PostCard";
import Loading from "@/components/Loading";
import ErrorMessage from "@/components/ErrorMessage";

export default function PostList() {
    const {posts, isLoading, isError, refresh} = usePosts();

    if (isLoading) {
        return (
            <main>
                <div className="py-24">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <Loading />
                    </div>
                </div>
            </main>
        );
    }

    if (isError) {
        return (
            <main>
                <div className="py-50">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <ErrorMessage
                            message="Failed to load posts"
                            onRetry={refresh}
                        />
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main>
            <div className="py-35 md:py-50">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl lg:mx-0 lg:max-w-none">
                        {posts.length === 0 ? (
                            <EmptyMessage />
                        ) : (
                            <div className="grid grid-cols-1 w-full">
                                {posts.map((post) => (
                                    <PostCard key={post.id} {...post} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}