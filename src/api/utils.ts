import { supabase } from '@/services/supabase'

export const getUserId = async () => {
  const { error, data } = await supabase.auth.getSession()
  if (error) throw error
  if (!data.session) throw new Error('No user session')
  return data.session.user.id
}
