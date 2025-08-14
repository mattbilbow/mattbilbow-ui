'use client';

import {useState, useEffect, use} from 'react';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import {getPost, updatePost} from '@/lib/api';
import PostForm from '@/components/PostForm';
import {Post} from '@/types/post';

interface EditPostPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function EditPostPage({params}: EditPostPageProps) {
    const resolvedParams = use(params);
    const [post, setPost] = useState<Post | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingPost, setIsLoadingPost] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const fetchedPost = await getPost(resolvedParams.id);
                if (fetchedPost) {
                    setPost(fetchedPost);
                } else {
                    setError('Post not found');
                }
            } catch (error) {
                setError('Failed to load post');
                console.error('Error fetching post:', error);
            } finally {
                setIsLoadingPost(false);
            }
        };

        fetchPost();
    }, [resolvedParams.id]);

    const handleSubmit = async (data: { title: string; description: string; content: string }) => {
        if (!post) return;

        setIsLoading(true);
        setError(null);

        try {
            const updatedPost = await updatePost(post.id, data);

            if (updatedPost) {
                router.push(`/posts/${post.id}`);
                router.refresh();
            } else {
                setError('Failed to update post. Please try again.');
            }
        } catch (error) {
            setError('An error occurred while updating the post.');
            console.error('Update post error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        router.push(`/posts/${resolvedParams.id}`);
    };

    if (isLoadingPost) {
        return (
            <main>
                <div className="bg-white py-24">
                    <div className="mx-auto max-w-4xl px-6 lg:px-8">
                        <div className="text-center">Loading...</div>
                    </div>
                </div>
            </main>
        );
    }

    if (error || !post) {
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
                        <div className="text-center text-red-600">
                            {error || 'Post not found'}
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main>
            <div className="bg-white py-24">
                <div className="mx-auto max-w-4xl px-6 lg:px-8">
                    <Link
                        href={`/posts/${post.id}`}
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
                    >
                        ← Back to post
                    </Link>

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Edit Post</h1>
                        <p className="mt-2 text-gray-600">Make changes to your blog post.</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-red-700">{error}</p>
                        </div>
                    )}

                    <PostForm
                        post={post}
                        onSubmit={handleSubmit}
                        onCancel={handleCancel}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </main>
    );
}