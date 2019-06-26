import decode from 'jwt-decode'

const TOKEN_KEY = 'BIZPLUS_TOKEN'
const LANGDB_KEY = 'BIZPLUS_LANGDB'

export const getToken = () => {
  return window.localStorage.getItem(TOKEN_KEY)
}

export const getLangdb = () => {
  return window.localStorage.getItem(JSON.parse(LANGDB_KEY))
}
export const saveToken = (token) => {
  window.localStorage.setItem(TOKEN_KEY, token)
}

export const saveLangdb = (langdb) => {
  window.localStorage.setItem(LANGDB_KEY, JSON.stringify(langdb))
}

export const removeToken = () => {
  window.localStorage.removeItem(TOKEN_KEY)
}

export const removeLangdb = () => {
  window.localStorage.removeItem(LANGDB_KEY)
}

export const decodeToken = () => {
  return decode(window.localStorage.getItem(TOKEN_KEY))
}

export default { getToken, saveToken, removeToken, decodeToken,getLangdb, saveLangdb, removeLangdb }