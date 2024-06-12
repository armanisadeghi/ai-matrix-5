import supabase from "./client";
import { User } from '@/services/Users';


export class UsersDb {
    async getUserById(userId: string): Promise<User | null> {
        const { data, error } = await supabase
            .from('user')
            .select('*')
            .eq('"id"', userId)
            .single();  // Ensures that exactly one row is expected

        if (error) {
            console.error('Error fetching user:', error);
            return null;
        }

        if (!data) {
            console.log(`No user found with ID ${userId}`);
            return null;
        }

        return data as User;
    }

    /*
    async createUser(user: User): Promise<void> {
        const { error } = await supabase
            .from('user')
            .insert([user]);

        if (error) {
            console.error('Error creating user:', error);
        }
    }
    */

    async updateUser(userId: string, updatedData: Partial<User>): Promise<void> {
        const { error } = await supabase
            .from('user')
            .update(updatedData)
            .eq('id', userId);

        if (error) {
            console.error('Error updating user:', error);
        }
    }
}
