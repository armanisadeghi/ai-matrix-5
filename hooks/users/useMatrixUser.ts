// hooks/useMatrixUser.ts
'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useRef } from 'react';
import { UsersDb } from "@/utils/supabase/UsersDb";
import { AuthProfile, unknownUser } from "@/types/user";
import { Database } from '@/types/supabase';
import { useRecoilState } from "recoil";
import { activeUserAtom } from "@/state/userAtoms";
export type MatrixUser = Database['public']['Tables']['user']['Row'];
type PartialMatrixUser = Omit<MatrixUser, 'matrix_id'> & { matrix_id: string | null };

function mapUserToMatrixUser(user: AuthProfile): PartialMatrixUser {
    return {
        matrix_id: null,
        auth0_id: user.sub || null,
        auth0_sid: user.sid || null,
        first_name: user.given_name || null,
        last_name: user.family_name || null,
        email: user.email || null,
        email_verified: user.email_verified || null,
        full_name: user.name || null,
        nickname: user.nickname || null,
        picture: user.picture || null,
        preferred_picture: null,
        updated_at: user.updated_at ? new Date(user.updated_at).toISOString() : new Date().toISOString(),
        account_type: null,
        account_status: null,
        org_id: null,
        phone: user.phone || null,
        phone_verified: user.phone_verified || null,
        role: null,
        created_at: null,
        last_login: null,
        last_activity: null
    };
}

export function useCompleteUserProfile() {
    const { user, error, isLoading } = useUser();
    const [activeUser, setActiveUser] = useRecoilState(activeUserAtom);
    const hasFetchedProfile = useRef(false);

    useEffect(() => {
        async function fetchAndSetUserProfile() {
            if (isLoading || !user) {
                return;
            }

            if (activeUser && activeUser.matrix_id) {
                return;
            }

            if (!hasFetchedProfile.current) {
                hasFetchedProfile.current = true;
                try {
                    const transformedUser = mapUserToMatrixUser(user);

                    const matrixUser: MatrixUser | null = await UsersDb.getMatrixUserWithAuth(transformedUser);

                    if (matrixUser) {
                        setActiveUser(matrixUser);
                    } else {
                        hasFetchedProfile.current = false;
                    }
                } catch (err) {
                    console.error('Error in fetchAndSetUserProfile:', err);
                    hasFetchedProfile.current = false;
                }
            }
        }

        fetchAndSetUserProfile();
    }, [user, isLoading, activeUser]);

    return { activeUser, error, isLoading };
}
