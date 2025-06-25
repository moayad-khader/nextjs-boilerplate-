/**
 * Example usage of useChats and useChat hooks
 * 
 * This file demonstrates how to use the new chat hooks in your components.
 */

import React from 'react'
import { useChats } from '@/hooks/useChats'
import { useChat } from '@/hooks/useChat'

// Example component for displaying the list of chats
export function ChatList() {
    const { chats, loading, error, refetch } = useChats()
    if (loading) {
        return <div>Loading chats...</div>
    }
    if (error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <div>
            <h2>Your Chats</h2>
            <button onClick={refetch}>Refresh</button>
            {chats.map(chat => (
                <div key={chat.chat_id}>
                    <h3>{chat.chat_title}</h3>
                    <p>Created: {new Date(chat.created_at).toLocaleDateString()}</p>
                    <a href={`/agent?chatId=${chat.chat_id}`}>Open Chat</a>
                </div>
            ))}
        </div>
    )
}

// Example component for the chat interface
export function ChatInterface() {
    const {
        chatId,
        messages,
        loading,
        error,
        sendingMessage,
        sendMessage,
        clearChat,
        refetch
    } = useChat()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const message = formData.get('message') as string

        if (message.trim()) {
            try {
                await sendMessage(message.trim())
                // Clear the form
                e.currentTarget.reset()
            } catch {
                // Handle error appropriately in your app
            }
        }
    }

    return (
        <div>
            <div>
                <h2>Chat {chatId ? `(${chatId})` : '(New Chat)'}</h2>
                <button onClick={clearChat}>Clear Chat</button>
                <button onClick={refetch} disabled={!chatId}>
                    Refresh Messages
                </button>
            </div>

            {loading && <div>Loading messages...</div>}
            {error && <div>Error: {error.message}</div>}

            <div style={{ height: '400px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
                {messages.map(message => (
                    <div key={message.id} style={{ marginBottom: '10px' }}>
                        <strong>{message.type === 'user' ? 'You' : 'Agent'}:</strong>
                        <p>{message.text}</p>
                        {message.graph && (
                            <div>
                                <h4>Visualization: {message.graph.title}</h4>
                                {/* Render your visualization component here */}
                            </div>
                        )}
                        {message.report && (
                            <div>
                                <h4>SQL Query:</h4>
                                <pre style={{ background: '#f5f5f5', padding: '10px' }}>
                                    {message.report.content}
                                </pre>
                            </div>
                        )}
                        <small>{message.timestamp.toLocaleTimeString()}</small>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="message"
                    placeholder="Type your message..."
                    disabled={sendingMessage}
                    style={{ width: '100%', padding: '10px', marginTop: '10px' }}
                />
                <button type="submit" disabled={sendingMessage}>
                    {sendingMessage ? 'Sending...' : 'Send Message'}
                </button>
            </form>
        </div>
    )
}

// Usage in a page component:
export default function ExamplePage() {
    return (
        <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
            <div style={{ flex: 1 }}>
                <ChatList />
            </div>
            <div style={{ flex: 2 }}>
                <ChatInterface />
            </div>
        </div>
    )
}
