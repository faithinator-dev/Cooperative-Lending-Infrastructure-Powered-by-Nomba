import React, { createContext, useContext, useEffect, useState } from 'react'
import api, { login as loginApi } from '../api/auth'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user'))
    } catch (e) {
      return null
    }
  })
  const [token, setToken] = useState(() => localStorage.getItem('token') || null)

  useEffect(() => {
    if (token) api.defaults.headers.common.Authorization = `Bearer ${token}`
    else delete api.defaults.headers.common.Authorization
  }, [token])

  const login = async ({ email, password, remember = false }) => {
    const data = await loginApi({ email, password })
    // expected: { user, token }
    setUser(data.user)
    setToken(data.token)
    if (remember) {
      localStorage.setItem('user', JSON.stringify(data.user))
      localStorage.setItem('token', data.token)
    }
    return data
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export default AuthContext
