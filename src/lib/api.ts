import {Post, ApiResponse, Category} from '@/types/post';
import {LoginResponse} from '@/types/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function login(email: string, password: string): Promise<LoginResponse | null> {
    try {
        const res = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password}),
        });

        if (!res.ok) {
            return null;
        }

        return await res.json();
    } catch (error) {
        console.error('Error logging in:', error);
        return null;
    }
}

function getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth_token');
}

function getAuthHeaders(): HeadersInit {
    const token = getAuthToken();
    return {
        'Content-Type': 'application/json',
        ...(token && {'Authorization': `Bearer ${token}`}),
    };
}

export async function createPost(post: Omit<Post, 'id' | 'created_at'>): Promise<Post | null> {
    try {
        const res = await fetch(`${API_URL}/api/posts`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({
                data: {
                    title: post.title,
                    description: post.description,
                    content: post.content,
                    category_id: post.category?.id || null
                }
            }),
        });

        const response: ApiResponse<Post> = await res.json();
        return response.data;
    } catch (error) {
        console.error('Error creating post:', error);
        return null;
    }
}

export async function updatePost(id: number, post: Omit<Post, 'id' | 'created_at'>): Promise<Post | null> {
    try {
        const res = await fetch(`${API_URL}/api/posts/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify({
                data: {
                    title: post.title,
                    description: post.description,
                    content: post.content,
                    category_id: post.category?.id || null
                }
            }),
        });

        const response: ApiResponse<Post> = await res.json();
        return response.data;
    } catch (error) {
        console.error('Error updating post:', error);
        return null;
    }
}

export async function deletePost(id: number): Promise<boolean> {
    try {
        const res = await fetch(`${API_URL}/api/posts/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
        });

        return res.ok;
    } catch (error) {
        console.error('Error deleting post:', error);
        return false;
    }
}

export async function getCategories(): Promise<Category[]> {
    try {
        const res = await fetch(`${API_URL}/api/categories`, {
            cache: 'force-cache', // Categories don't change often
        });

        const response: ApiResponse<Category[]> = await res.json();
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

export async function getPosts(): Promise<Post[]> {
    try {
        const res = await fetch(`${API_URL}/api/posts`, {
            cache: 'no-store',
        });

        const response: ApiResponse<Post[]> = await res.json();
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

export async function getPost(id: string): Promise<Post | null> {
    try {
        const res = await fetch(`${API_URL}/api/posts/${id}`, {
            cache: 'no-store',
        });

        if (!res.ok) {
            return null;
        }

        const response: ApiResponse<Post> = await res.json();
        return response.data;
    } catch (error) {
        console.error('Error fetching post:', error);
        return null;
    }
}