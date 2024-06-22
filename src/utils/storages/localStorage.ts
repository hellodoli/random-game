import { keepDataKeys } from './storageKeys'

import { decryptData, encryptData, isEncrypted } from '../crypto'

const setLocalStorage = (key: string, obj: string) =>
  localStorage.setItem(key, obj)

const getLocalStorage = (key: string) => localStorage.getItem(key)

const removeLocalStorage = (key: string) => localStorage.removeItem(key)

const clearLocalStorage = () => {
  if (localStorage) {
    Object.keys(localStorage).forEach((key) => {
      if (!keepDataKeys.includes(key)) {
        removeLocalStorage(key)
      }
    })
  }
}

const storageCryptData = {
  set: (key: string, value: unknown, encrypt = true) => {
    const convertData = (value: unknown) => {
      try {
        return typeof value === 'object'
          ? JSON.stringify(value)
          : value?.toString() || ''
      } catch (error) {
        return ''
      }
    }
    try {
      const data = convertData(value)
      setLocalStorage(key, encrypt ? encryptData(data) : data)
    } catch {
      const data = convertData(value)
      setLocalStorage(key, data)
    }
  },
  get: (key: string, decrypt = true) => {
    const data = getLocalStorage(key) || ''
    try {
      if (isEncrypted(data) && decrypt) {
        return JSON.parse(decryptData(data))
      }
      return JSON.parse(data)
    } catch {
      if (isEncrypted(data) && decrypt) {
        return decryptData(data)
      }
      return data
    }
  },
  remove: (key: string) => removeLocalStorage(key),
}

export {
  clearLocalStorage,
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
  storageCryptData,
}
