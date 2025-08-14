'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {deletePost} from '@/lib/api';

interface DeletePostButtonProps {
    postId: number;
}

const DeletePostButton = ({postId}: DeletePostButtonProps) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        setIsDeleting(true);

        try {
            const success = await deletePost(postId);

            if (success) {
                router.push('/posts');
                router.refresh();
            } else {
                alert('Failed to delete post. Please try again.');
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('An error occurred while deleting the post.');
        } finally {
            setIsDeleting(false);
            setShowConfirm(false);
        }
    };

    if (showConfirm) {
        return (
            <div className="inline-flex items-center space-x-2">
                <span className="text-sm text-gray-600">Are you sure?</span>
                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="px-3 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                >
                    {isDeleting ? 'Deleting...' : 'Yes, Delete'}
                </button>
                <button
                    onClick={() => setShowConfirm(false)}
                    className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Cancel
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={() => setShowConfirm(true)}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-700 bg-white border border-red-300 rounded-md shadow-sm hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
            Delete
        </button>
    );
};

export default DeletePostButton;