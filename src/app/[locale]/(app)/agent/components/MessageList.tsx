'use client'

import {memo, useCallback, useMemo} from 'react'
import { marked } from 'marked'
import type {Message} from '../page'
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight';
import 'katex/dist/katex.min.css' // `rehype-katex` does not import the CSS for you

interface MessageListProps {
  messages: Message[]
}

import React from 'react';

function parseMarkdownIntoBlocks(markdown: string): string[] {
  const tokens = marked.lexer(markdown);
  return tokens.map(token => token.raw);
}

const MemoizedMarkdownBlock = memo(
  ({ content }: { content: string }) => {
    return <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          a: ({ node, ...props }) => (
            <a {...props} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline" />
          ),
          code({ node, className, children, ...props }) {
            return <code className="bg-gray-200 px-1 rounded" {...props}>{children}</code>
          },
          table: ({ node, ...props }) => (
            <table className="min-w-full border border-gray-300 my-4" {...props} />
          ),
          thead: ({ node, ...props }) => (
            <thead className="bg-gray-100" {...props} />
          ),
          tbody: ({ node, ...props }) => (
            <tbody {...props} />
          ),
          tr: ({ node, ...props }) => (
            <tr className="border-b border-gray-200" {...props} />
          ),
          th: ({ node, ...props }) => (
            <th className="px-4 py-2 font-semibold text-left border border-gray-300" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="px-4 py-2 border border-gray-300" {...props} />
          ),
        }}
      />;
  },
  (prevProps, nextProps) => {
    if (prevProps.content !== nextProps.content) return false;
    return true;
  },
);

const MemoizedMarkdown = memo(
  ({ content, id }: { content: string; id: string }) => {
    const blocks = useMemo(() => parseMarkdownIntoBlocks(content), [content]);

    return blocks.map((block, index) => (
      <MemoizedMarkdownBlock content={block} key={`${id}-block_${index}`} />
    ));
  },
);


export default function MessageList({messages}: MessageListProps) {
  const messagesEndRef = useCallback((node: HTMLDivElement | null) => {
    if (node !== null) {
      node.scrollIntoView({behavior: 'smooth'})
    }
  }, [])
  return (
    <div className="p-6 space-y-4 overflow-y-auto">
      {messages.map((message, idx) => (
      <div
        key={message.id}
        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
      >
        <div
          className={`rounded-lg p-3 shadow-sm transition-all duration-300 opacity-0 translate-y-4 animate-fade-in-up ${
            message.type === 'user'
              ? 'bg-primary text-primary-foreground'
              : 'bg-white text-foreground'
          }`}
          style={{
            animationDelay: `${idx * 60}ms`,
            maxWidth: '60vw',
          }}
        >
          <MemoizedMarkdown content={message.text} id={message.id} />
        </div>
      </div>
      ))}
      <div ref={messagesEndRef} />
      <style jsx>{`
      @keyframes fade-in-up {
        from {
        opacity: 0;
        transform: translateY(16px);
        }
        to {
        opacity: 1;
        transform: translateY(0);
        }
      }
      .animate-fade-in-up {
        animation: fade-in-up 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
      }
      `}</style>
    </div>
  )
}
