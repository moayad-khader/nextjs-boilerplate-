# Chat Hooks Documentation

This document explains how to use the `useChats` and `useChat` hooks in your application.

## Overview

Two new hooks have been created to manage chat functionality:

1. **`useChats`** - Manages the list of user's chats
2. **`useChat`** - Manages a single chat conversation with messages

## useChats Hook

The `useChats` hook fetches and manages the user's chat list.

### Usage

```typescript
import { useChats } from '@/hooks/useChats'

function ChatsList() {
  const { chats, loading, error, refetch } = useChats()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      {chats.map(chat => (
        <div key={chat.chat_id}>
          <h3>{chat.chat_title}</h3>
          <p>{chat.created_at.toLocaleDateString()}</p>
        </div>
      ))}
      <button onClick={refetch}>Refresh</button>
    </div>
  )
}
```

### Return Values

- `chats: Chat[]` - Array of user's chats
- `loading: boolean` - Loading state
- `error: Error | null` - Error state
- `refetch: () => void` - Function to refetch chats

## useChat Hook

The `useChat` hook manages a single chat conversation. It automatically handles:

- Reading `chatId` from URL parameters
- Creating new chats when no `chatId` is present
- Fetching and transforming chat threads into messages
- Sending messages using the agent
- Updating the URL when a new chat is created

### Usage

```typescript
import { useChat } from '@/hooks/useChat'

function ChatInterface() {
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

  const handleSend = async (message: string) => {
    try {
      await sendMessage(message)
    } catch (error) {
      // Handle error
    }
  }

  return (
    <div>
      <div>
        {messages.map(message => (
          <div key={message.id}>
            <strong>{message.type}:</strong> {message.text}
            {message.graph && <div>Has visualization</div>}
            {message.report && <div>Has SQL report</div>}
          </div>
        ))}
      </div>
      <input 
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSend(e.currentTarget.value)
            e.currentTarget.value = ''
          }
        }}
        disabled={sendingMessage}
      />
    </div>
  )
}
```

### Return Values

- `chatId: string | null` - Current chat ID from URL
- `messages: Message[]` - Array of messages in the chat
- `loading: boolean` - Loading state for fetching messages
- `error: Error | null` - Error state
- `sendingMessage: boolean` - Whether a message is being sent
- `sendMessage: (message: string) => Promise<void>` - Function to send a message
- `clearChat: () => void` - Function to clear current chat and remove chatId from URL
- `refetch: () => void` - Function to refetch messages for current chat

## URL Management

The `useChat` hook automatically manages the `chatId` URL parameter:

- **No chatId in URL**: Creates a new chat when the first message is sent
- **chatId in URL**: Loads the existing chat and its messages
- **New chat created**: Updates URL with the new `chatId`
- **Clear chat**: Removes `chatId` from URL

Example URLs:
- `/agent` - No chat loaded, will create new chat on first message
- `/agent?chatId=abc123` - Loads chat with ID "abc123"

## Message Transformation

The hook automatically transforms chat threads from the API into a consistent message format:

- **User messages**: Created from `chat_thread_question.message`
- **Agent messages**: Uses the existing `chat_thread_response` message object
- **Sorting**: Messages are sorted by timestamp for proper chronological order

## Integration with useAgent

The `useChat` hook uses the `useAgent` hook internally for sending messages to the agent. This ensures:

- Proper session management
- Consistent agent communication
- Error handling for agent responses

## Error Handling

Both hooks provide comprehensive error handling:

- Network errors
- Authentication errors
- Validation errors
- Agent communication errors

Always check the `error` state and handle it appropriately in your UI.

## Example: Complete Chat Page

```typescript
import { useChats } from '@/hooks/useChats'
import { useChat } from '@/hooks/useChat'

export default function ChatPage() {
  const { chats } = useChats()
  const { messages, sendMessage, sendingMessage } = useChat()

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar with chat list */}
      <div style={{ width: '300px' }}>
        <h2>Your Chats</h2>
        {chats.map(chat => (
          <div key={chat.chat_id}>
            <a href={`?chatId=${chat.chat_id}`}>
              {chat.chat_title}
            </a>
          </div>
        ))}
      </div>

      {/* Main chat area */}
      <div style={{ flex: 1 }}>
        <div>
          {messages.map(message => (
            <div key={message.id}>
              {message.type}: {message.text}
            </div>
          ))}
        </div>
        <form onSubmit={async (e) => {
          e.preventDefault()
          const formData = new FormData(e.currentTarget)
          const message = formData.get('message') as string
          if (message.trim()) {
            await sendMessage(message.trim())
            e.currentTarget.reset()
          }
        }}>
          <input name="message" disabled={sendingMessage} />
          <button type="submit" disabled={sendingMessage}>
            {sendingMessage ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  )
}
```
