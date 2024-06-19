interface MyUser {
    id: number
    name: string
    email?: string // Optional property
    age?: number // Optional property with a known default
}

const createUser = (overrides: Partial<MyUser> = {}): MyUser => {
    const defaultUser: MyUser = {
        id: 0,
        name: 'Unknown',
        email: 'unknown@example.com',
        age: 18, // Default value for age
        ...overrides
    }
    return defaultUser
}

const myuser = createUser({ name: 'John Doe' }) // age and email get default values
console.log(myuser) // { id: 0, name: "John Doe", email: "unknown@example.com", age: 18 }

enum UserRole {
    Admin = 'Admin',
    User = 'User',
    Guest = 'Guest'
}

interface Address {
    street: string
    city: string
    zipCode: string
}

interface ComplexUser {
    id: number
    name: string
    email: string
    isActive: boolean
    age?: number
    role: UserRole
    addresses: Address[]
    preferences: {
        theme: string
        notifications: boolean
    }
    tags?: string[] // Optional array of strings
}

const createComplexUser = (overrides: Partial<ComplexUser> = {}): ComplexUser => {
    const defaultUser: ComplexUser = {
        id: 0,
        name: 'Unknown',
        email: 'unknown@example.com',
        isActive: false,
        role: UserRole.User,
        addresses: [],
        preferences: {
            theme: 'light',
            notifications: true
        },
        ...overrides
    }
    return defaultUser
}

const complexUser = createComplexUser({ name: 'John Doe', email: 'john.doe@example.com' })
console.log(complexUser)

interface Company {
    name: string
    address: Address
    employees: ComplexUser[]
    additionalInfo?: {
        [key: string]: any // Allows any additional key-value pairs
    }
}

const createCompany = (overrides: Partial<Company> = {}): Company => {
    const defaultCompany: Company = {
        name: 'Default Company',
        address: {
            street: '123 Main St',
            city: 'Anytown',
            zipCode: '12345'
        },
        employees: [],
        ...overrides
    }
    return defaultCompany
}

const company = createCompany({
    name: 'Tech Corp',
    employees: [
        createComplexUser({ name: 'Alice', role: UserRole.Admin }),
        createComplexUser({ name: 'Bob', role: UserRole.User })
    ]
})
console.log(company)
