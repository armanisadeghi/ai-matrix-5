import supabase from '@/utils/supabase/client';
import { MatrixUser } from '@/types/user.types';
import { v4 as uuidv4 } from 'uuid';

async function upsertWithAnyData(user: MatrixUser) {
    // Validate required fields
    if (!user.updatedAt) {
        throw new Error('updatedAt is required');
    }
    if (!user.matrixId) {
        user.matrixId = uuidv4(); // Generate a new UUID if matrixId is not provided
    }

    // Prepare the call to the RPC function
    const { data, error } = await supabase.rpc('upsert_with_any_data', {
        p_matrix_id: user.matrixId,
        p_updated_at: user.updatedAt,
        p_first_name: user.firstName || undefined,
        p_last_name: user.lastName || undefined,
        p_nickname: user.nickname || undefined,
        p_full_name: user.fullName || undefined,
        p_picture: user.picture || undefined,
        p_account_type: user.accountType || undefined,
        p_account_status: user.accountStatus || undefined,
        p_org_id: user.orgId || undefined,
        p_role: user.role || undefined,
        p_phone: user.phone || undefined,
        p_phone_verified: user.phoneVerified || undefined,
        p_email: user.email || undefined,
        p_email_verified: user.emailVerified || undefined,
        p_preferred_picture: user.preferredPicture || undefined,
        p_last_login: user.lastLogin || undefined,
        p_last_activity: user.lastActivity || undefined
    });

    if (error) {
        console.error('Error upserting user:', error);
    } else {
        console.log('User upserted:', data);
    }
}

/* Usage example:
const newUser: MatrixUser = {
    updatedAt: new Date().toISOString(),
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
};

upsertWithAnyData(newUser);
*/
