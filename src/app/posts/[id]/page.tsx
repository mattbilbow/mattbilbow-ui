'use client';

import {use} from 'react';
import Link from 'next/link';
import {useAuth} from '@/contexts/AuthContext';
import {usePost} from '@/hooks/usePost';
import DeletePostButton from '@/components/DeletePostButton';
import MarkdownContent from '@/components/MarkdownContent';
import Loading from '@/components/Loading';
import ErrorMessage from '@/components/ErrorMessage';

interface PostDetailPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function PostDetailPage({params}: PostDetailPageProps) {
    const resolvedParams = use(params);
    const {post, isLoading, isError, refresh} = usePost(resolvedParams.id);
    const {isAuthenticated} = useAuth();

    if (isLoading) {
        return (
            <main>
                <div className="py-24">
                    <div className="mx-auto max-w-4xl px-6 lg:px-8">
                        <Loading />
                    </div>
                </div>
            </main>
        );
    }

    if (isError || !post) {
        return (
            <main>
                <div className="py-24">
                    <div className="mx-auto max-w-4xl px-6 lg:px-8">
                        <ErrorMessage
                            message="Post not found"
                            onRetry={refresh}
                        />
                    </div>
                </div>
            </main>
        );
    }

    const createdAt = new Date(post.created_at);

    return (
        <main>
            <div className="py-24">
                <div className="mx-auto max-w-4xl px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <Link
                            href="/posts"
                            className="inline-flex items-center text-main hover:text-accent"
                        >
                            ← Back to posts
                        </Link>

                        {isAuthenticated && (
                            <div className="flex space-x-3">
                                <Link
                                    href={`/posts/${post.id}/edit`}
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Edit
                                </Link>
                                <DeletePostButton postId={post.id} />
                            </div>)}
                    </div>

                    <article className="mt-20">
                        <header className="flex flex-col gap-8 pt-15 pb-5 first:pt-0">
                            {post.category && (
                                <span className="inline-flex items-center text-base font-medium text-main">{post.category.name}</span>
                            )}
                            <h1 className="text-5xl font-bold m-0 text-dark">
                                {post.title} —&nbsp;
                            </h1>
                            <time dateTime={post.created_at} className="text-main">
                                Posted on {createdAt.toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                            </time>
                        </header>

                        <MarkdownContent content={post.content} />
                    </article>
                </div>
            </div>
        </main>
    );
}