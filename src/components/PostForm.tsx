'use client';

import {useState, FormEvent, ChangeEvent} from 'react';
import {Post} from '@/types/post';
import {useCategories} from '@/hooks/useCategories';
import MarkdownContent from './MarkdownContent';

interface PostFormProps {
    post?: Post;
    onSubmit: (data: {
        title: string;
        description: string;
        content: string;
        category?: { id: number } | null
    }) => Promise<void>;
    onCancel: () => void;
    isLoading?: boolean;
}

const PostForm = ({post, onSubmit, onCancel, isLoading = false}: PostFormProps) => {
    const {categories, isLoading: categoriesLoading} = useCategories();

    const [formData, setFormData] = useState({
        title: post?.title ?? "",
        description: post?.description ?? "",
        content: post?.content ?? "",
        categoryId: post?.category?.id ?? null,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showPreview, setShowPreview] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const newErrors: Record<string, string> = {};
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.content.trim()) newErrors.content = 'Content is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        const submitData = {
            title: formData.title,
            description: formData.description,
            content: formData.content,
            category: formData.categoryId ? { id: formData.categoryId } : null
        };

        await onSubmit(submitData);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        const processedValue = name === 'categoryId'
            ? (value === '' ? null : parseInt(value))
            : value;

        setFormData(prev => ({ ...prev, [name]: processedValue }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title *
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                            errors.title ? 'border-red-300' : ''
                        }`}
                        placeholder="Enter post title"
                        disabled={isLoading}
                    />
                    {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                </div>

                <div>
                    <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">
                        Category
                    </label>
                    <select
                        name="categoryId"
                        id="categoryId"
                        value={formData.categoryId?.toString() || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        disabled={isLoading || categoriesLoading}
                    >
                        <option value="">No Category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <p className="mt-1 text-sm text-gray-500">
                        Optional - helps organize your posts
                    </p>
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <input
                        type="text"
                        name="description"
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="Brief description of the post"
                        disabled={isLoading}
                    />
                    <p className="mt-1 text-sm text-gray-500">
                        Optional - appears as a subtitle and in post previews
                    </p>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                            Content * (Markdown supported)
                        </label>
                        <button
                            type="button"
                            onClick={() => setShowPreview(!showPreview)}
                            className="text-sm text-blue-600 hover:text-blue-800"
                            disabled={isLoading}
                        >
                            {showPreview ? 'Edit' : 'Preview'}
                        </button>
                    </div>

                    {showPreview ? (
                        <div className="min-h-[300px] p-4 border border-gray-300 rounded-md bg-gray-50">
                            {formData.content ? (
                                <MarkdownContent content={formData.content} />
                            ) : (
                                <p className="text-gray-500 italic">Nothing to preview yet...</p>
                            )}
                        </div>
                    ) : (
                        <textarea
                            name="content"
                            id="content"
                            rows={20}
                            value={formData.content}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm font-mono ${
                                errors.content ? 'border-red-300' : ''
                            }`}
                            placeholder="Enter your markdown content here..."
                            disabled={isLoading}
                        />
                    )}
                    {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}

                    {!showPreview && (
                        <p className="mt-1 text-sm text-gray-500">
                            You can use Markdown syntax: **bold**, *italic*, `code`, links, lists, code blocks, etc.
                        </p>
                    )}
                </div>

                <div className="flex justify-end space-x-3 pt-6 border-t">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                        disabled={isLoading || categoriesLoading}
                    >
                        {isLoading ? 'Saving...' : post ? 'Update Post' : 'Create Post'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostForm;