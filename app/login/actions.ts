'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
    const supabase = createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    try {
        const { session } = await (await supabase.auth.signInWithPassword(data)).data
        if (!session) {
            redirect('/login')
        } else {
            revalidatePath('/', 'layout')
            redirect('/dashboard')
        }
    } catch (error) {
        redirect('/')
    }
}

export async function signup(formData: FormData) {
    const supabase = createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    try {
        await supabase.auth.signUp(data)
        revalidatePath('/', 'layout')
        redirect('/dashboard')
    } catch (error) {
        redirect('/')
    }
}