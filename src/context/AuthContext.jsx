import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect
} from 'react'
import authService from '../services/authService'

export const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("There isn't a auth context")
  return context
}

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedFablogUser')
    setUser(loggedUserJSON)
  }, [])

  const login = async (credentials) => {
    setIsLoading(true)
    const userResponse = await authService.signIn(credentials)
    const currentUser = userResponse?.data
    setUser(currentUser)
    setIsLoading(false)
    window.localStorage.setItem('loggedFablogUser', JSON.stringify(currentUser))
    return true
  }

  const logout = () => {
    authService.signOut()
    window.localStorage.removeItem('loggedFablogUser')
    setUser(null)
  }

  const memoizedValue = useMemo(
    () => ({ user, isLoading, login, logout }),
    [user, isLoading, login, logout]
  )

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  )
}
