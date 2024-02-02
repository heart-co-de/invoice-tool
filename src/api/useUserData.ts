import { queryClient } from '@/plugins/vueQuery'
import { supabase } from '@/services/supabase'
import { useMutation, useQuery } from 'vue-query'
import { getUserId } from './utils'

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
      const userId = await getUserId()
      return supabase
        .from('user_data')
        .upsert({
          ...userData,
          user_id: userId,
        })
        .select()
    },
    {
      onSuccess: (_data, _variables, _context) => {
        queryClient.invalidateQueries({
          queryKey: 'userData',
        })
      },
    },
  )
}
