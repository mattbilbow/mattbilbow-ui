export interface Category {
    id: number;
    name: string;
    slug: string;
}

export interface Post {
    id: number;
    title: string;
    description: string;
    content: string;
    created_at: string;
    category?: Category | null;
}

export interface ApiResponse<T> {
    data: T;
}