'use client'
import axios from '@/axios'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

const useRefreshToken = () => {
  const { setAccessToken, setUser, user } = useAuth()
  const router = useRouter()

  const refresh = async () => {
    try {
      const response = await axios.get(`/api/v1/users/refresh`, {
        withCredentials: true,
      });
      setAccessToken(response.data.token)
      setUser(response.data.data.user)
      return response.data.token
    } catch (err: any) {
      if (err.response.status === 401 || err.response.status === 403) {
        router.push('/login')
        localStorage.removeItem('persist')
      }
    }
  }
  return refresh
}

export default useRefreshToken
