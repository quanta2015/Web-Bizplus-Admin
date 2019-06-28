import decode from 'jwt-decode'

const TOKEN_KEY = 'BIZPLUS_TOKEN'
const LANGDB_KEY = 'BIZPLUS_LANGDB'
const CONFIG_KEY = 'BIZPLUS_CONFIG'

export const getToken = () => {
  return window.localStorage.getItem(TOKEN_KEY)
}

export const saveToken = (token) => {
  window.localStorage.setItem(TOKEN_KEY, token)
}

export const removeToken = () => {
  window.localStorage.removeItem(TOKEN_KEY)
}

export const decodeToken = () => {
  return decode(window.localStorage.getItem(TOKEN_KEY))
}


export const getLangdb = () => {
  return window.localStorage.getItem(JSON.parse(LANGDB_KEY))
}

export const saveLangdb = (langdb) => {
  window.localStorage.setItem(LANGDB_KEY, JSON.stringify(langdb))
}

export const removeLangdb = () => {
  window.localStorage.removeItem(LANGDB_KEY)
}

export const getConfig = () => {
  return window.localStorage.getItem(JSON.parse(CONFIG_KEY))
}

export const saveConfig = (config) => {
  window.localStorage.setItem(CONFIG_KEY, JSON.stringify(config))
}

export const removeConfig = () => {
  window.localStorage.removeItem(CONFIG_KEY)
}


export default { getToken, saveToken, removeToken, decodeToken,getLangdb, saveLangdb, removeLangdb,getConfig,saveConfig, removeConfig}