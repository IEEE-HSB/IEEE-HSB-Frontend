import { useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { UserContext } from '@/context/UserContext'
import { UserType } from '@/context/UserContext'

export function withRole<T extends object>(
  Component: React.ComponentType<T>,
  allowedRoles: string[]
) {
  return function ProtectedComponent(props: T) {
    const router = useRouter()
    const { user: currentUser } = useContext(UserContext) as { user: UserType | null }

    useEffect(() => {
      if (!currentUser || !allowedRoles.includes(currentUser.role)) {
        router.replace('/')
      }
    }, [currentUser, router])

    if (!currentUser || !allowedRoles.includes(currentUser.role)) return null

    return <Component {...props} />
  }
}
