'use client'

import React from 'react'
import { memo, useCallback, useMemo } from 'react'
import { marked } from 'marked'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight'
import 'katex/dist/katex.min.css' // `rehype-katex` does not import the CSS for you
import { Message } from '@/types/message'

interface MessageTextComponentProps {
    message: Message
}


function parseMarkdownIntoBlocks(markdown: string): string[] {
    const tokens = marked.lexer(markdown)
    return tokens.map(token => token.raw)
}

const MemoizedMarkdownBlock = memo(
    ({ content }: { content: string }) => {
        return (
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                    a: ({ node, ...props }) => (
                        <a {...props} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline" />
                    ),
                    code({ node, className, children, ...props }) {
                        return (
                            <code className="bg-gray-200 px-1 rounded" {...props}>
                                {children}
                            </code>
                        )
                    },
                    table: ({ node, ...props }) => <table className="min-w-full border border-gray-300 my-4" {...props} />,
                    thead: ({ node, ...props }) => <thead className="bg-gray-100" {...props} />,
                    tbody: ({ node, ...props }) => <tbody {...props} />,
                    tr: ({ node, ...props }) => <tr className="border-b border-gray-200" {...props} />,
                    th: ({ node, ...props }) => (
                        <th className="px-4 py-2 font-semibold text-left border border-gray-300" {...props} />
                    ),
                    td: ({ node, ...props }) => <td className="px-4 py-2 border border-gray-300" {...props} />,
                }}
            >
                {content}
            </ReactMarkdown>
        )
    },
    (prevProps, nextProps) => {
        if (prevProps.content !== nextProps.content) {
            return false
        }
        return true
    },
)

const MemoizedMarkdown = memo(({ content, id }: { content: string; id: string }) => {
    const blocks = useMemo(() => parseMarkdownIntoBlocks(content), [content])

    return blocks.map((block, index) => <MemoizedMarkdownBlock content={block} key={`${id}-block_${index}`} />)
})

export default function MessageTextComponent({ message }: MessageTextComponentProps) {
    return (
        <>
            {message.text && <MemoizedMarkdown content={message.text} id={message.id} />}
        </>
    )
}
