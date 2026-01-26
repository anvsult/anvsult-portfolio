import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
            // I added this try-catch block to handle potential errors when setting cookies
            // This is because the server component is allowed to read cookies but not set them
            // So by ignoring that error during rendering, the middleware will take care of setting cookies
          } catch (error) {
            console.error('Error setting cookies in Supabase client:', error)
          }
        },
      },
    }
  )
}