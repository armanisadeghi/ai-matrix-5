// app/dashboard/page.tsx
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'



async function Page() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    console.log(error)
    // redirect('/login')
  }

  return <>Home</>;
}

export default Page;
