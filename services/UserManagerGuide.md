### ChatManager Guide

#### Introduction

The `ChatManager` class is designed to manage chat interactions within your application. This guide will help you understand how to use `ChatManager` to create and manage chats, set active chats, and retrieve chat messages in various formats.

#### Basic Usage

##### Importing ChatManager

Ensure you have imported the `ChatManager` class at the top of your file:

```typescript
import { ChatManager } from './path-to-your-file'
```

##### Creating the Singleton Instance

Create a single instance of `ChatManager`:

```typescript
const chatManager = ChatManager.getInstance()
```

##### Creating a Chat

Create a new chat without providing a chat ID (a unique ID will be generated):

```typescript
chatManager.createChat('Travel Advice')
```

Create a new chat with a specific chat ID:

```typescript
chatManager.createChat('Travel Advice', '1')
```

##### Setting and Getting the Active Chat

Set the active chat by its ID:

```typescript
chatManager.setActiveChat('1')
```

Get the currently active chat:

```typescript
const activeChat = chatManager.getActiveChat()
console.log(activeChat)
```

##### Adding Messages to the Active Chat

Add messages to the active chat:

```typescript
activeChat?.addMessageToChat(new SystemEntry('You are a helpful assistant'))
activeChat?.addMessageToChat(new UserEntry('Can you give me travel advice'))
activeChat?.addMessageToChat(new AssistantEntry('Of course! Where are you going?'))
activeChat?.addMessageToChat(new UserEntry("I'm going to New York"))
activeChat?.addMessageToChat(
    new AssistantEntry(
        'Is it ok if I ask you a few questions to make sure I give you the best possible advice?'
    )
)
```

##### Retrieving Chat Messages in Various Formats

Get the active chat messages in the default format (matrix):

```typescript
console.log(chatManager.getActiveChatMessagesArray())
```

Get the active chat messages in the OpenAI format:

```typescript
console.log(chatManager.getActiveChatMessagesArray('openai'))
```

Get the active chat messages in the Claude format:

```typescript
console.log(chatManager.getActiveChatMessagesArray('claude'))
```

Get the active chat messages in the Gemini format:

```typescript
console.log(chatManager.getActiveChatMessagesArray('gemini'))
```

#### Exporting and Importing Chats

Export all chat data to a JSON string:

```typescript
const exportedChats = chatManager.exportAllChats()
console.log(exportedChats)
```

Import chat data from a JSON string:

```typescript
chatManager.importAllChats(exportedChats)
```

### Example Usage

```typescript
const userManager = UserManager.getInstance()
userManager.createGuestUser()
const chatManager = ChatManager.getInstance()

chatManager.createChat('Travel Advice')
chatManager.createChat('1', 'Travel Advice')

chatManager.setActiveChat('1')
const activeChat = chatManager.getActiveChat()

activeChat?.addMessageToChat(new SystemEntry('You are a helpful assistant'))
activeChat?.addMessageToChat(new UserEntry('Can you give me travel advice'))
activeChat?.addMessageToChat(new AssistantEntry('Of course! Where are you going?'))
activeChat?.addMessageToChat(new UserEntry("I'm going to New York"))
activeChat?.addMessageToChat(
    new AssistantEntry(
        'Is it ok if I ask you a few questions to make sure I give you the best possible advice?'
    )
)

console.log(chatManager.getActiveChatMessagesArray())
console.log(chatManager.getActiveChatMessagesArray('matrix'))
console.log(chatManager.getActiveChatMessagesArray('openai'))
console.log(chatManager.getActiveChatMessagesArray('claude'))
console.log(chatManager.getActiveChatMessagesArray('gemini'))
```
