// utils/supabase/UsersDb.ts
import supabase from './client';
import { Database } from '@/types/supabase';
import { v4 as uuidv4 } from 'uuid';

export type MatrixUser = Database['public']['Tables']['user']['Row'];
export type MatrixUserInsert = Database['public']['Tables']['user']['Insert'];

export class UsersDb {
    static async getMatrixUserWithAuth(matrixUser: MatrixUserInsert): Promise<MatrixUser | null> {
        try {
            const existingUser = await this.getUserByAuth0Id(matrixUser.auth0_id!);
            if (existingUser) {
                const mergedUser = this.mergeUserData(existingUser, matrixUser);
                const { data, error } = await supabase
                    .from('user')
                    .upsert(mergedUser, {
                        onConflict: 'auth0_id'
                    })
                    .select('*');

                if (error) {
                    console.error('Error upserting user:', error);
                    return null;
                }

                return data ? data[0] as MatrixUser : null;
            } else {
                matrixUser.matrix_id = uuidv4();
                const newUser = await this.createUser(matrixUser);
                if (newUser) {
                    return newUser;
                }
                console.error('Failed to create user');
                return null;
            }
        } catch (error) {
            console.error('Error in getMatrixUserWithAuth:', error);
            return null;
        }
    }

    static async getUserByAuth0Id(auth0_id: string): Promise<MatrixUser | null> {
        try {
            const { data, error } = await supabase
                .from('user')
                .select('*')
                .eq('auth0_id', auth0_id)
                .single();

            if (error && error.code !== 'PGRST116') {
                console.error('getUserByAuth0Id Error fetching user:', error);
                return null;
            }

            if (!data) {
                return null;
            }

            return data as MatrixUser;
        } catch (error) {
            console.error('getUserByAuth0Id Error in getUserByAuth0Id:', error);
            return null;
        }
    }

    static async getUserByMatrixId(matrixId: string): Promise<MatrixUser | null> {
        try {
            const { data, error } = await supabase
                .from('user')
                .select('*')
                .eq('user_id', matrixId)
                .single();

            if (error && error.code !== 'PGRST116') {
                console.error('Error fetching user:', error);
                return null;
            }

            if (!data) {
                return null;
            }

            return data as MatrixUser;
        } catch (error) {
            console.error('Error in getUserByMatrixId:', error);
            return null;
        }
    }

    static async createUser(matrixUser: MatrixUserInsert): Promise<MatrixUser | null> {
        try {
            matrixUser.matrix_id = uuidv4();
            const { data, error } = await supabase
                .from('user')
                .insert([matrixUser])
                .select('*'); // Select inserted data to return it

            if (error) {
                console.error('Error creating user:', error);
                return null;
            } else {
                return data ? data[0] as MatrixUser : null;
            }
        } catch (error) {
            console.error('Error in createUser:', error);
            return null;
        }
    }

    static async updateUser(auth0_id: string, updatedData: Partial<MatrixUser>): Promise<void> {
        try {
            const { error } = await supabase
                .from('user')
                .update(updatedData)
                .eq('auth0_id', auth0_id)
                .not('auth0_id', 'is', null)
                .not('user_id', 'is', null);

            if (error) {
                console.error('Error updating user:', error);
            } else {
            }
        } catch (error) {
            console.error('Error in updateUser:', error);
        }
    }

    static async updateUserByMatrixId(matrixId: string, updatedData: Partial<MatrixUser>): Promise<void> {
        try {
            const { error } = await supabase
                .from('user')
                .update(updatedData)
                .eq('user_id', matrixId)
                .not('auth0_id', 'is', null)
                .not('user_id', 'is', null);

            if (error) {
                console.error('Error updating user:', error);
            } else {
            }
        } catch (error) {
            console.error('Error in updateUserByMatrixId:', error);
        }
    }

    static async upsertUser(matrixUser: MatrixUserInsert): Promise<MatrixUser | null> {
        try {
            const { data, error } = await supabase
                .from('user')
                .upsert(matrixUser, {
                    onConflict: 'auth0_id, user_id'
                })
                .select('*');

            if (error) {
                console.error('Error upserting user:', error);
                return null;
            }

            return data ? data[0] as MatrixUser : null;
        } catch (error) {
            console.error('Error in upsertUser:', error);
            return null;
        }
    }

    static mergeUserData(existingUser: MatrixUser, newUser: MatrixUserInsert): MatrixUserInsert {
        const mergedUser: MatrixUserInsert = { ...existingUser };
        for (const key in newUser) {
            const value = newUser[key as keyof MatrixUserInsert];
            if (value !== null && value !== undefined) {
                mergedUser[key as keyof MatrixUserInsert] = value as any;
            }
        }
        return mergedUser;
    }
}
