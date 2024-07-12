import supabase from '@/utils/supabase/client';
import { AuthProfile, MatrixUser } from '@/types/user.types';


interface UpsertFromAuth0Params {
    p_auth0_id: string;
    p_auth0_sid: string;
    p_first_name: string;
    p_last_name: string;
    p_email: string;
    p_email_verified: boolean;
    p_full_name: string;
    p_nickname: string;
    p_picture: string;
    p_updated_at: string;
    p_phone: string;
    p_phone_verified: boolean;
}

// Maps Auth0 user to upsert_from_auth0 parameters
function mapUserToParams(user: AuthProfile): UpsertFromAuth0Params {
    return {
        p_auth0_id: user.sub || '',
        p_auth0_sid: user.sid || '',
        p_first_name: user.given_name || '',
        p_last_name: user.family_name || '',
        p_email: user.email || '',
        p_email_verified: user.email_verified || false,
        p_full_name: user.name || '',
        p_nickname: user.nickname || '',
        p_picture: user.picture || '',
        p_updated_at: user.updated_at ? new Date(user.updated_at).toISOString() : new Date().toISOString(),
        p_phone: user.phone || '',
        p_phone_verified: user.phone_verified || false
    };
}

// Upserts the user data from Auth0
export async function upsertFromAuth0(user: AuthProfile): Promise<MatrixUser | null> {
    const params: UpsertFromAuth0Params = mapUserToParams(user);

    const { data, error } = await supabase.rpc('upsert_from_auth0', params);

    if (error) {
        console.error('Error upserting user:', error);
        return null;
    } else {
        return data[0] as MatrixUser;
    }
}
