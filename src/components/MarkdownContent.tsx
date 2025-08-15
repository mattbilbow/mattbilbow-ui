'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypePrism from 'rehype-prism-plus';
import 'prismjs/themes/prism.css';

interface MarkdownContentProps {
    content: string;
}

const MarkdownContent = ({content}: MarkdownContentProps) => {
    return (
        <div className="prose prose-lg max-w-none">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypePrism]}
                components={{
                    h1: ({children}) => (
                        <h1 className="text-3xl font-bold text-dark mt-8 mb-4 first:mt-0">
                            {children}
                        </h1>
                    ),
                    h2: ({children}) => (
                        <h2 className="text-2xl font-bold text-dark mt-10 mb-4 first:mt-0">
                            {children}
                        </h2>
                    ),
                    h3: ({children}) => (
                        <h3 className="text-xl font-bold text-dark mt-8 mb-3">
                            {children}
                        </h3>
                    ),
                    p: ({children}) => (
                        <p className="text-main text-base mb-4">
                            {children}
                        </p>
                    ),
                    a: ({children, href, ...props}) => (
                        <a
                            href={href}
                            target="_blank"
                            className="text-dark text-base !underline hover:text-accent"
                            {...props}
                        >
                            {children}
                        </a>
                    ),
                    li: ({children}) => (
                        <li className="text-main text-base mb-2">
                            {children}
                        </li>
                    ),
                    code: ({children, ...props}) => (
                        <code
                            className={
                                props.className?.includes('language-')
                                    ? "text-sm font-mono"
                                    : "bg-medium rounded px-1 py-0.5 text-sm font-mono text-accent"
                            }
                            {...props}
                        >
                            {children}
                        </code>
                    ),
                    blockquote: ({children}) => (
                        <blockquote className="border-l-4 border-accent pl-4 italic text-main my-4">
                            {children}
                        </blockquote>
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownContent;