import { queryClient } from '@/plugins/vueQuery'
import { supabase } from '@/services/supabase'
import { useMutation, useQuery } from 'vue-query'

export const useUserData = () => {
  return useQuery('userData', async () => {
    const { data, error } = await supabase.from('user_data').select('*')
    if (error) throw error
    return data[0]
  })
}

export type UserData = NonNullable<ReturnType<typeof useUserData>['data']['value']>
export type UpdateUserData = Omit<UserData, 'user_id' | 'created_at'>

export const useUpdateUserData = () => {
  return useMutation(
    async (userData: UpdateUserData) => {
      const { error, data } = await supabase.auth.getSession()
      if (error) throw error
      if (!data.session) throw new Error('No user session')
      const userId = data.session?.user.id
      return supabase
        .from('user_data')
        .upsert({
          ...userData,
          user_id: userId,
        })
        .select()
    },
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries({
          queryKey: 'userData',
        })
      },
    },
  )
}
