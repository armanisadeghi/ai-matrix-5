### UserManager Guide

#### Introduction

The `UserManager` class is designed to manage user information within your application. This guide will help you understand how to use `UserManager` to create and manage users, including guest users.

#### Basic Usage

##### Importing UserManager

Ensure you have imported the `UserManager` class at the top of your file:

```typescript
import { UserManager } from './path-to-your-file'
```

##### Creating the Singleton Instance

Create a single instance of `UserManager`:

```typescript
const userManager = UserManager.getInstance()
```

##### Creating a Guest User

Create a guest user with default values:

```typescript
userManager.createGuestUser()
```

##### Creating a User

Create a new user by providing the necessary details:

```typescript
userManager.createUser(
    'uniqueUserId',
    'userToken',
    'accountType',
    'John',
    'Doe',
    'UserRole',
    'active',
    'organizationId',
    'john.doe@example.com',
    '1234567890',
    new Date(), // lastLogin
    new Date() // lastActivity
)
```

##### Setting and Getting the Active User

Set the active user by their ID:

```typescript
userManager.setActiveUser('uniqueUserId')
```

Get the currently active user:

```typescript
const activeUser = userManager.getActiveUser()
console.log(activeUser)
```

##### Editing a User

Edit the user's information by providing their ID and the updated data:

```typescript
userManager.editUser('uniqueUserId', { firstName: 'Jane', lastName: 'Smith' })
```
