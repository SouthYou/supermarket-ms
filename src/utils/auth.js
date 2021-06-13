import Cookies from 'js-cookie'
import { logout } from '@/api/user'

const TokenKey = 'token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  logout()
  return Cookies.remove(TokenKey)
}
