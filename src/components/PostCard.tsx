import Link from "next/link";

interface PostCardProps {
    id: number;
    title: string;
    content: string;
    created_at: string;
    category?: {
        id: number;
        name: string;
        slug: string;
    } | null;
}

const PostCard = ({id, title, content, created_at, category}: PostCardProps) => {
    const createdAt = new Date(created_at);
    const excerpt = content.slice(0, 375);

    return (
        <div className="flex flex-col gap-8 border-b border-gray-300 border-t mt-1 pb-15 pt-15 first:pt-0 first:mt-0 first:border-t-0">
            {category && (
                <span className="inline-flex items-center text-base font-medium text-main">{category.name}</span>
            )}
            <h3 className="text-5xl font-bold m-0">
                <Link href={`/posts/${id}`} className="text-dark hover:text-main">
                    {title} —&nbsp;
                </Link>
            </h3>
            <time dateTime={created_at} className="text-main">
                Posted on {createdAt.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })}
            </time>
            <p className="line-clamp-3 text-base text-main m-0">
                {excerpt}
            </p>
            <Link href={`/posts/${id}`} className="text-accent group-hover:text-gray-600 !underline">
                Read more
            </Link>
        </div>
    );
};

export default PostCard;