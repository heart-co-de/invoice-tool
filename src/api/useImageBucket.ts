import { supabase } from '@/services/supabase'
import uuid from 'uuid-v9'
import { useMutation } from 'vue-query'

const imageBaseUrl = `${import.meta.env.VITE_SUPABASE_API_URL}/storage/v1/object/public/images`

export const useImageBucketUpload = () => {
  const uploadImage = async (file: File) => {
    const pathName = `private/${uuid()}`
    const { data, error } = await supabase.storage.from('images').upload(pathName, file)
    if (error) throw error
    return {
      ...data,
      url: `${imageBaseUrl}/${data.path}`,
    }
  }

  return useMutation({
    mutationFn: uploadImage,
  })
}
