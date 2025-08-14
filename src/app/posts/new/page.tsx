'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { mutate } from 'swr';
import { createPost } from '@/lib/api';
import PostForm from '@/components/PostForm';

export default function NewPostPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (data: { title: string; description: string; content: string }) => {
        setIsLoading(true);
        setError(null);

        try {
            const newPost = await createPost(data);

            if (newPost) {
                mutate('/api/posts');
                router.push(`/posts/${newPost.id}`);
            } else {
                setError('Failed to create post. Please try again.');
            }
        } catch (error) {
            setError('An error occurred while creating the post.');
            console.error('Create post error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        router.push('/posts');
    };

    return (
        <main>
            <div className="bg-white py-24">
                <div className="mx-auto max-w-4xl px-6 lg:px-8">
                    <Link
                        href="/posts"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
                    >
                        ← Back to posts
                    </Link>

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Create New Post</h1>
                        <p className="mt-2 text-gray-600">Write a new blog post to share with the world.</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-red-700">{error}</p>
                        </div>
                    )}

                    <PostForm
                        onSubmit={handleSubmit}
                        onCancel={handleCancel}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </main>
    );
}